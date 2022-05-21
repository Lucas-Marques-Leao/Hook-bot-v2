import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateArmas1653016526543 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
        queryRunner.createTable(
        new Table({
            name: 'armas',
            columns: [

                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
                },

                {
                    name: 'nome_arma',
                    type: 'varchar'
                },

                {
                    name: 'bonus_magico',
                    type: 'integer',
                    isNullable: true
                },

                {
                    name: 'dano',
                    type: 'varchar'
                },

                {
                    name: 'propriedades',
                    type: 'varchar',
                    isNullable: true
                },

                {
                    name: 'foto',
                    type: 'varchar'
                },
            
            ]
            
        })
    )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable('armas')
    }

}
