

const express = require("express");
const orderRoutes = require("express").Router();
//let category = require("../category/category");
const dbo = require("../../db/conn"); // connect to the database
const ObjectId = require("mongodb").ObjectId; // convert the Id from String to ObjectId for the _id

orderRoutes.route("/addorder").post(function (req, response) {
	let db_connect = dbo.getDb("sansalu");

	let neworder = {
		Product_Type: req.body.Product_Type,
		Print_Type: req.body.Print_Type,
		Template: req.body.Template,
		Color: req.body.Color,
		Quantity: parseInt(req.body.Quantity),
		Size: req.body.Size,
		Toatal_Quantity: parseInt(req.body.Toatal_Quantity),
		Description: req.body.Description,
	};

	db_connect.collection("stockorder").insertOne(neworder, function (err, res) {
		if (err) throw err;

		response.json(res);
	});
});

orderRoutes.route("/getorder").get(function (req, response) {
	let db_connect = dbo.getDb("sansalu");
	db_connect
		.collection("stockorder")
		.find({})
		.toArray(function (err, res) {
			if (err) throw err;
			response.json(res);
		});
});

orderRoutes.route("/getorder/:id").get(function (req, response) {
	let db_connect = dbo.getDb("sansalu");
	let myobject = { _id: ObjectId(req.params.id) };
	db_connect.collection("stockorder").findOne(myobject, function (err, res) {
		if (err) throw err;
		response.json(res);
	});
});

orderRoutes.route("/updateorder/:id").put(function (req, response) {
	let db_connect = dbo.getDb("sansalu");

	let myquery = { _id: ObjectId(req.params.id) };

	let newvalues = {
		$set: {
			Product_Type: req.body.Product_Type,
			Print_Type: req.body.Print_Type,
			Template: req.body.Template,
			Color: req.body.Color,
			Quantity: parseInt(req.body.Quantity),
			Size: req.body.Size,
			Toatal_Quantity: parseInt(req.body.Toatal_Quantity),
			Description: req.body.Description,
		},
	};

	db_connect.collection("stockorder").updateOne(myquery, newvalues, function (err, res) {
		if (err) throw err;

		response.json(res);
	});
});

orderRoutes.route("/deletorder/:id").delete(function (req, response) {
	let db_connect = dbo.getDb("sansalu");

	let myquery = { _id: ObjectId(req.params.id) };

	db_connect.collection("stockorder").deleteOne(myquery, function (err, obj) {
		if (err) throw err;

		response.json(obj);
	});
});

module.exports = orderRoutes;

