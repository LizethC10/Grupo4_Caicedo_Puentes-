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

Estudiante          1 ──── N  Matricula
Docente             1 ──── N  AsignacionDocente
ProgramaAcademico   1 ──── N  Estudiante
ProgramaAcademico   1 ──── N  Asignatura
Asignatura          1 ──── N  AsignacionDocente
PeriodoAcademico    1 ──── N  AsignacionDocente
AsignacionDocente   1 ──── N  Matricula
Matricula           1 ──── 1  Calificacion
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
| **MovInventario** | id, insumoId (FK), tipo (ENTRADA/SALIDA), cantidad, fecha, motivo |

---

## 🚀 Plan de Lanzamientos

### Release 1 — Segundo Corte: Base Backend + Frontend
> 📅 Cierre: 17 de Abril de 2026 · Sprints 1, 2 y 3
 #### Objetivo:
  Entregar la API REST con la arquitectura en capas y el frontend con las vistas CRUD para insumos, proveedores, categorías y gestión básica de órdenes de compra.


| Sprint | Período | HUs | Alcance |
| :--- | :--- | :--- | :--- |
| **Sprint 1** | 16 Mar → 29 Mar | HU-01, HU-02, HU-03 | Docker, Prisma, Categorías, Insumos, Proveedores |
| **Sprint 2** | 30 Mar → 10 Abr | HU-04, HU-05, HU-11 | Órdenes de Compra, Recepción, Módulo Común |
| **Sprint 3** | 13 Abr → 17 Abr | HU-06, HU-07, HU-12 | Recetas, Cálculo de Costos, Base Frontend |


 ### Release 2 — Tercer Corte: Integración + Reportes
> 📅 Cierre: 22 de Mayo de 2026 · Sprints 4 y 5
   #### Objetivo:
   Integración completa frontend ↔ backend, flujos complejos (alertas, costeo), reportes y movimientos. Despliegue funcional con Docker.

| Sprint | Período | HUs | Alcance |
| :--- | :--- | :--- | :--- |
| **Sprint 4** | 20 Abr → 08 May | HU-08, HU-13 | Frontend avanzado, Alertas de stock mínimo, Layout |
| **Sprint 5** | 11 May → 22 May | HU-09, HU-10 | Movimientos de inventario, Reportes, Pruebas E2E |
---
## 📌 Sprints e Historias de Usuario

Para ver el detalle completo de los Criterios de Aceptación, consultar los Issues en GitHub.

---






