import { PrismaService } from '../../../prisma/prisma.service';
import { CreateDetalleOrdenDto } from '../dto/create-detalle-orden.dto';
import { UpdateDetalleOrdenDto } from '../dto/update-detalle-orden.dto';
export declare class DetalleOrdenRepository {
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
        ordenCompra: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            proveedorId: number;
            fechaEmision: Date;
            estado: import(".prisma/client").$Enums.EstadoOrdenCompra;
            total: number;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        ordenCompraId: number;
        insumoId: number;
        cantidad: number;
        precioUnitario: number;
    })[]>;
    findById(id: number): import(".prisma/client").Prisma.Prisma__DetalleOrdenClient<{
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
        ordenCompra: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            proveedorId: number;
            fechaEmision: Date;
            estado: import(".prisma/client").$Enums.EstadoOrdenCompra;
            total: number;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        ordenCompraId: number;
        insumoId: number;
        cantidad: number;
        precioUnitario: number;
    }, null, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findUniqueCompuesto(ordenCompraId: number, insumoId: number): import(".prisma/client").Prisma.Prisma__DetalleOrdenClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        ordenCompraId: number;
        insumoId: number;
        cantidad: number;
        precioUnitario: number;
    }, null, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    create(dto: CreateDetalleOrdenDto): import(".prisma/client").Prisma.Prisma__DetalleOrdenClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        ordenCompraId: number;
        insumoId: number;
        cantidad: number;
        precioUnitario: number;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, dto: UpdateDetalleOrdenDto): import(".prisma/client").Prisma.Prisma__DetalleOrdenClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        ordenCompraId: number;
        insumoId: number;
        cantidad: number;
        precioUnitario: number;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__DetalleOrdenClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        ordenCompraId: number;
        insumoId: number;
        cantidad: number;
        precioUnitario: number;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
