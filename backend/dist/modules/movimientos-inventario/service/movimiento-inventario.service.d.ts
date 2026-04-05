import { MovimientosInventarioRepository } from '../repository/movimientos-inventario.repository';
import { CreateMovimientosInventarioDto } from '../dto/create-movimientos-inventario.dto';
import { UpdateMovimientosInventarioDto } from '../dto/update-movimientos-inventario.dto';
export declare class MovimientosInventarioService {
    private readonly repository;
    constructor(repository: MovimientosInventarioRepository);
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
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        insumoId: number;
        cantidad: number;
        tipo: import(".prisma/client").$Enums.TipoMovimiento;
        fecha: Date;
        motivo: string;
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
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        insumoId: number;
        cantidad: number;
        tipo: import(".prisma/client").$Enums.TipoMovimiento;
        fecha: Date;
        motivo: string;
    }>;
    create(dto: CreateMovimientosInventarioDto): import(".prisma/client").Prisma.Prisma__MovimientoInventarioClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        insumoId: number;
        cantidad: number;
        tipo: import(".prisma/client").$Enums.TipoMovimiento;
        fecha: Date;
        motivo: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, dto: UpdateMovimientosInventarioDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        insumoId: number;
        cantidad: number;
        tipo: import(".prisma/client").$Enums.TipoMovimiento;
        fecha: Date;
        motivo: string;
    }>;
    remove(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        insumoId: number;
        cantidad: number;
        tipo: import(".prisma/client").$Enums.TipoMovimiento;
        fecha: Date;
        motivo: string;
    }>;
}
