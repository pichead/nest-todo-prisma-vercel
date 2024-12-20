import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { DatabaseService } from '../../database/database';
import { UserService } from '../user/user.service';

@Module({
  controllers: [TaskController],
  providers: [TaskService, DatabaseService, UserService],
})
export class TaskModule { }
