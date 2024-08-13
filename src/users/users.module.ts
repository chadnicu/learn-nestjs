import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { DatabaseModule } from 'src/db/db.module';

@Module({
  imports: [DatabaseModule],
  providers: [UsersService],
})
export class UsersModule {}
