const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");

const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Shopper, Publisher } = require("../../db/models");

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

const validateSignupPublisher = [
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
	check("publisherName")
		.exists({ checkFalsy: true })
		.withMessage("Please provide a name for your publishing company"),
	handleValidationErrors,
];

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

		await setTokenCookie(res, user);

		return res.json({
			user,
		});
	})
);

router.post(
	"/publisher",
	validateSignupPublisher,
	asyncHandler(async (req, res) => {
		const { email, password, username, userType, publisherName } = req.body;
		const user = await User.signup({
			email,
			username,
			password,
			userType,
		});

		const pub = await Publisher.create({
			userId: user.id,
			publisherName,
		});

		await setTokenCookie(res, user);

		return res.json({
			user,
		});
	})
);

module.exports = router;
