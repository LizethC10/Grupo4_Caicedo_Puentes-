"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOrdenesCompraDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_ordenes_compra_dto_1 = require("./create-ordenes-compra.dto");
class UpdateOrdenesCompraDto extends (0, mapped_types_1.PartialType)(create_ordenes_compra_dto_1.CreateOrdenesCompraDto) {
}
exports.UpdateOrdenesCompraDto = UpdateOrdenesCompraDto;
//# sourceMappingURL=update-ordenes-compra.dto.js.map