import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PassagemEntity } from './passagem.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PassagemDto } from './passagem.dto';

@Injectable()
export class PassagemService {
  constructor(
    @InjectRepository(PassagemEntity)
    private passagemRepository: Repository<PassagemEntity>,
  ) {}

  findAll(): Promise<PassagemEntity[]> {
    return this.passagemRepository.find();
  }

  async findById(
    id: string,
    relations: string[] = [],
  ): Promise<PassagemEntity> {
    const passagem = await this.passagemRepository.findOne({
      relations,
      where: { id },
    });
    if (!passagem) {
      throw new NotFoundException('Passagem não encontrada');
    }
    return passagem;
  }

  async remove(id: string) {
    const findById = await this.findById(id);
    await this.passagemRepository.remove(findById);
    return { ...findById, id };
  }

  async create(dto: PassagemDto) {
    this.validateIda(dto);
    this.validateVolta(dto);
    this.validateOrigem(dto);
    this.validateDestino(dto);
    const newPassagem = this.passagemRepository.create(dto);
    return this.passagemRepository.save(newPassagem);
  }

  async update(dto: PassagemDto) {
    await this.findById(dto.id);
    this.validateIda(dto);
    this.validateVolta(dto);
    this.validateOrigem(dto);
    this.validateDestino(dto);
    return this.passagemRepository.save(dto);
  }

  validateIda(dto: PassagemDto) {
    if (new Date().getTime() > new Date(dto.dataIda).getTime()) {
      throw new BadRequestException(
        'A data de ida da passagem não pode ser menor que a data atual',
      );
    }
  }

  validateVolta(dto: PassagemDto) {
    if (new Date(dto.dataIda).getTime() > new Date(dto.dataVolta).getTime()) {
      throw new BadRequestException(
        'A data de volta da passagem não pode ser menor que a data de ida',
      );
    }
  }

  testeCaracterOrigem: string;
  validateOrigem(dto: PassagemDto) {
    this.testeCaracterOrigem = dto.origem;
    if (this.testeCaracterOrigem.length < 3) {
      throw new BadRequestException(
        'A origem deve conter mais que 3 caracteres',
      );
    }
  }

  testeCaracterDestino: string;
  validateDestino(dto: PassagemDto) {
    this.testeCaracterDestino = dto.destino;
    if (this.testeCaracterDestino.length < 3) {
      throw new BadRequestException(
        'O destino deve conter mais que 3 caracteres',
      );
    }
  }

  async findPacotesByPassagemId(id: string) {
    const passagem = await this.findById(id, ['pacotes']);
    return passagem.pacotes;
  }

  async qtdPassagens(): Promise<number> {
    const qtdPassagens = await this.passagemRepository.count();
    return qtdPassagens;
  }
}
