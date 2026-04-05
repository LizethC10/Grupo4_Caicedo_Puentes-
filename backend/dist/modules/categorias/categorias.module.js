"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriasModule = void 0;
const common_1 = require("@nestjs/common");
const categorias_controller_1 = require("./controller/categorias.controller");
const categoria_service_1 = require("./service/categoria.service");
const categoria_repository_1 = require("./repository/categoria.repository");
let CategoriasModule = class CategoriasModule {
};
exports.CategoriasModule = CategoriasModule;
exports.CategoriasModule = CategoriasModule = __decorate([
    (0, common_1.Module)({
        controllers: [categorias_controller_1.CategoriasController],
        providers: [categoria_service_1.CategoriaService, categoria_repository_1.CategoriaRepository],
        exports: [categoria_service_1.CategoriaService, categoria_repository_1.CategoriaRepository],
    })
], CategoriasModule);
//# sourceMappingURL=categorias.module.js.map