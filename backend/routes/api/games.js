const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");

const { handleValidationErrors } = require("../../utils/validation");
const { requireAuth } = require("../../utils/auth");
const {  Publisher, Game, Image } = require("../../db/models");
const { Op } = require("sequelize");

const router = express.Router();

const validateCreateGame = [
	check("price")
		.exists({ checkFalsy: true })
		.isInt({ min: 1 })
		.withMessage("Please provide a price of at least 1 dollar"),
	check("title")
		.exists({ checkFalsy: true })
		.isLength({ min: 1, max: 50 })
		.withMessage(
			"Please provide a title with at least 1 characters and less than 50."
		),
	check("description")
		.isLength({ max: 300 })
		.withMessage("Description must be less than 300  charaters."),
	check("developer")
		.isLength({ min: 1, max: 50 })
		.withMessage(
			"Devloper name must be less than 50 charaters and greater than 1."
		),
	check("releaseDate")
		.exists({ checkFalsy: true })
		.isISO8601()
		.toDate()
		.withMessage("Please provide a valid date"),
	handleValidationErrors,
];

//Get 10 most recent
router.get(
	"",
	asyncHandler(async (req, res) => {
		const games = await Game.findAll({
			order: [["releaseDate", "DESC"]],
			limit: 10,
			include: [
				{
					model: Image,
					attributes: ["id"],
				},
				{
					model: Publisher,
					attributes: ["publisherName"],
				},
			],
		});

		return res.json({
			games,
		});
	})
);

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

router.get(
	"/:id(\\d+)",
	asyncHandler(async (req, res) => {
		const { id } = req.params;
		const game = await Game.findByPk(id, {
			include: [
				{
					model: Image,
					attributes: ["id"],
				},
				{
					model: Publisher,
					attributes: ["publisherName"],
				},
			],
		});

		return res.json({
			game,
		});
	})
);

//get games form userId
router.get(
	"/publisher/:id(\\d+)",
	// requireAuth,
	asyncHandler(async (req, res) => {
		const userId = +req.params.id;

		const publisher = await Publisher.findOne({
			attributes: [],
			where: {
				userId,
			},
			include: [
				{
					model: Game,
					attributes: ["id"],
				},
			],
		});

		return res.json({ publisher });
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
			include: [
				{
					model: Image,
					attributes: ["id"],
				},
				{
					model: Publisher,
					attributes: ["publisherName"],
				},
			],
		});

		return res.json({ games });
	})
);

router.post(
	"",
	requireAuth,
	validateCreateGame,
	asyncHandler(async (req, res) => {
		const userId = req.user.id;

		const {
			title,
			price,
			description,
			developer,
			releaseDate,
			totalImages,
		} = req.body;
		if (req.user.userType === "Publisher") {
			const publisher = await Publisher.findOne({
				where: {
					userId,
				},
			});
			const newGame = await Game.create({
				price: +price,
				releaseDate: new Date(releaseDate),
				title,
				description,
				developer,
				publisherId: publisher.id,
			});

			totalImages.forEach((image) => {
				(async () => {
					await Image.create({
						imageUrl: image,
						gameId: newGame.id,
					});
				})();
			});

			const returnGame = await Game.findByPk(newGame.id, {
				include: [
					{
						model: Image,
						attributes: ["id"],
					},
					{
						model: Publisher,
						attributes: ["publisherName"],
					},
				],
			});
			return res.json({ game: returnGame });
		} else {
			return res.json({
				errors: ["You must be publisher to create a game"],
			});
		}
	})
);

router.put(
	"/:id(\\d+)",
	requireAuth,
	validateCreateGame,
	asyncHandler(async (req, res) => {
		const userId = req.user.id;
		const { id } = req.params;
		const game = await Game.findByPk(id, {
			include: [
				{
					model: Image,
					attributes: ["id"],
				},
				{
					model: Publisher,
					attributes: ["publisherName"],
				},
			],
		});
		if (req.user.userType === "Publisher") {
			const publisher = await Publisher.findOne({
				where: {
					userId,
				},
			});
			const {
				price,
				releaseDate,
				title,
				description,
				developer,
				totalImages,
			} = req.body;
			if (game.publisherId === publisher.id) {
				game.Images.forEach((image) => {
					(async () => {
						const newimage = await Image.findByPk(image.id);
						await newimage.destroy();
					})();
				});

				const newGame = await game.update({
					price,
					releaseDate,
					title,
					description,
					developer,
					// publisherId: publisher.Id,
				});

				totalImages.forEach((image) => {
					(async () => {
						await Image.create({
							imageUrl: image,
							gameId: newGame.id,
						});
					})();
				});

				return res.json({ game: newGame });
			} else {
				return res.json({
					errors: ["You must be publisher of this game to edit it"],
				});
			}
		} else {
			return res.json({
				errors: ["You must be publisher to edit a game"],
			});
		}
	})
);

router.delete(
	"/:id(\\d+)",
	requireAuth,
	asyncHandler(async (req, res) => {
		const userId = req.user.id;
		const id = req.params.id;
		const game = await Game.findByPk(id);
		if (req.user.userType === "Publisher") {
			const publisher = await Publisher.findOne({
				where: {
					userId,
				},
			});
			if (game.publisherId === publisher.id) {
				await game.destroy();
				return res.json({ message: "success" }); //game deleted succsess
			} else {
				return res.json({
					errors: ["You must be publisher of this game to delete it"],
				});
			}
		} else {
			return res.json({
				errors: ["You must be publisher to delete a game"],
			});
		}
	})
);

module.exports = router;
