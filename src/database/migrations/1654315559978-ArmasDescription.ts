import {MigrationInterface, QueryRunner} from "typeorm";

export class ArmasDescription1654315559978 implements MigrationInterface {
    name = 'ArmasDescription1654315559978'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "armas" ADD "descrição" character varying DEFAULT 'Uma Arma elegante, para tempos mais Civilizados'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "armas" DROP COLUMN "descrição"`);
    }

}
