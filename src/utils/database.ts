import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  username: "root",  // Replace with your username
  password: "ance2001",      // Replace with your password
  database: "pet_shop", // Create a database called animals_db or any other name
});

export default sequelize;
