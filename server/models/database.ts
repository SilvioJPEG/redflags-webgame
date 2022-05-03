import { ModelDefined, Sequelize } from "sequelize";
import declareRelations from "./associations";
import CardModel from "./Card";
import GameModel from "./Game";
import HandModel from "./Hand";
import PickedCardsModel from "./PickedCards";
import PlayerModel from "./Player";

const database = new Sequelize(
  "postgresql://postgres:postpass@localhost:5432/redflags"
);
type modelDefiner = (sequelize: Sequelize) => ModelDefined<any, any>;
const modelDefiners: modelDefiner[] = [
  CardModel,
  GameModel,
  HandModel,
  PickedCardsModel,
  PlayerModel,
];

for (const modelDefiner of modelDefiners) {
  modelDefiner(database);
}
declareRelations(database);

database.sync({ force: true }).then(() => console.log("tables created"));
export const Card = CardModel(database);
export const Player = PlayerModel(database);
export const Hand = HandModel(database);
export const PickedCards = PickedCardsModel(database);
export const Game = GameModel(database);
export default database;
