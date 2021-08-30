"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			"Images",
			[
				{
					gameId: 1,
					imageUrl:
						"https://cdn.akamai.steamstatic.com/steam/apps/367520/ss_47f3523dbea462aff2ca4bc9f605faaf80a792b2.1920x1080.jpg?t=1625363925",
				},
				{
					gameId: 1,
					imageUrl:
						"https://cdn.akamai.steamstatic.com/steam/apps/367520/ss_5384f9f8b96a0b9934b2bc35a4058376211636d2.1920x1080.jpg?t=1625363925",
				},
				{
					gameId: 1,
					imageUrl:
						"https://cdn.akamai.steamstatic.com/steam/apps/367520/ss_d5b6edd94e77ba6db31c44d8a3c09d807ab27751.1920x1080.jpg?t=1625363925",
				},
				{
					gameId: 1,
					imageUrl:
						"https://cdn.akamai.steamstatic.com/steam/apps/367520/ss_a81e4231cc8d55f58b51a4a938898af46503cae5.1920x1080.jpg?t=1625363925",
				},
				{
					gameId: 1,
					imageUrl:
						"https://cdn.akamai.steamstatic.com/steam/apps/367520/ss_62e10cf506d461e11e050457b08aa0e2a1c078d0.1920x1080.jpg?t=1625363925",
				},
				{
					gameId: 2,
					imageUrl:
						"https://cdn.akamai.steamstatic.com/steam/apps/262060/ss_897ef292768a8e413ffe2dbf18614ec8e1fdbc64.1920x1080.jpg?t=1618936132",
				},
				{
					gameId: 2,
					imageUrl:
						"https://cdn.cloudflare.steamstatic.com/steam/apps/262060/ss_04572edc979601b038756f87861c6f8c6c337806.1920x1080.jpg?t=1618936132",
				},
				{
					gameId: 2,
					imageUrl:
						"https://cdn.cloudflare.steamstatic.com/steam/apps/262060/ss_799c78932c87f2be0cbd45dd1b80ebd0a355e575.1920x1080.jpg?t=1618936132",
				},
				{
					gameId: 2,
					imageUrl:
						"https://cdn.cloudflare.steamstatic.com/steam/apps/262060/ss_a967c2d7344433cdf72a53ef1922586b0d7cce69.1920x1080.jpg?t=1618936132",
				},
				{
					gameId: 2,
					imageUrl:
						"https://cdn.cloudflare.steamstatic.com/steam/apps/262060/ss_c9d41e74d574f6fa9bf53c0cf74f8430c2072cc2.1920x1080.jpg?t=1618936132",
				},
				{
					gameId: 3,
					imageUrl:
						"https://cdn.akamai.steamstatic.com/steam/apps/774361/ss_88e0cdb23bd866be78c23493574ed50c49db5811.1920x1080.jpg?t=1630077819",
				},
				{
					gameId: 3,
					imageUrl:
						"https://cdn.cloudflare.steamstatic.com/steam/apps/774361/ss_b74f57919e88283fac75389e76ead2fed73997e5.1920x1080.jpg?t=1630077819",
				},
				{
					gameId: 3,
					imageUrl:
						"https://cdn.cloudflare.steamstatic.com/steam/apps/774361/ss_bd57bcb1e9183cbea61339727a97bcc5206677b2.1920x1080.jpg?t=1630077819",
				},
				{
					gameId: 3,
					imageUrl:
						"https://cdn.cloudflare.steamstatic.com/steam/apps/774361/ss_933510ac0fd13c6bd4ecc4c187e0506d520f2e70.1920x1080.jpg?t=1630077819",
				},
				{
					gameId: 3,
					imageUrl:
						"https://cdn.cloudflare.steamstatic.com/steam/apps/774361/ss_547d75f45fc1a1b368638a849e3aaba624d7b139.1920x1080.jpg?t=1630077819",
				},
				{
					gameId: 4,
					imageUrl:
						"https://cdn.akamai.steamstatic.com/steam/apps/504230/ss_a110fe2f50c5828af4b1ff4e7c1ca773a1a7e5aa.1920x1080.jpg?t=1617130992",
				},
				{
					gameId: 4,
					imageUrl:
						"https://cdn.cloudflare.steamstatic.com/steam/apps/504230/ss_1ad297c2044cdcf450ee83e56350cafb590da755.1920x1080.jpg?t=1617130992",
				},
				{
					gameId: 4,
					imageUrl:
						"https://cdn.cloudflare.steamstatic.com/steam/apps/504230/ss_03bfe6bd5ddac7f747c8d2aa1a4f82cfd53c6dcb.1920x1080.jpg?t=1617130992",
				},
				{
					gameId: 4,
					imageUrl:
						"https://cdn.cloudflare.steamstatic.com/steam/apps/504230/ss_4b0f0222341b64a37114033aca9994551f27c161.1920x1080.jpg?t=1617130992",
				},
				{
					gameId: 4,
					imageUrl:
						"https://cdn.cloudflare.steamstatic.com/steam/apps/504230/ss_1098b655a622720cfd549b104736a4eca8948100.1920x1080.jpg?t=1617130992",
				},
				{
					gameId: 5,
					imageUrl:
						"https://cdn.akamai.steamstatic.com/steam/apps/311690/ss_2c661789dfa6d7e0ab1ecfe3eaa1bed8636c91bb.1920x1080.jpg?t=1622216602",
				},
				{
					gameId: 5,
					imageUrl:
						"https://cdn.cloudflare.steamstatic.com/steam/apps/311690/ss_bca0036bc452b872a7d9ee3de9e0c9548e8cd4f5.1920x1080.jpg?t=1622216602",
				},
				{
					gameId: 5,
					imageUrl:
						"https://cdn.cloudflare.steamstatic.com/steam/apps/311690/ss_9d3f304b18e8cd1cf6ac4a886bec474e0b677800.1920x1080.jpg?t=1622216602",
				},
				{
					gameId: 5,
					imageUrl:
						"https://cdn.cloudflare.steamstatic.com/steam/apps/311690/ss_9a74ab65fb19e85cac6a64b7dbe05da5411cfb7b.1920x1080.jpg?t=1622216602",
				},
				{
					gameId: 5,
					imageUrl:
						"https://cdn.cloudflare.steamstatic.com/steam/apps/311690/ss_0893ef2bd93d4e9e2138006424d088523a5daecd.1920x1080.jpg?t=1622216602",
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete("Images", null, {});
	},
};
