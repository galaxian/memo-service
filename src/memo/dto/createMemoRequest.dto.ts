import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateMemoRequestDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  readonly content: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;
}
