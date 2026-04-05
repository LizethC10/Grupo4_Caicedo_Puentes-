"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovimientosInventarioModule = void 0;
const common_1 = require("@nestjs/common");
const movimientos_inventario_controller_1 = require("./controller/movimientos-inventario.controller");
const movimiento_inventario_service_1 = require("./service/movimiento-inventario.service");
const movimientos_inventario_repository_1 = require("./repository/movimientos-inventario.repository");
let MovimientosInventarioModule = class MovimientosInventarioModule {
};
exports.MovimientosInventarioModule = MovimientosInventarioModule;
exports.MovimientosInventarioModule = MovimientosInventarioModule = __decorate([
    (0, common_1.Module)({
        controllers: [movimientos_inventario_controller_1.MovimientosInventarioController],
        providers: [movimiento_inventario_service_1.MovimientosInventarioService, movimientos_inventario_repository_1.MovimientosInventarioRepository],
        exports: [movimiento_inventario_service_1.MovimientosInventarioService, movimientos_inventario_repository_1.MovimientosInventarioRepository],
    })
], MovimientosInventarioModule);
//# sourceMappingURL=movimiento-inventario.module.js.map