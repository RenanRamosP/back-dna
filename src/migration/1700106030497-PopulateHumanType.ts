import { MigrationInterface, QueryRunner } from "typeorm";

export class PopulateHumanType1700106030497 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "human_type" ("id", "type") VALUES (1, 'Humano'), (2, 'Sigmano')`
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "human_type" WHERE "id" in (1,2)`);
  }
}
