CREATE TABLE public.telegram_users (
  chat_id bigint PRIMARY KEY,
  telegram_user_id bigint,
  username text,
  first_name text,
  last_name text,
  language_code text,
  is_blocked boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  last_seen_at timestamptz NOT NULL DEFAULT now()
);

GRANT ALL ON public.telegram_users TO service_role;

ALTER TABLE public.telegram_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role manages Telegram users"
ON public.telegram_users
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

CREATE INDEX telegram_users_last_seen_idx ON public.telegram_users (last_seen_at DESC);

UPDATE public.telegram_bot_settings
SET app_base_url = 'https://nova-vip-one.vercel.app/site/index.html'
WHERE id = 1;