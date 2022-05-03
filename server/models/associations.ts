import { Sequelize } from "sequelize/types";

export default function declareRelations(database: Sequelize) {
  const { Player, Card, Game, Hand, PickedCards } = database.models;

  Player.belongsTo(Game, { foreignKey: "game_id" });
  Game.hasOne(Player);

  Player.belongsToMany(Card, { through: Hand });
  Card.belongsToMany(Player, { through: Hand });

  PickedCards.belongsTo(Player, { foreignKey: "owner_uuid" });
  Player.hasOne(PickedCards);

  PickedCards.belongsTo(Card, { as: "first_perk_id" });
  Card.hasMany(PickedCards);

  PickedCards.belongsTo(Card, { as: "second_perk_id" });
  Card.hasMany(PickedCards);

  PickedCards.belongsTo(Card, { as: "flag_id" });
  Card.hasMany(PickedCards);
}
