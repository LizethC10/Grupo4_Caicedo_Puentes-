🍽️ Sistema de Inventario para RestauranteProyecto full-stack guiado por el docente — Programación Web 2026AEquipo de Desarrollo: Lizeth Lorena Caicedo Mora, Lilly Signey Puentes Rincón📋 Tabla de ContenidosDescripción del ProyectoStack TecnológicoArquitecturaModelo de DatosPlan de LanzamientosSprints e Historias de UsuarioCronogramaDefinición de Hecho (DoD)Tablero KanbanInstalación y Ejecución📖 Descripción del ProyectoEl Sistema de Inventario para Restaurante es una aplicación web full-stack diseñada para controlar el inventario de insumos, gestionar pedidos a proveedores y llevar un registro detallado de las recetas del menú. Su objetivo principal es optimizar el tiempo del personal (chef y administrador) automatizando las alertas de reabastecimiento y el cálculo de costos operativos.AlcanceAspectoDetalleTipoIntermedio — Control de insumos y pedidosEntidades8 entidades con relaciones (ver modelo de datos)Historias de Usuario12 HUs organizadas en 5 sprintsEntregas2 lanzamientos alineados con los cortes académicosCasos de Uso10 CUs (CRUD, compras, stock, recetas, reportes)Funcionalidades Principales✅ CRUD completo de Categorías, Insumos y Proveedores.✅ Gestión de Órdenes de Compra y recepción automática de mercancía.✅ Control de Stock Mínimo con sistema de alertas para reabastecimiento.✅ Gestión de Recetas, asociando ingredientes y cantidades exactas.✅ Cálculo automático de costos de recetas basado en los precios actuales de los insumos.✅ Historial de Movimientos de inventario (entradas y salidas).✅ Reportes de insumos más consumidos y gastos por proveedor.🛠 Stack TecnológicoCapaTecnologíaPropósitoBackendNestJS (Node.js + TypeScript)API REST con arquitectura en capasFrontendNext.js 14+ (React + TypeScript)Interfaz de usuario con App RouterBase de DatosPostgreSQL 16Almacenamiento relacionalORMPrismaModelado de datos, migraciones y consultasInfraestructuraDocker + Docker ComposeOrquestación de serviciosValidaciónclass-validator + class-transformerDTOs y validación de entrada🏗 ArquitecturaEl proyecto sigue una arquitectura en capas con separación de responsabilidades:Cliente HTTP → Controller (valida DTO + ruta) → Service (lógica de negocio) → Repository (acceso a datos) → Prisma / PostgreSQLEstructura del ProyectoPlaintextproyecto/
├── docker-compose.yml
├── .env.example
├── backend/                        # API REST con NestJS
│   ├── src/
│   │   ├── common/                 # Módulo compartido (filtros, interceptores, pipes)
│   │   ├── prisma/                 # Módulo Prisma
│   │   └── modules/                # Módulos de dominio (Insumos, Ordenes, Recetas...)
│   │       └── [entidad]/
│   │           ├── controller/     # Manejo HTTP
│   │           ├── service/        # Lógica de negocio
│   │           ├── repository/     # Acceso a datos
│   │           └── dto/            # Validación
│   └── prisma/
│       └── schema.prisma           # Esquema de base de datos
│
├── frontend/                       # Interfaz con Next.js
│   ├── src/
│   │   ├── app/                    # App Router (páginas)
│   │   ├── components/             # Componentes reutilizables
│   │   └── services/               # Consumo de la API REST
│   └── package.json
└── README.md
📊 Modelo de DatosDiagrama de RelacionesPlaintextCategoria            1 ──── N  Insumo
Proveedor            1 ──── N  OrdenCompra
OrdenCompra          1 ──── N  DetalleOrden
Insumo               1 ──── N  DetalleOrden
Receta               1 ──── N  RecetaIngrediente
Insumo               1 ──── N  RecetaIngrediente
Insumo               1 ──── N  MovimientoInventario
EntidadesEntidadCampos PrincipalesCategoriaid, nombre (único), descripcionInsumoid, nombre (único), unidadMedida, precioActual, stockActual, stockMinimo, categoriaIdProveedorid, razonSocial, nit (único), telefono, email, tiempoEntregaDiasOrdenCompraid, proveedorId, fechaEmision, estado (Pendiente/Recibida/Cancelada), totalDetalleOrdenid, ordenCompraId, insumoId, cantidad, precioUnitarioRecetaid, nombre (único), descripcion, porcionesRecetaIngredienteid, recetaId, insumoId, cantidadRequeridaMovInventarioid, insumoId, tipo (ENTRADA/SALIDA), cantidad, fecha, motivo🚀 Plan de LanzamientosRelease 1 — Segundo Corte: Base Backend + Frontend📅 Cierre: 17 de Abril de 2026 · Sprints 1, 2 y 3Objetivo: Entregar la API REST con la arquitectura en capas y el frontend con las vistas CRUD para insumos, proveedores, categorías y gestión básica de órdenes de compra.SprintPeríodoHUsAlcanceSprint 116 Mar → 29 MarHU-01, HU-02, HU-03Docker, Prisma, Categorías, Insumos, ProveedoresSprint 230 Mar → 10 AbrHU-04, HU-05, HU-11Órdenes de Compra, Recepción, Módulo ComúnSprint 313 Abr → 17 AbrHU-06, HU-07, HU-12Recetas, Cálculo de Costos, Base FrontendRelease 2 — Tercer Corte: Integración + Reportes📅 Cierre: 22 de Mayo de 2026 · Sprints 4 y 5Objetivo: Integración completa frontend ↔ backend, flujos complejos (alertas, costeo), reportes y movimientos. Despliegue funcional con Docker.SprintPeríodoHUsAlcanceSprint 420 Abr → 08 MayHU-08, HU-13Frontend avanzado, Alertas de stock mínimo, LayoutSprint 511 May → 22 MayHU-09, HU-10Movimientos de inventario, Reportes, Pruebas E2E📌 Sprints e Historias de UsuarioPara ver el detalle completo de los Criterios de Aceptación, consultar los Issues en GitHub.Sprint 1 — Infraestructura y catálogo base📅 16 Mar → 29 Mar · 🚫 Festivo: 23 Mar (San José)#Historia de UsuarioEtiquetasHU-01Gestión de Categoríasuser-story backend frontendHU-02Gestión de Insumosuser-story backend frontendHU-03Gestión de Proveedoresuser-story backend frontendSprint 2 — Compras y recepción📅 30 Mar → 10 Abr · 🚫 Festivos: 2-3 Abr (Semana Santa)#Historia de UsuarioEtiquetasHU-04Creación de Órdenes de Comprauser-story backend frontendHU-05Recepción de Mercancía y Movimientosuser-story backendHU-11Módulo Común: Filtros, Interceptoresuser-story cross-cuttingSprint 3 — Recetas y Frontend base📅 13 Abr → 17 Abr · 📝 Cierre Segundo Corte: 17 Abr#Historia de UsuarioEtiquetasHU-06Gestión de Recetas e Ingredientesuser-story backend frontendHU-07Cálculo de Costo de Recetasuser-story backendHU-12Frontend: Layout y Navegaciónuser-story frontendSprint 4 — Frontend avanzado y Alertas📅 20 Abr → 8 May · 🚫 Festivo: 1 May (Día del Trabajo)#Historia de UsuarioEtiquetasHU-08Alertas de Stock Mínimouser-story backend frontendHU-13Frontend: Maestro-Detalle y Selects dinámicosuser-story frontendSprint 5 — Reportes, movimientos y cierre📅 11 May → 22 May · 🚫 Festivo: 18 May (Ascensión) · 📝 Cierre Tercer Corte: 22 May#Historia de UsuarioEtiquetasHU-09Consulta de Movimientos de Inventariouser-story backend frontendHU-10Reportes de Consumo y Gastosuser-story backend reporte📅 CronogramaPlaintext┌──────────────────────────────────────────────────────────────────────────────┐
│                  SEGUNDO CORTE (Release 1) — Cierre: 17 Abr 2026             │
│                         Backend + Frontend Base                              │
├─────────────────────┬─────────────────────┬──────────────────────────────────┤
│       Sprint 1      │       Sprint 2      │             Sprint 3             │
│   Mar 16 → Mar 29   │   Mar 30 → Abr 10   │         Abr 13 → Abr 17          │
│                     │                     │                                  │
│ • Docker + Prisma   │ • Órdenes Compra    │ • Recetas y Costos               │
│ • Categorías        │ • Recepción (Stock) │ • Frontend Base y Layout         │
│ • Insumos           │ • Módulo Común      │                                  │
│ • Proveedores       │                     │                                  │
│                     │       Abr 2-3       │                                  │
│   🚫 Mar 23         │   (Semana Santa)    │                                  │
│     (San José)      │                     │                                  │
├─────────────────────┴─────────────────────┴──────────────────────────────────┤
│                  TERCER CORTE (Release 2) — Cierre: 22 May 2026              │
│                          Integración + Reportes                              │
├────────────────────────────────────┬─────────────────────────────────────────┤
│              Sprint 4              │                 Sprint 5                │
│          Abr 20 → May 8            │             May 11 → May 22             │
│                                    │                                         │
│ • Alertas de Stock Mínimo          │ • Historial de movimientos              │
│ • Frontend (Relaciones complejas)  │ • Reporte de consumo y gastos           │
│ • Dashboard principal              │ • Pruebas E2E                           │
│                                    │                                         │
│             🚫 May 1               │                🚫 May 18                │
│         (Día del Trabajo)          │           (Día de la Ascensión)         │
└────────────────────────────────────┴─────────────────────────────────────────┘
✅ Definición de Hecho (DoD)Cada Historia de Usuario se considera terminada cuando cumple todos los siguientes criterios:Backend:Endpoints implementados con arquitectura en capas: Controller → Service → Repository.DTOs con validaciones usando class-validator y class-transformer.Manejo de errores con excepciones HTTP apropiadas (NotFoundException, ConflictException, BadRequestException).Respuestas con formato uniforme (interceptor global aplicado).Endpoints probados exitosamente (Postman/Thunder Client).Frontend:Vistas implementadas con componentes reutilizables.Consumo de la API gestionando correctamente estados de carga, éxito y error.Formularios con validación en el lado del cliente.Diseño responsivo y amigable.Infraestructura:Código versionado en GitHub con commits descriptivos.El proyecto completo se levanta sin errores usando docker compose up.Migraciones de Prisma aplicadas y consistentes con la base de datos.📊 Tablero KanbanEl seguimiento de las Historias de Usuario y el progreso de los Sprints se realiza mediante un tablero Kanban en GitHub Projects.🔗 [Ver Tablero Kanban del Proyecto] (Reemplazar con el enlace del repositorio del equipo)⚙ Instalación y EjecuciónPrerrequisitosDocker y Docker Compose instalados.Git.PasosClonar el repositorio:Bashgit clone https://github.com/usuario/restaurante-inventario-sistema.git
cd restaurante-inventario-sistema
Configurar variables de entorno:Bashcp .env.example .env
Levantar los servicios:Bashdocker compose up -d
Ejecutar migraciones de Prisma:Bashdocker compose exec backend sh
npx prisma migrate dev
npx prisma generate
AccesosServicioURLFrontend (Next.js)http://localhost:3000Backend (NestJS API)http://localhost:3001PostgreSQLlocalhost:5432Programación Web — Ingeniería de Sistemas — 2026ACorporación Universitaria del Huila — CORHUILA
