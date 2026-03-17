🍽️ Sistema de Inventario para Restaurante

Proyecto Full-Stack — Programación Web 2026A

NestJS · Next.js · PostgreSQL · Prisma · Docker

📋 Tabla de Contenidos

Descripción del Proyecto

Contexto

Alcance

Funcionalidades

Stack Tecnológico

Arquitectura

Estructura del Proyecto

Modelo de Datos

Casos de Uso

Plan de Desarrollo (Sprints)

Definición de Hecho (DoD)

Instalación y Ejecución

Autores

📖 Descripción del Proyecto

El Sistema de Inventario para Restaurante es una aplicación web full-stack que permite gestionar de manera eficiente los insumos, proveedores, órdenes de compra y recetas de un restaurante.

El sistema automatiza procesos clave como el control de stock, cálculo de costos y generación de reportes, optimizando la operación diaria del negocio.

🎯 Contexto

Un restaurante en crecimiento presenta dificultades como:

Falta de control de inventario

Desconocimiento de insumos agotados

Procesos manuales de compra

Dificultad para calcular costos de recetas

Este sistema surge como solución para mejorar la gestión operativa y la toma de decisiones.

📌 Alcance
Aspecto	Detalle
Tipo	Proyecto académico guiado
Enfoque	Inventario + Compras + Recetas
Entidades	8 entidades principales
Casos de uso	10 funcionalidades
Arquitectura	Modular en capas
⚙️ Funcionalidades Principales

✅ CRUD de Insumos, Categorías y Proveedores
✅ Gestión de órdenes de compra
✅ Actualización automática de inventario
✅ Registro de recetas con ingredientes
✅ Cálculo de costo de recetas
✅ Alertas de stock mínimo
✅ Historial de movimientos de inventario
✅ Reportes de consumo y gastos

🛠 Stack Tecnológico
Capa	Tecnología	Uso
Backend	NestJS	API REST
Frontend	Next.js	Interfaz
Base de Datos	PostgreSQL	Persistencia
ORM	Prisma	Modelado
Contenedores	Docker	Ejecución
Lenguaje	TypeScript	Desarrollo
🏗 Arquitectura

El sistema implementa una arquitectura modular en capas, basada en separación de responsabilidades:

Cliente → Controller → Service → Repository → Prisma → PostgreSQL

🔹 Capas

Controller: Manejo de solicitudes HTTP

Service: Lógica de negocio

Repository: Acceso a datos

Prisma: ORM para consultas

Base de Datos: PostgreSQL

📂 Estructura del Proyecto
proyecto/
├── docker-compose.yml
├── .env.example

├── backend/
│   ├── src/
│   │   ├── common/                 # Filtros, pipes, interceptores
│   │   ├── config/                 # Configuración global
│   │   ├── prisma/                 # Conexión a BD
│   │   ├── shared/                 # Utilidades
│   │   └── modules/
│   │       ├── insumo/
│   │       ├── proveedor/
│   │       ├── orden-compra/
│   │       ├── receta/
│   │       ├── categoria/
│   │       └── movimiento-inventario/
│   └── prisma/
│       └── schema.prisma

├── frontend/
│   ├── src/
│   │   ├── app/                    # Rutas
│   │   ├── components/             # UI global
│   │   ├── modules/                # Lógica por dominio
│   │   ├── services/               # API
│   │   ├── hooks/
│   │   └── interfaces/
│   └── package.json

└── README.md
🧩 Modelo de Datos
🔗 Relaciones

Insumo → pertenece a → Categoría

Proveedor → suministra → Insumos

OrdenCompra → contiene → DetalleOrden

Receta → contiene → Ingredientes

MovimientoInventario → registra → entradas/salidas

📊 Entidades

Insumo

id, nombre, stockActual, stockMinimo, unidadMedida, categoriaId

Categoria

id, nombre

Proveedor

id, nombre, contacto, telefono, email

OrdenCompra

id, proveedorId, fecha, estado

DetalleOrden

id, ordenId, insumoId, cantidad, precio

Receta

id, nombre, descripcion

RecetaIngrediente

id, recetaId, insumoId, cantidad

MovimientoInventario

id, insumoId, tipo, cantidad, fecha

📌 Casos de Uso
Código	Descripción
CU-01	Registrar insumos
CU-02	Gestionar proveedores
CU-03	Crear orden de compra
CU-04	Registrar recepción
CU-05	Crear recetas
CU-06	Calcular costo
CU-07	Alertar stock mínimo
CU-08	Consultar movimientos
CU-09	Categorizar insumos
CU-10	Reportes de consumo
🚀 Plan de Desarrollo (Sprints)
🟢 Sprint 1

CRUD Insumos

CRUD Categorías

Configuración Prisma

🟡 Sprint 2

CRUD Proveedores

Órdenes de compra

Detalle de órdenes

🟠 Sprint 3

Recetas e ingredientes

Cálculo de costos

🔵 Sprint 4

Movimientos de inventario

Alertas de stock

🔴 Sprint 5

Reportes

Integración completa

✅ Definición de Hecho (DoD)
Backend

Arquitectura en capas implementada

DTOs con validación

Manejo de errores adecuado

Endpoints funcionales

Frontend

Formularios funcionales

Consumo correcto de API

Manejo de estados

Diseño responsive

Infraestructura

Docker funcionando correctamente

Migraciones aplicadas

Código versionado en GitHub

⚙️ Instalación y Ejecución
🔹 Prerrequisitos

Docker

Git

🔹 Clonar repositorio
git clone https://github.com/tu-repo/inventario-restaurante.git
cd inventario-restaurante
🔹 Configurar variables de entorno
cp .env.example .env

Ejemplo:

DB_USER=admin
DB_PASSWORD=admin123
DB_NAME=inventario_db
🔹 Levantar servicios
docker compose up
🔹 Ejecutar migraciones
docker compose exec backend sh

npx prisma migrate dev
npx prisma generate
🔹 Acceso a la aplicación
Servicio	URL
Frontend	http://localhost:3000

Backend	http://localhost:3001

PostgreSQL	localhost:5432
👩‍💻 Autores

Lizeth Lorena Caicedo Mora

Lilly Signey Puentes Rincón

🎓 Información Académica

Programa: Ingeniería de Sistemas
Asignatura: Programación Web
Periodo: 2026A
Institución: CORHUILA

⭐ Notas Finales

Este proyecto aplica buenas prácticas como:

Arquitectura modular

Separación de responsabilidades

Uso de ORM (Prisma)

Contenerización con Docker

Desarrollo full-stack moderno
