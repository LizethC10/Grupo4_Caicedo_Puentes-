import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateProveedoreDto } from '../dto/create-proveedore.dto';
import { UpdateProveedoreDto } from '../dto/update-proveedore.dto';

@Injectable()
export class ProveedoreRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.proveedor.findMany({ orderBy: { id: 'desc' } });
  }

  findById(id: number) {
    return this.prisma.proveedor.findUnique({ where: { id } });
  }

  findByNit(nit: string) {
    return this.prisma.proveedor.findUnique({ where: { nit } });
  }

  create(dto: CreateProveedoreDto) {
    return this.prisma.proveedor.create({
      data: {
        ...dto,
        telefono: dto.telefono ?? null,
        email: dto.email ?? null,
      },
    });
  }

  update(id: number, dto: UpdateProveedoreDto) {
    return this.prisma.proveedor.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: number) {
    return this.prisma.proveedor.delete({ where: { id } });
  }
}