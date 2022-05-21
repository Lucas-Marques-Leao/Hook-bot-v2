import "reflect-metadata";
import { DataSource } from "typeorm";



export const PostgresSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: "postgres",
    password: "ZXCV1324",
    database: "Hook_bot_v2",
    synchronize: false,
    logging: true,
    entities: ["src/models/*.ts"],
    migrations: ["src/database/migrations/*.ts"],
    subscribers: [],
})
