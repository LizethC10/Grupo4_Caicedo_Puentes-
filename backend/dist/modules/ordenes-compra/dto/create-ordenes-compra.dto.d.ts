export declare enum EstadoOrdenCompraDto {
    PENDIENTE = "PENDIENTE",
    RECIBIDA = "RECIBIDA",
    CANCELADA = "CANCELADA"
}
export declare class CreateOrdenesCompraDto {
    proveedorId: number;
    fechaEmision: string;
    estado: EstadoOrdenCompraDto;
    total: number;
}
