import { DataTypes } from "sequelize";
import sequelize from "./db";

const urls = sequelize.define("urls", {
  shortUrl: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  longUrl: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  counter: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

export default urls;
