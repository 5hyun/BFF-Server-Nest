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
import { PostsService } from './posts.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBearerAuth,
    ApiParam,
} from '@nestjs/swagger';

// --- Swagger 데코레이터 추가 ---
@ApiTags('Posts') // API 그룹을 'Posts'로 태깅합니다.
@ApiBearerAuth('access-token') // 컨트롤러 전체에 JWT 인증 필요를 명시합니다.
// -----------------------------
@Controller('posts')
@UseGuards(AuthGuard)
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Post()
    // --- Swagger 데코레이터 추가 ---
    @ApiOperation({
        summary: '새 게시물 생성',
        description: '새로운 블로그 게시물을 생성합니다.',
    })
    @ApiResponse({ status: 201, description: '게시물 생성 성공' })
    @ApiResponse({ status: 401, description: '인증 실패' })
    // -----------------------------
    create(@Body() createPostDto: CreatePostDto) {
        return this.postsService.create(createPostDto);
    }

    @Get()
    // --- Swagger 데코레이터 추가 ---
    @ApiOperation({
        summary: '모든 게시물 조회',
        description: '모든 블로그 게시물 목록을 조회합니다.',
    })
    @ApiResponse({ status: 200, description: '게시물 목록 조회 성공' })
    @ApiResponse({ status: 401, description: '인증 실패' })
    // -----------------------------
    findAll() {
        return this.postsService.findAll();
    }

    @Get(':id')
    // --- Swagger 데코레이터 추가 ---
    @ApiOperation({
        summary: '특정 게시물 조회',
        description: 'ID로 특정 게시물을 상세 조회합니다.',
    })
    @ApiParam({ name: 'id', required: true, description: '조회할 게시물의 ID' })
    @ApiResponse({ status: 200, description: '게시물 조회 성공' })
    @ApiResponse({ status: 401, description: '인증 실패' })
    @ApiResponse({ status: 404, description: '게시물을 찾을 수 없음' })
    // -----------------------------
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.postsService.findOne(id);
    }

    @Patch(':id')
    // --- Swagger 데코레이터 추가 ---
    @ApiOperation({
        summary: '특정 게시물 수정',
        description: 'ID로 특정 게시물을 수정합니다.',
    })
    @ApiParam({ name: 'id', required: true, description: '수정할 게시물의 ID' })
    @ApiResponse({ status: 200, description: '게시물 수정 성공' })
    @ApiResponse({ status: 401, description: '인증 실패' })
    @ApiResponse({ status: 404, description: '게시물을 찾을 수 없음' })
    // -----------------------------
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updatePostDto: UpdatePostDto,
    ) {
        return this.postsService.update(id, updatePostDto);
    }

    @Delete(':id')
    // --- Swagger 데코레이터 추가 ---
    @ApiOperation({
        summary: '특정 게시물 삭제',
        description: 'ID로 특정 게시물을 삭제합니다.',
    })
    @ApiParam({ name: 'id', required: true, description: '삭제할 게시물의 ID' })
    @ApiResponse({ status: 200, description: '게시물 삭제 성공' })
    @ApiResponse({ status: 401, description: '인증 실패' })
    @ApiResponse({ status: 404, description: '게시물을 찾을 수 없음' })
    // -----------------------------
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.postsService.remove(id);
    }
}