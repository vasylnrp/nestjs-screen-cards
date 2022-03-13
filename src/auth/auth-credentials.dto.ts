import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(8)
  username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(12)
  @Matches(
    /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/,
    { message: 'Password is too weak' },
  )
  password: string;
}
