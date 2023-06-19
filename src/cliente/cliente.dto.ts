import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { GeneroEnum } from './genero.enum';
//import { Type } from 'class-transformer';

export class ClienteDto {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsString()
  @IsOptional()
  nome: string;

  @IsDateString()
  @IsOptional()
  dataNascimento?: Date | string;

  @IsEnum(GeneroEnum)
  @IsOptional()
  genero?: GeneroEnum;

  @IsString()
  @IsOptional()
  cpf: string;

  @IsString()
  @IsOptional()
  telefone: string;
}
