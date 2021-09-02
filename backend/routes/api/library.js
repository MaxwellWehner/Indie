const express = require("express");
const asyncHandler = require("express-async-handler");
const { requireAuth } = require("../../utils/auth");
const {
	Publisher,
	Game,
	Image,
	Shopper,
	shopperGameLibrary,
} = require("../../db/models");
const { Op } = require("sequelize");

const router = express.Router();

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
// 				{
// 					model: Publisher,
// 					attributes: ["publisherName"],
// 				},
// 			],
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
// 		const game = await Game.findByPk(id, {
// 			include: [
// 				{
// 					model: Image,
// 					attributes: ["id"],
// 				},
// 				{
// 					model: Publisher,
// 					attributes: ["publisherName"],
// 				},
// 			],
// 		});

// 		return res.json({
// 			game,
// 		});
// 	})
// );

//get all gameId and hidden from userId
router.get(
	"/:id(\\d+)",
	requireAuth,
	asyncHandler(async (req, res) => {
		const userId = +req.params.id;
		if (req.user.userType === "Shopper") {
			const shopper = await Shopper.findOne({
				attributes: [],
				where: {
					userId,
				},
				include: [
					{
						model: shopperGameLibrary,
						attributes: ["gameId", "hidden"],
					},
				],
			});

			return res.json({ shopper });
		}
		return res.json({ error: "you must be a shopper to have a library" });
	})
);

// //get games from arr of Ids
// router.post(
// 	"/array",
// 	asyncHandler(async (req, res) => {
// 		const { array } = req.body;
// 		const games = await Game.findAll({
// 			where: {
// 				id: {
// 					[Op.in]: array,
// 				},
// 			},
// 			include: [
// 				{
// 					model: Image,
// 					attributes: ["id"],
// 				},
// 				{
// 					model: Publisher,
// 					attributes: ["publisherName"],
// 				},
// 			],
// 		});

// 		return res.json({ games });
// 	})
// );

// add a game to your library
router.post(
	"",
	requireAuth,
	asyncHandler(async (req, res) => {
		const userId = req.user.id;
		if (req.user.userType === "Shopper") {
			const shopper = await Shopper.findOne({
				where: {
					userId,
				},
			});

			const { gameId } = req.body;

			const gameLib = await shopperGameLibrary.create({
				gameId,
				shopperId: shopper.id,
				hidden: false,
			});

			return res.json({ gameId: gameLib.gameId, hidden: gameLib.hidden });
		}
	})
);

// router.put(
// 	"/:id(\\d+)",
// 	requireAuth,
// 	validateCreateGame,
// 	asyncHandler(async (req, res) => {
// 		const userId = req.user.id;
// 		const { id } = req.params;
// 		const game = await Game.findByPk(id, {
// 			include: [
// 				{
// 					model: Image,
// 					attributes: ["id"],
// 				},
// 				{
// 					model: Publisher,
// 					attributes: ["publisherName"],
// 				},
// 			],
// 		});
// 		if (req.user.userType === "Publisher") {
// 			const publisher = await Publisher.findOne({
// 				where: {
// 					userId,
// 				},
// 			});
// 			const {
// 				price,
// 				releaseDate,
// 				title,
// 				description,
// 				developer,
// 				totalImages,
// 			} = req.body;
// 			if (game.publisherId === publisher.id) {
// 				game.Images.forEach((image) => {
// 					(async () => {
// 						const newimage = await Image.findByPk(image.id);
// 						await newimage.destroy();
// 					})();
// 				});

// 				const newGame = await game.update({
// 					price,
// 					releaseDate,
// 					title,
// 					description,
// 					developer,
// 				});

// 				totalImages.forEach((image) => {
// 					(async () => {
// 						await Image.create({
// 							imageUrl: image,
// 							gameId: newGame.id,
// 						});
// 					})();
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

module.exports = router;
