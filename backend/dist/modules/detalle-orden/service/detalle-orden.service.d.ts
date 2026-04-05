import { DetalleOrdenRepository } from '../repository/detalle-orden.repository';
import { CreateDetalleOrdenDto } from '../dto/create-detalle-orden.dto';
import { UpdateDetalleOrdenDto } from '../dto/update-detalle-orden.dto';
export declare class DetalleOrdenService {
    private readonly repository;
    constructor(repository: DetalleOrdenRepository);
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
    }>;
    create(dto: CreateDetalleOrdenDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        ordenCompraId: number;
        insumoId: number;
        cantidad: number;
        precioUnitario: number;
    }>;
    update(id: number, dto: UpdateDetalleOrdenDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        ordenCompraId: number;
        insumoId: number;
        cantidad: number;
        precioUnitario: number;
    }>;
    remove(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        ordenCompraId: number;
        insumoId: number;
        cantidad: number;
        precioUnitario: number;
    }>;
}
