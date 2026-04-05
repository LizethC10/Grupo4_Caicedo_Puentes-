import { RecetaService } from '../service/receta.service';
import { CreateRecetaDto } from '../dto/create-receta.dto';
import { UpdateRecetaDto } from '../dto/update-receta.dto';
export declare class RecetasController {
    private readonly service;
    constructor(service: RecetaService);
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
    findOne(id: string): Promise<{
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
    }>;
    create(dto: CreateRecetaDto): Promise<{
        nombre: string;
        descripcion: string | null;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        porciones: number;
    }>;
    update(id: string, dto: UpdateRecetaDto): Promise<{
        nombre: string;
        descripcion: string | null;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        porciones: number;
    }>;
    remove(id: string): Promise<{
        nombre: string;
        descripcion: string | null;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        porciones: number;
    }>;
}
