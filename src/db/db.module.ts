import { Global, Module } from '@nestjs/common';

import { drizzle, LibSQLDatabase } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from './schema';
import { ConfigService } from '@nestjs/config';

export type Database = LibSQLDatabase<Record<string, never>>;
export const DrizzleAsyncProvider = 'drizzleProvider';

const drizzleProvider = {
  provide: DrizzleAsyncProvider,
  useFactory: async (configService: ConfigService) => {
    const client = createClient({
      url: configService.get<string>('DATABASE_URL'),
      authToken: configService.get<string>('DATABASE_AUTH_TOKEN'),
    });
    const db = drizzle(client, { schema });
    return db;
  },
  inject: [ConfigService],
  exports: [DrizzleAsyncProvider],
};

@Global()
@Module({
  providers: [drizzleProvider],
  exports: [drizzleProvider],
})
export class DatabaseModule {}
