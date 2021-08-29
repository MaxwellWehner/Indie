"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			"Shoppers",
			[
				{
					userId: 1,
					wallet: 10.99,
				},
				{
					userId: 3,
					wallet: 20.0,
				},
				{
					userId: 4,
					wallet: 0,
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete("Shoppers", null, {});
	},
};
