import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PacoteService } from './pacote.service';
import { PacoteEntity } from './pacote.entity';
import { PacoteDto } from './pacote.dto';

@Controller('pacotes')
export class PacoteController {
  constructor(private pacoteService: PacoteService) {}

  @Get()
  findAll(): Promise<PacoteEntity[]> {
    return this.pacoteService.findAll();
  }

  @Get('qtdPacotes')
  qtdPacotes(): Promise<number> {
    return this.pacoteService.qtdPacotes();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.pacoteService.findById(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.pacoteService.remove(id);
  }

  @Post()
  create(@Body() dto: PacoteDto) {
    return this.pacoteService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: PacoteDto) {
    return this.pacoteService.update({ ...dto, id });
  }
}
