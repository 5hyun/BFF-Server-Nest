// src/auth/auth.service.ts

import { Injectable, HttpException, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { TokenInfo } from './dto/token-info.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto'; // RefreshTokenDto import

@Injectable()
export class AuthService {
    private readonly authApiUrl: string;

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {
        const apiUrl = this.configService.get<string>('AUTH_API_URL');
        if (!apiUrl) {
            throw new Error('AUTH_API_URL 환경변수가 설정되지 않았습니다.');
        }
        this.authApiUrl = apiUrl;
    }

    // login, signup, logout 메서드는 동일

    async login(loginDto: LoginDto): Promise<TokenInfo> {
        try {
            const response = await firstValueFrom(
                this.httpService.post<TokenInfo>(`${this.authApiUrl}/users/login`, loginDto),
            );
            return response.data;
        } catch (error) {
            this.handleApiError(error);
        }
    }

    async signup(signUpDto: SignUpDto): Promise<string> {
        try {
            const response = await firstValueFrom(
                this.httpService.post<string>(`${this.authApiUrl}/users/signup`, signUpDto),
            );
            return response.data;
        } catch (error) {
            this.handleApiError(error);
        }
    }

    async logout(accessToken: string): Promise<string> {
        try {
            const response = await firstValueFrom(
                this.httpService.post<string>(
                    `${this.authApiUrl}/users/logout`,
                    {},
                    { headers: { Authorization: accessToken } },
                ),
            );
            return response.data;
        } catch (error) {
            this.handleApiError(error);
        }
    }

    /**
     * @description 토큰 갱신을 위해 Spring Boot 서버와 통신하는 로직 추가
     */
    async refresh(refreshTokenDto: RefreshTokenDto): Promise<TokenInfo> {
        try {
            /**
             * Spring Boot의 refresh API는 TokenInfo 객체를 받으므로
             * BFF에서도 유사한 객체(RefreshTokenDto)를 body로 전달합니다.
             */
            const response = await firstValueFrom(
                this.httpService.post<TokenInfo>(`${this.authApiUrl}/users/refresh`, refreshTokenDto),
            );
            return response.data;
        } catch (error) {
            this.handleApiError(error);
        }
    }

    /**
     * @description Access Token의 유효성을 인증 서버에 확인합니다.
     * @param accessToken 'Bearer '를 포함한 전체 Authorization 헤더 값
     * @returns 유효하면 true, 아니면 false를 반환합니다.
     */
    async validateToken(accessToken: string): Promise<boolean> {
        try {
            await firstValueFrom(
                this.httpService.get(`${this.authApiUrl}/users/validate`, {
                    headers: { Authorization: accessToken },
                }),
            );
            // 요청이 성공하면 (2xx 응답) 토큰이 유효한 것으로 간주
            return true;
        } catch (error) {
            // 인증 서버에서 401, 403 등의 에러를 반환하면 토큰이 유효하지 않은 것
            console.error('Token validation failed:', error.response?.data || error.message);
            return false;
        }
    }

    private handleApiError(error: any): never {
        if (error instanceof AxiosError && error.response) {
            throw new HttpException(error.response.data, error.response.status);
        }
        throw new InternalServerErrorException('BFF 서버 오류가 발생했습니다.');
    }
}