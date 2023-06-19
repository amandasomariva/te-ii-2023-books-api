import {
  Column,
  Entity,
  //JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GeneroEnum } from './genero.enum';
import { PacoteEntity } from 'src/pacote/pacote.entity';

@Entity({ name: 'clientes' })
export class ClienteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column({ type: 'date', name: 'data_nascimento', nullable: true })
  dataNascimento: Date;

  @Column({
    type: 'enum',
    enum: GeneroEnum,
    default: GeneroEnum.FEMININO,
    nullable: true,
  })
  genero: GeneroEnum;

  @Column()
  cpf: string;

  @Column()
  telefone: string;

  @OneToMany(() => PacoteEntity, (pacote) => pacote.cliente)
  pacotes: PacoteEntity[];
}
