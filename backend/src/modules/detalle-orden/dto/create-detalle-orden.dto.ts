import { IsInt, IsNumber, IsPositive } from 'class-validator';

export class CreateDetalleOrdenDto {
  @IsInt()
  ordenCompraId: number;

  @IsInt()
  insumoId: number;

  @IsNumber()
  @IsPositive()
  cantidad: number;

  @IsNumber()
  @IsPositive()
  precioUnitario: number;
}