import { IsInt, IsNumber, IsPositive, IsString, Length, Min } from 'class-validator';

export class CreateInsumoDto {
  @IsString()
  @Length(2, 100)
  nombre: string;

  @IsString()
  unidadMedida: string;

  @IsNumber()
  @IsPositive()
  precioActual: number;

  @IsInt()
  @Min(0)
  stockActual: number;

  @IsInt()
  @Min(0)
  stockMinimo: number;

  @IsInt()
  categoriaId: number;
}