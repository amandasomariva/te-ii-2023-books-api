import { MigrationInterface, QueryRunner } from 'typeorm';

export class Cliente1687182290394 implements MigrationInterface {
  name = 'cliente1687182290394';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "clientes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying NOT NULL, CONSTRAINT "PK_nome" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "clientes"`);
  }
}
