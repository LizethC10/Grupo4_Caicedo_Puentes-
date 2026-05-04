# 🍽️ Sistema de Inventario para Restaurante

**Proyecto full-stack guiado por el docente — Programación Web 2026A**

[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)

---
**Equipo de Desarrollo:**

Lizeth Lorena Caicedo Mora,
Lilly Signey Puentes Rincón
---
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
11. [Enlaces Rápidos](#-Enlaces-Rápidos)

---

## 📖 Descripción del Proyecto

El **Sistema de Inventario para Restaurante** es una aplicación web full-stack diseñada para controlar el inventario de insumos, gestionar pedidos a proveedores y llevar un registro detallado de las recetas del menú. Su objetivo principal es optimizar el tiempo del personal (chef y administrador) automatizando las alertas de reabastecimiento y el cálculo de costos operativos.

### Alcance

| Aspecto | Detalle |
|---|---|
| **Tipo** | Proyecto demostrativo — Guiado por el Docente |
| **Entidades** | 9 entidades con relaciones (incluyendo Usuario para autenticación) |
| **Historias de Usuario** | 11 HUs organizadas en 5 sprints |
| **Releases** | 2 releases alineados con los cortes académicos |

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
## 🎯 Estado Actual del Proyecto

> **Última actualización:** 4 de Mayo de 2026 — Proyecto 100% completado

### Progreso por Sprint

| Sprint | Estado | HUs | Período |
|---|---|---|---|
| Sprint 1 — Infraestructura y entidades base | ✅ **Completado** | HU-01, HU-02, HU-03 | Mar 16 → Mar 29 |
| Sprint 2 — Compras y Abastecimiento | ✅ **Completado** | HU-04, HU-05 | Mar 30 → Abr 10 |
| Sprint 3 — Gestión de menú, costos y frontend | ✅ **Completado** | HU-06, HU-07, HU-08, HU-09, HU-10 | Abr 13 → Abr 17 |
| Sprint 4 — Seguridad e integración | ✅ **Completado** | HU-11 | Abr 20 → May 8 |
| Sprint 5 — Cierre, pruebas y despliegue | ✅ **Completado** | Validación y consolidación | May 11 → May 22 |

---

### Hitos Completados ✅

#### Backend (NestJS + Prisma + PostgreSQL)
- [x] Docker Compose con 3 servicios: PostgreSQL, NestJS, Next.js
- [x] Prisma schema con 9 entidades y todas sus relaciones
- [x] Migraciones aplicadas
- [x] Módulo `categorias` — CRUD completo (Controller → Service → Repository)
- [x] Módulo `insumos` — CRUD con validación de stock negativo y nombre único
- [x] Módulo `proveedores` — CRUD con validación de contacto obligatorio
- [x] Módulo `ordenes-compra` — CRUD con máquina de estados
- [x] Módulo `detalle-orden` — CRUD con restricción de unicidad compuesta
- [x] Módulo `recetas` — CRUD completo
- [x] Módulo `receta-ingrediente` — CRUD con restricción compuesta
- [x] Módulo `movimientos-inventario` — CRUD con filtros
- [x] Módulo `auth` — Login, Register, JWT, roles
- [x] Recepción de mercancía con `$transaction` (atomicidad)
- [x] Common Module: `HttpExceptionFilter`, `ResponseInterceptor`
- [x] Configuración global: `ValidationPipe`, prefix `api/v1`, CORS multi-origen
- [x] Bcryptjs para hash de contraseñas
- [x] JWT Strategy con guards

#### Frontend (Next.js 15 + React 19 + TypeScript + Tailwind CSS)
- [x] Estructura Next.js 15 con App Router
- [x] Cliente HTTP centralizado (`lib/api.ts`)
- [x] 9 interfaces TypeScript para todas las entidades
- [x] 9 servicios de acceso a la API
- [x] Layout raíz + Dashboard layout con grupo de rutas `(dashboard)`
- [x] Página de Login con autenticación JWT
- [x] Protección de rutas con verificación de token
- [x] Sidebar con información del usuario y botón de cerrar sesión
- [x] CRUD completo: Categorías, Insumos, Proveedores
- [x] CRUD completo: Órdenes de Compra, Detalle Orden
- [x] CRUD completo: Recetas con ingredientes y cálculo automático de costos
- [x] Movimientos de Inventario con filtros (insumo, tipo, rango de fechas)
- [x] Registro manual de Mermas y Ajustes
- [x] Página de Reportes con rotación de insumos y gastos por proveedor
- [x] Alertas de stock bajo
- [x] Manejo de estados: loading, error, formularios con validación
---
#### Infraestructura
- [x] Dockerfiles para backend y frontend
- [x] CORS configurado para múltiples orígenes
- [x] Frontend disponible en local (3000) y Docker (3005)
- [x] Variables de entorno configuradas


## 🏗 Arquitectura

El proyecto sigue una **arquitectura en capas** con separación de responsabilidades:
`Cliente HTTP → Controller (valida DTO + ruta) → Service (lógica de negocio) → Repository (acceso a datos) → Prisma / PostgreSQL`

### Estructura del Proyecto

```text
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
```
---

## 📊 Modelo de Datos
 ### Diagrama de Relaciones

```

Categoria            1 ──── N  Insumo
Proveedor            1 ──── N  OrdenCompra
OrdenCompra          1 ──── N  DetalleOrden
Insumo               1 ──── N  DetalleOrden
Receta               1 ──── N  RecetaIngrediente
Insumo               1 ──── N  RecetaIngrediente
Insumo               1 ──── N  MovimientoInventario

```
---

### Entidades

| Entidad | Campos Principales |
|---|---|
| **Categoria** | id, nombre (unique), descripcion |
| **Insumo** | id, nombre (unique), unidadMedida, precioActual, stockActual, stockMinimo, categoriaId |
| **Proveedor** | id, razonSocial, nit (unique), telefono, email, tiempoEntregaDias |
| **OrdenCompra** | id, proveedorId, fechaEmision, estado, total |
| **DetalleOrden** | id, ordenCompraId, insumoId, cantidad, precioUnitario (unique compound) |
| **Receta** | id, nombre (unique), descripcion, porciones |
| **RecetaIngrediente** | id, recetaId, insumoId, cantidadRequerida (unique compound) |
| **MovimientoInventario** | id, insumoId, tipo (ENTRADA/SALIDA), cantidad, fecha, motivo |
| **Usuario** | id, nombre, email (unique), password (hashed), rol |

## 🚀 Plan de Lanzamientos

### Release 1 — Segundo Corte: Base Backend + Frontend
> 📅 Cierre: 17 de Abril de 2026 · Sprints 1, 2 y 3

#### Objetivo:
Entregar la API REST con arquitectura en capas y el frontend base con los módulos fundamentales de categorías, insumos, proveedores, compras, recetas y trazabilidad inicial del inventario.

| Sprint | Período | HUs | Alcance |
| :--- | :--- | :--- | :--- |
| [Sprint 1](https://github.com/LizethC10/Grupo4_Caicedo_Puentes-/milestone/2) | 16 Mar → 29 Mar | HU-01, HU-02, HU-03 | Docker, Prisma, Categorías, Insumos, Proveedores |
| [Sprint 2](https://github.com/LizethC10/Grupo4_Caicedo_Puentes-/milestone/3) | 30 Mar → 10 Abr | HU-04, HU-05 | Órdenes de Compra, Recepción de mercancía, Common Module |
| [Sprint 3](https://github.com/LizethC10/Grupo4_Caicedo_Puentes-/milestone/4) | 13 Abr → 17 Abr | HU-06, HU-07 | Recetas y costos |

### Release 2 — Tercer Corte: Integración, Control y Seguridad
> 📅 Cierre: 22 de Mayo de 2026 · Sprints 4 y 5

#### Objetivo:
Completar la integración frontend ↔ backend, trazabilidad de movimientos, control de inventario, reportes, autenticación y cierre funcional del sistema.

| Sprint | Período | HUs | Alcance |
| :--- | :--- | :--- | :--- |
| [Sprint 4](https://github.com/LizethC10/Grupo4_Caicedo_Puentes-/milestone/5) | 20 Abr → 08 May | HU-08, HU-09 | Movimientos y mermas |
| [Sprint 5](https://github.com/LizethC10/Grupo4_Caicedo_Puentes-/milestone/6) | 11 May → 22 May | HU-10, HU-11 | Reportes, autenticación, roles y cierre |

---

## 📌 Sprints e Historias de Usuario

### Sprint 1 — Gestión de Catálogos e Insumos ✅

> 📅 **16 de marzo → 29 de marzo** · 🚫 **Festivo: 23 de marzo (San José)** · [Ver Milestone](https://github.com/LizethC10/Grupo4_Caicedo_Puentes-/milestone/2)

| # | Historia de Usuario | Etiquetas | Asunto | Estado |
|---|---|---|---|---|
| HU-01 | Registro de Insumos | `user-story` `backend` `frontend` | [#1](https://github.com/LizethC10/Grupo4_Caicedo_Puentes-/issues/1) | ✅ **Done** |
| HU-02 | Gestión de Proveedores | `user-story` `backend` `frontend` | [#2](https://github.com/LizethC10/Grupo4_Caicedo_Puentes-/issues/2) | ✅ **Done** |
| HU-03 | Categorización de Insumos | `user-story` `backend` `frontend` | [#3](https://github.com/LizethC10/Grupo4_Caicedo_Puentes-/issues/3) | ✅ **Done** |

**Entregables:**

- ✅ Docker Compose con PostgreSQL, NestJS y Next.js
- ✅ Prisma schema con entidades `Categoria`, `Insumo` y `Proveedor`
- ✅ Migraciones ejecutadas
- ✅ CRUD completo (Controller → Service → Repository) para categorías, insumos y proveedores
- ✅ Frontend: listados y formularios básicos

---

### Sprint 2 — Compras y Abastecimiento ✅

> 📅 **30 de marzo → 10 de abril** · 🚫 **Festivos: 2 y 3 de abril (Semana Santa)** · [Ver Milestone](https://github.com/LizethC10/Grupo4_Caicedo_Puentes-/milestone/3)

| # | Historia de Usuario | Etiquetas | Asunto | Estado |
|---|---|---|---|---|
| HU-04 | Creación de Órdenes de Compra | `user-story` `backend` `frontend` | [#4](https://github.com/LizethC10/Grupo4_Caicedo_Puentes-/issues/4) | ✅ **Done** |
| HU-05 | Recepción de Mercancía | `user-story` `backend` | [#5](https://github.com/LizethC10/Grupo4_Caicedo_Puentes-/issues/5) | ✅ **Done** |

**Entregables:**

- ✅ CRUD de órdenes de compra y detalle de órdenes
- ✅ Asociación de un proveedor con múltiples insumos
- ✅ Validación de cantidades y lista de insumos no vacía
- ✅ Actualización automática del stock al recibir mercancía
- ✅ Registro automático de movimientos de inventario tipo entrada por compra
- ✅ Common Module: filtros, interceptores y pipes

---

### Sprint 3 — Gestión de Menú y Costos ✅

> 📅 **13 de abril → 17 de abril** · 📝 **Cierre Segundo Corte: 17 de abril** · [Ver Milestone](https://github.com/LizethC10/Grupo4_Caicedo_Puentes-/milestone/4)

| # | Historia de Usuario | Etiquetas | Asunto | Estado |
|---|---|---|---|---|
| HU-06 | Configuración de Recetas (Escandallo) | `user-story` `backend` `frontend` | [#6](https://github.com/LizethC10/Grupo4_Caicedo_Puentes-/issues/6) | ✅ **Done** |
| HU-07 | Cálculo de Costos de Receta | `user-story` `backend` `frontend` | [#7](https://github.com/LizethC10/Grupo4_Caicedo_Puentes-/issues/7) | ✅ **Done** |

**Entregables:**

- ✅ CRUD de recetas
- ✅ Asociación de ingredientes con cantidades requeridas
- ✅ Validación para evitar ingredientes repetidos en una receta
- ✅ Cálculo dinámico del costo estimado de cada receta

---

### Sprint 4 — Control y Trazabilidad ✅

> 📅 **20 de abril → 8 de mayo** · 🚫 **Festivo: 1 de mayo (Día del Trabajo)** · [Ver Milestone](https://github.com/LizethC10/Grupo4_Caicedo_Puentes-/milestone/5)

| # | Historia de Usuario | Etiquetas | Asunto | Estado |
|---|---|---|---|---|
| HU-08 | Trazabilidad de Movimientos | `user-story` `backend` `frontend` | [#8](https://github.com/LizethC10/Grupo4_Caicedo_Puentes-/issues/8) | ✅ **Done** |
| HU-09 | Registro de Mermas y Ajustes | `user-story` `backend` `frontend` | [#9](https://github.com/LizethC10/Grupo4_Caicedo_Puentes-/issues/9) | ✅ **Done** |

**Entregables:**

- ✅ Consulta de movimientos por rango de fechas e insumo
- ✅ Tabla de movimientos con filtros
- ✅ Registro manual de salidas por merma o ajuste
- ✅ Actualización automática del stock tras ajustes

---

### Sprint 5 — Reportes, Seguridad y Cierre ✅

> 📅 **11 de mayo → 22 de mayo** · 🚫 **Festivo: 18 de mayo (Día de la Ascensión)** · 📝 **Cierre Tercer Corte: 22 de mayo** · [Ver Milestone](https://github.com/LizethC10/Grupo4_Caicedo_Puentes-/milestone/6)

| # | Historia de Usuario | Etiquetas | Asunto | Estado |
|---|---|---|---|---|
| HU-10 | Reportes de Consumo y Gastos | `user-story` `backend` `frontend` `reporte` | [#10](https://github.com/LizethC10/Grupo4_Caicedo_Puentes-/issues/10) | ✅ **Done** |
| HU-11 | Autenticación de Usuarios y Control de Acceso | `user-story` `backend` `frontend` `security` | [#11](https://github.com/LizethC10/Grupo4_Caicedo_Puentes-/issues/11) | ✅ **Done** |

**Entregables:**

- ✅ Reporte de insumos de mayor rotación
- ✅ Reporte de gastos por proveedor
- ✅ Inicio de sesión seguro con validación de credenciales
- ✅ Gestión de roles y control de acceso
- ✅ Persistencia de sesión
- ✅ Validación final del sistema con Docker Compose y pruebas de cierre

---


## 📅 Cronograma



```text
┌──────────────────────────────────────────────────────────────────────────────┐
│                    SEGUNDO CORTE (Release 1) — Cierre: 17 Abr 2026           │
│                         Backend + Frontend Base                              │
├─────────────────────┬─────────────────────┬──────────────────────────────────┤
│  Sprint 1           │    Sprint 2         │         Sprint 3                 │
│  Mar 16 → Mar 29    │  Mar 30 → Abr 10    │   Abr 13 → Abr 17                │
│                     │                     │                                  │
│ • Docker            │ • Órdenes de compra │ • Recetas                        │
│ • Prisma            │ • Recepción         │ • Costos de receta               │
│ • Categorías        │ • Common Module     │ • Movimientos                    │
│ • Insumos           │ • Filters/Pipes     │ • Mermas y ajustes               │
│ • Proveedores       │                     │ • Reportes básicos               │
│                     │                     │ • Frontend: listados y forms     │
│                     │ 🚫 Abr 2-3          │                                 │
│ 🚫 Mar 23           │   (Semana Santa)    │                                 │
│   (San José)        │                     │                                  │
├─────────────────────┴─────────────────────┴──────────────────────────────────┤
│                    TERCER CORTE (Release 2) — Cierre: 22 May 2026            │
│                    Integración + Seguridad + Despliegue                      │
├────────────────────────────────────┬─────────────────────────────────────────┤
│        Sprint 4                    │          Sprint 5                       │
│        Abr 20 → May 8              │          May 11 → May 22                │
│                                    │                                         │
│ • Autenticación                    │ • Pruebas finales                       │
│ • Login                            │ • Ajustes de integración                │
│ • Roles y permisos                 │ • Validación general                    │
│ • Integración frontend-backend     │ • Docker compose validación final       │
│ • Navegación final                 │ • Preparación de sustentación           │
│                                    │                                         │
│ 🚫 May 1                          │ 🚫 May 18                               │
│   (Día del Trabajo)                │   (Día de la Ascensión)                 │
└────────────────────────────────────┴─────────────────────────────────────────┘

```

### Festivos Colombianos (Marzo — Mayo 2026)

### Festivos Colombianos (Marzo — Mayo 2026)

| Fecha | Festivo | Sprint Afectado |
|---|---|---|
| Lunes 23 de Marzo | Día de San José | Sprint 1 |
| Jueves 2 de Abril | Jueves Santo | Sprint 2 |
| Viernes 3 de Abril | Viernes Santo | Sprint 2 |
| Viernes 1 de Mayo | Día del Trabajo | Sprint 4 |
| Lunes 18 de Mayo | Día de la Ascensión | Sprint 5 |

---

## ✅ Definition of Done (DoD)

### Backend
- [x] Endpoints implementados con arquitectura en capas: Controller → Service → Repository
- [x] DTOs con validaciones usando `class-validator` y `class-transformer`
- [x] Manejo de errores con excepciones HTTP (`NotFoundException`, `ConflictException`, `BadRequestException`)
- [x] Respuestas con formato uniforme (interceptor aplicado)
- [x] Endpoints probados manualmente con Postman

### Frontend
- [x] Páginas implementadas con componentes reutilizables
- [x] Consumo del API a través de la capa de `services/`
- [x] Manejo de estados: carga (loading), éxito y error
- [x] Formularios con validación del lado del cliente
- [x] Diseño responsivo y navegable

### Infraestructura y Código
- [x] Código versionado en GitHub con commits descriptivos
- [x] El servicio funciona correctamente con `docker compose up`
- [x] No hay errores de consola ni advertencias críticas
- [x] Las migraciones de Prisma están aplicadas

---

## 📊 Tablero Kanban

🔗 **[Ver Issues en GitHub](https://github.com/LizethC10/Grupo4_Caicedo_Puentes-/issues)**

> **Última actualización:** 4 de Mayo de 2026

### 🟢 Done (11 HUs)

| HU | Historia de Usuario | Sprint | Release | Issue |
|---|---|---|---|---|
| HU-01 | Registro de Insumos | Sprint 1 | R1 | [#1](https://github.com/LizethC10/Grupo4_Caicedo_Puentes-/issues/1) |
| HU-02 | Gestión de Proveedores | Sprint 1 | R1 | [#2](https://github.com/LizethC10/Grupo4_Caicedo_Puentes-/issues/2) |
| HU-03 | Categorización de Insumos | Sprint 1 | R1 | [#3](https://github.com/LizethC10/Grupo4_Caicedo_Puentes-/issues/3) |
| HU-04 | Creación de Órdenes de Compra | Sprint 2 | R1 | [#4](https://github.com/LizethC10/Grupo4_Caicedo_Puentes-/issues/4) |
| HU-05 | Recepción de Mercancía | Sprint 2 | R1 | [#5](https://github.com/LizethC10/Grupo4_Caicedo_Puentes-/issues/5) |
| HU-06 | Configuración de Recetas (Escandallo) | Sprint 3 | R1 | [#6](https://github.com/LizethC10/Grupo4_Caicedo_Puentes-/issues/6) |
| HU-07 | Cálculo de Costos de Receta | Sprint 3 | R1 | [#7](https://github.com/LizethC10/Grupo4_Caicedo_Puentes-/issues/7) |
| HU-08 | Trazabilidad de Movimientos | Sprint 4 | R2 | [#8](https://github.com/LizethC10/Grupo4_Caicedo_Puentes-/issues/8) |
| HU-09 | Registro de Mermas y Ajustes | Sprint 4 | R2 | [#9](https://github.com/LizethC10/Grupo4_Caicedo_Puentes-/issues/9) |
| HU-10 | Reportes de Consumo y Gastos | Sprint 5 | R2 | [#10](https://github.com/LizethC10/Grupo4_Caicedo_Puentes-/issues/10) |
| HU-11 | Autenticación de Usuarios y Control de Acceso | Sprint 5 | R2 | [#11](https://github.com/LizethC10/Grupo4_Caicedo_Puentes-/issues/11) |

### 🔵 In Progress (0 HUs)

_No hay historias en progreso._

### ⚪ Todo / Backlog (0 HUs)

_Todas las HUs completadas._

---
## ⚙ Instalación y Ejecución
### Prerrequisitos

- [Docker](https://www.docker.com/products/docker-desktop/) y Docker Compose instalados
- [Git](https://git-scm.com/downloads)
- Node.js 22+ (para desarrollo local del frontend)

### Clonar el repositorio

```bash
git clone https://github.com/LizethC10/Grupo4_Caicedo_Puentes-.git
cd Grupo4_Caicedo_Puentes-
```

### Configurar variables de entorno

```env
# .env en la raíz
DB_USER=admin
DB_PASSWORD=admin123
DB_NAME=inventario_restaurante_db
DATABASE_URL=postgresql://admin:admin123@localhost:5432/inventario_restaurante_db
PORT=3001
FRONTEND_URL=http://localhost:3000
JWT_SECRET=inventario_secret_2026
```

### Levantar los servicios

```bash
# Levantar todo con Docker
docker compose up -d

# O para desarrollo: BD y backend en Docker, frontend local
docker compose up db backend -d
cd frontend && npm run dev
```

### Acceder a los servicios

| Servicio | URL |
|---|---|
| **Frontend (local)** | [http://localhost:3000](http://localhost:3000) |
| **Frontend (Docker)** | [http://localhost:3005](http://localhost:3005) |
| **Backend (NestJS API)** | [http://localhost:3001/api/v1](http://localhost:3001/api/v1) |
| **PostgreSQL** | `localhost:5432` |

### Crear usuario administrador

Usar Postman:

```bash
POST http://localhost:3001/api/v1/auth/register
{
  "nombre": "Admin Restaurante",
  "email": "admin@restaurante.com",
  "password": "admin123",
  "rol": "ADMINISTRADOR"
}
```

Luego iniciar sesión en `http://localhost:3000/login`.

---

### Ejecutar migraciones de Prisma

```bash
# Entrar al contenedor del backend
docker compose exec backend sh

# Ejecutar migraciones
npx prisma migrate dev

# Generar el cliente Prisma
npx prisma generate
```
---

## 📎 Enlaces Rápidos

| Recurso | Enlace |
|---|---|
| 📂 Repositorio | [GitHub](https://github.com/LizethC10/Grupo4_Caicedo_Puentes-) |
| 📌 Issues (todos) | [Ver Issues](https://github.com/LizethC10/Grupo4_Caicedo_Puentes-/issues) |
| 🏁 Sprint 1 | [Milestone](https://github.com/LizethC10/Grupo4_Caicedo_Puentes-/milestone/2) |
| 🏁 Sprint 2 | [Milestone](https://github.com/LizethC10/Grupo4_Caicedo_Puentes-/milestone/3) |
| 🏁 Sprint 3 | [Milestone](https://github.com/LizethC10/Grupo4_Caicedo_Puentes-/milestone/4) |
| 🏁 Sprint 4 | [Milestone](https://github.com/LizethC10/Grupo4_Caicedo_Puentes-/milestone/5) |
| 🏁 Sprint 5 | [Milestone](https://github.com/LizethC10/Grupo4_Caicedo_Puentes-/milestone/6) |

---

<p align="center">
  <strong>Programación Web — Ingeniería de Sistemas — 2026A</strong><br>
  <em>Corporación Universitaria del Huila — CORHUILA</em><br>
  <strong>Lizeth Lorena Caicedo Mora · Lilly Signey Puentes Rincón</strong>
</p>





