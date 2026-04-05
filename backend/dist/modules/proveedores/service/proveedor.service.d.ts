import { ProveedorRepository } from '../repository/proveedor.repository';
import { CreateProveedorDto } from '../dto/create-proveedor.dto';
import { UpdateProveedorDto } from '../dto/update-proveedor.dto';
export declare class ProveedorService {
    private readonly repository;
    constructor(repository: ProveedorRepository);
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
    findOne(id: number): Promise<{
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
    update(id: number, dto: UpdateProveedorDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        razonSocial: string;
        nit: string;
        telefono: string | null;
        email: string | null;
        tiempoEntregaDias: number;
    }>;
    remove(id: number): Promise<{
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
