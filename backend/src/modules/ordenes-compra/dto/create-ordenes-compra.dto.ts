import { IsDateString, IsEnum, IsInt, IsNumber, IsPositive } from 'class-validator';

export enum EstadoOrdenCompraDto {
  PENDIENTE = 'PENDIENTE',
  RECIBIDA = 'RECIBIDA',
  CANCELADA = 'CANCELADA',
}

export class CreateOrdenesCompraDto {
  @IsInt()
  proveedorId: number;

  @IsDateString()
  fechaEmision: string;

  @IsEnum(EstadoOrdenCompraDto)
  estado: EstadoOrdenCompraDto;

  @IsNumber()
  @IsPositive()
  total: number;
}