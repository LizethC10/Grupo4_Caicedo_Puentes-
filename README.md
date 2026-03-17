# 🍽️ Sistema de Inventario para Restaurante

**Proyecto full-stack guiado por el docente — Programación Web 2026A**
**Equipo de Desarrollo:** Lizeth Lorena Caicedo Mora, Lilly Signey Puentes Rincón

📋 **Tabla de Contenidos**
1. [Descripción del Proyecto](#-descripción-del-proyecto)
2. [Stack Tecnológico](#-stack-tecnológico)
3. [Arquitectura](#-arquitectura)
4. [Modelo de Datos](#-modelo-de-datos)
5. [Plan de Lanzamientos](#-plan-de-lanzamientos)
6. [Sprints e Historias de Usuario](#-sprints-e-historias-de-usuario)
7. [Cronograma](#-cronograma)
8. [Definición de Hecho (DoD)](#-definición-de-hecho-dod)
9. [Tablero Kanban](#-tablero-kanban)
10. [Instalación y Ejecución](#-instalación-y-ejecución)

---

## 📖 Descripción del Proyecto

El **Sistema de Inventario para Restaurante** es una aplicación web full-stack diseñada para controlar el inventario de insumos, gestionar pedidos a proveedores y llevar un registro detallado de las recetas del menú. Su objetivo principal es optimizar el tiempo del personal (chef y administrador) automatizando las alertas de reabastecimiento y el cálculo de costos operativos.

### Alcance

| Aspecto | Detalle |
| :--- | :--- |
| **Tipo** | Intermedio — Control de insumos y pedidos |
| **Entidades** | 8 entidades con relaciones (ver modelo de datos) |
| **Historias de Usuario** | 12 HUs organizadas en 5 sprints |
| **Entregas** | 2 lanzamientos alineados con los cortes académicos |
| **Casos de Uso** | 10 CUs (CRUD, compras, stock, recetas, reportes) |

### Funcionalidades Principales

* ✅ **CRUD completo** de Categorías, Insumos y Proveedores.
* ✅ **Gestión de Órdenes de Compra** y recepción automática de mercancía.
* ✅ **Control de Stock Mínimo** con sistema de alertas para reabastecimiento.
* ✅ **Gestión de Recetas**, asociando ingredientes y cantidades exactas.
* ✅ **Cálculo automático de costos** de recetas basado en los precios actuales de los insumos.
* ✅ **Historial de Movimientos** de inventario (entradas y salidas).
* ✅ **Reportes** de insumos más consumidos y gastos por proveedor.

---

## 🛠 Stack Tecnológico

| Capa | Tecnología | Propósito |
| :--- | :--- | :--- |
| **Backend** | NestJS (Node.js + TypeScript) | API REST con arquitectura en capas |
| **Frontend** | Next.js 14+ (React + TypeScript) | Interfaz de usuario con App Router |
| **Base de Datos** | PostgreSQL 16 | Almacenamiento relacional |
| **ORM** | Prisma | Modelado de datos, migraciones y consultas |
| **Infraestructura** | Docker + Docker Compose | Orquestación de servicios |
| **Validación** | class-validator + class-transformer | DTOs y validación de entrada |

---

## 🏗 Arquitectura

El proyecto sigue una **arquitectura en capas** con separación de responsabilidades:
`Cliente HTTP → Controller (valida DTO + ruta) → Service (lógica de negocio) → Repository (acceso a datos) → Prisma / PostgreSQL`

### Estructura del Proyecto


proyecto/
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


📊 Modelo de Datos
Diagrama de Relaciones

Plaintext
Categoria            1 ──── N  Insumo
Proveedor            1 ──── N  OrdenCompra
OrdenCompra          1 ──── N  DetalleOrden
Insumo               1 ──── N  DetalleOrden
Receta               1 ──── N  RecetaIngrediente
Insumo               1 ──── N  RecetaIngrediente
Insumo               1 ──── N  MovimientoInventario

Entidades

Entidad	Campos Principales

Categoria	id, nombre (único), descripcion
Insumo	id, nombre (único), unidadMedida, precioActual, stockActual, stockMinimo, categoriaId
Proveedor	id, razonSocial, nit (único), telefono, email, tiempoEntregaDias
OrdenCompra	id, proveedorId, fechaEmision, estado (Pendiente/Recibida/Cancelada), total
DetalleOrden	id, ordenCompraId, insumoId, cantidad, precioUnitario
Receta	id, nombre (único), descripcion, porciones
RecetaIngrediente	id, recetaId, insumoId, cantidadRequerida
MovInventario	id, insumoId, tipo (ENTRADA/SALIDA), cantidad, fecha, motivo

🚀 Plan de Lanzamientos
Release 1 — Segundo Corte: Base Backend + Frontend

📅 Cierre: 17 de Abril de 2026 · Sprints 1, 2 y 3
Objetivo: Entregar la API REST con la arquitectura en capas y el frontend con las vistas CRUD para insumos, proveedores, categorías y gestión básica de órdenes de compra.

Sprint	Período	HUs	Alcance
Sprint 1	16 Mar → 29 Mar	HU-01, HU-02, HU-03	Docker, Prisma, Categorías, Insumos, Proveedores
Sprint 2	30 Mar → 10 Abr	HU-04, HU-05, HU-11	Órdenes de Compra, Recepción, Módulo Común
Sprint 3	13 Abr → 17 Abr	HU-06, HU-07, HU-12	Recetas, Cálculo de Costos, Base Frontend

Release 2 — Tercer Corte: Integración + Reportes

📅 Cierre: 22 de Mayo de 2026 · Sprints 4 y 5
Objetivo: Integración completa frontend ↔ backend, flujos complejos (alertas, costeo), reportes y movimientos. Despliegue funcional con Docker.

Sprint	Período	HUs	Alcance

Sprint 4	20 Abr → 08 May	HU-08, HU-13	Frontend avanzado, Alertas de stock mínimo, Layout
Sprint 5	11 May → 22 May	HU-09, HU-10	Movimientos de inventario, Reportes, Pruebas E2E
📌 Sprints e Historias de Usuario
Para ver el detalle completo de los Criterios de Aceptación, consultar los Issues en GitHub.

Sprint 1 — Infraestructura y catálogo base

📅 16 Mar → 29 Mar · 🚫 Festivo: 23 Mar (San José)

#	Historia de Usuario	Etiquetas
HU-01	Gestión de Categorías	user-story backend frontend
HU-02	Gestión de Insumos	user-story backend frontend
HU-03	Gestión de Proveedores	user-story backend frontend
Sprint 2 — Compras y recepción
📅 30 Mar → 10 Abr · 🚫 Festivos: 2-3 Abr (Semana Santa)

#	Historia de Usuario	Etiquetas
HU-04	Creación de Órdenes de Compra	user-story backend frontend
HU-05	Recepción de Mercancía y Movimientos	user-story backend
HU-11	Módulo Común: Filtros, Interceptores	user-story cross-cutting
Sprint 3 — Recetas y Frontend base
📅 13 Abr → 17 Abr · 📝 Cierre Segundo Corte: 17 Abr

#	Historia de Usuario	Etiquetas
HU-06	Gestión de Recetas e Ingredientes	user-story backend frontend
HU-07	Cálculo de Costo de Recetas	user-story backend
HU-12	Frontend: Layout y Navegación	user-story frontend
Sprint 4 — Frontend avanzado y Alertas
📅 20 Abr → 8 May · 🚫 Festivo: 1 May (Día del Trabajo)

#	Historia de Usuario	Etiquetas
HU-08	Alertas de Stock Mínimo	user-story backend frontend
HU-13	Frontend: Maestro-Detalle y Selects dinámicos	user-story frontend
Sprint 5 — Reportes, movimientos y cierre
📅 11 May → 22 May · 🚫 Festivo: 18 May (Ascensión) · 📝 Cierre Tercer Corte: 22 May

#	Historia de Usuario	Etiquetas
HU-09	Consulta de Movimientos de Inventario	user-story backend frontend
HU-10	Reportes de Consumo y Gastos	user-story backend reporte
📅 Cronograma
Plaintext
┌──────────────────────────────────────────────────────────────────────────────┐
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
│             🚫 May 1               │                🚫 May 18               │
│         (Día del Trabajo)          │           (Día de la Ascensión)         │

└────────────────────────────────────┴─────────────────────────────────────────┘
✅ Definición de Hecho (DoD)
Cada Historia de Usuario se considera terminada cuando cumple todos los siguientes criterios:

Backend:

Endpoints implementados con arquitectura en capas: Controller → Service → Repository.

DTOs con validaciones usando class-validator y class-transformer.

Manejo de errores con excepciones HTTP apropiadas (NotFoundException, ConflictException, BadRequestException).

Respuestas con formato uniforme (interceptor global aplicado).

Endpoints probados exitosamente (Postman/Thunder Client).

Frontend:

Vistas implementadas con componentes reutilizables.

Consumo de la API gestionando correctamente estados de carga, éxito y error.

Formularios con validación en el lado del cliente.

Diseño responsivo y amigable.

Infraestructura:

Código versionado en GitHub con commits descriptivos.

El proyecto completo se levanta sin errores usando docker compose up.

Migraciones de Prisma aplicadas y consistentes con la base de datos.

📊 Tablero Kanban
El seguimiento de las Historias de Usuario y el progreso de los Sprints se realiza mediante un tablero Kanban en GitHub Projects.

🔗 [Ver Tablero Kanban del Proyecto] (Reemplazar con el enlace del repositorio del equipo)

⚙ Instalación y Ejecución
Prerrequisitos
Docker y Docker Compose instalados.

Git.

Pasos
Clonar el repositorio:

Bash
git clone [https://github.com/usuario/restaurante-inventario-sistema.git]()
cd restaurante-inventario-sistema
Configurar variables de entorno:

Bash
cp .env.example .env
Levantar los servicios:

Bash
docker compose up -d
Ejecutar migraciones de Prisma:

Bash
docker compose exec backend sh
npx prisma migrate dev
npx prisma generate
Accesos
Servicio	URL
Frontend (Next.js)	http://localhost:3000
Backend (NestJS API)	http://localhost:3001
PostgreSQL	localhost:5432
Programación Web — Ingeniería de Sistemas — 2026A
Corporación Universitaria del Huila — CORHUILA

