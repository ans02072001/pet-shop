import { Model, DataTypes } from "sequelize";
import sequelize from "../utils/database"; // Set up sequelize instance

class Animal extends Model {
  public id!: number;
  public name!: string;
  public price!: number;
  public kind!: string;
  public age!: number;
}

Animal.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    kind: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize, // Sequelize instance
    tableName: "animals",
    timestamps: false, // Disable timestamps for simplicity
  }
);

export default Animal;
