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
    assert.equal(calls[0].from, '"ResolveUS" <existing@example.com>');
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

test('AI keeps model and prompt while using ResolveUS identity', async () => {
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
    assert.match(sent.messages[0].content, /ResolveUS/);
    assert.equal(sent.messages[1].content, 'Help with travel');
  } finally { global.fetch = originalFetch; }
});

test('baseline plan prices, features and consultation categories remain unchanged', () => {
  const baseline = file => execFileSync('git', ['show', `449fa3794255e2084e616dad3f291d1f019f7592:${file}`], { encoding: 'utf8' });
  const planPattern = /const plans: Plan\[\] = \[[\s\S]*?\n\];/;
  assert.equal(fs.readFileSync('src/lib/pricing.ts', 'utf8').match(/export (const plans: Plan\[\] = \[[\s\S]*?\n\];)/)[1], baseline('src/app/pricing/page.tsx').match(planPattern)[0]);
  for (const [file, expression] of [
    ['src/app/contact/page.tsx', /const allCategories: Category\[\] = \[[\s\S]*?\n\];/],
    ['src/app/services/page.tsx', /const services = \[[\s\S]*?\n\];/]
  ]) {
    assert.equal(fs.readFileSync(file, 'utf8').match(expression)[0], baseline(file).match(expression)[0].replaceAll('QuickSquad', 'ResolveUS'));
  }
});

test('sitemap and robots use primary domain consistently', () => {
  const sitemap = load('src/app/sitemap.ts').default();
  assert.ok(sitemap.length >= 12);
  for (const entry of sitemap) assert.equal(new URL(entry.url).origin, 'https://resolve-us.com');
  assert.equal(load('src/app/robots.ts').default().sitemap, 'https://resolve-us.com/sitemap.xml');
});

test('enquiry-only pricing has no on-site payment capture', () => {
  const pricingCards = fs.readFileSync('src/components/PricingCards.tsx', 'utf8');
  const pricingPage = fs.readFileSync('src/app/pricing/page.tsx', 'utf8');
  const homepage = fs.readFileSync('src/app/page.tsx', 'utf8');
  const faq = fs.readFileSync('src/app/faq-page/page.tsx', 'utf8');
  assert.doesNotMatch(pricingCards, /Razorpay|checkout\.js|handlePayment|razorpay_payment_id|new window\.Razorpay/);
  assert.match(pricingCards, /href="\/contact#consultation-form"/);
  assert.doesNotMatch(pricingPage, /<PricingCards interactive/);
  assert.match(pricingPage, /does not take or record payments through this website/);
  assert.match(homepage, /No payments or payment details are accepted through this website/);
  assert.match(faq, /does not accept or record payments/);
});

test('public guidance avoids third-party technical support claims and password-reset promotion', () => {
  for (const file of ['src/app/disclaimer/page.tsx', 'src/app/terms-of-service/page.tsx']) {
    const source = fs.readFileSync(file, 'utf8');
    assert.doesNotMatch(source, /third[- ]party/i);
  }
  const disclaimer = fs.readFileSync('src/app/disclaimer/page.tsx', 'utf8');
  assert.match(disclaimer, /not the official customer-service department/);
  assert.match(disclaimer, /does not imply endorsement or affiliation/);
  for (const file of ['src/components/ChatWidget.tsx', 'src/app/pages/chatgpt.tsx']) {
    const source = fs.readFileSync(file, 'utf8');
    assert.doesNotMatch(source, /Reset my email password/i);
    assert.match(source, /Learn how to secure my email account/);
  }
});

