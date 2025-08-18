import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignUpDto {
    @ApiProperty({
        description: '가입할 사용자 이메일',
        example: 'newuser@example.com',
        required: true,
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: '가입할 사용자 비밀번호 (8자 이상)',
        example: 'newpassword123',
        required: true,
        minLength: 8,
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;

    @ApiProperty({
        description: '사용자 이름',
        example: '홍길동',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    username: string;
}