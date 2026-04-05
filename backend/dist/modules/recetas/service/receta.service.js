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
exports.RecetaService = void 0;
const common_1 = require("@nestjs/common");
const receta_repository_1 = require("../repository/receta.repository");
let RecetaService = class RecetaService {
    constructor(repository) {
        this.repository = repository;
    }
    findAll() {
        return this.repository.findAll();
    }
    async findOne(id) {
        const receta = await this.repository.findById(id);
        if (!receta)
            throw new common_1.NotFoundException('Receta no encontrada');
        return receta;
    }
    async create(dto) {
        const existe = await this.repository.findByNombre(dto.nombre);
        if (existe)
            throw new common_1.ConflictException('Ya existe una receta con ese nombre');
        return this.repository.create(dto);
    }
    async update(id, dto) {
        await this.findOne(id);
        if (dto.nombre) {
            const existe = await this.repository.findByNombre(dto.nombre);
            if (existe && existe.id !== id) {
                throw new common_1.ConflictException('Ya existe una receta con ese nombre');
            }
        }
        return this.repository.update(id, dto);
    }
    async remove(id) {
        await this.findOne(id);
        return this.repository.remove(id);
    }
};
exports.RecetaService = RecetaService;
exports.RecetaService = RecetaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [receta_repository_1.RecetaRepository])
], RecetaService);
//# sourceMappingURL=receta.service.js.map