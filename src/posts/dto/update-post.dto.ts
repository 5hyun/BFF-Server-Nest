// src/blog/dto/update-post.dto.ts

import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';

// 게시물 수정을 위한 DTO
// PartialType을 사용하여 CreatePostDto의 모든 필드를 선택적으로 만듭니다.
export class UpdatePostDto extends PartialType(CreatePostDto) {}