export declare enum TipoMovimientoDto {
    ENTRADA = "ENTRADA",
    SALIDA = "SALIDA"
}
export declare class CreateMovimientosInventarioDto {
    insumoId: number;
    tipo: TipoMovimientoDto;
    cantidad: number;
    fecha: string;
    motivo: string;
}
