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
exports.CategoriaService = void 0;
const common_1 = require("@nestjs/common");
const categoria_repository_1 = require("../repository/categoria.repository");
let CategoriaService = class CategoriaService {
    constructor(categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }
    findAll() {
        return this.categoriaRepository.findAll();
    }
    async findOne(id) {
        const categoria = await this.categoriaRepository.findById(id);
        if (!categoria) {
            throw new common_1.NotFoundException(`La categoría con id ${id} no existe`);
        }
        return categoria;
    }
    async create(dto) {
        const existe = await this.categoriaRepository.findByNombre(dto.nombre);
        if (existe) {
            throw new common_1.ConflictException(`Ya existe una categoría con el nombre "${dto.nombre}"`);
        }
        return this.categoriaRepository.create(dto);
    }
    async update(id, dto) {
        await this.findOne(id);
        if (dto.nombre) {
            const existe = await this.categoriaRepository.findByNombre(dto.nombre);
            if (existe && existe.id !== id) {
                throw new common_1.ConflictException(`Ya existe una categoría con el nombre "${dto.nombre}"`);
            }
        }
        return this.categoriaRepository.update(id, dto);
    }
    async remove(id) {
        await this.findOne(id);
        return this.categoriaRepository.remove(id);
    }
};
exports.CategoriaService = CategoriaService;
exports.CategoriaService = CategoriaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [categoria_repository_1.CategoriaRepository])
], CategoriaService);
//# sourceMappingURL=categoria.service.js.map