import "reflect-metadata";
import { DataSource } from "typeorm";
import * as DOTDOT from 'dotenv';
DOTDOT.config();



export const PostgresSource = new DataSource({
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
