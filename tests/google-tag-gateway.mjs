import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import Module, { createRequire } from 'node:module';
import ts from 'typescript';
import { resolve } from 'node:path';

const file = resolve('netlify/edge-functions/resolve-google-tag-gateway.ts');
const mod = new Module(file);
mod.paths = createRequire(import.meta.url).resolve.paths(file);
mod._compile(ts.transpileModule(fs.readFileSync(file, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true }
}).outputText, file);
const { default: handler, config } = mod.exports;
const ctx = { geo: { country: { code: 'US' }, subdivision: { code: 'CA' }, city: 'San Diego', latitude: 32.7, longitude: -117.1 }, ip: '203.0.113.25' };

test('Google tag gateway uses an isolated path and trusted location headers', async () => {
  assert.equal(config.path, '/resolve-gtg-2026/*');
  const originalFetch = global.fetch;
  let forwarded;
  global.fetch = async (url, options) => {
    forwarded = { url, options };
    return new Response('ok', { status: 200, headers: { 'Content-Type': 'text/plain', 'Set-Cookie': 'abc=123' } });
  };
  try {
    const input = new Request('https://resolve-us.com/resolve-gtg-2026/?validate_geo=healthy', {
      headers: { 'x-forwarded-country': 'FR', cookie: 'visitor-session=secret', authorization: 'Bearer secret' }
    });
    const output = await handler(input, ctx);
    assert.equal(await output.text(), 'ok');
    assert.equal(forwarded.url, 'https://g-k82jb039dq.fps.goog/resolve-gtg-2026/?validate_geo=healthy');
    assert.equal(forwarded.options.headers.get('X-Forwarded-Country'), 'US');
    assert.equal(forwarded.options.headers.get('X-Forwarded-Region'), 'CA');
    assert.equal(forwarded.options.headers.get('X-Forwarded-CountryRegion'), 'US-CA');
    assert.equal(forwarded.options.headers.get('X-Forwarded-For'), '203.0.113.25');
    assert.equal(forwarded.options.headers.get('X-Gtg-Tag-Id'), null); // Tag ID is already in the Google host
    assert.equal(forwarded.options.headers.get('cookie'), null);
    assert.equal(forwarded.options.headers.get('authorization'), null);
    assert.equal(output.headers.get('set-cookie'), null);
    assert.equal((await handler(new Request('https://resolve-us.com/resolve-gtg-2026/healthy', { method: 'PUT' }), ctx)).status, 405);
    assert.equal((await handler(new Request('https://resolve-us.com/different-path'), ctx)).status, 404);
  } finally { global.fetch = originalFetch; }
});

test('upstream failure is contained to gateway path', async () => {
  const originalFetch = global.fetch;
  global.fetch = async () => { throw new Error('upstream failed'); };
  try {
    const result = await handler(new Request('https://resolve-us.com/resolve-gtg-2026/healthy'), ctx);
    assert.equal(result.status, 502);
    assert.match(await result.text(), /unavailable/i);
  } finally { global.fetch = originalFetch; }
});
