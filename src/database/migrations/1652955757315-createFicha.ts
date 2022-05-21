import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateFicha1652955757315 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
        queryRunner.createTable(
            new Table({
                name: 'fichas',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()'
                    },
                    {
                        name: 'author_id',
                        type: 'varchar',
                        isPrimary: true,
                    },
                    {
                        name: 'nome_ficha',
                        type: 'varchar',
                        isUnique: true

                    },

                    {
                        name: 'raça',
                        type: 'varchar'
                    },
                    {
                        name: 'idade',
                        type: 'integer',
                        isNullable: true
                        
                    },
                    {
                        name: 'foto',
                        type: 'varchar'
                    },
                    {
                        name: 'classe_pri',
                        type: 'varchar'
                    },
                    {
                        name: 'nivel_pri',
                        type: 'integer',
                        default: 1
                    },
                    {
                        name: 'classe_sec',
                        type: 'varchar',
                        default: "'Nenhuma'"
                        
                
                    },
                    {
                        name: 'nivel_sec',
                        type: 'integer',
                        default: 0
                    },
                    {
                        name: 'str_at',
                        type: 'integer',
                        default: 10
                    },
                    {
                        name: 'dex_at',
                        type: 'integer',
                        default: 10
                    },
                    {
                        name: 'con_at',
                        type: 'integer',
                        default: 10
                    },
                    {
                        name: 'int_at',
                        type: 'integer',
                        default: 10
                    },
                    {
                        name: 'wis_at',
                        type: 'integer',
                        default: 10
                    },
                    {
                        name: 'cha_at',
                        type: 'integer',
                        default: 10
                    },
                    {
                        name: 'saude',
                        type: 'integer',
                        default: 10
                    },
                    {
                        name: 'saude_temp',
                        type: 'integer',
                        default: 0
                    },
                    {
                        name: 'nivel_conj',
                        type: 'integer',
                        default: 0
                    },
                    
                    {
                        name: 'created_At',
                        type: 'timestamp',
                        default: 'now()'
                    },
                    {
                        name: 'updated_At',
                        type: 'timestamp',
                        default: 'now()'
                    },
                    
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable('fichas');
    }

}
