import {
  Column,
  Entity,
  //JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TipoEnum } from './tipo.enum';
import { PacoteEntity } from 'src/pacote/pacote.entity';

@Entity({ name: 'passagens' })
export class PassagemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: TipoEnum,
    default: TipoEnum.ECONOMICA,
    nullable: true,
  })
  tipo: TipoEnum;

  @Column({ type: 'date', name: 'data_ida', nullable: true })
  dataIda: Date;

  @Column({ type: 'date', name: 'data_volta', nullable: true })
  dataVolta: Date;

  @Column()
  origem: string;

  @Column()
  destino: string;

  @OneToMany(() => PacoteEntity, (pacote) => pacote.passagem)
  pacotes: PacoteEntity[];
}
