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


 ### Entidades

| Entidad | Campos Principales |
| :--- | :--- |
| **Categoría** | id, nombre (unique), descripcion |
| **Insumo** | id, nombre (unique), unidadMedida, precioActual, stockActual, stockMinimo, categoriaId (FK) |
| **Proveedor** | id, razonSocial, nit (unique), telefono, email, tiempoEntregaDias |
| **OrdenCompra** | id, proveedorId (FK), fechaEmision, estado (Pendiente/Recibida/Cancelada), total |
| **DetalleOrden** | id, ordenCompraId (FK), insumoId (FK), cantidad, precioUnitario (unique compound: orden-insumo) |
| **Receta** | id, nombre (unique), descripcion, porciones |
| **RecetaIngrediente** | id, recetaId (FK), insumoId (FK), cantidadRequerida (unique compound: receta-insumo) |
| **MovimientoInventario** | id, insumoId (FK), tipo (ENTRADA/SALIDA), cantidad, fecha, motivo |

---

## 🚀 Plan de Lanzamientos

### Release 1 — Segundo Corte: Base Backend + Frontend
> 📅 Cierre: 17 de Abril de 2026 · Sprints 1, 2 y 3
 #### Objetivo:
 Entregar la API REST con arquitectura en capas y el frontend base con los módulos fundamentales de categorías, insumos, proveedores, compras, recetas y navegación principal.
 
