import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { DatabaseService } from '../../database/database';

@Module({
  controllers: [AdminController],
  providers: [AdminService, DatabaseService],
})
export class AdminModule { }
