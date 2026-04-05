import { PrismaService } from '../../../prisma/prisma.service';
import { CreateMovimientosInventarioDto } from '../dto/create-movimientos-inventario.dto';
import { UpdateMovimientosInventarioDto } from '../dto/update-movimientos-inventario.dto';
export declare class MovimientosInventarioRepository {
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
    findById(id: number): import(".prisma/client").Prisma.Prisma__MovimientoInventarioClient<{
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
    }, null, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
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
    update(id: number, dto: UpdateMovimientosInventarioDto): import(".prisma/client").Prisma.Prisma__MovimientoInventarioClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        insumoId: number;
        cantidad: number;
        tipo: import(".prisma/client").$Enums.TipoMovimiento;
        fecha: Date;
        motivo: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__MovimientoInventarioClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        insumoId: number;
        cantidad: number;
        tipo: import(".prisma/client").$Enums.TipoMovimiento;
        fecha: Date;
        motivo: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
