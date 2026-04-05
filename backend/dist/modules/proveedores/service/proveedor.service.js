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
exports.ProveedorService = void 0;
const common_1 = require("@nestjs/common");
const proveedor_repository_1 = require("../repository/proveedor.repository");
let ProveedorService = class ProveedorService {
    constructor(repository) {
        this.repository = repository;
    }
    findAll() {
        return this.repository.findAll();
    }
    async findOne(id) {
        const proveedor = await this.repository.findById(id);
        if (!proveedor)
            throw new common_1.NotFoundException('Proveedor no encontrado');
        return proveedor;
    }
    async create(dto) {
        const existe = await this.repository.findByNit(dto.nit);
        if (existe)
            throw new common_1.ConflictException('Ya existe un proveedor con ese NIT');
        return this.repository.create(dto);
    }
    async update(id, dto) {
        await this.findOne(id);
        if (dto.nit) {
            const existe = await this.repository.findByNit(dto.nit);
            if (existe && existe.id !== id) {
                throw new common_1.ConflictException('Ya existe un proveedor con ese NIT');
            }
        }
        return this.repository.update(id, dto);
    }
    async remove(id) {
        await this.findOne(id);
        return this.repository.remove(id);
    }
};
exports.ProveedorService = ProveedorService;
exports.ProveedorService = ProveedorService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [proveedor_repository_1.ProveedorRepository])
], ProveedorService);
//# sourceMappingURL=proveedor.service.js.map