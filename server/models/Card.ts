import { DataTypes, ModelDefined, Sequelize, Optional } from "sequelize";

interface CardAttributes {
  id: number;
  title: string;
  content: string;
}

// You can also set multiple attributes optional at once
type CardCreationAttributes = Optional<CardAttributes, "id" | "title">;
export default function (sequelize: Sequelize) {
  const Card: ModelDefined<CardAttributes, CardCreationAttributes> =
    sequelize.define(
      "Card",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },

        access_code: {
          type: DataTypes.STRING(4),
          allowNull: false,
          unique: true,
        },

        description: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        tableName: "cards",
      }
    );
  return Card;
}
