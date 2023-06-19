import { MigrationInterface, QueryRunner } from 'typeorm';

export class RelacionamentoPassagemPacote1687200458580
  implements MigrationInterface
{
  name = 'relacionamentoPassagemPacote1687200458580';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "pacotes" ADD "passagem_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "pacotes" ADD CONSTRAINT "passagem_fk" FOREIGN KEY ("passagem_id") REFERENCES "passagens"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pacotes" DROP CONSTRAINT "passagem_fk"`,
    );
    await queryRunner.query(`ALTER TABLE "pacotes" DROP COLUMN "passagem_id"`);
  }
}
