const express = require("express");
const purchaseRoutes = require("express").Router();
//let category = require("../category/category");
const dbo = require("../../db/conn"); // connect to the database
const ObjectId = require("mongodb").ObjectId; // convert the Id from String to ObjectId for the _id
const nodemailer = require("nodemailer");//email sending

//add purchase details to the database
//http://localhost:8070/stock/addpurchase
purchaseRoutes.route("/addpurchase").post(function (req, response) {
	let db_connect = dbo.getDb("sansalu");
	
		const transporter = nodemailer.createTransport({
			host: "smtp.zoho.com",
			port: 465,
			secure: true,
			auth: {
				user: "sansalu@zohomail.com",
				pass: "Kusal@123",
			},
		});
	let newPurchase = {
		Supplier_Name: req.body.Supplier_Name,
		Purchase_Date: new Date(req.body.Purchase_Date).toLocaleDateString(),
		Material_Name: req.body.Material_Name,
		Quantity: parseInt(req.body.Quantity),
		Refferance_No: req.body.Refferance_No,
		Description: req.body.Description,
		Unit_Price: parseInt(req.body.Unit_Price),
		Total_Price: parseInt(req.body.Total_Price),
	};

	db_connect.collection("purchase").insertOne(newPurchase, function (err, res) {
		if (err) throw err;

		//response.json(res);

		const mailOptions = {
			from: "sansalu@zohomail.com",
			to: `thamalkarunarathna7@gmail.com`,
			subject: "New Order",
			text: `Material : ${req.body.Material_Name}, Quantity : ${req.body.Quantity} Meters `,
		};

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

//get all purchase details from the database
//http://localhost:8070/stock/getpurchase
purchaseRoutes.route("/getpurchase").get(function (req, response) {
	let db_connect = dbo.getDb("sansalu");
	db_connect
		.collection("purchase")
		.find({})
		.toArray(function (err, res) {
			if (err) throw err;
			response.json(res);
		});
});

//delete purchase details from the database
//http://localhost:8070/stock/deletepurchase/:id
purchaseRoutes.route("/getpurchase/:id").get(function (req, response) {
	let db_connect = dbo.getDb("sansalu");
	let myobject = { _id: ObjectId(req.params.id) };
	db_connect.collection("purchase").findOne(myobject, function (err, res) {
		if (err) throw err;
		response.json(res);
	});
});

//get purchase details from the database
//http://localhost:8070/stock/getpurchase/:id
purchaseRoutes.route("/updatepurchase/:id").put(function (req, response) {
	let db_connect = dbo.getDb("sansalu");

	let myquery = { _id: ObjectId(req.params.id) };

	let newvalues = {
		$set: {
			Supplier_Name: req.body.Supplier_Name,
			Purchase_Date: new Date(req.body.Purchase_Date).toLocaleDateString(),
			Material_Name: req.body.Material_Name,
			Quantity: parseInt(req.body.Quantity),
			Refferance_No: req.body.Refferance_No,
			Description: req.body.Description,
			Unit_Price: parseInt(req.body.Unit_Price),
			Total_Price: parseInt(req.body.Total_Price),
		},
	};

	db_connect.collection("purchase").updateOne(myquery, newvalues, function (err, res) {
		if (err) throw err;

		response.json(res);
	});
});


//delete purchase details from the database
//http://localhost:8070/stock/deletepurchase/:id
purchaseRoutes.route("/deletepurchase/:id").delete(function (req, response) {
	let db_connect = dbo.getDb("sansalu");

	let myquery = { _id: ObjectId(req.params.id) };

	db_connect.collection("purchase").deleteOne(myquery, function (err, obj) {
		if (err) throw err;

		response.json(obj);
	});
});

module.exports = purchaseRoutes;
