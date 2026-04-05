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
exports.ProveedorRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let ProveedorRepository = class ProveedorRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll() {
        return this.prisma.proveedor.findMany({ orderBy: { id: 'desc' } });
    }
    findById(id) {
        return this.prisma.proveedor.findUnique({ where: { id } });
    }
    findByNit(nit) {
        return this.prisma.proveedor.findUnique({ where: { nit } });
    }
    create(dto) {
        return this.prisma.proveedor.create({
            data: {
                ...dto,
                telefono: dto.telefono ?? null,
                email: dto.email ?? null,
            },
        });
    }
    update(id, dto) {
        return this.prisma.proveedor.update({
            where: { id },
            data: dto,
        });
    }
    remove(id) {
        return this.prisma.proveedor.delete({ where: { id } });
    }
};
exports.ProveedorRepository = ProveedorRepository;
exports.ProveedorRepository = ProveedorRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProveedorRepository);
//# sourceMappingURL=proveedor.repository.js.map