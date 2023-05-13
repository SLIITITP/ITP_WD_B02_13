const express = require("express");
let alert = require("alert");
const jwt = require("jsonwebtoken");

const adminRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// login
adminRoutes.route("/login").post(function (req, response) {
	let db_connect = dbo.getDb("sansalu");
	let email = req.body.email;
	let password = req.body.password;
	// console.log(email)
	// console.log(password)

	db_connect.collection("admin").findOne({ email: email}, function (err, result) {
		if (err) throw err;
		if (result) {
			const token = jwt.sign(
				{
					id: result._id,
					email: result.email,
					password: result.password,
				},
				"secretkey"
			);

			return response.json({ user: true, msg: "Login Success", status: "ok", token: token });
		} else {
			return response.json({ user: false, msg: "Login Failed", status: "error" });
		}
	});
});

module.exports = adminRoutes;