import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateNullDefaults1653420611504 implements MigrationInterface {
    name = 'UpdateNullDefaults1653420611504'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "armas" ALTER COLUMN "bonus_magico" SET DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "armas" ALTER COLUMN "propriedades" SET DEFAULT 'Existe, e é isso'`);
        await queryRunner.query(`ALTER TABLE "fichas" ALTER COLUMN "idade" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "fichas" ALTER COLUMN "classe_sec" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "fichas" ALTER COLUMN "nivel_sec" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "fichas" ALTER COLUMN "nivel_conj" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fichas" ALTER COLUMN "nivel_conj" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "fichas" ALTER COLUMN "nivel_sec" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "fichas" ALTER COLUMN "classe_sec" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "fichas" ALTER COLUMN "idade" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "armas" ALTER COLUMN "propriedades" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "armas" ALTER COLUMN "bonus_magico" DROP DEFAULT`);
    }

}
