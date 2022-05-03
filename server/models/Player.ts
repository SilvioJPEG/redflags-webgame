import { Sequelize } from "sequelize";
import { DataTypes, UUIDV4 } from "sequelize";

export default function (sequelize: Sequelize) {
  sequelize.define(
    "Player",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      username: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      host: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      current_turn: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      judge: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: "players",
    }
  );
}
