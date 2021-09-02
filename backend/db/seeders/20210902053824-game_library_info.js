"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			"shopperGameLibraries",
			[
				{
					shopperId: 1,
					gameId: 1,
					hidden: false,
				},
				{
					shopperId: 1,
					gameId: 2,
					hidden: false,
				},
				{
					shopperId: 1,
					gameId: 4,
					hidden: false,
				},
				{
					shopperId: 2,
					gameId: 1,
					hidden: false,
				},
				{
					shopperId: 2,
					gameId: 3,
					hidden: false,
				},
				{
					shopperId: 3,
					gameId: 2,
					hidden: false,
				},
				{
					shopperId: 3,
					gameId: 4,
					hidden: false,
				},
				{
					shopperId: 3,
					gameId: 5,
					hidden: false,
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete("shopperGameLibraries", null, {});
	},
};
