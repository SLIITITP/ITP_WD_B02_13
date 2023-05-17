const express = require("express");

const clientDesignRoutes = express.Router();

const dbo = require("../../db/conn"); // connect to the database

const ObjectId = require("mongodb").ObjectId; // convert the Id from String to ObjectId for the _id

//add
clientDesignRoutes.route("/add").post(function (req, response) {
	let db_connect = dbo.getDb("sansalu");
	let myobj = {
		userID: req.body.userID,
		designURL: req.body.designURL,
		templateName: req.body.templateName,
		printType: req.body.printType,
		material: req.body.material,
		totalCost: Number(req.body.totalCost),
		createdAt: new Date(), // add current date and time
	};
	db_connect.collection("clientDesign").insertOne(myobj, function (err, res) {
		if (err) throw err;
		response.json(res);
	});
});

//retrieve all
clientDesignRoutes.route("/").get(function (req, response) {
	let db_connect = dbo.getDb("sansalu");
	db_connect
		.collection("clientDesign")
		.find({})
		.toArray(function (err, res) {
			if (err) throw err;
			response.json(res);
		});
});

//get by id
clientDesignRoutes.route("/:id").get(function (req, response) {
	let db_connect = dbo.getDb("sansalu");
	let myobject = { _id: ObjectId(req.params.id) };
	db_connect.collection("clientDesign").findOne(myobject, function (err, res) {
		if (err) throw err;
		response.json(res);
	});
});

//delete
clientDesignRoutes.route("/delete/:id").delete(function (req, response) {
	let db_connect = dbo.getDb("sansalu");

	let myquery = { _id: ObjectId(req.params.id) };

	db_connect.collection("clientDesign").deleteOne(myquery, function (err, obj) {
		if (err) throw err;

		response.json(obj);
	});
});
module.exports = clientDesignRoutes;
