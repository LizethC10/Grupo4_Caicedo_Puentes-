import { PartialType } from '@nestjs/mapped-types';
import { CreateRecetaIngredienteDto } from './create-receta-ingrediente.dto';

export class UpdateRecetaIngredienteDto extends PartialType(CreateRecetaIngredienteDto) {}