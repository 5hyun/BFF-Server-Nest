// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // ConfigModule 임포트

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // ConfigService를 전역에서 사용 가능하게 함
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}