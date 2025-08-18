import { ApiProperty } from '@nestjs/swagger';

export class TokenInfo {
    @ApiProperty({
        description: '발급된 액세스 토큰 (JWT)',
    })
    accessToken: string;

    @ApiProperty({
        description: '발급된 리프레시 토큰 (JWT)',
    })
    refreshToken: string;
}