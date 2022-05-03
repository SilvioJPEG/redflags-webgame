import { Sequelize } from "sequelize";

export default function (sequelize: Sequelize) {
  sequelize.define("Hand", {}, { timestamps: false });
}
