import { IsInt, IsNumber, IsPositive, IsString, Length, Min } from 'class-validator';

export class CreateInsumoDto {
  @IsString()
  @Length(2, 100)
  nombre: string;

  @IsString()
  unidadMedida: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  precioActual: number;

  @IsNumber({ maxDecimalPlaces: 3 })
  @Min(0)
  stockMinimo: number;

  @IsInt()
  categoriaId: number;
}
