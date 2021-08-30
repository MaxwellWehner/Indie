"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Games", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			price: {
				allowNull: false,
				type: Sequelize.DECIMAL(8, 2),
			},
			releaseDate: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			title: {
				allowNull: false,
				type: Sequelize.STRING(50),
			},
			description: {
				type: Sequelize.STRING(300),
			},
			developer: {
				allowNull: false,
				type: Sequelize.STRING(50),
			},
			publisherId: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: { model: "Publishers" },
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
		await queryInterface.dropTable("Games");
	},
};
