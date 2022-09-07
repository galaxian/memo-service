import { IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class MemoResponseDto {
  @IsNotEmpty()
  @IsInt()
  readonly memoId: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  readonly content: string;
}
