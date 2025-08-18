import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
    @ApiProperty({
        description: '게시물의 제목',
        example: '새로운 NestJS 게시물입니다.',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({
        description: '게시물의 내용',
        example: '이 내용은 NestJS와 Swagger에 대한 것입니다.',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    content: string;

    @ApiProperty({
        description: '게시물 작성자의 고유 ID',
        example: 1,
        required: true,
    })
    @IsNotEmpty()
    authorId: number;
}