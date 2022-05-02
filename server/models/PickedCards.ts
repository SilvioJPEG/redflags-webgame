import { DataTypes, Model } from "sequelize";
import Card from "./Card";
import { database } from "./database";
import Player from "./Player";

class PickedCards extends Model {}

PickedCards.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    modelName: "PickedCards",
    tableName: "picked_cards",
    sequelize: database,
    timestamps: false,
  }
);

PickedCards.belongsTo(Player, { foreignKey: "owner_uuid" });
Player.hasOne(PickedCards);

PickedCards.belongsTo(Card, { as: "first_perk_id" });
Card.hasMany(PickedCards);

PickedCards.belongsTo(Card, { as: "second_perk_id" });
Card.hasMany(PickedCards);

PickedCards.belongsTo(Card, { as: "flag_id" });
Card.hasMany(PickedCards);

PickedCards.sync({ force: true }).then(() =>
  console.log("picked_cards table created")
);

export default PickedCards;
