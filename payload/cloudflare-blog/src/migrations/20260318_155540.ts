import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
    // Migration code
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
    // Migration code
}
