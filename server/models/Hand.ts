import { DataTypes, Model } from "sequelize";
import Card from "./Card";
import { database } from "./database";
import Player from "./Player";

const Hand = database.define("User_Profile", {}, { timestamps: false });
Player.belongsToMany(Card, { through: Hand });
Card.belongsToMany(Player, { through: Hand });

export default Hand;
