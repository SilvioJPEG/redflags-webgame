import { DataTypes, Sequelize } from "sequelize";

export default function (sequelize: Sequelize) {
  sequelize.define("PickedCards", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  });
}
