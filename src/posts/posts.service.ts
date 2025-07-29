// src/posts/posts.service.ts

import {
    Injectable,
    NotFoundException,
    InternalServerErrorException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom, catchError } from 'rxjs';
import { AxiosError } from 'axios';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

/**
 * OpenAPI Spec에 정의된 Post 스키마입니다.
 * 외부 모듈(Controller)에서 참조할 수 있도록 export 합니다.
 */
export interface Post {
    id: number;
    title: string;
    content: string;
    author: string;
    authorId: number;
    views: number;
    createdAt: Date;
    updatedAt: Date;
}

@Injectable()
export class PostsService {
    private readonly blogApiUrl: string;

    /**
     * HttpService: 외부 API 호출을 위해 주입합니다.
     * ConfigService: .env 파일의 환경 변수를 사용하기 위해 주입합니다.
     */
    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {
        // .env 파일에서 블로그 API의 기본 URL을 가져옵니다.
        // get() 메서드가 undefined를 반환할 수 있으므로, 변수에 할당 후 유효성 검사를 수행합니다.
        const apiUrl = this.configService.get<string>('BLOG_API_URL');
        if (!apiUrl) {
            throw new Error('BLOG_API_URL 환경 변수가 .env 파일에 설정되지 않았습니다.');
        }
        this.blogApiUrl = apiUrl;
    }

    /**
     * 외부 블로그 API에 POST 요청을 보내 새 게시물을 생성합니다.
     */
    async create(createPostDto: CreatePostDto): Promise<Post> {
        const endpoint = `${this.blogApiUrl}/posts`;
        const response$ = this.httpService.post<Post>(endpoint, createPostDto).pipe(
            catchError((error: AxiosError) => {
                console.error(`[API Error] POST ${endpoint}:`, error.response?.data);
                throw new InternalServerErrorException('게시물 생성 중 API 호출에 실패했습니다.');
            }),
        );
        const { data } = await firstValueFrom(response$);
        return data;
    }

    /**
     * 외부 블로그 API에 GET 요청을 보내 모든 게시물을 조회합니다.
     */
    async findAll(): Promise<Post[]> {
        const response$ = this.httpService.get<Post[]>(`${this.blogApiUrl}/posts`).pipe(
            catchError((error: AxiosError) => {
                console.error(`[API Error] GET ${this.blogApiUrl}/posts:`, error.response?.data);
                throw new InternalServerErrorException('게시물 목록 조회 중 API 호출에 실패했습니다.');
            }),
        );
        const { data } = await firstValueFrom(response$);
        return data;
    }

    /**
     * 외부 블로그 API에 GET 요청을 보내 특정 게시물을 조회합니다.
     */
    async findOne(id: number): Promise<Post> {
        const endpoint = `${this.blogApiUrl}/posts/${id}`;
        const response$ = this.httpService.get<Post>(endpoint).pipe(
            catchError((error: AxiosError) => {
                if (error.response?.status === 404) {
                    throw new NotFoundException(`ID가 ${id}인 게시물을 찾을 수 없습니다.`);
                }
                console.error(`[API Error] GET ${endpoint}:`, error.response?.data);
                throw new InternalServerErrorException('게시물 조회 중 API 호출에 실패했습니다.');
            }),
        );
        const { data } = await firstValueFrom(response$);
        return data;
    }

    /**
     * 외부 블로그 API에 PATCH 요청을 보내 특정 게시물을 수정합니다.
     */
    async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
        const endpoint = `${this.blogApiUrl}/posts/${id}`;
        const response$ = this.httpService.patch<Post>(endpoint, updatePostDto).pipe(
            catchError((error: AxiosError) => {
                if (error.response?.status === 404) {
                    throw new NotFoundException(`ID가 ${id}인 게시물을 찾을 수 없습니다.`);
                }
                console.error(`[API Error] PATCH ${endpoint}:`, error.response?.data);
                throw new InternalServerErrorException('게시물 수정 중 API 호출에 실패했습니다.');
            }),
        );
        const { data } = await firstValueFrom(response$);
        return data;
    }

    /**
     * 외부 블로그 API에 DELETE 요청을 보내 특정 게시물을 삭제합니다.
     * @returns 성공 메시지를 담은 객체
     */
    async remove(id: number): Promise<{ message: string }> {
        const endpoint = `${this.blogApiUrl}/posts/${id}`;
        const response$ = this.httpService.delete(endpoint).pipe(
            catchError((error: AxiosError) => {
                if (error.response?.status === 404) {
                    throw new NotFoundException(`ID가 ${id}인 게시물을 찾을 수 없습니다.`);
                }
                console.error(`[API Error] DELETE ${endpoint}:`, error.response?.data);
                throw new InternalServerErrorException('게시물 삭제 중 API 호출에 실패했습니다.');
            }),
        );

        // API 호출을 실행하고 응답을 기다립니다.
        await firstValueFrom(response$);

        // API 호출이 성공적으로 완료되면, 고정된 성공 메시지를 반환합니다.
        // 이렇게 하면 외부 API의 응답 본문 내용과 무관하게 일관된 응답을 보낼 수 있습니다.
        return { message: `ID가 ${id}인 게시물이 성공적으로 삭제되었습니다.` };
    }
}
