// src/blog/blog.controller.ts

import { Controller, Get, UseGuards } from '@nestjs/common';
import { BlogService } from './blog.service';
import { AuthGuard } from '../auth/auth.guard'; // AuthGuard를 import 합니다.

@Controller('blog')
@UseGuards(AuthGuard) // 🛡️ 이 컨트롤러의 모든 API에 AuthGuard를 적용합니다.
export class BlogController {
    constructor(private readonly blogService: BlogService) {}

    @Get()
    getBlogPosts() {
        // 이 핸들러는 AuthGuard가 토큰을 성공적으로 검증한 후에만 실행됩니다.
        console.log('✅ AuthGuard 통과! 블로그 게시글을 반환합니다.');
        return this.blogService.getPosts();
    }
}