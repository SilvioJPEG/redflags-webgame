import { DataTypes, Model } from "sequelize";
import { database } from "./database";

class Card extends Model {}
Card.init(
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
    modelName: "Card",
    tableName: "cards",
    sequelize: database,
    timestamps: false,
  }
);

Card.sync({ force: true }).then(() => console.log("Cards table created"));

export default Card;
