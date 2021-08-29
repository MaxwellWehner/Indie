"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			"Publishers",
			[
				{
					userId: 2,
					publisherName: "Devolver Digital",
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete("Publishers", null, {});
	},
};
