import { IsString } from 'class-validator';

export class AuthCredentialDto {
  @IsString()
  readonly password: string;
}
