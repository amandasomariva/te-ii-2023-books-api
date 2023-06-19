import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ClienteEntity } from './cliente.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClienteDto } from './cliente.dto';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(ClienteEntity)
    private clienteRepository: Repository<ClienteEntity>,
  ) {}

  findAll(): Promise<ClienteEntity[]> {
    return this.clienteRepository.find();
  }

  async findById(id: string, relations: string[] = []): Promise<ClienteEntity> {
    const cliente = await this.clienteRepository.findOne({
      relations,
      where: { id },
    });
    if (!cliente) {
      throw new NotFoundException('Cliente não encontrada');
    }
    return cliente;
  }

  async remove(id: string) {
    const findById = await this.findById(id);
    await this.clienteRepository.remove(findById);
    return { ...findById, id };
  }

  async create(dto: ClienteDto) {
    this.validate(dto);
    this.validateCpf(dto);
    this.validateTelefone(dto);
    const newCliente = this.clienteRepository.create(dto);
    return this.clienteRepository.save(newCliente);
  }

  async update(dto: ClienteDto) {
    await this.findById(dto.id);
    this.validate(dto);
    this.validateCpf(dto);
    this.validateTelefone(dto);
    return this.clienteRepository.save(dto);
  }

  validate(dto: ClienteDto) {
    if (new Date().getTime() < new Date(dto.dataNascimento).getTime()) {
      throw new BadRequestException(
        'A data de nascimento do cliente não pode ser maior que a data atual',
      );
    }
  }

  testeCaracterTelefone: string;
  validateTelefone(dto: ClienteDto) {
    this.testeCaracterTelefone = dto.telefone;
    if (this.testeCaracterTelefone.length < 10) {
      throw new BadRequestException(
        'O telefone deve conter mais que 9 caracteres',
      );
    }
  }

  testeCaracterCpf: string;
  validateCpf(dto: ClienteDto) {
    this.testeCaracterCpf = dto.cpf;
    if (this.testeCaracterCpf.length < 11) {
      throw new BadRequestException('O cpf deve conter mais que 10 caracteres');
    }
  }

  async findPacotesByClienteId(id: string) {
    const cliente = await this.findById(id, ['pacotes']);
    return cliente.pacotes;
  }

  async qtdClientes(): Promise<number> {
    const qtdClientes = await this.clienteRepository.count();
    return qtdClientes;
  }
}
