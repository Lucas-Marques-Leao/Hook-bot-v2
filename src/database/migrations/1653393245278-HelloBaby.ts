import {MigrationInterface, QueryRunner} from "typeorm";

export class HelloBaby1653393245278 implements MigrationInterface {
    name = 'HelloBaby1653393245278'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "armas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome_arma" character varying NOT NULL, "bonus_magico" integer, "dano" character varying NOT NULL, "propriedades" character varying, "foto" character varying NOT NULL, "created_At" TIMESTAMP NOT NULL DEFAULT now(), "updated_At" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a9faaa8ed583a9f156625f7a502" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "fichas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "author_id" character varying NOT NULL, "nome_ficha" character varying NOT NULL, "raça" character varying(15) NOT NULL, "idade" character varying NOT NULL DEFAULT 'x-anos', "foto" character varying NOT NULL, "classe_pri" character varying NOT NULL, "nivel_pri" integer NOT NULL DEFAULT 1, "classe_sec" character varying NOT NULL DEFAULT 'nenhuma', "nivel_sec" integer NOT NULL DEFAULT 0, "str_at" integer NOT NULL DEFAULT 10, "dex_at" integer NOT NULL DEFAULT 10, "con_at" integer NOT NULL DEFAULT 10, "int_at" integer NOT NULL DEFAULT 10, "wis_at" integer NOT NULL DEFAULT 10, "cha_at" integer NOT NULL DEFAULT 10, "saude" integer NOT NULL DEFAULT 5, "saude_temp" integer NOT NULL DEFAULT 0, "nivel_conj" integer NOT NULL DEFAULT 0, "created_At" TIMESTAMP NOT NULL DEFAULT now(), "updated_At" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_922e0e29015867357f919b1d6f8" UNIQUE ("nome_ficha"), CONSTRAINT "PK_25bf956e31efb0e2ae8515325b6" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "fichas"`);
        await queryRunner.query(`DROP TABLE "armas"`);
    }

}
