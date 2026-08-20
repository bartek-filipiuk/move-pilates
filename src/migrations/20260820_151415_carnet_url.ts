import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_pricing_carnets" ADD COLUMN IF NOT EXISTS "url" varchar;
  ALTER TABLE "_pages_v_blocks_pricing_carnets" ADD COLUMN IF NOT EXISTS "url" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_pricing_carnets" DROP COLUMN IF EXISTS "url";
  ALTER TABLE "_pages_v_blocks_pricing_carnets" DROP COLUMN IF EXISTS "url";`)
}
