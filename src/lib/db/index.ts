import { Kysely, type RawBuilder, sql, MysqlDialect } from 'kysely';
import { createPool } from 'mysql2'
import type { DB } from './schema';
import fs from 'node:fs';

if (!fs.existsSync("./prisma/")) {
	fs.mkdirSync("./prisma/");
}
export const db = new Kysely<DB>({
	dialect: new MysqlDialect({
		pool: createPool({
			database: 'if24_gabriel_joe',
			host: 'localhost',
			user: 'if24',
			password: 'if24pass',
			port: 3306,
			connectionLimit: 10,
		})
	}),
});

export function json<T>(obj: T): RawBuilder<T> {
	return sql`${JSON.stringify(obj)}`;
}
