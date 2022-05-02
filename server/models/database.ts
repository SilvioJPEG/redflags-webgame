import { Sequelize } from "sequelize";

export const database = new Sequelize(
  "postgresql://postgres:postpass@localhost:5432/redflags"
);
