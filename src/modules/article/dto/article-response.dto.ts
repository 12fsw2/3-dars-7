import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class ArticleResponseDto {
  @IsNumber()
  @ApiProperty({default: 1})
  id!: number;

  @IsString()
  @ApiProperty({default: "HTML"})
  title!: string;

  @IsString()
  @ApiProperty({default: "HTML is Cool"})
  content!: string;
}
