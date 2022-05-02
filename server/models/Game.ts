import { DataTypes, Model } from "sequelize";
import { database } from "./database";
import Player from "./Player";

class Game extends Model {
  public id!: number;
  public access_code!: string;
  public game_status!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
Game.init(
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
  },
  { modelName: "Game", tableName: "game_rooms", sequelize: database }
);

Player.belongsTo(Game, { foreignKey: "game_id" });
Game.hasOne(Player);

Game.sync({ force: true }).then(() => console.log("Game table created"));
export default Game;
