const express = require("express");
const nodemailer = require("nodemailer");

const paymentDetailsRoutes = express.Router();

// connect to the database
const dbo = require("../../db/conn");

// convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you create a new record.
paymentDetailsRoutes.route("/add").post(function (req, response) {
	let db_connect = dbo.getDb("sansalu");

	let myobj = {
		TotalAmount: Number(req.body.TotalAmount),
		RecipientName: req.body.RecipientName,
		RecipientEmail: req.body.RecipientEmail,
		ContactNumber: req.body.ContactNumber,
		Date: new Date(req.body.Date).toLocaleDateString(),
		Purpose: req.body.Purpose,
	};
	db_connect.collection("paymentDetails").insertOne(myobj, function (err, res) {
		if (err) throw err;

		const transporter = nodemailer.createTransport({
			host: "smtp.zoho.com",
			port: 465,
			secure: true,
			auth: {
				user: "sansalu@zohomail.com",
				pass: "Kusal@123",
			},
		});

		const mailOptions = {
			from: "sansalu@zohomail.com",
			to: `${req.body.RecipientEmail}`,
			subject: "Successful Payment",
			text: `Hi ${req.body.RecipientName},\n\nYour payment of Rs.${req.body.TotalAmount} has been successfully received.\n\nThank you for using Sansalu.\n\nRegards,\nSansalu Team`,
		};

		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				console.log(error);
			} else {
				console.log("Email sent: " + info.response);
			}
		})

		console.log("1 record inserted");
		response.json(res);
	});
});

//retrieve
paymentDetailsRoutes.route("/").get(function (req, response) {
	let db_connect = dbo.getDb("sansalu");
	db_connect
		.collection("paymentDetails")
		.find({})
		.toArray(function (err, res) {
			if (err) throw err;
			response.json(res);
		});
});

//get data by id
paymentDetailsRoutes.route("/:id").get(function (req, response) {
	let db_connect = dbo.getDb("sansalu");
	let myobject = { _id: ObjectId(req.params.id) };
	db_connect.collection("paymentDetails").findOne(myobject, function (err, res) {
		if (err) throw err;
		response.json(res);
	});
});

paymentDetailsRoutes.route("/getLastOrder").get(function (req, res) {
    let db_connect = dbo.getDb("sansalu");

    db_connect.collection("order").find({}).sort({ _id: -1 }).limit(1).toArray(function (err, result) {
        if (err) throw err;

        res.json(result);
    });
});

//update
paymentDetailsRoutes.route("/update/:id").post(function (req, response) {
	let db_connect = dbo.getDb("sansalu");

	let myquery = { _id: ObjectId(req.params.id) };

	let newvalues = {
		$set: {
			TotalAmount: number(req.body.TotalAmount),
			RecipientName: req.body.RecipientName,
			RecipientEmail: req.body.RecipientEmail,
			ContactNumber: req.body.ContactNumber,
			Date: new Date(req.body.Date).toLocaleDateString(),
			Purpose: req.body.Purpose,
		},
	};

	db_connect.collection("paymentDetails").updateOne(myquery, newvalues, function (err, res) {
		if (err) throw err;

		response.json(res);
	});
});

//delete
paymentDetailsRoutes.route("/delete/:id").delete(function (req, response) {
	let db_connect = dbo.getDb("sansalu");

	let myquery = { _id: ObjectId(req.params.id) };

	db_connect.collection("paymentDetails").deleteOne(myquery, function (err, obj) {
		if (err) throw err;

		response.json(obj);
	});
});

module.exports = paymentDetailsRoutes;
