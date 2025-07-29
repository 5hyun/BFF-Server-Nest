// src/app.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    // 다른 서비스와 HTTP 통신을 위해 HttpModule을 import 합니다.
    HttpModule.register({
      timeout: 5000, // 요청 타임아웃을 5초로 설정합니다.
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    PostsModule,
  ]
})
export class AppModule {}