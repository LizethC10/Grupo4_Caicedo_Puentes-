import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { MovimientosInventarioRepository } from '../repository/movimientos-inventario.repository';
import { CreateMovimientosInventarioDto } from '../dto/create-movimientos-inventario.dto';
import { UpdateMovimientosInventarioDto } from '../dto/update-movimientos-inventario.dto';

@Injectable()
export class MovimientosInventarioService {
  constructor(
    private readonly repository: MovimientosInventarioRepository,
    private readonly prisma: PrismaService,
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
    // Validar que el insumo existe
    const insumo = await this.prisma.insumo.findUnique({
      where: { id: dto.insumoId },
    });

    if (!insumo) {
      throw new NotFoundException('El insumo no existe');
    }

    // Si es SALIDA, validar que hay stock suficiente
    if (dto.tipo === 'SALIDA' && insumo.stockActual < dto.cantidad) {
      throw new BadRequestException(
        `Stock insuficiente. Stock actual: ${insumo.stockActual} ${insumo.unidadMedida}`,
      );
    }

    // Usar transacción para atomicidad
    return this.prisma.$transaction(async (tx) => {
      // 1. Crear el movimiento
      const movimiento = await tx.movimientoInventario.create({
        data: dto,
      });

      // 2. Actualizar el stock del insumo
      const nuevoStock =
        dto.tipo === 'ENTRADA'
          ? insumo.stockActual + dto.cantidad
          : insumo.stockActual - dto.cantidad;

      await tx.insumo.update({
        where: { id: dto.insumoId },
        data: { stockActual: nuevoStock },
      });

      return movimiento;
    });
  }

  async update(id: number, dto: UpdateMovimientosInventarioDto) {
    await this.findOne(id);
    return this.repository.update(id, dto);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.repository.remove(id);
  }
}