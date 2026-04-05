import { InsumoRepository } from '../repository/insumo.repository';
import { CreateInsumoDto } from '../dto/create-insumo.dto';
import { UpdateInsumoDto } from '../dto/update-insumo.dto';
export declare class InsumoService {
    private readonly repository;
    constructor(repository: InsumoRepository);
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
    findOne(id: number): Promise<{
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
    }>;
    create(dto: CreateInsumoDto): Promise<{
        nombre: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        unidadMedida: string;
        precioActual: number;
        stockActual: number;
        stockMinimo: number;
        categoriaId: number;
    }>;
    update(id: number, dto: UpdateInsumoDto): Promise<{
        nombre: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        unidadMedida: string;
        precioActual: number;
        stockActual: number;
        stockMinimo: number;
        categoriaId: number;
    }>;
    remove(id: number): Promise<{
        nombre: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        unidadMedida: string;
        precioActual: number;
        stockActual: number;
        stockMinimo: number;
        categoriaId: number;
    }>;
}
