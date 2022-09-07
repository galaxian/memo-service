import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class MemoResponseDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  readonly content: string;
}
