import { IsDateString, IsEnum, IsInt, IsNumber, IsPositive, IsString } from 'class-validator';

export enum TipoMovimientoDto {
  ENTRADA = 'ENTRADA',
  SALIDA = 'SALIDA',
}

export class CreateMovimientosInventarioDto {
  @IsInt()
  insumoId: number;

  @IsEnum(TipoMovimientoDto)
  tipo: TipoMovimientoDto;

  @IsNumber()
  @IsPositive()
  cantidad: number;

  @IsDateString()
  fecha: string;

  @IsString()
  motivo: string;
}