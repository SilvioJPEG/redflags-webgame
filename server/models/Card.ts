import { DataTypes, Sequelize } from "sequelize";

export default function (sequelize: Sequelize) {
  sequelize.define("Card", {
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
  });
}
