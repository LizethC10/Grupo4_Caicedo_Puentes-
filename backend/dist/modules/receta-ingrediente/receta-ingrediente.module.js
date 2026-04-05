"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecetaIngredienteModule = void 0;
const common_1 = require("@nestjs/common");
const receta_ingrediente_controller_1 = require("./controller/receta-ingrediente.controller");
const receta_ingrediente_service_1 = require("./service/receta-ingrediente.service");
const receta_ingrediente_repository_1 = require("./repository/receta-ingrediente.repository");
let RecetaIngredienteModule = class RecetaIngredienteModule {
};
exports.RecetaIngredienteModule = RecetaIngredienteModule;
exports.RecetaIngredienteModule = RecetaIngredienteModule = __decorate([
    (0, common_1.Module)({
        controllers: [receta_ingrediente_controller_1.RecetaIngredienteController],
        providers: [receta_ingrediente_service_1.RecetaIngredienteService, receta_ingrediente_repository_1.RecetaIngredienteRepository],
        exports: [receta_ingrediente_service_1.RecetaIngredienteService, receta_ingrediente_repository_1.RecetaIngredienteRepository],
    })
], RecetaIngredienteModule);
//# sourceMappingURL=receta-ingrediente.module.js.map