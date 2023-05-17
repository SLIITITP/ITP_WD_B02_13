const nodemailer = require("nodemailer");
const express = require("express");
const sendmailRoutes = express.Router();
const dbo = require("../../db/conn"); // connect to the database

// Function to send the email
const sendEmail = async (toEmail, subject, text) => {
	try {
		// Create a transporter using your email service provider's SMTP settings
const transporter = nodemailer.createTransport({
	service: "smtp.zoho.com",
	auth: {
		user: "karunarathnathamal@gmail.com",
		pass: "Karunarathna@123",
	},
	debug: true, // Enable debugging
});

		// Define the email options
		const mailOptions = {
			from: "karunarathnathamal@gmail.com",
			to: toEmail,
			subject: subject,
			text: text,
		};

		// Send the email
		const info = await transporter.sendMail(mailOptions);
		console.log("Email sent:", info.response);
		return true;
	} catch (error) {
		console.error("Error sending email:", error);
		return false;
	}
};

sendmailRoutes.route("/send-email").post(async function (req, res) {
	try {
		const { toEmail, subject, text } = req.body;

		// Send the email
		const success = await sendEmail(toEmail, subject, text);

		// Save the email details to the database
		const dbConnect = dbo.getDb("sansalu");
		const emailObject = {
			toEmail,
			subject,
			text,
		};
		const result = await dbConnect.collection("stockemail").insertOne(emailObject);
		console.log("1 record inserted");

		res.json({ success: true, message: "Email sent and saved successfully." });
	} catch (error) {
		console.error("Error sending email and saving to the database:", error);
		res.status(500).json({ success: false, message: "Failed to send email." });
	}
});

module.exports = sendmailRoutes;
