import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassagemEntity } from './passagem.entity';
import { PassagemService } from './passagem.service';
import { PassagemController } from './passagem.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PassagemEntity])],
  controllers: [PassagemController],
  providers: [PassagemService],
})
export class PassagemModule {}
