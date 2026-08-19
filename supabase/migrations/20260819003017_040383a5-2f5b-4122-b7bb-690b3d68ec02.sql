-- Allow the Telegram bot (running on external hosting with the publishable key) to use its own tables.
GRANT SELECT, INSERT, UPDATE, DELETE ON public.telegram_bot_settings TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.telegram_platforms TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.telegram_admins TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.telegram_users TO anon, authenticated;

DROP POLICY IF EXISTS "bot manages settings" ON public.telegram_bot_settings;
CREATE POLICY "bot manages settings" ON public.telegram_bot_settings FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "bot manages platforms" ON public.telegram_platforms;
CREATE POLICY "bot manages platforms" ON public.telegram_platforms FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "bot manages admins" ON public.telegram_admins;
CREATE POLICY "bot manages admins" ON public.telegram_admins FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "bot manages users" ON public.telegram_users;
CREATE POLICY "bot manages users" ON public.telegram_users FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);