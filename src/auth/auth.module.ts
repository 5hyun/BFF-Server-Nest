// src/auth/auth.module.ts

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HttpModule } from '@nestjs/axios';
// import { AuthModule } from './auth/auth.module'; // 자기 자신을 import하는 이 줄을 반드시 삭제하세요.

@Module({
    imports: [HttpModule],
    controllers: [AuthController],
    providers: [AuthService],
})
/**
 * @description 다른 모듈(AppModule)에서 AuthModule을 가져다 쓸 수 있도록 export 키워드를 추가합니다.
 */
export class AuthModule {}