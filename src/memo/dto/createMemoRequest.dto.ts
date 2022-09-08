import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateMemoRequestDto {
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

  @ApiProperty({
    type: String,
    description: '비밀번호',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;
}
