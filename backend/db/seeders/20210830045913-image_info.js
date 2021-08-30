"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			"Images",
			[
				{
					gameId: 1,
					imageUrl:
						"https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fcdn.akamai.steamstatic.com%2Fsteam%2Fapps%2F367520%2Fcapsule_616x353.jpg%3Ft%3D1625363925&sp=1630299867T66baafce6e9819a4f6699a684f6a608e32cf1cf437e143171fa44b5f3edf0ffe",
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
						"https://cdn.cloudflare.steamstatic.com/steam/apps/262060/header.jpg?t=1618936132",
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
						"https://cdn.cloudflare.steamstatic.com/steam/apps/774361/header.jpg?t=1630077819",
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
						"https://cdn.cloudflare.steamstatic.com/steam/apps/504230/header.jpg?t=1617130992",
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
						"https://cdn.cloudflare.steamstatic.com/steam/apps/311690/header.jpg?t=1622216602",
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
