import { MigrationInterface, QueryRunner } from 'typeorm';

export class Pacote1687198819384 implements MigrationInterface {
  name = 'pacote1687198819384';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "pacotes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "roteiro" character varying NOT NULL, CONSTRAINT "PK_roteiro" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "pacotes"`);
  }
}
