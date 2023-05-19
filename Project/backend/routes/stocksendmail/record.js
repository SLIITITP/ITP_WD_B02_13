const express = require("express");
const sendmailRoutes = express.Router();
const dbo = require("../../db/conn"); // connect to the database
const ObjectId = require("mongodb").ObjectId; // convert the Id from String to ObjectId for the _id
const nodemailer = require("nodemailer");

//add stock request and send mail to the production manager
// http://localhost:8070/ production/addstockreq ( created 1 record )
sendmailRoutes.route("/addmail").post(function (req, response) {
	let db_connect = dbo.getDb("sansalu");

	// create reusable transporter object using the default SMTP transport
	const transporter = nodemailer.createTransport({
		host: "smtp.zoho.com",
		port: 465,
		secure: true,
		auth: {
			user: "sansalu@zohomail.com",
			pass: "Kusal@123",
		},
	});

	// send mail with defined transport object
	let myobject = {
		subject: req.body.subject,
		text: req.body.text,
	};
	//insert data to the database
	db_connect.collection("stockmail").insertOne(myobject, function (err, res) {
		if (err) throw err;
		
		// send mail with defined transport object
		const mailOptions = {
			from: "sansalu@zohomail.com",
			to: `manulbandara@gmail.com`,
			subject: "Order Status",
			text: ` Order id : ${req.body.subject}, Status : ${req.body.text} `,
		};

		// send mail with defined transport object
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				console.log(error);
			} else {
				console.log("Email sent: " + info.response);
			}
		});
		console.log("1 record updated");
		response.json(res);
	});
});

module.exports = sendmailRoutes;
