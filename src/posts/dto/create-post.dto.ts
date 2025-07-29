// src/blog/dto/create-post.dto.ts

import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

// 게시물 생성을 위한 DTO
export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsNumber()
    @IsNotEmpty()
    authorId: number;
}