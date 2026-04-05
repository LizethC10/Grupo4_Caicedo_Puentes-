import { IsOptional, IsString, Length } from 'class-validator';

export class CreateCategoriaDto {
  @IsString()
  @Length(2, 100)
  nombre: string;

  @IsOptional()
  @IsString()
  @Length(0, 255)
  descripcion?: string;
}