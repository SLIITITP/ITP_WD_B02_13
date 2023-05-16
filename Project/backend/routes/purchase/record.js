
const express = require("express");
const purchaseRoutes = require("express").Router();
//let category = require("../category/category");
const dbo = require("../../db/conn"); // connect to the database
const ObjectId = require("mongodb").ObjectId; // convert the Id from String to ObjectId for the _id

purchaseRoutes.route("/addpurchase").post(function (req, response) {
	let db_connect = dbo.getDb("sansalu");

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

		response.json(res);
	});
});

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

purchaseRoutes.route("/getpurchase/:id").get(function (req, response) {
	let db_connect = dbo.getDb("sansalu");
	let myobject = { _id: ObjectId(req.params.id) };
	db_connect.collection("purchase").findOne(myobject, function (err, res) {
		if (err) throw err;
		response.json(res);
	});
});

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

purchaseRoutes.route("/deletepurchase/:id").delete(function (req, response) {
	let db_connect = dbo.getDb("sansalu");

	let myquery = { _id: ObjectId(req.params.id) };

	db_connect.collection("purchase").deleteOne(myquery, function (err, obj) {
		if (err) throw err;

		response.json(obj);
	});
});

module.exports = purchaseRoutes;

