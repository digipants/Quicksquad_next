import type { Config, Context } from "@netlify/edge-functions";

/**
 * Isolated production-only Google tag gateway routing test.
 * This path is not referenced by the site's consent-gated GA4/Ads tags.
 * Do not migrate tags until health, geo, consent and Tag Assistant are verified.
 */
const PATH = "/resolve-gtg-2026";
const TAG_ID = "G-K82JB039DQ";
const GOOGLE_ORIGIN = "https://g-k82jb039dq.fps.goog";
const MAX_POST_BYTES = 64 * 1024;

export default async function handler(request: Request, context: Context): Promise<Response> {
  const source = new URL(request.url);
  if (!source.pathname.startsWith(PATH + "/")) {
    return new Response("Not found", { status: 404 });
  }
  if (!["GET", "HEAD", "POST"].includes(request.method)) {
    return new Response("Method not allowed", { status: 405, headers: { Allow: "GET, HEAD, POST" } });
  }

  const headers = new Headers();
  // Do not forward arbitrary browser credentials or spoofed geo headers.
  for (const name of ["accept", "accept-language", "content-type", "user-agent", "referer"]) {
    const value = request.headers.get(name);
    if (value) headers.set(name, value);
  }
  headers.set("X-Gtg-Tag-Id", TAG_ID);
  headers.set("X-Gtg-Implementation", "NetlifyEdge");

  const country = context.geo?.country?.code?.toUpperCase();
  const region = context.geo?.subdivision?.code?.toUpperCase();
  if (country && /^[A-Z]{2}$/.test(country)) {
    headers.set("X-Forwarded-Country", country);
    if (region && /^[A-Z0-9]{1,3}$/.test(region)) {
      headers.set("X-Forwarded-Region", region);
      headers.set("X-Forwarded-CountryRegion", country + "-" + region);
    }
  }

  const lat = Number(context.geo?.latitude);
  const lon = Number(context.geo?.longitude);
  if (context.geo?.latitude != null && context.geo?.longitude != null &&
      Number.isFinite(lat) && Number.isFinite(lon) &&
      Math.abs(lat) <= 90 && Math.abs(lon) <= 180) {
    const city = (context.geo?.city ?? "").replace(/[\r\n;,]/g, " ").slice(0, 80);
    headers.set("X-Forwarded-Geolocation", "latlong=" + lat + "," + lon + ";city=" + city);
  }
  if (context.ip && /^[0-9a-fA-F:.]{3,50}$/.test(context.ip)) {
    headers.set("X-Forwarded-For", context.ip);
  }

  let body: ArrayBuffer | undefined;
  if (request.method === "POST") {
    const length = Number(request.headers.get("content-length") || 0);
    if (length > MAX_POST_BYTES) return new Response("Request too large", { status: 413 });
    body = await request.arrayBuffer();
    if (body.byteLength > MAX_POST_BYTES) return new Response("Request too large", { status: 413 });
  }

  // Fixed upstream host; preserve measurement path and query including /healthy.
  const upstreamUrl = GOOGLE_ORIGIN + source.pathname + source.search;
  try {
    const upstream = await fetch(upstreamUrl, {
      method: request.method,
      headers,
      body,
      redirect: "manual",
      signal: AbortSignal.timeout(10000),
    });
    const responseHeaders = new Headers(upstream.headers);
    // Do not reflect upstream cookies onto the first-party domain during tests.
    responseHeaders.delete("set-cookie");
    responseHeaders.delete("content-length");
    responseHeaders.set("X-Content-Type-Options", "nosniff");
    return new Response(request.method === "HEAD" ? null : upstream.body, {
      status: upstream.status,
      headers: responseHeaders,
    });
  } catch {
    return new Response("Gateway upstream unavailable", {
      status: 502,
      headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
    });
  }
}

export const config: Config = { path: PATH + "/*" };
