import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TagService {
  constructor(@InjectRepository(Tag) private tagRepo: Repository<Tag>) { }
  async create(createTagDto: CreateTagDto, userId: any) {
    const foundedTag = await this.tagRepo.findOne({
       where: { name: createTagDto.name }, 
      })

    if (foundedTag) throw new BadRequestException("Tag name already exists")

    const tag = this.tagRepo.create({...createTagDto, createdBy: userId })
    return await this.tagRepo.save(tag)
  }

  async findAll() {
    return this.tagRepo.find()
  }

  async findOne(id: number) {
    const foundedTag = await this.tagRepo.findOne({ where: { id } })

    if (!foundedTag) throw new NotFoundException("Tag not found")
    return foundedTag
  }

  async update(id: number, updateTagDto: UpdateTagDto) {
    const foundedTag = await this.tagRepo.findOne({ where: { id } })

    if (!foundedTag) throw new NotFoundException("Tag not found")

    await this.tagRepo.update(foundedTag.id, updateTagDto)
    return { message: "Updated" }
  }

  async remove(id: number) {
    const foundedTag = await this.tagRepo.findOne({ where: { id } })

    if (!foundedTag) throw new NotFoundException("Tag not found")

    await this.tagRepo.delete(foundedTag.id)
    return { message: "Deleted" }
  }
}
