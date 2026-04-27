import { Module } from '@nestjs/common';
import { ArticleImageService } from './article_image.service';
import { ArticleImageController } from './article_image.controller';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleImage } from './entities/article_image.entity';
import { Article } from '../article/entities/article.entity';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([ArticleImage, Article])],
  controllers: [ArticleImageController],
  providers: [ArticleImageService],
})
export class ArticleImageModule {}
