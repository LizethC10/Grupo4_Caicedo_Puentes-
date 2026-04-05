import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateProveedorDto } from '../dto/create-proveedor.dto';
import { UpdateProveedorDto } from '../dto/update-proveedor.dto';

@Injectable()
export class ProveedorRepository {
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

  create(dto: CreateProveedorDto) {
    return this.prisma.proveedor.create({
      data: {
        ...dto,
        telefono: dto.telefono ?? null,
        email: dto.email ?? null,
      },
    });
  }

  update(id: number, dto: UpdateProveedorDto) {
    return this.prisma.proveedor.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: number) {
    return this.prisma.proveedor.delete({ where: { id } });
  }
}