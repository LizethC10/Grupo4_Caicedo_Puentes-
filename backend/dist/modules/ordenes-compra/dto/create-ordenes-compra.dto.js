"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrdenesCompraDto = exports.EstadoOrdenCompraDto = void 0;
const class_validator_1 = require("class-validator");
var EstadoOrdenCompraDto;
(function (EstadoOrdenCompraDto) {
    EstadoOrdenCompraDto["PENDIENTE"] = "PENDIENTE";
    EstadoOrdenCompraDto["RECIBIDA"] = "RECIBIDA";
    EstadoOrdenCompraDto["CANCELADA"] = "CANCELADA";
})(EstadoOrdenCompraDto || (exports.EstadoOrdenCompraDto = EstadoOrdenCompraDto = {}));
class CreateOrdenesCompraDto {
}
exports.CreateOrdenesCompraDto = CreateOrdenesCompraDto;
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateOrdenesCompraDto.prototype, "proveedorId", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateOrdenesCompraDto.prototype, "fechaEmision", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(EstadoOrdenCompraDto),
    __metadata("design:type", String)
], CreateOrdenesCompraDto.prototype, "estado", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateOrdenesCompraDto.prototype, "total", void 0);
//# sourceMappingURL=create-ordenes-compra.dto.js.map