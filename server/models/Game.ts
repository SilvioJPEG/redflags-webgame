import { DataTypes, Sequelize } from "sequelize";

export default function (sequelize: Sequelize) {
  sequelize.define(
    "Game",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      access_code: {
        type: DataTypes.STRING(7),
        allowNull: false,
        unique: true,
      },
      // game_status: waiting/ready/in_progress/finished
      game_status: {
        type: DataTypes.STRING(120),
        allowNull: false,
      },
    }
  );
}
