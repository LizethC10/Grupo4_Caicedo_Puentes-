import { PrismaService } from '../../../prisma/prisma.service';
import { CreateProveedorDto } from '../dto/create-proveedor.dto';
import { UpdateProveedorDto } from '../dto/update-proveedor.dto';
export declare class ProveedorRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        razonSocial: string;
        nit: string;
        telefono: string | null;
        email: string | null;
        tiempoEntregaDias: number;
    }[]>;
    findById(id: number): import(".prisma/client").Prisma.Prisma__ProveedorClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        razonSocial: string;
        nit: string;
        telefono: string | null;
        email: string | null;
        tiempoEntregaDias: number;
    }, null, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findByNit(nit: string): import(".prisma/client").Prisma.Prisma__ProveedorClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        razonSocial: string;
        nit: string;
        telefono: string | null;
        email: string | null;
        tiempoEntregaDias: number;
    }, null, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    create(dto: CreateProveedorDto): import(".prisma/client").Prisma.Prisma__ProveedorClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        razonSocial: string;
        nit: string;
        telefono: string | null;
        email: string | null;
        tiempoEntregaDias: number;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, dto: UpdateProveedorDto): import(".prisma/client").Prisma.Prisma__ProveedorClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        razonSocial: string;
        nit: string;
        telefono: string | null;
        email: string | null;
        tiempoEntregaDias: number;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__ProveedorClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        razonSocial: string;
        nit: string;
        telefono: string | null;
        email: string | null;
        tiempoEntregaDias: number;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
