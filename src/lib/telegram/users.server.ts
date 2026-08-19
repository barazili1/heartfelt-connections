import { supabaseAdmin } from "@/integrations/supabase/client.server";

type TelegramUser = {
  id?: number;
  username?: string;
  first_name?: string;
  last_name?: string;
  language_code?: string;
};

export async function recordTelegramUser(chatId: number, user?: TelegramUser) {
  const { error } = await supabaseAdmin.from("telegram_users").upsert(
    {
      chat_id: chatId,
      telegram_user_id: user?.id ?? null,
      username: user?.username ?? null,
      first_name: user?.first_name ?? null,
      last_name: user?.last_name ?? null,
      language_code: user?.language_code ?? null,
      is_blocked: false,
      last_seen_at: new Date().toISOString(),
    },
    { onConflict: "chat_id" },
  );
  if (error) console.error("Could not record Telegram user:", error.message);
}

export async function listBroadcastChatIds(): Promise<number[]> {
  const { data, error } = await supabaseAdmin
    .from("telegram_users")
    .select("chat_id")
    .eq("is_blocked", false)
    .order("last_seen_at", { ascending: false });
  if (error) throw new Error(`Could not load Telegram users: ${error.message}`);
  return (data ?? []).map((row) => Number(row.chat_id)).filter(Number.isFinite);
}

export async function markTelegramUserBlocked(chatId: number) {
  const { error } = await supabaseAdmin
    .from("telegram_users")
    .update({ is_blocked: true })
    .eq("chat_id", chatId);
  if (error) console.error("Could not mark Telegram user as blocked:", error.message);
}
