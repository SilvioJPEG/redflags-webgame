import { Sequelize } from "sequelize";
import declareRelations from "./associations";
import Card from "./Card";
import Game from "./Game";
import Hand from "./Hand";
import PickedCards from "./PickedCards";
import Player from "./Player";

const database = new Sequelize(
  "postgresql://postgres:postpass@localhost:5432/redflags"
);
type modelDefiner = (sequelize: Sequelize) => void;
const modelDefiners: modelDefiner[] = [Card, Game, Hand, PickedCards, Player];
for (const modelDefiner of modelDefiners) {
  modelDefiner(database);
}
declareRelations(database);

database.sync({ force: true }).then(() => console.log("tables created"));

export default database;
