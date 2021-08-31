const express = require("express");
const asyncHandler = require("express-async-handler");

const { Image } = require("../../db/models");
const { Op } = require("sequelize");

const router = express.Router();

router.post(
	"/arr",
	asyncHandler(async (req, res) => {
		const { arr } = req.body;
		if (arr) {
			const images = await Image.findAll({
				where: {
					id: {
						[Op.in]: arr,
					},
				},
			});

			return res.json({ images });
		} else {
			return res.json({ skip: "skip" });
		}
	})
);

module.exports = router;
