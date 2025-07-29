// src/posts/posts.controller.ts

import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    ParseIntPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service'; // 🔄 PostsService를 import
import { AuthGuard } from '../auth/auth.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
@UseGuards(AuthGuard)
export class PostsController { // 🔄 클래스명 변경: BlogController -> PostsController
    constructor(private readonly postsService: PostsService) {} // 🔄 서비스 주입 변경

    /**
     * 새로운 블로그 게시물을 생성합니다.
     * @param createPostDto - 게시물 생성에 필요한 데이터 (제목, 내용, 작성자 ID)
     */
    @Post()
    create(@Body() createPostDto: CreatePostDto) {
        return this.postsService.create(createPostDto); // 🔄 호출할 서비스 변경
    }

    /**
     * 모든 블로그 게시물 목록을 조회합니다.
     */
    @Get()
    findAll() {
        return this.postsService.findAll(); // 🔄 호출할 서비스 변경
    }

    /**
     * ID로 특정 게시물을 상세 조회합니다.
     * @param id - 조회할 게시물의 ID
     */
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.postsService.findOne(id); // 🔄 호출할 서비스 변경
    }

    /**
     * ID로 특정 게시물을 수정합니다.
     * @param id - 수정할 게시물의 ID
     * @param updatePostDto - 수정할 내용
     */
    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updatePostDto: UpdatePostDto,
    ) {
        return this.postsService.update(id, updatePostDto); // 🔄 호출할 서비스 변경
    }

    /**
     * ID로 특정 게시물을 삭제합니다.
     * @param id - 삭제할 게시물의 ID
     */
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.postsService.remove(id); // 🔄 호출할 서비스 변경
    }
}