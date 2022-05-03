import { Model, ModelDefined, Sequelize } from "sequelize";
import { DataTypes, UUIDV4 } from "sequelize";

interface PlayerAttributes {
  id: number;
  username: string;
  host: boolean;
  current_turn: boolean;
  judge: boolean;
  game_id: number;
}

export default function (sequelize: Sequelize) {
  const Player: ModelDefined<PlayerAttributes, any> = sequelize.define(
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
  return Player;
}
