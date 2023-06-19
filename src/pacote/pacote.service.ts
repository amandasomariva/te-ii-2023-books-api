import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PacoteEntity } from './pacote.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PacoteDto } from './pacote.dto';

@Injectable()
export class PacoteService {
  constructor(
    @InjectRepository(PacoteEntity)
    private pacoteRepository: Repository<PacoteEntity>,
  ) {}

  findAll(): Promise<PacoteEntity[]> {
    return this.pacoteRepository.find();
  }

  async findById(id: string): Promise<PacoteEntity> {
    const findOne = await this.pacoteRepository.findOne({ where: { id } });
    if (findOne == null) {
      throw new NotFoundException(
        `Pacote não encontrado com o identificador ${id}`,
      );
    }
    return findOne;
  }

  async remove(id: string) {
    const findById = await this.findById(id);
    await this.pacoteRepository.remove(findById);
    return { ...findById, id };
  }

  async create(dto: PacoteDto) {
    this.validate(dto);
    this.validateRoteiro(dto);
    this.validateCliente(dto);
    this.validatePassagem(dto);
    const newPacote = this.pacoteRepository.create(dto);
    return this.pacoteRepository.save(newPacote);
  }

  async update(dto: PacoteDto) {
    await this.findById(dto.id);
    this.validate(dto);
    this.validateRoteiro(dto);
    this.validateCliente(dto);
    this.validatePassagem(dto);
    return this.pacoteRepository.save(dto);
  }

  validate(dto: PacoteDto) {
    if (dto.valor < 100) {
      throw new BadRequestException(
        'O valor do pacote não pode ser menor que 100 reais',
      );
    }
  }

  testeCaracter: string;
  validateRoteiro(dto: PacoteDto) {
    this.testeCaracter = dto.roteiro;
    if (this.testeCaracter.length < 10) {
      throw new BadRequestException(
        'O roteiro deve conter mais que 10 caracteres',
      );
    }
  }

  validateCliente(dto: PacoteDto) {
    //console.table(dto);
    if (dto.cliente == null || dto.cliente.id == null) {
      throw new BadRequestException('É obrigatório informar o cliente');
    }
  }

  validatePassagem(dto: PacoteDto) {
    //console.table(dto);
    if (dto.passagem == null || dto.passagem.id == null) {
      throw new BadRequestException('É obrigatório informar a passagem');
    }
  }

  async qtdPacotes(): Promise<number> {
    const qtdPacotes = await this.pacoteRepository.count();
    return qtdPacotes;
  }
}
