import { PrismaService } from '../../../prisma/prisma.service';
import { CreateOrdenesCompraDto } from '../dto/create-ordenes-compra.dto';
import { UpdateOrdenesCompraDto } from '../dto/update-ordenes-compra.dto';
export declare class OrdenesCompraRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        proveedor: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            razonSocial: string;
            nit: string;
            telefono: string | null;
            email: string | null;
            tiempoEntregaDias: number;
        };
        detalles: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            ordenCompraId: number;
            insumoId: number;
            cantidad: number;
            precioUnitario: number;
        }[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        proveedorId: number;
        fechaEmision: Date;
        estado: import(".prisma/client").$Enums.EstadoOrdenCompra;
        total: number;
    })[]>;
    findById(id: number): import(".prisma/client").Prisma.Prisma__OrdenCompraClient<{
        proveedor: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            razonSocial: string;
            nit: string;
            telefono: string | null;
            email: string | null;
            tiempoEntregaDias: number;
        };
        detalles: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            ordenCompraId: number;
            insumoId: number;
            cantidad: number;
            precioUnitario: number;
        }[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        proveedorId: number;
        fechaEmision: Date;
        estado: import(".prisma/client").$Enums.EstadoOrdenCompra;
        total: number;
    }, null, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    create(dto: CreateOrdenesCompraDto): import(".prisma/client").Prisma.Prisma__OrdenCompraClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        proveedorId: number;
        fechaEmision: Date;
        estado: import(".prisma/client").$Enums.EstadoOrdenCompra;
        total: number;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, dto: UpdateOrdenesCompraDto): import(".prisma/client").Prisma.Prisma__OrdenCompraClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        proveedorId: number;
        fechaEmision: Date;
        estado: import(".prisma/client").$Enums.EstadoOrdenCompra;
        total: number;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__OrdenCompraClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        proveedorId: number;
        fechaEmision: Date;
        estado: import(".prisma/client").$Enums.EstadoOrdenCompra;
        total: number;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
