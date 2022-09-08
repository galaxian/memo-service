import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class MemoResponseDto {
  @ApiProperty({
    type: Number,
    description: 'id',
  })
  @IsNotEmpty()
  @IsInt()
  readonly memoId: number;

  @ApiProperty({
    type: String,
    description: '제목',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  readonly title: string;

  @ApiProperty({
    type: String,
    description: '내용',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  readonly content: string;
}
