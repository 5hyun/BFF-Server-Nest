// src/auth/dto/signup.dto.ts

import { IsDateString, IsEmail, IsNotEmpty, IsString, Length, MaxLength } from 'class-validator';

export class SignUpDto {
    @IsEmail({}, { message: '이메일 형식이 올바르지 않습니다.' })
    @IsNotEmpty({ message: '이메일은 필수 입력 값입니다.' })
    email: string;

    @IsString()
    @Length(8, 30, { message: '비밀번호는 8자 이상 30자 이하이어야 합니다.' })
    @IsNotEmpty({ message: '비밀번호는 필수 입력 값입니다.' })
    password: string;

    @IsString()
    @MaxLength(10, { message: '이름은 10자를 넘을 수 없습니다.'})
    @IsNotEmpty({ message: '이름은 필수 입력 값입니다.' })
    name: string;

    @IsString()
    @MaxLength(10, { message: '닉네임은 10자를 넘을 수 없습니다.'})
    @IsNotEmpty({ message: '닉네임은 필수 입력 값입니다.' })
    nickName: string;

    @IsDateString()
    @IsNotEmpty({ message: '생년월일은 필수 입력 값입니다.' })
    birth: Date;
}