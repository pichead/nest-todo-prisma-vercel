import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseService } from 'src/database/database';

@Module({
  controllers: [UserController],
  providers: [UserService, DatabaseService],
})
export class UserModule { }
