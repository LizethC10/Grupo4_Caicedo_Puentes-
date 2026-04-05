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
exports.OrdenesCompraRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let OrdenesCompraRepository = class OrdenesCompraRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll() {
        return this.prisma.ordenCompra.findMany({
            include: { proveedor: true, detalles: true },
            orderBy: { id: 'desc' },
        });
    }
    findById(id) {
        return this.prisma.ordenCompra.findUnique({
            where: { id },
            include: { proveedor: true, detalles: true },
        });
    }
    create(dto) {
        return this.prisma.ordenCompra.create({
            data: {
                proveedorId: dto.proveedorId,
                fechaEmision: new Date(dto.fechaEmision),
                estado: dto.estado,
                total: dto.total,
            },
        });
    }
    update(id, dto) {
        return this.prisma.ordenCompra.update({
            where: { id },
            data: {
                ...(dto.proveedorId !== undefined && { proveedorId: dto.proveedorId }),
                ...(dto.fechaEmision !== undefined && { fechaEmision: new Date(dto.fechaEmision) }),
                ...(dto.estado !== undefined && { estado: dto.estado }),
                ...(dto.total !== undefined && { total: dto.total }),
            },
        });
    }
    remove(id) {
        return this.prisma.ordenCompra.delete({ where: { id } });
    }
};
exports.OrdenesCompraRepository = OrdenesCompraRepository;
exports.OrdenesCompraRepository = OrdenesCompraRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrdenesCompraRepository);
//# sourceMappingURL=ordenes-compra.repository.js.map