"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDetalleOrdenDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_detalle_orden_dto_1 = require("./create-detalle-orden.dto");
class UpdateDetalleOrdenDto extends (0, mapped_types_1.PartialType)(create_detalle_orden_dto_1.CreateDetalleOrdenDto) {
}
exports.UpdateDetalleOrdenDto = UpdateDetalleOrdenDto;
//# sourceMappingURL=update-detalle-orden.dto.js.map