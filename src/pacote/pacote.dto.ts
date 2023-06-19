import {
  //IsDateString,
  IsNumber,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { AgenteEnum } from './agente.enum';
import { Type } from 'class-transformer';
import { ClienteDto } from 'src/cliente/cliente.dto';
import { PassagemDto } from 'src/passagem/passagem.dto';
//import { Double } from 'typeorm';

export class PacoteDto {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsOptional()
  @Type(() => ClienteDto)
  @ValidateNested()
  cliente?: ClienteDto;

  @IsOptional()
  @Type(() => PassagemDto)
  @ValidateNested()
  passagem?: PassagemDto;

  @IsString()
  @IsNotEmpty()
  roteiro: string;

  @IsNumber()
  @IsNotEmpty()
  valor: number;

  @IsEnum(AgenteEnum)
  @IsOptional()
  agente?: AgenteEnum;
}
