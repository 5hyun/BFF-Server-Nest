// src/auth/auth.controller.ts

import { Controller, Post, Body, Req, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { Request } from 'express';
import { TokenInfo } from './dto/token-info.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
// --- Swagger 데코레이터 import ---
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

// API 그룹을 'Auth'로 태깅합니다.
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    // --- Swagger 데코레이터 추가 ---
    @ApiOperation({
        summary: '사용자 로그인',
        description: '이메일과 비밀번호를 사용하여 로그인하고 JWT 토큰을 발급받습니다.',
    })
    @ApiResponse({ status: 201, description: '로그인 성공', type: TokenInfo })
    @ApiResponse({ status: 401, description: '인증 실패 (이메일 또는 비밀번호 오류)' })
    // -----------------------------
    login(@Body() loginDto: LoginDto): Promise<TokenInfo> {
        return this.authService.login(loginDto);
    }

    @Post('signup')
    // --- Swagger 데코레이터 추가 ---
    @ApiOperation({
        summary: '회원가입',
        description: '새로운 사용자를 시스템에 등록합니다.',
    })
    @ApiResponse({ status: 201, description: '회원가입 성공' })
    @ApiResponse({ status: 409, description: '이미 존재하는 이메일 (Conflict)' })
    // -----------------------------
    signup(@Body() signUpDto: SignUpDto): Promise<string> {
        return this.authService.signup(signUpDto);
    }

    @Post('logout')
    // --- Swagger 데코레이터 추가 ---
    @ApiOperation({
        summary: '로그아웃',
        description: '서버에 저장된 리프레시 토큰을 무효화하여 사용자를 로그아웃 처리합니다.',
    })
    @ApiBearerAuth('access-token') // 'access-token' 이름의 BearerAuth 필요 명시
    @ApiResponse({ status: 201, description: '로그아웃 성공' })
    @ApiResponse({ status: 401, description: '인증 헤더가 없거나 토큰이 유효하지 않음' })
    // -----------------------------
    logout(@Req() request: Request): Promise<string> {
        const accessToken = request.headers.authorization;

        if (!accessToken) {
            throw new UnauthorizedException('Authorization 헤더가 필요합니다.');
        }

        return this.authService.logout(accessToken);
    }

    @Post('refresh')
    // --- Swagger 데코레이터 추가 ---
    @ApiOperation({
        summary: '액세스 토큰 갱신',
        description: '유효한 리프레시 토큰을 사용하여 새로운 액세스/리프레시 토큰 쌍을 발급받습니다.',
    })
    @ApiResponse({ status: 201, description: '토큰 갱신 성공', type: TokenInfo })
    @ApiResponse({ status: 401, description: '리프레시 토큰이 유효하지 않음' })
    // -----------------------------
    refresh(@Body() refreshTokenDto: RefreshTokenDto): Promise<TokenInfo> {
        return this.authService.refresh(refreshTokenDto);
    }
}