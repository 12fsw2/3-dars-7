import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsArray, IsInt, IsString } from "class-validator";

export class CreateArticleDto {
  @IsString()
  @ApiProperty({default: "HTML"})
  title!: string;

  @IsString()
  @ApiProperty({default: "HTML is Cool"})
  content!: string;

  @Transform(({value}) => {
    return typeof value === "string" 
    ? value.split(",").map((item) => Number(item)) 
    : value
})
  @IsArray()
  @IsInt({each: true})
  @ApiProperty({default: [1, 2, 3]})
  tags!: number[]
}