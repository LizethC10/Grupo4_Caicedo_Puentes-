import { IsEmail, IsString, MinLength, IsIn } from 'class-validator';

export class RegisterDto {
  @IsString()
  nombre: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsIn(['ADMINISTRADOR', 'CHEF', 'BODEGA'])
  rol: string;
}