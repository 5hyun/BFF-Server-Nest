// src/auth/auth.module.ts

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HttpModule } from '@nestjs/axios';
import { AuthGuard } from './auth.guard';

@Module({
    imports: [HttpModule],
    controllers: [AuthController],
    providers: [AuthService, AuthGuard],
    exports: [
        AuthService,
        AuthGuard // 다른 모듈에서 AuthGuard를 사용할 수 있도록 export
    ]
})
/**
 * @description 다른 모듈(AppModule)에서 AuthModule을 가져다 쓸 수 있도록 export 키워드를 추가합니다.
 */
export class AuthModule {}