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
exports.MovimientosInventarioRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let MovimientosInventarioRepository = class MovimientosInventarioRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll() {
        return this.prisma.movimientoInventario.findMany({
            include: { insumo: true },
            orderBy: { id: 'desc' },
        });
    }
    findById(id) {
        return this.prisma.movimientoInventario.findUnique({
            where: { id },
            include: { insumo: true },
        });
    }
    create(dto) {
        return this.prisma.movimientoInventario.create({
            data: {
                insumoId: dto.insumoId,
                tipo: dto.tipo,
                cantidad: dto.cantidad,
                fecha: new Date(dto.fecha),
                motivo: dto.motivo,
            },
        });
    }
    update(id, dto) {
        return this.prisma.movimientoInventario.update({
            where: { id },
            data: {
                ...(dto.insumoId !== undefined && { insumoId: dto.insumoId }),
                ...(dto.tipo !== undefined && { tipo: dto.tipo }),
                ...(dto.cantidad !== undefined && { cantidad: dto.cantidad }),
                ...(dto.fecha !== undefined && { fecha: new Date(dto.fecha) }),
                ...(dto.motivo !== undefined && { motivo: dto.motivo }),
            },
        });
    }
    remove(id) {
        return this.prisma.movimientoInventario.delete({ where: { id } });
    }
};
exports.MovimientosInventarioRepository = MovimientosInventarioRepository;
exports.MovimientosInventarioRepository = MovimientosInventarioRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MovimientosInventarioRepository);
//# sourceMappingURL=movimientos-inventario.repository.js.map