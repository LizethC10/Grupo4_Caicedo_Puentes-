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

