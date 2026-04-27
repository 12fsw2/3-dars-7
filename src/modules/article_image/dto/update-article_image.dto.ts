import { PartialType } from '@nestjs/mapped-types';
import { CreateArticleImageDto } from './create-article_image.dto';

export class UpdateArticleImageDto extends PartialType(CreateArticleImageDto) {}
