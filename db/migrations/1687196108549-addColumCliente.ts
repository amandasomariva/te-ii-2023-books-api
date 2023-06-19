import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumCliente1687196108549 implements MigrationInterface {
  name = 'AddColumCliente1687196108549';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "clientes" ADD "data_nascimento" date`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."clientes_genero_enum" AS ENUM('F', 'M')`,
    );
    await queryRunner.query(
      `ALTER TABLE "clientes" ADD "genero" "public"."clientes_genero_enum" DEFAULT 'F'`,
    );
    await queryRunner.query(
      `ALTER TABLE "clientes" ADD "cpf" character varying not null`,
    );
    await queryRunner.query(
      `ALTER TABLE "clientes" ADD "telefone" character varying not null`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "clientes" DROP COLUMN "genero"`);
    await queryRunner.query(`DROP TYPE "public"."clientes_genero_enum"`);
    await queryRunner.query(
      `ALTER TABLE "clientes" DROP COLUMN "data_nascimento"`,
    );
    await queryRunner.query(`ALTER TABLE "clientes" DROP COLUMN "cpf"`);
    await queryRunner.query(`ALTER TABLE "clientes" DROP COLUMN "telefone"`);
  }
}
