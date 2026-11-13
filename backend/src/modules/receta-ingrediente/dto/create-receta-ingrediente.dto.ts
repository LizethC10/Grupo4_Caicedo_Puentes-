import { IsInt, IsNumber, IsPositive } from 'class-validator';

export class CreateRecetaIngredienteDto {
  @IsInt()
  recetaId: number;

  @IsInt()
  insumoId: number;

  @IsNumber({ maxDecimalPlaces: 3 })
  @IsPositive()
  cantidadRequerida: number;
}
