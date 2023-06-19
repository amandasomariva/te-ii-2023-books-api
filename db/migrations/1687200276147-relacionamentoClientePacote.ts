import { MigrationInterface, QueryRunner } from 'typeorm';

export class RelacionamentoClientePacote1687200276147
  implements MigrationInterface
{
  name = 'relacionamentoClientePacote1687200276147';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "pacotes" ADD "cliente_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "pacotes" ADD CONSTRAINT "cliente_fk" FOREIGN KEY ("cliente_id") REFERENCES "clientes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pacotes" DROP CONSTRAINT "cliente_fk"`,
    );
    await queryRunner.query(`ALTER TABLE "pacotes" DROP COLUMN "cliente_id"`);
  }
}
