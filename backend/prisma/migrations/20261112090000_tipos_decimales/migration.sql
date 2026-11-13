ALTER TABLE "insumos"
  ALTER COLUMN "precioActual" TYPE DECIMAL(12,2) USING ROUND("precioActual"::numeric, 2),
  ALTER COLUMN "stockActual" TYPE DECIMAL(12,3) USING "stockActual"::numeric,
  ALTER COLUMN "stockActual" SET DEFAULT 0,
  ALTER COLUMN "stockMinimo" TYPE DECIMAL(12,3) USING "stockMinimo"::numeric;

ALTER TABLE "ordenes-compra"
  ALTER COLUMN "total" TYPE DECIMAL(12,2) USING ROUND("total"::numeric, 2);

ALTER TABLE "detalle-orden"
  ALTER COLUMN "cantidad" TYPE DECIMAL(12,3) USING ROUND("cantidad"::numeric, 3),
  ALTER COLUMN "precioUnitario" TYPE DECIMAL(12,2) USING ROUND("precioUnitario"::numeric, 2);

ALTER TABLE "receta-ingredientes"
  ALTER COLUMN "cantidadRequerida" TYPE DECIMAL(12,3) USING ROUND("cantidadRequerida"::numeric, 3);

ALTER TABLE "movimientos-inventario"
  ALTER COLUMN "cantidad" TYPE DECIMAL(12,3) USING ROUND("cantidad"::numeric, 3);
