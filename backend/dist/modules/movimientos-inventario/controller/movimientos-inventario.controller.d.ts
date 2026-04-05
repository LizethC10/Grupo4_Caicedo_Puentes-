import { MovimientosInventarioService } from '../service/movimiento-inventario.service';
import { CreateMovimientosInventarioDto } from '../dto/create-movimientos-inventario.dto';
import { UpdateMovimientosInventarioDto } from '../dto/update-movimientos-inventario.dto';
export declare class MovimientosInventarioController {
    private readonly service;
    constructor(service: MovimientosInventarioService);
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
    findOne(id: string): Promise<{
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
    update(id: string, dto: UpdateMovimientosInventarioDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        insumoId: number;
        cantidad: number;
        tipo: import(".prisma/client").$Enums.TipoMovimiento;
        fecha: Date;
        motivo: string;
    }>;
    remove(id: string): Promise<{
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
