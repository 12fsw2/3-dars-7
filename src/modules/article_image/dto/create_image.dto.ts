import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";
import { CreateArticleImageDto } from "./create-article_image.dto";

export class CreateImageDto extends CreateArticleImageDto {
    @IsArray()
    @ApiProperty({
        type: "array",
        items: {
            type: "string",
            format: "binary",
        },
    })
    files!: any;
}