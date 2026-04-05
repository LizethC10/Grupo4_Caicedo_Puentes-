"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRecetaIngredienteDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_receta_ingrediente_dto_1 = require("./create-receta-ingrediente.dto");
class UpdateRecetaIngredienteDto extends (0, mapped_types_1.PartialType)(create_receta_ingrediente_dto_1.CreateRecetaIngredienteDto) {
}
exports.UpdateRecetaIngredienteDto = UpdateRecetaIngredienteDto;
//# sourceMappingURL=update-receta-ingrediente.dto.js.map