"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("shopperGameLibraries", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			gameId: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: { model: "Games" },
				onDelete: "cascade",
			},
			shopperId: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: { model: "Shoppers" },
				onDelete: "cascade",
			},
			hidden: {
				allowNull: false,
				type: Sequelize.BOOLEAN,
				defaultValue: false,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.fn("now"),
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.fn("now"),
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("shopperGameLibraries");
	},
};
