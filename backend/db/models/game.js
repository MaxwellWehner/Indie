"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Game extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Game.belongsTo(models.Publisher, { foreignKey: "publisherId" });
            Game.hasMany(models.Image, {
				foreignKey: "gameId",
				onDelete: "cascade",
				hooks: true,
			});
			const columnMapping = {
				through: "shopperGameLibrary",
				otherKey: "shopperId",
				foreignKey: "gameId",
			};
			Game.belongsToMany(models.Shopper, columnMapping);
        }
	}
	Game.init(
		{
			price: DataTypes.DECIMAL,
			releaseDate: DataTypes.DATE,
			title: DataTypes.STRING,
			description: DataTypes.STRING,
			developer: DataTypes.STRING,
			publisherId: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Game",
		}
	);
	return Game;
};
