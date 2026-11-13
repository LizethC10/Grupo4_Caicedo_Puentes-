import { IsInt, IsNumber, IsPositive } from 'class-validator';

export class CreateDetalleOrdenDto {
  @IsInt()
  ordenCompraId: number;

  @IsInt()
  insumoId: number;

  @IsNumber({ maxDecimalPlaces: 3 })
  @IsPositive()
  cantidad: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  precioUnitario: number;
}
