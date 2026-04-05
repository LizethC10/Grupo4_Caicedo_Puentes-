import { PartialType } from '@nestjs/mapped-types';
import { CreateMovimientosInventarioDto } from './create-movimientos-inventario.dto';

export class UpdateMovimientosInventarioDto extends PartialType(CreateMovimientosInventarioDto) {}