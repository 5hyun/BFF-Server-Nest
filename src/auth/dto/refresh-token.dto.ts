import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto {
    @ApiProperty({
        description: '토큰 갱신에 사용할 리프레시 토큰',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    refreshToken: string;
}