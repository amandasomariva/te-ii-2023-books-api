import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacoteEntity } from './pacote.entity';
import { PacoteService } from './pacote.service';
import { PacoteController } from './pacote.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PacoteEntity])],
  controllers: [PacoteController],
  providers: [PacoteService],
})
export class PacoteModule {}
