import { PrismaService } from '../../../prisma/prisma.service';
import { CreateRecetaDto } from '../dto/create-receta.dto';
import { UpdateRecetaDto } from '../dto/update-receta.dto';
export declare class RecetaRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        ingredientes: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            insumoId: number;
            recetaId: number;
            cantidadRequerida: number;
        }[];
    } & {
        nombre: string;
        descripcion: string | null;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        porciones: number;
    })[]>;
    findById(id: number): import(".prisma/client").Prisma.Prisma__RecetaClient<{
        ingredientes: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            insumoId: number;
            recetaId: number;
            cantidadRequerida: number;
        }[];
    } & {
        nombre: string;
        descripcion: string | null;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        porciones: number;
    }, null, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findByNombre(nombre: string): import(".prisma/client").Prisma.Prisma__RecetaClient<{
        nombre: string;
        descripcion: string | null;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        porciones: number;
    }, null, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    create(dto: CreateRecetaDto): import(".prisma/client").Prisma.Prisma__RecetaClient<{
        nombre: string;
        descripcion: string | null;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        porciones: number;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, dto: UpdateRecetaDto): import(".prisma/client").Prisma.Prisma__RecetaClient<{
        nombre: string;
        descripcion: string | null;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        porciones: number;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__RecetaClient<{
        nombre: string;
        descripcion: string | null;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        porciones: number;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
