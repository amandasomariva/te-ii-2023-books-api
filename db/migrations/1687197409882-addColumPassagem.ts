import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumPassagem1687197409882 implements MigrationInterface {
  name = 'addColumPassagem1687197409882';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "passagens" ADD "data_ida" date`);
    await queryRunner.query(`ALTER TABLE "passagens" ADD "data_volta" date`);
    await queryRunner.query(
      `CREATE TYPE "public"."passagens_tipo_enum" AS ENUM('X', 'C')`,
    );
    await queryRunner.query(
      `ALTER TABLE "passagens" ADD "tipo" "public"."passagens_tipo_enum" DEFAULT 'C'`,
    );
    await queryRunner.query(
      `ALTER TABLE "passagens" ADD "origem" character varying not null`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "passagens" DROP COLUMN "tipo"`);
    await queryRunner.query(`DROP TYPE "public"."passagens_tipo_enum"`);
    await queryRunner.query(`ALTER TABLE "passagens" DROP COLUMN "data_ida"`);
    await queryRunner.query(`ALTER TABLE "passagens" DROP COLUMN "data_volta"`);
    await queryRunner.query(`ALTER TABLE "passagens" DROP COLUMN "origem"`);
  }
}
