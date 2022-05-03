import { DataTypes, Model, Sequelize, ModelDefined } from "sequelize";

interface GameAttributes {
  id: number;
  access_code: string;
  game_status: string;
}

export default function (sequelize: Sequelize) {
  const Game: ModelDefined<GameAttributes, any> = sequelize.define(
    "Game",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      access_code: {
        type: DataTypes.STRING(8),
        allowNull: false,
        unique: true,
      },
      // game_status: waiting/ready/in_progress/finished
      game_status: {
        type: DataTypes.STRING(120),
        allowNull: false,
      },
    },
    {
      tableName: "games",
    }
  );
  return Game;
}
