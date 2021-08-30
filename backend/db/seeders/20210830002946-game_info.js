"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			"Games",
			[
				{
					title: "Hollow Knight",
					price: 14.99,
					publisherId: 2,
					description:
						"Forge your own path in Hollow Knight! An epic action adventure through a vast ruined kingdom of insects and heroes. Explore twisting caverns, battle tainted creatures and befriend bizarre bugs, all in a classic, hand-drawn 2D style.",
					developer: "Team Cherry",
					releaseDate: new Date(2017, 1, 24),
				},
				{
					title: "Darkest Dungeon",
					price: 24.99,
					publisherId: 3,
					description:
						"Darkest Dungeon is a challenging gothic roguelike turn-based RPG about the psychological stresses of adventuring. Recruit, train, and lead a team of flawed heroes against unimaginable horrors, stress, disease, and the ever-encroaching dark. Can you keep your heroes together when all hope is lost?",
					developer: "Red Hook Studios",
					releaseDate: new Date(2016, 0, 19),
				},
				{
					title: "Blasphemous",
					price: 24.99,
					publisherId: 4,
					description:
						"Blasphemous is a brutal action-platformer with skilled hack’n slash combat set in the nightmare world of Cvstodia. Explore, upgrade your abilities, and perform savage executions on the hordes of enemies that stand between you and your quest to break eternal damnation.",
					developer: "The Game Kitchen",
					releaseDate: new Date(2019, 8, 10),
				},
				{
					title: "Celeste",
					price: 19.99,
					publisherId: 5,
					description:
						"Help Madeline survive her inner demons on her journey to the top of Celeste Mountain, in this super-tight platformer from the creators of TowerFall. Brave hundreds of hand-crafted challenges, uncover devious secrets, and piece together the mystery of the mountain.",
					developer: "Extremely OK Games, Ltd.",
					releaseDate: new Date(2018, 0, 25),
				},
				{
					title: "Enter the Gungeon",
					price: 14.99,
					publisherId: 1,
					description:
						"Enter the Gungeon is a bullet hell dungeon crawler following a band of misfits seeking to shoot, loot, dodge roll and table-flip their way to personal absolution by reaching the legendary Gungeon’s ultimate treasure: the gun that can kill the past.",
					developer: "Dodge Roll",
					releaseDate: new Date(2016, 3, 5),
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete("Games", null, {});
	},
};
