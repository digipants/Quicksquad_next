import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
import Module, { createRequire } from 'node:module';
import { resolve } from 'node:path';
import { execFileSync } from 'node:child_process';
const requireModule = createRequire(import.meta.url);

function load(file, mocks = {}) {
  const path = resolve(file);
  const mod = new Module(path);
  mod.paths = requireModule.resolve.paths(path);
  mod.require = (name) => name in mocks ? mocks[name] : requireModule(name);
  mod._compile(ts.transpileModule(fs.readFileSync(path, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true }
  }).outputText, path);
  return mod.exports;
}
const request = (body) => new Request('http://localhost/api/test', {
  method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body)
});
const contact = { name: '<Test>', email: 'test@example.com', phone: '123', message: '<hello>', category: 'Travel', subCategory: 'Planning' };

for (const [route, body] of [['send-email', contact], ['subscribe', { name: '<Test>', email: 'test@example.com' }]]) {
  test(`${route}: validation, sender preservation, awaited delivery and failures`, async () => {
    process.env.EMAIL_USER = 'existing@example.com';
    process.env.EMAIL_PASS = 'mock-only';
    delete process.env.EMAIL_FROM;
    delete process.env.CONTACT_INBOX;
    let calls = [];
    let release;
    let mode = 'defer';
    const POST = load(`src/app/api/${route}/route.ts`, { nodemailer: { createTransport: () => ({
      sendMail: async (mail) => {
        calls.push(mail);
        if (mode === 'admin-fail') throw new Error('mock');
        if (calls.length === 2) {
          if (mode === 'confirmation-fail') throw new Error('mock');
          if (mode === 'defer') await new Promise(resolve => { release = resolve; });
        }
      }
    }) } }).POST;
    assert.equal((await POST(request({}))).status, 400);
    assert.equal((await POST(request({ ...body, email: 'invalid' }))).status, 400);
    let finished = false;
    const pending = POST(request(body)).then(r => { finished = true; return r; });
    while (!release) await new Promise(resolve => setImmediate(resolve));
    assert.equal(finished, false);
    assert.equal(calls.length, 2);
    assert.equal(calls[0].from, '"Resolve US" <existing@example.com>');
    assert.equal(calls[1].to, 'test@example.com');
    assert.ok(calls[0].html.includes('&lt;Test&gt;') || calls[0].html.includes('&#60;Test&#62;'));
    assert.ok(!calls[0].html.includes('quicksquad.live'));
    release();
    assert.equal((await (await pending).json()).success, true);
    mode = 'confirmation-fail'; calls = [];
    const partial = await (await POST(request(body))).json();
    assert.equal(partial.success, true);
    assert.equal(partial.confirmationSent, false);
    assert.match(partial.message, /do not resubmit/);
    mode = 'admin-fail'; calls = [];
    assert.equal((await POST(request(body))).status, 500);
    assert.equal(calls.length, 1);
    delete process.env.EMAIL_PASS;
    assert.equal((await POST(request(body))).status, 503);
  });
}

test('AI keeps model and prompt while using Resolve US identity', async () => {
  const originalFetch = global.fetch;
  let sent;
  global.fetch = async (_url, options) => {
    sent = JSON.parse(options.body);
    return Response.json({ choices: [{ message: { content: 'Mock answer' } }] });
  };
  try {
    const response = await load('src/app/api/chat/route.ts').POST(request({ message: 'Help with travel' }));
    assert.equal((await response.json()).reply, 'Mock answer');
    assert.equal(sent.model, 'gpt-3.5-turbo');
    assert.match(sent.messages[0].content, /Resolve US/);
    assert.equal(sent.messages[1].content, 'Help with travel');
  } finally { global.fetch = originalFetch; }
});

test('baseline prices, entitlements, categories and payment settings remain identical', () => {
  const baseline = file => execFileSync('git', ['show', `449fa3794255e2084e616dad3f291d1f019f7592:${file}`], { encoding: 'utf8' });
  for (const [file, expression] of [
    ['src/app/pricing/page.tsx', /const plans: Plan\[\] = \[[\s\S]*?\n\];/],
    ['src/app/contact/page.tsx', /const allCategories: Category\[\] = \[[\s\S]*?\n\];/],
    ['src/app/services/page.tsx', /const services = \[[\s\S]*?\n\];/]
  ]) {
    assert.equal(fs.readFileSync(file, 'utf8').match(expression)[0], baseline(file).match(expression)[0].replaceAll('QuickSquad', 'Resolve US'));
  }
  const file = 'src/app/pricing/page.tsx';
  const current = fs.readFileSync(file, 'utf8');
  for (const expression of [/key: "[^"]+"/, /currency: "[^"]+"/, /amount: plan.price/, /handler\(response\) \{[\s\S]*?\n      \}/]) {
    assert.equal(current.match(expression)[0], baseline(file).match(expression)[0]);
  }
});

test('sitemap and robots use primary domain consistently', () => {
  const sitemap = load('src/app/sitemap.ts').default();
  assert.ok(sitemap.length >= 12);
  for (const entry of sitemap) assert.equal(new URL(entry.url).origin, 'https://resolve-us.com');
  assert.equal(load('src/app/robots.ts').default().sitemap, 'https://resolve-us.com/sitemap.xml');
});

test('checkout opens unchanged Basic and Premium amounts; Enterprise stays contact-only', async () => {
  const { runInNewContext } = await import('node:vm');
  const source = fs.readFileSync('src/app/pricing/page.tsx', 'utf8');
  const planSource = source.match(/const plans: Plan\[\] = \[[\s\S]*?\n\];/)[0];
  const handlerSource = source.match(/const handlePayment = \(plan: Plan\) => \{[\s\S]*?\n  \};/)[0];
  const opened = [];
  const notices = [];
  const compiled = ts.transpileModule(`${planSource}\n${handlerSource}\nplans.forEach(handlePayment);`, {
    compilerOptions: { target: ts.ScriptTarget.ES2020 }
  }).outputText;
  runInNewContext(compiled, {
    window: { Razorpay: function(options) { this.open = () => opened.push(options); } },
    alert: message => notices.push(message)
  });
  assert.deepEqual(opened.map(option => option.amount), [2000, 7500]);
  assert.ok(opened.every(option => option.name === 'Resolve US' && option.currency === 'USD'));
  assert.equal(notices.length, 1);
  assert.match(notices[0], /contact us for Enterprise/);
});
