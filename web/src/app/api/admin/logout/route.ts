// Admin logout — clears the session cookie. The proxy will redirect the next
// /admin request to the login page.

import { cookies } from "next/headers";
import { SESSION_COOKIE } from "@/lib/cms/auth";

export async function POST(): Promise<Response> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  return Response.json({ ok: true });
}
