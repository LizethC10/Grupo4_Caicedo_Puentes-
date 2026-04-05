import { PrismaService } from '../../../prisma/prisma.service';
import { CreateInsumoDto } from '../dto/create-insumo.dto';
import { UpdateInsumoDto } from '../dto/update-insumo.dto';
export declare class InsumoRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        categoria: {
            nombre: string;
            descripcion: string | null;
            id: number;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        nombre: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        unidadMedida: string;
        precioActual: number;
        stockActual: number;
        stockMinimo: number;
        categoriaId: number;
    })[]>;
    findById(id: number): import(".prisma/client").Prisma.Prisma__InsumoClient<{
        categoria: {
            nombre: string;
            descripcion: string | null;
            id: number;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        nombre: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        unidadMedida: string;
        precioActual: number;
        stockActual: number;
        stockMinimo: number;
        categoriaId: number;
    }, null, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findByNombre(nombre: string): import(".prisma/client").Prisma.Prisma__InsumoClient<{
        nombre: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        unidadMedida: string;
        precioActual: number;
        stockActual: number;
        stockMinimo: number;
        categoriaId: number;
    }, null, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    create(dto: CreateInsumoDto): import(".prisma/client").Prisma.Prisma__InsumoClient<{
        nombre: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        unidadMedida: string;
        precioActual: number;
        stockActual: number;
        stockMinimo: number;
        categoriaId: number;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, dto: UpdateInsumoDto): import(".prisma/client").Prisma.Prisma__InsumoClient<{
        nombre: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        unidadMedida: string;
        precioActual: number;
        stockActual: number;
        stockMinimo: number;
        categoriaId: number;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__InsumoClient<{
        nombre: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        unidadMedida: string;
        precioActual: number;
        stockActual: number;
        stockMinimo: number;
        categoriaId: number;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
