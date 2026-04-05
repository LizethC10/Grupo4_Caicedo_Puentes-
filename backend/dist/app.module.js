"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("./prisma/prisma.module");
const categorias_module_1 = require("./modules/categorias/categorias.module");
const insumos_module_1 = require("./modules/insumos/insumos.module");
const proveedores_module_1 = require("./modules/proveedores/proveedores.module");
const ordenes_compra_module_1 = require("./modules/ordenes-compra/ordenes-compra.module");
const detalle_orden_module_1 = require("./modules/detalle-orden/detalle-orden.module");
const recetas_module_1 = require("./modules/recetas/recetas.module");
const receta_ingrediente_module_1 = require("./modules/receta-ingrediente/receta-ingrediente.module");
const movimiento_inventario_module_1 = require("./modules/movimientos-inventario/movimiento-inventario.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            categorias_module_1.CategoriasModule,
            insumos_module_1.InsumosModule,
            proveedores_module_1.ProveedoresModule,
            ordenes_compra_module_1.OrdenesCompraModule,
            detalle_orden_module_1.DetalleOrdenModule,
            recetas_module_1.RecetasModule,
            receta_ingrediente_module_1.RecetaIngredienteModule,
            movimiento_inventario_module_1.MovimientosInventarioModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map