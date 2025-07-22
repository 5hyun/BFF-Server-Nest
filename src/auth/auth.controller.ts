// src/auth/auth.controller.ts

import { Controller, Post, Body, Req, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { Request } from 'express';
import { TokenInfo } from './dto/token-info.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto'; // RefreshTokenDto import

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    login(@Body() loginDto: LoginDto): Promise<TokenInfo> {
        return this.authService.login(loginDto);
    }

    @Post('signup')
    signup(@Body() signUpDto: SignUpDto): Promise<string> {
        return this.authService.signup(signUpDto);
    }

    @Post('logout')
    logout(@Req() request: Request): Promise<string> {
        const accessToken = request.headers.authorization;

        if (!accessToken) {
            throw new UnauthorizedException('Authorization 헤더가 필요합니다.');
        }

        return this.authService.logout(accessToken);
    }

    /**
     * @description 토큰 갱신을 위한 엔드포인트 추가
     */
    @Post('refresh')
    refresh(@Body() refreshTokenDto: RefreshTokenDto): Promise<TokenInfo> {
        return this.authService.refresh(refreshTokenDto);
    }
}