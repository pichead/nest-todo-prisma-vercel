import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './v1/user/user.module';
import { AuthModule } from './v1/auth/auth.module';
import { TaskModule } from './v1/task/task.module';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './v1/admin/admin.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
  }), UserModule, AuthModule, TaskModule, AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
