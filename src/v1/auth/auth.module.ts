import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { DatabaseService } from 'src/database/database';
import { AdminService } from '../admin/admin.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, DatabaseService, UserService, AdminService],
})
export class AuthModule { }
