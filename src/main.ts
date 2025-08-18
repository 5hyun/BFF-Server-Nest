/** src/main.ts */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    /**
     * Swagger 설정
     * DocumentBuilder를 사용하여 Swagger 문서의 기본 구조(제목, 설명, 버전 등)를 설정합니다.
     * addBearerAuth를 통해 JWT 인증을 Swagger UI에서 사용할 수 있도록 설정합니다.
     */
    const config = new DocumentBuilder()
        .setTitle('BFF-SERVER API')
        .setDescription('BFF 서버를 위한 API 명세서입니다.')
        .setVersion('1.0')
        .addBearerAuth(
            {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                name: 'JWT',
                description: 'Enter JWT token',
                in: 'header',
            },
            'access-token', // 이 이름은 컨트롤러의 @ApiBearerAuth() 데코레이터와 일치해야 합니다.
        )
        .build();

    /**
     * Swagger 문서 생성
     * SwaggerModule.createDocument()를 사용하여 NestJS 앱과 Swagger 설정을 기반으로 API 문서를 생성합니다.
     */
    const document = SwaggerModule.createDocument(app, config);

    /**
     * Swagger UI 설정
     * SwaggerModule.setup()을 통해 '/api-docs' 경로에 Swagger UI를 호스팅합니다.
     * 이제 서버 실행 후 http://localhost:3000/api-docs 로 접속하여 API 문서를 확인할 수 있습니다.
     */
    SwaggerModule.setup('api-docs', app, document);

    /**
     * 전역 유효성 검사 파이프 (Global ValidationPipe) 설정
     * app.useGlobalPipes()에 ValidationPipe를 등록하여 모든 수신 요청의 DTO를 자동으로 검증합니다.
     */
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true, // DTO에 정의되지 않은 속성은 자동으로 제거됩니다.
            forbidNonWhitelisted: true, // DTO에 정의되지 않은 속성이 요청에 포함되면 에러를 발생시킵니다.
            transform: true, // 수신 데이터를 DTO 클래스의 인스턴스로 자동 변환합니다. (e.g., string -> number)
        }),
    );

    /**
     * 애플리케이션 리스닝 포트 설정
     * 환경 변수(process.env.PORT)가 있으면 해당 포트를 사용하고, 없으면 3000번 포트를 기본으로 사용합니다.
     */
    await app.listen(process.env.PORT ?? 3000);
}

bootstrap();