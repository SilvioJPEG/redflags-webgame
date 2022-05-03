import { DataTypes, ModelDefined, Sequelize } from "sequelize";

export default function (sequelize: Sequelize) {
  const PickedCards: ModelDefined<any, any> = sequelize.define("PickedCards", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },{
    tableName: 'picked_cards'
  });
  return PickedCards;
}
