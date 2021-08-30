const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");

const { handleValidationErrors } = require("../../utils/validation");
const { requireAuth } = require("../../utils/auth");
const { User, Shopper, Publisher, Game } = require("../../db/models");
const { sequelize } = require("../../db/models");
const { Op } = require("sequelize");

const router = express.Router();

const validateSignup = [
	check("email")
		.exists({ checkFalsy: true })
		.isEmail()
		.withMessage("Please provide a valid email."),
	check("username")
		.exists({ checkFalsy: true })
		.isLength({ min: 4 })
		.withMessage("Please provide a username with at least 4 characters."),
	check("username")
		.not()
		.isEmail()
		.withMessage("Username cannot be an email."),
	check("password")
		.exists({ checkFalsy: true })
		.isLength({ min: 6 })
		.withMessage("Password must be 6 characters or more."),
	handleValidationErrors,
];

//Get 10 most recent
router.get(
	"",
	asyncHandler(async (req, res) => {
		const games = await Game.findAll({
			order: [["releaseDate", "DESC"]],
			limit: 10,
		});

		return res.json({
			games,
		});
	})
);

//get 5 random games
router.get(
	"/random",
	asyncHandler(async (req, res) => {
		const games = await Game.findAll({
			order: sequelize.random(),
			limit: 1,
		});

		return res.json({
			games,
		});
	})
);

router.get(
	"/:id(\\d+)",
	asyncHandler(async (req, res) => {
		const { id } = req.params;
		const game = await Game.findByPk(id);

		return res.json({
			game,
		});
	})
);

//get games from arr of Ids
router.post(
	"/array",
	asyncHandler(async (req, res) => {
		const { array } = req.body;
		const games = await Game.findAll({
			where: {
				id: {
					[Op.in]: array,
				},
			},
		});

		return res.json({ games });
	})
);

router.post(
	"",
	requireAuth,
	asyncHandler(async (req, res) => {
		const userId = req.user.id;
		const publisher = Publisher.findOne({
			where: {
				userId,
			},
		});
		const { price, releaseDate, title, description, developer } = req.body;
		if (req.user.userType === "Publisher") {
			const newGame = await Game.create({
				price,
				releaseDate,
				title,
				description,
				developer,
				publisherId: publisher.Id,
			});
			return res.json({ game: newGame });
		} else {
			return res.json({
				errors: ["You must be publisher to create a game"],
			});
		}
	})
);

// Sign up
router.post(
	"",
	validateSignup,
	asyncHandler(async (req, res) => {
		const { email, password, username, userType, publisherName } = req.body;
		const user = await User.signup({ email, username, password, userType });

		if (userType === "Shopper") {
			await Shopper.create({
				userId: user.id,
				wallet: 0,
			});
		}

		return res.json({
			user,
		});
	})
);

module.exports = router;
