// Standalone types keep Next.js typechecking independent of Netlify's Deno-only type package.
type EdgeGeo = {
  country?: { code?: string };
  subdivision?: { code?: string };
  city?: string;
  latitude?: number | string;
  longitude?: number | string;
};
type EdgeContext = { geo?: EdgeGeo; ip?: string };

/**
 * Isolated production-only Google tag gateway routing test.
 * This path is not referenced by the site's consent-gated GA4/Ads tags.
 * Do not migrate tags until health, geo, consent and Tag Assistant are verified.
 */
const PATH = "/resolve-gtg-2026";
// Tag ID is encoded in the upstream host; do NOT repeat it in X-Gtg-Tag-Id.
const GOOGLE_ORIGIN = "https://g-k82jb039dq.fps.goog";
const MAX_POST_BYTES = 64 * 1024;

export default async function handler(request: Request, context: EdgeContext): Promise<Response> {
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
  // The upstream host already selects the tag. Do not duplicate X-Gtg-Tag-Id.
  // Google's manual gateway requires forwarding the first-party cookie header,
  // which is sent by browsers on this consent-gated tag path.
  const visitorCookies = request.headers.get("cookie");
  if (visitorCookies) headers.set("Cookie", visitorCookies);

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
    // Preserve Google's Set-Cookie headers, required for the documented
    // first-party gateway behavior. Browser cookie scope rules still apply.
    responseHeaders.delete("content-length");
    responseHeaders.set("X-Content-Type-Options", "nosniff");
    // If the script endpoint stops serving JavaScript, return a script-load
    // error so CookieConsent can fall back to the original Google URL.
    const scriptRequest = request.method === "GET" &&
      source.pathname === PATH + "/" &&
      !source.searchParams.has("validate_geo");
    if (scriptRequest && upstream.ok &&
        !/javascript/i.test(responseHeaders.get("content-type") ?? "")) {
      return new Response("Gateway script unavailable", {
        status: 502,
        headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
      });
    }
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

export const config = { path: PATH + "/*" };
