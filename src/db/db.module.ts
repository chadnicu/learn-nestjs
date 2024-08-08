import { Module } from '@nestjs/common';

import { config } from 'dotenv';
import { drizzle, LibSQLDatabase } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from './schema';

config({ path: '.env' });

export type Database = LibSQLDatabase<Record<string, never>>;
export const DrizzleAsyncProvider = 'drizzleProvider';

const drizzleProvider = {
  provide: DrizzleAsyncProvider,
  useFactory: async () => {
    const client = createClient({
      url: process.env.DATABASE_URL!,
      authToken: process.env.DATABASE_AUTH_TOKEN!,
    });
    const db = drizzle(client, { schema });
    return db;
  },
  exports: [DrizzleAsyncProvider],
};

@Module({
  providers: [drizzleProvider],
  exports: [drizzleProvider],
})
export class DatabaseModule {}
