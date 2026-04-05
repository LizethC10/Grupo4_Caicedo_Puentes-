"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdenesCompraModule = void 0;
const common_1 = require("@nestjs/common");
const ordenes_compra_controller_1 = require("./controller/ordenes-compra.controller");
const ordenes_compra_service_1 = require("./service/ordenes-compra.service");
const ordenes_compra_repository_1 = require("./repository/ordenes-compra.repository");
let OrdenesCompraModule = class OrdenesCompraModule {
};
exports.OrdenesCompraModule = OrdenesCompraModule;
exports.OrdenesCompraModule = OrdenesCompraModule = __decorate([
    (0, common_1.Module)({
        controllers: [ordenes_compra_controller_1.OrdenesCompraController],
        providers: [ordenes_compra_service_1.OrdenesCompraService, ordenes_compra_repository_1.OrdenesCompraRepository],
        exports: [ordenes_compra_service_1.OrdenesCompraService, ordenes_compra_repository_1.OrdenesCompraRepository],
    })
], OrdenesCompraModule);
//# sourceMappingURL=ordenes-compra.module.js.map