import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PassagemService } from './passagem.service';
import { PassagemEntity } from './passagem.entity';
import { PassagemDto } from './passagem.dto';
import { PacoteEntity } from 'src/pacote/pacote.entity';

@Controller('passagens')
export class PassagemController {
  constructor(private passagemService: PassagemService) {}

  @Get()
  findAll(): Promise<PassagemEntity[]> {
    return this.passagemService.findAll();
  }

  @Get('qtdPassagens')
  qtdPassagens(): Promise<number> {
    return this.passagemService.qtdPassagens();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.passagemService.findById(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.passagemService.remove(id);
  }

  @Post()
  create(@Body() dto: PassagemDto) {
    return this.passagemService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: PassagemDto) {
    return this.passagemService.update({ ...dto, id });
  }

  @Get(':id/pacotes')
  findPacotesByPassagem(@Param('id') id: string): Promise<PacoteEntity[]> {
    return this.passagemService.findPacotesByPassagemId(id);
  }
}
