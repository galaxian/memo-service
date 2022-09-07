import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AuthCredentialDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;
}
