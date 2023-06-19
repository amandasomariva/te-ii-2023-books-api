import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { TipoEnum } from './tipo.enum';
//import { Type } from 'class-transformer';

export class PassagemDto {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsEnum(TipoEnum)
  @IsOptional()
  tipo?: TipoEnum;

  @IsDateString()
  @IsOptional()
  dataIda?: Date | string;

  @IsDateString()
  @IsOptional()
  dataVolta?: Date | string;

  @IsString()
  @IsOptional()
  origem: string;

  @IsString()
  @IsOptional()
  destino: string;
}
