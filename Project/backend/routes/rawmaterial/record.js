const express = require("express");
const rawmaterialRoutes = require("express").Router();
//let category = require("../category/category");
const dbo = require("../../db/conn"); // connect to the database
const ObjectId = require("mongodb").ObjectId; // convert the Id from String to ObjectId for the _id

rawmaterialRoutes.route("/addmaterial").post(function (req, response) {
	let db_connect = dbo.getDb("sansalu");

	let newmaterial = {
		Material_Name: req.body.Material_Name,
		Category: req.body.Category,
		Price: parseInt(req.body.Price),
		Quantity: parseInt(req.body.Quantity),
		Description: req.body.Description,
	};

	db_connect.collection("rawmaterial").insertOne(newmaterial, function (err, res) {
		if (err) throw err;

		response.json(res);
	});
});

rawmaterialRoutes.route("/getmaterial").get(function (req, response) {
	let db_connect = dbo.getDb("sansalu");
	db_connect
		.collection("rawmaterial")
		.find({})
		.toArray(function (err, res) {
			if (err) throw err;
			response.json(res);
		});
});

rawmaterialRoutes.route("/getmaterial/:id").get(function (req, response) {
	let db_connect = dbo.getDb("sansalu");
	let myobject = { _id: ObjectId(req.params.id) };
	db_connect.collection("rawmaterial").findOne(myobject, function (err, res) {
		if (err) throw err;
		response.json(res);
	});
});

rawmaterialRoutes.route("/updatematerial/:id").put(function (req, response) {
	let db_connect = dbo.getDb("sansalu");

	let myquery = { _id: ObjectId(req.params.id) };

	let newvalues = {
		$set: {
			Material_Name: req.body.Material_Name,
			Category: req.body.Category,
			Price: parseInt(req.body.Price),
			Quantity: parseInt(req.body.Quantity),
			Description: req.body.Description,
		},
	};

	db_connect.collection("rawmaterial").updateOne(myquery, newvalues, function (err, res) {
		if (err) throw err;

		response.json(res);
	});
});

rawmaterialRoutes.route("/deletematerial/:id").delete(function (req, response) {
	let db_connect = dbo.getDb("sansalu");

	let myquery = { _id: ObjectId(req.params.id) };

	db_connect.collection("rawmaterial").deleteOne(myquery, function (err, obj) {
		if (err) throw err;

		response.json(obj);
	});
});

module.exports = rawmaterialRoutes;
