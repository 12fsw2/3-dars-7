import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt } from "class-validator";

export class CreateArticleImageDto {
    @IsInt()
    @Type(() => Number)
    @ApiProperty({example: 1})
    articleId!: number;
}
