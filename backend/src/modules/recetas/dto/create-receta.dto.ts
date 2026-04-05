import { IsInt, IsOptional, IsString, Length, Min } from 'class-validator';

export class CreateRecetaDto {
  @IsString()
  @Length(2, 100)
  nombre: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsInt()
  @Min(1)
  porciones: number;
}