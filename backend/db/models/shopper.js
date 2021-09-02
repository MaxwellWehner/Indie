"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Shopper extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
            Shopper.belongsTo(models.User, { foreignKey: "userId" });
			const columnMapping = {
				through: "shopperGameLibrary",
				otherKey: "gameId",
				foreignKey: "shopperId",
			};
			Shopper.belongsToMany(models.Game, columnMapping);
		}
	}
	Shopper.init(
		{
			userId: DataTypes.INTEGER,
			wallet: DataTypes.DECIMAL,
		},
		{
			sequelize,
			modelName: "Shopper",
		}
	);
	return Shopper;
};
