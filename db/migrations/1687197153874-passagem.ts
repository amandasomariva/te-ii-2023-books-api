import { MigrationInterface, QueryRunner } from 'typeorm';

export class Passagem1687197153874 implements MigrationInterface {
  name = 'passagem1687197153874';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "passagens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "destino" character varying NOT NULL, CONSTRAINT "PK_destino" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "passagens"`);
  }
}