test('Google measurement waits for visitor consent and allows revocation', () => {
  const layout = fs.readFileSync('src/app/layout.tsx', 'utf8');
  const consent = fs.readFileSync('src/components/CookieConsent.tsx', 'utf8');
  const privacy = fs.readFileSync('src/app/privacy-policy/page.tsx', 'utf8');
  assert.match(layout, /analytics_storage': 'denied'/);
  assert.match(layout, /ad_storage': 'denied'/);
  assert.match(layout, /ad_user_data': 'denied'/);
  assert.match(layout, /ad_personalization': 'denied'/);
  assert.doesNotMatch(layout, /googletagmanager\.com\/gtag\/js/);
  assert.match(consent, /enableGoogleTag &&/);
  assert.match(consent, /window\.gtag\("consent", "update"/);
  assert.match(consent, /analytics: false, advertising: false/);
  assert.match(consent, /analytics: true, advertising: false/);
  assert.match(consent, /analytics: true, advertising: true/);
  assert.match(consent, /Cookie settings/);
  assert.match(privacy, /do not load until you choose/);
});

test('enquiry lead event is privacy-safe and success-gated', () => {
  const contact = fs.readFileSync('src/app/contact/page.tsx', 'utf8');
  assert.match(contact, /if \(res\.ok && data\.success === true\)/);
  assert.match(contact, /preferences\?\.analytics === true/);
  assert.match(contact, /gtag\?\.\("event", "generate_lead", \{ method: "consultation_form" \}\)/);
  assert.match(contact, /if \(submitting\.current\) return/);
  assert.doesNotMatch(contact, /generate_lead[^\n]*form\./);
});

test('legal pages provide refund email and clear issuance deadline', () => {
  const refund = fs.readFileSync('src/app/refund-policy/page.tsx', 'utf8');
  const terms = fs.readFileSync('src/app/terms-of-service/page.tsx', 'utf8');
  const privacy = fs.readFileSync('src/app/privacy-policy/page.tsx', 'utf8');
  const disclaimer = fs.readFileSync('src/app/disclaimer/page.tsx', 'utf8');
  const formerOperator = ['A V', 'TRADE', 'CORPORATION'].join(' ');
  for (const text of [refund, terms, privacy, disclaimer]) {
    assert.match(text, /mailto:support@resolve-us\.com/);
    assert.match(text, /A V Food Factory/);
    assert.doesNotMatch(text, new RegExp(formerOperator));
  }
  assert.match(refund, /14 calendar days after approval/);
  assert.match(refund, /does not accept payments/);
  assert.match(terms, /website does not accept payments/);
});

test('ResolveUS brand and updated legal operator are present in metadata', () => {
  const layout = fs.readFileSync('src/app/layout.tsx', 'utf8');
  const logo = fs.readFileSync('public/images/resolve-us-logo.svg', 'utf8');
  assert.match(layout, /name: "A V Food Factory"/);
  assert.match(layout, /legalName: "A V Food Factory"/);
  assert.match(layout, /brand: \{ "@type": "Brand", name: "ResolveUS" \}/);
  assert.match(logo, /<title id="title">ResolveUS<\/title>/);
  for (const file of ['src/components/SiteHeader.tsx', 'src/components/SiteFooter.tsx', 'src/app/contact/page.tsx']) {
    const source = fs.readFileSync(file, 'utf8');
    assert.doesNotMatch(source, /Resolve\s+US/);
  }
});

test('new phone number and public brand presentation are consistent', () => {
  const files = ['src/components/SiteHeader.tsx', 'src/components/SiteFooter.tsx', 'src/app/contact/page.tsx', 'src/app/page.tsx', 'src/app/api/send-email/route.ts', 'src/app/layout.tsx'];
  const application = files.map(file => fs.readFileSync(file, 'utf8')).join('\n');
  assert.ok(!application.includes('312-1044') && !application.includes('18443121044'));
  assert.ok(application.includes('(844) 369-3312') && application.includes('+18443693312'));
  for (const file of ['src/components/SiteHeader.tsx', 'src/components/SiteFooter.tsx', 'src/app/contact/page.tsx', 'src/app/page.tsx']) {
    const source = fs.readFileSync(file, 'utf8');
    for (const match of source.matchAll(/tel:([^\"']+)/g)) assert.equal(match[1], '+18443693312');
  }
  const faq = fs.readFileSync('src/app/faq-page/page.tsx', 'utf8');
  assert.match(faq, /does not accept or record payments/);
});
