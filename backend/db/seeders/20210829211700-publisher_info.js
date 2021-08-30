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
				{
					userId: 5,
					publisherName: "Team Cherry",
				},
				{
					userId: 6,
					publisherName: "Red Hook Studios",
				},
				{
					userId: 7,
					publisherName: "Team17",
				},
				{
					userId: 8,
					publisherName: "Matt Makes Games Inc.",
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete("Publishers", null, {});
	},
};
