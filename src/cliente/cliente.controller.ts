import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteEntity } from './cliente.entity';
import { ClienteDto } from './cliente.dto';
import { PacoteEntity } from 'src/pacote/pacote.entity';

@Controller('clientes')
export class ClienteController {
  constructor(private clienteService: ClienteService) {}

  @Get()
  findAll(): Promise<ClienteEntity[]> {
    return this.clienteService.findAll();
  }

  @Get('qtdClientes')
  qtdClientes(): Promise<number> {
    return this.clienteService.qtdClientes();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.clienteService.findById(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.clienteService.remove(id);
  }

  @Post()
  create(@Body() dto: ClienteDto) {
    return this.clienteService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: ClienteDto) {
    return this.clienteService.update({ ...dto, id });
  }

  @Get(':id/pacotes')
  findPacotesByCliente(@Param('id') id: string): Promise<PacoteEntity[]> {
    return this.clienteService.findPacotesByClienteId(id);
  }
}
