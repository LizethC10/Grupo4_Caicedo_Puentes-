import { InsumoService } from '../service/insumo.service';
import { CreateInsumoDto } from '../dto/create-insumo.dto';
import { UpdateInsumoDto } from '../dto/update-insumo.dto';
export declare class InsumosController {
    private readonly service;
    constructor(service: InsumoService);
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
    findOne(id: string): Promise<{
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
    update(id: string, dto: UpdateInsumoDto): Promise<{
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
    remove(id: string): Promise<{
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
