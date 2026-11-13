import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { MovimientosInventarioRepository } from '../repository/movimientos-inventario.repository';
import { CreateMovimientosInventarioDto } from '../dto/create-movimientos-inventario.dto';
import { StockService } from '../../stock/stock.service';

@Injectable()
export class MovimientosInventarioService {
  constructor(
    private readonly repository: MovimientosInventarioRepository,
    private readonly prisma: PrismaService,
    private readonly stock: StockService,
  ) {}

  findAll() {
    return this.repository.findAll();
  }

  async findOne(id: number) {
    const movimiento = await this.repository.findById(id);
    if (!movimiento) throw new NotFoundException('Movimiento de inventario no encontrado');
    return movimiento;
  }

  async create(dto: CreateMovimientosInventarioDto) {
    return this.prisma.$transaction((tx) => this.stock.aplicarMovimiento(tx, {
      insumoId: dto.insumoId,
      tipo: dto.tipo,
      cantidad: dto.cantidad,
      motivo: dto.motivo,
      fecha: dto.fecha ? new Date(dto.fecha) : undefined,
    }));
  }
}
