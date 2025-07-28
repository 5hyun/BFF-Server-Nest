// src/blog/blog.module.ts

import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { AuthModule } from '../auth/auth.module'; // AuthModule을 import 합니다.

@Module({
  imports: [
    AuthModule, // AuthGuard를 사용하기 위해 AuthModule을 추가
  ],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}