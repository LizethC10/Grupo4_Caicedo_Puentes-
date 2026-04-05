import { RecetaIngredienteRepository } from '../repository/receta-ingrediente.repository';
import { CreateRecetaIngredienteDto } from '../dto/create-receta-ingrediente.dto';
import { UpdateRecetaIngredienteDto } from '../dto/update-receta-ingrediente.dto';
export declare class RecetaIngredienteService {
    private readonly repository;
    constructor(repository: RecetaIngredienteRepository);
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
    findOne(id: number): Promise<{
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
    }>;
    create(dto: CreateRecetaIngredienteDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        insumoId: number;
        recetaId: number;
        cantidadRequerida: number;
    }>;
    update(id: number, dto: UpdateRecetaIngredienteDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        insumoId: number;
        recetaId: number;
        cantidadRequerida: number;
    }>;
    remove(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        insumoId: number;
        recetaId: number;
        cantidadRequerida: number;
    }>;
}
