# Componentes del backend

```mermaid
flowchart TB
  request[HTTP request] --> global[APP_GUARD: JwtAuthGuard]
  global --> roles[RolesGuard]
  roles --> ctl
  subgraph modules[Módulos de dominio · controller → service → repository → DTO/entity]
    auth[auth]
    categorias[categorias]
    insumos[insumos]
    proveedores[proveedores]
    ordenes[ordenes-compra]
    detalle[detalle-orden]
    recetas[recetas]
    recetaIng[receta-ingrediente]
    movimientos[movimientos-inventario]
  end
  ctl[Controllers] --> modules
  ordenes --> stock[StockService · único escritor de stockActual]
  movimientos --> stock
  modules --> prisma[PrismaService · adapter-pg]
  stock --> prisma
  prisma --> db[(PostgreSQL)]
  global -.-> public[@Public: login y health]
  health[HealthModule] --> prisma
  config[ConfigModule · validación de entorno] --> auth
  config --> prisma
  modules --> filter[HttpExceptionFilter]
  modules --> interceptor[ResponseInterceptor]
```
