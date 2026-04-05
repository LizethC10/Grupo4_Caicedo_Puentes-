import { OrdenesCompraService } from '../service/ordenes-compra.service';
import { CreateOrdenesCompraDto } from '../dto/create-ordenes-compra.dto';
import { UpdateOrdenesCompraDto } from '../dto/update-ordenes-compra.dto';
export declare class OrdenesCompraController {
    private readonly service;
    constructor(service: OrdenesCompraService);
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
    findOne(id: string): Promise<{
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
    }>;
    create(dto: CreateOrdenesCompraDto): import(".prisma/client").Prisma.Prisma__OrdenCompraClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        proveedorId: number;
        fechaEmision: Date;
        estado: import(".prisma/client").$Enums.EstadoOrdenCompra;
        total: number;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, dto: UpdateOrdenesCompraDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        proveedorId: number;
        fechaEmision: Date;
        estado: import(".prisma/client").$Enums.EstadoOrdenCompra;
        total: number;
    }>;
    remove(id: string): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        proveedorId: number;
        fechaEmision: Date;
        estado: import(".prisma/client").$Enums.EstadoOrdenCompra;
        total: number;
    }>;
}