| Sprint | Período | HUs | Alcance |
| :--- | :--- | :--- | :--- |
| [Sprint 1](https://github.com/LizethC10/Grupo4_Caicedo_Puentes-/milestone/2) | 16 Mar → 29 Mar | HU-01, HU-02, HU-03 | Docker, Prisma, Categorías, Insumos, Proveedores |
| [Sprint 2](https://github.com/LizethC10/Grupo4_Caicedo_Puentes-/milestone/3) | 30 Mar → 10 Abr | HU-04, HU-05 | Órdenes de Compra, Recepción de mercancia |
| [Sprint 3](https://github.com/LizethC10/Grupo4_Caicedo_Puentes-/milestone/4) | 13 Abr → 17 Abr | HU-06, HU-07, HU-12 | Recetas, costos y layout base |


 ### Release 2 — Tercer Corte: Integración + Reportes
> 📅 Cierre: 22 de Mayo de 2026 · Sprints 4 y 5
   #### Objetivo:
   Integración completa frontend ↔ backend, flujos complejos (alertas, costeo), reportes y movimientos. Despliegue funcional con Docker.

| Sprint | Período | HUs | Alcance |
| :--- | :--- | :--- | :--- |
| [Sprint 4](https://github.com/LizethC10/Grupo4_Caicedo_Puentes-/milestone/5) | 20 Abr → 08 May | HU-08, HU-09, HU-10, HU-13 | Alertas, movimientos, mermas y dashboard |
| [Sprint 5](https://github.com/LizethC10/Grupo4_Caicedo_Puentes-/milestone/6) | 11 May → 22 May | HU-11, HU-14 | Reportes, autenticación, roles y cierre |
---
## 📌 Sprints e Historias de Usuario

### Sprint 1 — Gestión de Catálogos e Insumos

> 📅 **16 de marzo → 29 de marzo** · 🚫 **Festivo: 23 de marzo (San José)** · [Ver Milestone](https://github.com/LizethC10/Grupo4_Caicedo_Puentes-/milestone/2)

| # | Historia de Usuario | Etiquetas | Asunto |
|---|---|---|---|
| HU-01 | Registro de Insumos | `user-story` `backend` `frontend` | (https://github.com/LizethC10/Grupo4_Caicedo_Puentes-/issues/1) |
| HU-02 | Gestión de Proveedores | `user-story` `backend` `frontend` | (https://github.com/LizethC10/Grupo4_Caicedo_Puentes-/issues/2) |
| HU-03 | Categorización de Insumos | `user-story` `backend` `frontend` | (https://github.com/LizethC10/Grupo4_Caicedo_Puentes-/issues/3) |

**Entregables:**

- Docker Compose con PostgreSQL, NestJS y Next.js
- Prisma schema con entidades `Categoria`, `Insumo` y `Proveedor`
- Migraciones ejecutadas
- CRUD completo (Controller → Service → Repository) para categorías, insumos y proveedores
- Frontend: listados y formularios básicos

---

### Sprint 2 — Compras y Abastecimiento

> 📅 **30 de marzo → 10 de abril** · 🚫 **Festivos: 2 y 3 de abril (Semana Santa)** · [Ver Milestone](https://github.com/LizethC10/Grupo4_Caicedo_Puentes-/milestone/3)

| # | Historia de Usuario | Etiquetas | Asunto |
|---|---|---|---|
| HU-04 | Creación de Órdenes de Compra | `user-story` `backend` `frontend` | (https://github.com/LizethC10/Grupo4_Caicedo_Puentes-/issues/4) |
| HU-05 | Recepción de Mercancía | `user-story` `backend` |(https://github.com/LizethC10/Grupo4_Caicedo_Puentes-/issues/5) |

**Entregables:**

- CRUD de órdenes de compra y detalle de órdenes
- Asociación de un proveedor con múltiples insumos
- Validación de cantidades y lista de insumos no vacía
- Actualización automática del stock al recibir mercancía
- Registro automático de movimientos de inventario tipo entrada por compra

---

### Sprint 3 — Gestión de Menú y Frontend Base

> 📅 **13 de abril → 17 de abril** · 📝 **Cierre Segundo Corte: 17 de abril** · [Ver Milestone](https://github.com/LizethC10/Grupo4_Caicedo_Puentes-/milestone/4)

| # | Historia de Usuario | Etiquetas | Asunto |
|---|---|---|---|
| HU-06 | Configuración de Recetas (Escandallo) | `user-story` `backend` `frontend` | (https://github.com/LizethC10/Grupo4_Caicedo_Puentes-/issues/6) |
| HU-07 | Cálculo de Costos de Receta | `user-story` `backend` `frontend` | (https://github.com/LizethC10/Grupo4_Caicedo_Puentes-/issues/7) |
| HU-12 | Estructura de Navegación y Layout Base | `user-story` `frontend` | (https://github.com/LizethC10/Grupo4_Caicedo_Puentes-/issues/12)|

**Entregables:**

- CRUD de recetas
- Asociación de ingredientes con cantidades requeridas
- Validación para evitar ingredientes repetidos en una receta
- Cálculo dinámico del costo estimado de cada receta
- Layout base del sistema con navegación responsive
- Vistas CRUD conectadas mediante routing en Next.js

---

### Sprint 4 — Control, Trazabilidad y Dashboard

> 📅 **20 de abril → 8 de mayo** · 🚫 **Festivo: 1 de mayo (Día del Trabajo)** · [Ver Milestone](https://github.com/LizethC10/Grupo4_Caicedo_Puentes-/milestone/5)

| # | Historia de Usuario | Etiquetas | Asunto |
|---|---|---|---|
| HU-08 | Alertas de Stock Mínimo | `user-story` `backend` `frontend` |  (https://github.com/LizethC10/Grupo4_Caicedo_Puentes-/issues/8) |
| HU-09 | Trazabilidad de Movimientos | `user-story` `backend` `frontend` | (https://github.com/LizethC10/Grupo4_Caicedo_Puentes-/issues/9) |
| HU-10 | Registro de Mermas y Ajustes | `user-story` `backend` `frontend` | (https://github.com/LizethC10/Grupo4_Caicedo_Puentes-/issues/10)|
| HU-13 | Dashboard Principal y Panel de Alertas | `user-story` `frontend` `dashboard` | (https://github.com/LizethC10/Grupo4_Caicedo_Puentes-/issues/13) |

**Entregables:**

- Alertas visuales para stock crítico
- Filtro de insumos en estado crítico
- Consulta de movimientos por rango de fechas e insumo
- Registro manual de salidas por merma o ajuste
- Dashboard principal con resumen visual del inventario

---

### Sprint 5 — Reportes, Seguridad y Cierre

> 📅 **11 de mayo → 22 de mayo** · 🚫 **Festivo: 18 de mayo (Día de la Ascensión)** · 📝 **Cierre Tercer Corte: 22 de mayo** · [Ver Milestone](https://github.com/LizethC10/Grupo4_Caicedo_Puentes-/milestone/6)

| # | Historia de Usuario | Etiquetas | Asunto |
|---|---|---|---|
| HU-11 | Reportes de Consumo y Gastos | `user-story` `backend` `frontend` `reporte` | (https://github.com/LizethC10/Grupo4_Caicedo_Puentes-/issues/11) |
| HU-14 | Autenticación de Usuarios y Control de Acceso | `user-story` `backend` `frontend` `security` | (https://github.com/LizethC10/Grupo4_Caicedo_Puentes-/issues/14) |

**Entregables:**

- Reporte de insumos de mayor rotación
- Reporte de gastos por proveedor
- Inicio de sesión seguro con validación de credenciales
- Gestión de roles y control de acceso
- Persistencia de sesión
- Validación final del sistema con Docker Compose y pruebas de cierre
  
---

## 📅 Cronograma

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                    SEGUNDO CORTE (Release 1) — Cierre: 17 Abr 2026           │
│                          Backend + Frontend Base                             │
├─────────────────────┬─────────────────────┬──────────────────────────────────┤
│  Sprint 1           │    Sprint 2         │         Sprint 3                 │
│  Mar 16 → Mar 29    │  Mar 30 → Abr 10    │   Abr 13 → Abr 17                │
│                     │                     │                                  │
│ • Docker + Prisma   │ • Asignatura        │ • Matrícula                      │
│ • Estudiante        │ • Período           │ • Calificación                   │
│ • Docente           │ • Asignación Doc    │ • Common Module                  │
│ • Programa          │ • Filters/Pipes     │ • Frontend: listados y forms     │
│                     │                     │                                  │
│ 🚫 Mar 23          │ 🚫 Abr 2-3          │                                  │
│   (San José)        │   (Semana Santa)    │                                  │
├─────────────────────┴─────────────────────┴──────────────────────────────────┤
│                    TERCER CORTE (Release 2) — Cierre: 22 May 2026            │
│                          Integración + Reportes                              │
├────────────────────────────────────┬─────────────────────────────────────────┤
│        Sprint 4                    │          Sprint 5                       │
│        Abr 20 → May 8              │          May 11 → May 22                │
│                                    │                                         │
│ • Frontend matrículas              │ • Historial académico                   │
│ • Frontend calificaciones          │ • Reporte de matriculados               │
│ • Navegación y layout              │ • Promedio acumulado                    │
│ • Selects dinámicos                │ • Pruebas E2E                           │
│                                    │                                         │
│ 🚫 May 1                           │  🚫 May 18                             │
│   (Día del Trabajo)                │   (Día de la Ascensión)                 │
└────────────────────────────────────┴─────────────────────────────────────────┘
```

### Festivos Colombianos (Marzo — Mayo 2026)

| Fecha | Festivo | Sprint Afectado |
|---|---|---|
| Lunes 23 de Marzo | Día de San José | Sprint 1 |
| Jueves 2 de Abril | Jueves Santo | Sprint 2 |
| Viernes 3 de Abril | Viernes Santo | Sprint 2 |
| Viernes 1 de Mayo | Día del Trabajo | Sprint 4 |
| Lunes 18 de Mayo | Día de la Ascensión | Sprint 5 |

---
## ✅ Definición de Hecho (DoD)

> 📌 Referencia completa: [Issue #15 — Definition of Done](https://github.com/LizethC10/Grupo4_Caicedo_Puentes-/issues/15)

Cada Historia de Usuario se considera terminada cuando cumple todos los siguientes criterios:

### Backend
- [ ] Endpoints implementados con arquitectura en capas: Controlador → Servicio → Repositorio
- [ ] DTOs con validaciones usando class-validator y class-transformer
- [ ] Manejo de errores con excepciones HTTP apropiadas (NotFoundException, ConflictException, BadRequestException)
- [ ] Respuestas con formato uniforme (interceptor aplicado)
- [ ] Endpoint probado manualmente con Postman o Thunder Client y funcionando correctamente

### Frontend
- [ ] Páginas implementadas con componentes reutilizables
- [ ] Consumo del API a través de la capa de services/
- [ ] Manejo de estados: carga (loading), éxito y error
- [ ] Formularios con validación del lado del cliente
- [ ] Diseño responsivo y navegable

### Infraestructura y Código
- [ ] Código versionado en GitHub con commits descriptivos
- [ ] El servicio funciona correctamente con docker compose up
- [ ] No hay errores de consola ni advertencias críticas
- [ ] Las migraciones de Prisma están aplicadas y el esquema es consistente

---
## 📊 Tablero Kanban

El seguimiento del proyecto se realiza mediante un tablero Kanban en GitHub Projects:

🔗 **[Ver Tablero Kanban]()**

El tablero incluye:
- **Columnas:** Todo → In Progress → Done
- **Campos personalizados:** Sprint, Release, Prioridad
- **Vistas:** Board (Kanban), Table, Roadmap

---

## ⚙ Instalación y Ejecución

### Prerrequisitos

- [Docker](https://www.docker.com/products/docker-desktop/) y Docker Compose instalados
- [Git](https://git-scm.com/downloads)

### Clonar el repositorio

```bash
git clone (https://github.com/LizethC10/Grupo4_Caicedo_Puentes-.git)
cd  LizethC10/Grupo4_Caicedo_Puentes-
```

### Configurar variables de entorno

```bash
# Copiar el archivo de ejemplo
cp .env.example .env
```

```env
# .env.example
DB_USER=admin
DB_PASSWORD=admin123
DB_NAME=gestion_academica_db
```

### Levantar los servicios

```bash
# Levantar todos los servicios con Docker Compose
docker compose up

# O en modo detached (segundo plano)
docker compose up -d
```

### Acceder a los servicios

| Servicio | URL |
|---|---|
| **Frontend (Next.js)** | [http://localhost:3000](http://localhost:3000) |
| **Backend (NestJS API)** | [http://localhost:3001](http://localhost:3001) |
| **PostgreSQL** | `localhost:5432` |

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
| 📋 Tablero Kanban | |
| 📌 Issues (todos) | [Ver Issues](https://github.com/LizethC10/Grupo4_Caicedo_Puentes-/issues) |
| 🏁 Sprint 1 | [Milestone](https://github.com/LizethC10/Grupo4_Caicedo_Puentes-/milestone/2) |
| 🏁 Sprint 2 | [Milestone](https://github.com/LizethC10/Grupo4_Caicedo_Puentes-/milestone/3) |
| 🏁 Sprint 3 | [Milestone](https://github.com/LizethC10/Grupo4_Caicedo_Puentes-/milestone/4) |
| 🏁 Sprint 4 | [Milestone](https://github.com/LizethC10/Grupo4_Caicedo_Puentes-/milestone/5) |
| 🏁 Sprint 5 | [Milestone](https://github.com/LizethC10/Grupo4_Caicedo_Puentes-/milestone/6) |
| ✅ Definición de Hecho (DoD) | [Issue #15](https://github.com/LizethC10/Grupo4_Caicedo_Puentes-/issues/15) |

---

<p align="center">
  <strong>Programación Web — Ingeniería de Sistemas — 2026A</strong><br>
  <em>Corporación Universitaria del Huila — CORHUILA</em>
</p>





