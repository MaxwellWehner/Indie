'use strict';
const faker = require("faker");
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
		"Users",
		[
			{
				email: "demo@user.io",
				username: "DemoShop",
				hashedPassword: bcrypt.hashSync("password"),
				userType: "Shopper",
			},
			{
				email: "demo@publisher.io",
				username: "DemoPub",
				hashedPassword: bcrypt.hashSync("password"),
				userType: "Publisher",
			},
			{
				email: faker.internet.email(),
				username: "FakeUser1",
				hashedPassword: bcrypt.hashSync(faker.internet.password()),
				userType: "Shopper",
			},
			{
				email: faker.internet.email(),
				username: "FakeUser2",
				hashedPassword: bcrypt.hashSync(faker.internet.password()),
				userType: "Shopper",
			},
		],
		{}
	);
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
