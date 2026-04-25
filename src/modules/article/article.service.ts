import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArticleService {
    constructor(@InjectRepository(Article) private articleRepo: Repository<Article>) { }
    async create(createArticleDto: CreateArticleDto, file: Express.Multer.File) {
        const article = await this.articleRepo.create(createArticleDto)

        article.backgroundImage = `http://localhost:4001/uploads/${file.filename}`
        return await this.articleRepo.save(article)
    }

    async findAll(): Promise<Article[]> {
        return await this.articleRepo.find()
    }

    async findOne(id: number): Promise<Article> {
        const foundedArticle = await this.articleRepo.findOne({ where: { id } })

        if (!foundedArticle) throw new NotFoundException("Artivle not found")

        return foundedArticle
    }

    async update(id: number, updateArticleDto: UpdateArticleDto): Promise<{ message: "Updated" }> {
        const foundedArticle = await this.articleRepo.findOne({ where: { id } })

        if (!foundedArticle) throw new NotFoundException("Artivle not found")

        await this.articleRepo.update(foundedArticle.id, updateArticleDto)
        return { message: "Updated" }
    }

    async remove(id: number): Promise<{ message: string }> {
        const foundedArticle = await this.articleRepo.findOne({ where: { id } })

        if (!foundedArticle) throw new NotFoundException("Artivle not found")

        await this.articleRepo.delete({ id })

        return { message: "Deleted" }
    }
}
