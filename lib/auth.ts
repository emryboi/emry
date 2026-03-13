import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const SESSION_COOKIE = "admin_session";
const SESSION_TTL_HOURS = 24;

const getAuthSecret = () => {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error("AUTH_SECRET is not set");
  return new TextEncoder().encode(secret);
};

export type AdminSession = {
  username: string;
};

export async function createSignedSession(username: string): Promise<string> {
  const secret = getAuthSecret();
  const token = await new SignJWT({ username })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_HOURS}h`)
    .sign(secret);
  return token;
}

export async function verifySignedSession(token: string | undefined): Promise<AdminSession | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getAuthSecret());
    return { username: payload.username as string };
  } catch {
    return null;
  }
}

// Set ve Clear cookie fonksiyonlarını async yapmalısın
export async function setAdminSessionCookie(username: string) {
  const token = await createSignedSession(username);
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
}

export async function clearAdminSessionCookie() {
  (await cookies()).delete(SESSION_COOKIE);
}

export async function getAdminSessionFromCookies(): Promise<AdminSession | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  return await verifySignedSession(token);
}