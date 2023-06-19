import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AgenteEnum } from './agente.enum';
import { ClienteEntity } from 'src/cliente/cliente.entity';
import { PassagemEntity } from 'src/passagem/passagem.entity';

@Entity({ name: 'pacotes' })
export class PacoteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ClienteEntity, (cliente) => cliente.pacotes, { eager: true })
  @JoinColumn({
    name: 'cliente_id',
    foreignKeyConstraintName: 'cliente_fk',
    referencedColumnName: 'id',
  })
  cliente: ClienteEntity;

  @ManyToOne(() => PassagemEntity, (passagem) => passagem.pacotes, {
    eager: true,
  })
  @JoinColumn({
    name: 'passagem_id',
    foreignKeyConstraintName: 'passagem_fk',
    referencedColumnName: 'id',
  })
  passagem: PassagemEntity;

  @Column()
  roteiro: string;

  @Column({ type: 'numeric', name: 'valor', nullable: true })
  valor: number;

  @Column({
    type: 'enum',
    enum: AgenteEnum,
    default: AgenteEnum.CARLOS,
    nullable: true,
  })
  agente: AgenteEnum;
}
