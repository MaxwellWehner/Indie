const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");

const { handleValidationErrors } = require("../../utils/validation");
const { requireAuth } = require("../../utils/auth");
const { Publisher, Image } = require("../../db/models");
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

// //Get 10 most recent
// router.get(
// 	"",
// 	asyncHandler(async (req, res) => {
// 		const games = await Game.findAll({
// 			order: [["releaseDate", "DESC"]],
// 			limit: 10,
// 			include: [
// 				{
// 					model: Image,
// 					attributes: ["id"],
// 				},
// 			],
// 		});

// 		return res.json({
// 			games,
// 		});
// 	})
// );

// //get 5 random games
// router.get(
// 	"/random",
// 	asyncHandler(async (req, res) => {
// 		const games = await Game.findAll({
// 			order: sequelize.random(),
// 			limit: 1,
// 		});

// 		return res.json({
// 			games,
// 		});
// 	})
// );

// router.get(
// 	"/:id(\\d+)",
// 	asyncHandler(async (req, res) => {
// 		const { id } = req.params;
// 		const game = await Game.findByPk(id);

// 		return res.json({
// 			game,
// 		});
// 	})
// );

//get images from arr of Ids
router.post(
	"/arr",
	asyncHandler(async (req, res) => {
		const { arr } = req.body;
		const images = await Image.findAll({
			where: {
				id: {
					[Op.in]: arr,
				},
			},
		});

		return res.json({ images });
	})
);

// router.post(
// 	"",
// 	requireAuth,
// 	asyncHandler(async (req, res) => {
// 		const userId = req.user.id;

// 		const { price, releaseDate, title, description, developer } = req.body;
// 		if (req.user.userType === "Publisher") {
// 			const publisher = Publisher.findOne({
// 				where: {
// 					userId,
// 				},
// 			});

// 			const newGame = await Game.create({
// 				price,
// 				releaseDate,
// 				title,
// 				description,
// 				developer,
// 				publisherId: publisher.Id,
// 			});
// 			return res.json({ game: newGame });
// 		} else {
// 			return res.json({
// 				errors: ["You must be publisher to create a game"],
// 			});
// 		}
// 	})
// );

// router.put(
// 	"/:id(\\d+)",
// 	requireAuth,
// 	asyncHandler(async (req, res) => {
// 		const userId = req.user.id;
// 		const { id } = req.params;
// 		const game = Game.findByPk(id);
// 		if (req.user.userType === "Publisher") {
// 			const publisher = Publisher.findOne({
// 				where: {
// 					userId,
// 				},
// 			});
// 			const { price, releaseDate, title, description, developer } =
// 				req.body;
// 			if (game.publisherId === publisher.id) {
// 				const newGame = await game.update({
// 					price,
// 					releaseDate,
// 					title,
// 					description,
// 					developer,
// 					// publisherId: publisher.Id,
// 				});
// 				return res.json({ game: newGame });
// 			} else {
// 				return res.json({
// 					errors: ["You must be publisher of this game to edit it"],
// 				});
// 			}
// 		} else {
// 			return res.json({
// 				errors: ["You must be publisher to edit a game"],
// 			});
// 		}
// 	})
// );

// router.delete(
// 	"/:id(\\d+)",
// 	asyncHandler(async (req, res) => {
// 		const userId = req.user.id;
// 		const { id } = req.params;
// 		const game = Game.findByPk(id);
// 		if (req.user.userType === "Publisher") {
// 			const publisher = Publisher.findOne({
// 				where: {
// 					userId,
// 				},
// 			});
// 			if (game.publisherId === publisher.id) {
// 				game.destroy();
// 				return {}; //game deleted succsess
// 			} else {
// 				return res.json({
// 					errors: ["You must be publisher of this game to delete it"],
// 				});
// 			}
// 		} else {
// 			return res.json({
// 				errors: ["You must be publisher to delete a game"],
// 			});
// 		}
// 	})
// );

module.exports = router;
