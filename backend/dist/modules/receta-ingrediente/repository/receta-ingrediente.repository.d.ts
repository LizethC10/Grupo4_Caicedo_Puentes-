import { PrismaService } from '../../../prisma/prisma.service';
import { CreateRecetaIngredienteDto } from '../dto/create-receta-ingrediente.dto';
import { UpdateRecetaIngredienteDto } from '../dto/update-receta-ingrediente.dto';
export declare class RecetaIngredienteRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        insumo: {
            nombre: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            unidadMedida: string;
            precioActual: number;
            stockActual: number;
            stockMinimo: number;
            categoriaId: number;
        };
        receta: {
            nombre: string;
            descripcion: string | null;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            porciones: number;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        insumoId: number;
        recetaId: number;
        cantidadRequerida: number;
    })[]>;
    findById(id: number): import(".prisma/client").Prisma.Prisma__RecetaIngredienteClient<{
        insumo: {
            nombre: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            unidadMedida: string;
            precioActual: number;
            stockActual: number;
            stockMinimo: number;
            categoriaId: number;
        };
        receta: {
            nombre: string;
            descripcion: string | null;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            porciones: number;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        insumoId: number;
        recetaId: number;
        cantidadRequerida: number;
    }, null, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findUniqueCompuesto(recetaId: number, insumoId: number): import(".prisma/client").Prisma.Prisma__RecetaIngredienteClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        insumoId: number;
        recetaId: number;
        cantidadRequerida: number;
    }, null, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    create(dto: CreateRecetaIngredienteDto): import(".prisma/client").Prisma.Prisma__RecetaIngredienteClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        insumoId: number;
        recetaId: number;
        cantidadRequerida: number;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, dto: UpdateRecetaIngredienteDto): import(".prisma/client").Prisma.Prisma__RecetaIngredienteClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        insumoId: number;
        recetaId: number;
        cantidadRequerida: number;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__RecetaIngredienteClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        insumoId: number;
        recetaId: number;
        cantidadRequerida: number;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
