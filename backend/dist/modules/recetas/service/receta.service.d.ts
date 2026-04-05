import { RecetaRepository } from '../repository/receta.repository';
import { CreateRecetaDto } from '../dto/create-receta.dto';
import { UpdateRecetaDto } from '../dto/update-receta.dto';
export declare class RecetaService {
    private readonly repository;
    constructor(repository: RecetaRepository);
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
    findOne(id: number): Promise<{
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
    update(id: number, dto: UpdateRecetaDto): Promise<{
        nombre: string;
        descripcion: string | null;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        porciones: number;
    }>;
    remove(id: number): Promise<{
        nombre: string;
        descripcion: string | null;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        porciones: number;
    }>;
}
