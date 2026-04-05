import { IsEmail, IsInt, IsOptional, IsString, Length, Min } from 'class-validator';

export class CreateProveedorDto {
  @IsString()
  @Length(2, 150)
  razonSocial: string;

  @IsString()
  nit: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsInt()
  @Min(0)
  tiempoEntregaDias: number;
}