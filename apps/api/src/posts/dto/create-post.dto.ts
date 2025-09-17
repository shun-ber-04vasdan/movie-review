import {
  ArrayMaxSize,
  IsArray,
  IsNumber,
  IsOptional,
  isString,
  IsString,
  IsUrl,
  Max,
  Min,
} from 'class-validator';

export class CreatePostDto {
  @IsString()
  movieTitle!: string;

  @IsUrl() @IsOptional()
  thumbnailUrl?: string;

  @IsNumber()
  @Min(0)
  @Max(5)
  score!: number;

  @IsOptional()
  @IsString()
  comment?: string;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(20)
  @IsString({ each: true })
  starring?: string[];

  @IsString()
  author!: string;
}
