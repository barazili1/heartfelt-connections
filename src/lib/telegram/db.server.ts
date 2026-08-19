import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Bot database client.
 *
 * On Lovable Cloud the service-role key is injected and used (bypasses RLS).
 * On external hosting (e.g. Vercel) there is no service-role key, so we fall
 * back to the public project URL + publishable key below, which works with the
 * bot-table policies. No env vars are required on the host.
 */
const FALLBACK_URL = "https://rbjrzzjpktxmruapevpg.supabase.co";
const FALLBACK_KEY = "sb_publishable_s1IDfSCsjQzk1_g--0FTQg_2tBppsSv";

let _client: SupabaseClient | null = null;

function makeFetch(key: string): typeof fetch {
  return (input, init) => {
    const headers = new Headers(
      typeof Request !== "undefined" && input instanceof Request ? input.headers : undefined,
    );
    if (init?.headers) new Headers(init.headers).forEach((v, k) => headers.set(k, v));
    if (headers.get("Authorization") === `Bearer ${key}`) headers.delete("Authorization");
    headers.set("apikey", key);
    return fetch(input, { ...init, headers });
  };
}

export function botDb(): SupabaseClient {
  if (_client) return _client;
  const url = process.env["SUPABASE_URL"] || FALLBACK_URL;
  const key =
    process.env["SUPABASE_SERVICE_ROLE_KEY"] ||
    process.env["SUPABASE_PUBLISHABLE_KEY"] ||
    FALLBACK_KEY;

  _client = createClient(url, key, {
    global: { fetch: makeFetch(key) },
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return _client;
}
