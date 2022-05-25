import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdatesRelations1653418775420 implements MigrationInterface {
    name = 'UpdatesRelations1653418775420'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "fichas_armas_inventario_armas" ("fichasId" uuid NOT NULL, "armasId" uuid NOT NULL, CONSTRAINT "PK_005427818120c3f19d1912307bd" PRIMARY KEY ("fichasId", "armasId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_097e11f9afaef3dab03d484d25" ON "fichas_armas_inventario_armas" ("fichasId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e93603d0b01ee26d60274c125d" ON "fichas_armas_inventario_armas" ("armasId") `);
        await queryRunner.query(`ALTER TABLE "fichas_armas_inventario_armas" ADD CONSTRAINT "FK_097e11f9afaef3dab03d484d25b" FOREIGN KEY ("fichasId") REFERENCES "fichas"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fichas_armas_inventario_armas" ADD CONSTRAINT "FK_e93603d0b01ee26d60274c125df" FOREIGN KEY ("armasId") REFERENCES "armas"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fichas_armas_inventario_armas" DROP CONSTRAINT "FK_e93603d0b01ee26d60274c125df"`);
        await queryRunner.query(`ALTER TABLE "fichas_armas_inventario_armas" DROP CONSTRAINT "FK_097e11f9afaef3dab03d484d25b"`);
        await queryRunner.query(`DROP INDEX "IDX_e93603d0b01ee26d60274c125d"`);
        await queryRunner.query(`DROP INDEX "IDX_097e11f9afaef3dab03d484d25"`);
        await queryRunner.query(`DROP TABLE "fichas_armas_inventario_armas"`);
    }

}
