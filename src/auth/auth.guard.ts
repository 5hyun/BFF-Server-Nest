// src/auth/auth.guard.ts

import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly authService: AuthService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        // ExecutionContext에서 HTTP 요청 객체를 가져옴
        const request = context.switchToHttp().getRequest();

        // 요청 헤더에서 'authorization' 값을 추출
        const { authorization } = request.headers;

        // Authorization 헤더가 없으면 401 Unauthorized 에러 발생
        if (!authorization) {
            throw new UnauthorizedException('인증 토큰이 필요합니다.');
        }

        // AuthService를 사용해 토큰 유효성 검증
        const isValid = await this.authService.validateToken(authorization);

        // 토큰이 유효하지 않으면 401 Unauthorized 에러 발생
        if (!isValid) {
            throw new UnauthorizedException('유효하지 않은 토큰입니다.');
        }

        // 토큰이 유효하면 요청을 계속 진행
        return true;
    }
}