import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePostDto } from './create-post.dto';

// PartialType을 사용하면 CreatePostDto의 모든 속성을 선택적으로 만들 수 있습니다.
export class UpdatePostDto extends PartialType(CreatePostDto) {
    @ApiProperty({
        description: '수정할 게시물의 제목',
        example: '수정된 NestJS 게시물 제목입니다.',
        required: false, // PartialType이므로 필수는 아닙니다.
    })
    title?: string;

    @ApiProperty({
        description: '수정할 게시물의 내용',
        example: '이 내용은 Swagger 문서화를 통해 수정되었습니다.',
        required: false,
    })
    content?: string;
}