import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { ClienteModule } from './cliente/cliente.module';
import { PacoteModule } from './pacote/pacote.module';
import { PassagemModule } from './passagem/passagem.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    ClienteModule,
    PassagemModule,
    PacoteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
