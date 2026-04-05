import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateOrdenesCompraDto } from '../dto/create-ordenes-compra.dto';
import { UpdateOrdenesCompraDto } from '../dto/update-ordenes-compra.dto';

@Injectable()
export class OrdenesCompraRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.ordenCompra.findMany({
      include: { proveedor: true, detalles: true },
      orderBy: { id: 'desc' },
    });
  }

  findById(id: number) {
    return this.prisma.ordenCompra.findUnique({
      where: { id },
      include: { proveedor: true, detalles: true },
    });
  }

  create(dto: CreateOrdenesCompraDto) {
    return this.prisma.ordenCompra.create({
      data: {
        proveedorId: dto.proveedorId,
        fechaEmision: new Date(dto.fechaEmision),
        estado: dto.estado,
        total: dto.total,
      },
    });
  }

  update(id: number, dto: UpdateOrdenesCompraDto) {
    return this.prisma.ordenCompra.update({
      where: { id },
      data: {
        ...(dto.proveedorId !== undefined && { proveedorId: dto.proveedorId }),
        ...(dto.fechaEmision !== undefined && { fechaEmision: new Date(dto.fechaEmision) }),
        ...(dto.estado !== undefined && { estado: dto.estado }),
        ...(dto.total !== undefined && { total: dto.total }),
      },
    });
  }

  remove(id: number) {
    return this.prisma.ordenCompra.delete({ where: { id } });
  }
}