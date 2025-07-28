// src/blog/blog.service.ts

import { Injectable } from '@nestjs/common';

@Injectable()
export class BlogService {
    // 테스트용 블로그 포스트 데이터
    private readonly posts = [
        { id: 1, title: 'NestJS는 정말 멋져요', content: 'MSA 구축도 간단하네요.' },
        { id: 2, title: 'BFF 패턴이란?', content: 'Backend for Frontend 패턴에 대해 알아봅시다.' },
    ];

    /**
     * 모든 포스트를 반환하는 메서드
     */
    getPosts() {
        return this.posts;
    }
}