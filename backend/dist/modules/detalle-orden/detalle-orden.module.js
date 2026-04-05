"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetalleOrdenModule = void 0;
const common_1 = require("@nestjs/common");
const detalle_orden_controller_1 = require("./controller/detalle-orden.controller");
const detalle_orden_service_1 = require("./service/detalle-orden.service");
const detalle_orden_repository_1 = require("./repository/detalle-orden.repository");
let DetalleOrdenModule = class DetalleOrdenModule {
};
exports.DetalleOrdenModule = DetalleOrdenModule;
exports.DetalleOrdenModule = DetalleOrdenModule = __decorate([
    (0, common_1.Module)({
        controllers: [detalle_orden_controller_1.DetalleOrdenController],
        providers: [detalle_orden_service_1.DetalleOrdenService, detalle_orden_repository_1.DetalleOrdenRepository],
        exports: [detalle_orden_service_1.DetalleOrdenService, detalle_orden_repository_1.DetalleOrdenRepository],
    })
], DetalleOrdenModule);
//# sourceMappingURL=detalle-orden.module.js.map