import { DataTypes, Model, UUIDV4 } from "sequelize";
import { database } from "./database";

class Player extends Model {
  public id!: string;
  public username!: string;
  public host!: boolean;
  public current_turn!: boolean;
  public judge!: boolean;
  public game_id!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
Player.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      allowNull: false,
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
    modelName: "Player",
    tableName: "players",
    sequelize: database,
    timestamps: false,
  }
);

Player.sync({ force: true }).then(() => console.log("Players table created"));

export default Player;
