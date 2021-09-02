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
						model: Game,
					},
				],
			});

			const ans = [];

			shopper.Games.forEach((game) => {
				let obj = {};
				obj[game.shopperGameLibrary.gameId] =
					game.shopperGameLibrary.hidden;
				ans.push(obj);
			});

			return res.json({ ans });
		}
		return res.json({ error: "you must be a shopper to have a library" });
	})
);

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


// edit a game in your library
router.put(
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

            const gameLib = await shopperGameLibrary.findOne({
                where: {
                    shopperId: shopper.id,
                    gameId
                }
            })

			gameLib.update({
				hidden: !gameLib.hidden,
            });

			return res.json({
				gameId: gameLib.gameId,
				hidden: gameLib.hidden,
			});
		}
	})
);


module.exports = router;
