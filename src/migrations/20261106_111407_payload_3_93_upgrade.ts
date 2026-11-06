import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "reset_password_requested_at" timestamp(3) with time zone;
  CREATE INDEX IF NOT EXISTS "pages_locales_parent_id_idx" ON "pages_locales" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_locales_parent_id_idx" ON "_pages_v_locales" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "posts_locales_parent_id_idx" ON "posts_locales" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_locales_parent_id_idx" ON "_posts_v_locales" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_checkbox_locales_parent_id_idx" ON "forms_blocks_checkbox_locales" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_country_locales_parent_id_idx" ON "forms_blocks_country_locales" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_email_locales_parent_id_idx" ON "forms_blocks_email_locales" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_message_locales_parent_id_idx" ON "forms_blocks_message_locales" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_number_locales_parent_id_idx" ON "forms_blocks_number_locales" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_select_options_locales_parent_id_idx" ON "forms_blocks_select_options_locales" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_select_locales_parent_id_idx" ON "forms_blocks_select_locales" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_state_locales_parent_id_idx" ON "forms_blocks_state_locales" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_text_locales_parent_id_idx" ON "forms_blocks_text_locales" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_textarea_locales_parent_id_idx" ON "forms_blocks_textarea_locales" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_emails_locales_parent_id_idx" ON "forms_emails_locales" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_locales_parent_id_idx" ON "forms_locales" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "search_locales_parent_id_idx" ON "search_locales" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX IF EXISTS "pages_locales_parent_id_idx";
  DROP INDEX IF EXISTS "_pages_v_locales_parent_id_idx";
  DROP INDEX IF EXISTS "posts_locales_parent_id_idx";
  DROP INDEX IF EXISTS "_posts_v_locales_parent_id_idx";
  DROP INDEX IF EXISTS "forms_blocks_checkbox_locales_parent_id_idx";
  DROP INDEX IF EXISTS "forms_blocks_country_locales_parent_id_idx";
  DROP INDEX IF EXISTS "forms_blocks_email_locales_parent_id_idx";
  DROP INDEX IF EXISTS "forms_blocks_message_locales_parent_id_idx";
  DROP INDEX IF EXISTS "forms_blocks_number_locales_parent_id_idx";
  DROP INDEX IF EXISTS "forms_blocks_select_options_locales_parent_id_idx";
  DROP INDEX IF EXISTS "forms_blocks_select_locales_parent_id_idx";
  DROP INDEX IF EXISTS "forms_blocks_state_locales_parent_id_idx";
  DROP INDEX IF EXISTS "forms_blocks_text_locales_parent_id_idx";
  DROP INDEX IF EXISTS "forms_blocks_textarea_locales_parent_id_idx";
  DROP INDEX IF EXISTS "forms_emails_locales_parent_id_idx";
  DROP INDEX IF EXISTS "forms_locales_parent_id_idx";
  DROP INDEX IF EXISTS "search_locales_parent_id_idx";
  ALTER TABLE "users" DROP COLUMN IF EXISTS "reset_password_requested_at";`)
}
