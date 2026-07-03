export const SESSION_COOKIE = "kvartal_admin_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days, seconds

function getSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error("AUTH_SECRET is not set");
  return secret;
}

function toBase64Url(bytes: ArrayBuffer | Uint8Array) {
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let str = "";
  arr.forEach((b) => (str += String.fromCharCode(b)));
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(str: string) {
  const b64 = str.replace(/-/g, "+").replace(/_/g, "/");
  const bin = atob(b64);
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
}

async function hmacKey() {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export async function createSessionToken(userId: number) {
  const payload = JSON.stringify({ uid: userId, exp: Date.now() + SESSION_MAX_AGE * 1000 });
  const payloadB64 = toBase64Url(new TextEncoder().encode(payload));
  const key = await hmacKey();
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payloadB64));
  return `${payloadB64}.${toBase64Url(sig)}`;
}

export async function verifySessionToken(token: string | undefined | null): Promise<number | null> {
  if (!token) return null;
  const [payloadB64, sigB64] = token.split(".");
  if (!payloadB64 || !sigB64) return null;

  const key = await hmacKey();
  const valid = await crypto.subtle.verify(
    "HMAC",
    key,
    fromBase64Url(sigB64),
    new TextEncoder().encode(payloadB64)
  );
  if (!valid) return null;

  try {
    const payload = JSON.parse(new TextDecoder().decode(fromBase64Url(payloadB64)));
    if (typeof payload.exp !== "number" || payload.exp < Date.now()) return null;
    if (typeof payload.uid !== "number") return null;
    return payload.uid;
  } catch {
    return null;
  }
}
