import { ProveedorService } from '../service/proveedor.service';
import { CreateProveedorDto } from '../dto/create-proveedor.dto';
import { UpdateProveedorDto } from '../dto/update-proveedor.dto';
export declare class ProveedoresController {
    private readonly service;
    constructor(service: ProveedorService);
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
    findOne(id: string): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        razonSocial: string;
        nit: string;
        telefono: string | null;
        email: string | null;
        tiempoEntregaDias: number;
    }>;
    create(dto: CreateProveedorDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        razonSocial: string;
        nit: string;
        telefono: string | null;
        email: string | null;
        tiempoEntregaDias: number;
    }>;
    update(id: string, dto: UpdateProveedorDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        razonSocial: string;
        nit: string;
        telefono: string | null;
        email: string | null;
        tiempoEntregaDias: number;
    }>;
    remove(id: string): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        razonSocial: string;
        nit: string;
        telefono: string | null;
        email: string | null;
        tiempoEntregaDias: number;
    }>;
}
