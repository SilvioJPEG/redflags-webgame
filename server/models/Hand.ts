import { Sequelize, ModelDefined } from "sequelize";

export default function (sequelize: Sequelize) {
  const Hand: ModelDefined<any, any> = sequelize.define(
    "Hand",
    {},
    { tableName: "hands", timestamps: false }
  );
  return Hand;
}
