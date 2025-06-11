import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import { syncDatabase } from './syncDB.js';

dotenv.config();

export const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
  }
);

export async function connectMySQL() {
  try {
    await sequelize.authenticate();
    console.log("MySQL Connected");
    await syncDatabase();
  } catch (error) {
    console.error("MySQL Error:", error);
    process.exit(1);
  }
}
