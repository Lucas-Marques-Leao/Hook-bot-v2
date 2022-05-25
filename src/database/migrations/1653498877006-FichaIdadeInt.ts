import {MigrationInterface, QueryRunner} from "typeorm";

export class FichaIdadeInt1653498877006 implements MigrationInterface {
    name = 'FichaIdadeInt1653498877006'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fichas" DROP COLUMN "idade"`);
        await queryRunner.query(`ALTER TABLE "fichas" ADD "idade" integer DEFAULT 10`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fichas" DROP COLUMN "idade"`);
        await queryRunner.query(`ALTER TABLE "fichas" ADD "idade" character varying DEFAULT 'x-anos'`);
    }

}
