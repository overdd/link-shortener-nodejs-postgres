require('dotenv').config();
import { Sequelize } from "sequelize";


console.log(process.env.POSTGRES_USERNAME);
console.log(process.env.POSTGRES_PASSWORD);
console.log(process.env.POSTGRES_HOST);
console.log(process.env.POSTGRES_PORT);

const sequelize = new Sequelize(
  "postgres",
  process.env.POSTGRES_USERNAME!,
  process.env.POSTGRES_PASSWORD!,
  {
    host: process.env.POSTGRES_HOST,
    dialect: "postgres",
    port: Number(process.env.POSTGRES_PORT) || 5432,
  },
);

export default sequelize;
