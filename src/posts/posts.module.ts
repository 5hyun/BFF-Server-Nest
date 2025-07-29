import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { AuthModule } from '../auth/auth.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
      AuthModule,
      HttpModule
  ],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
