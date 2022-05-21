import * as DotDot from 'dotenv';
import { DataSource } from 'typeorm';
import 'reflect-metadata';
DotDot.config();



export = {
    name: 'ready',
    once: true,
    async execute(){
        console.log(`O Bot tá pronto!`);
        const PostgresSource = new DataSource({
            type: "postgres",
            host: "localhost",
            port: 5433,
            username: "postgres",
            password: process.env.PGPassword,
            database: "Hook_bot_v2",
            synchronize: false,
            logging: true,
            entities: ["src/models/*.ts"],
            migrations: ["src/database/migrations/*.ts"],
            subscribers: [],
        })
        
        PostgresSource.initialize()
            .then(() => {
                console.log('Conectou-se ao Banco de Dados')
           
                
            })
        .catch(err => console.log(err));
    }
}