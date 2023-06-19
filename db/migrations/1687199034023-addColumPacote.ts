import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumPacote1687199034023 implements MigrationInterface {
  name = 'addColumPacote1687199034023';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."pacotes_agente_enum" AS ENUM('C', 'M')`,
    );
    await queryRunner.query(
      `ALTER TABLE "pacotes" ADD "agente" "public"."pacotes_agente_enum" DEFAULT 'C'`,
    );
    await queryRunner.query(
      `ALTER TABLE "pacotes" ADD "valor" numeric not null`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "pacotes" DROP COLUMN "agente"`);
    await queryRunner.query(`DROP TYPE "public"."pacotes_agente_enum"`);
    await queryRunner.query(`ALTER TABLE "pacotes" DROP COLUMN "valor"`);
  }
}
