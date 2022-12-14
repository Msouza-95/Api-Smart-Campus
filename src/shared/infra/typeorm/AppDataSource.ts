import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config();
export const AppDataSource = new DataSource({
  url: process.env.DATABASE_URL,
  type: 'postgres',
  // host: process.env.DB_HOST,
  // port: Number(process.env.DB_RANDOM_PORT),
  // username: process.env.DB_USER,
  // password: process.env.DB_PASS,
  // database: process.env.DB_NAME,
  synchronize: true,
  ssl: {
    rejectUnauthorized: false,
  },
  entities: ['./dist/modules/**/infra/typeorm/entities/*.js'],
  migrations: ['./dist/shared/infra/typeorm/migrations/*.js'],
});
