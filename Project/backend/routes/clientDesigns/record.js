const express = require("express");

const clientDesignRoutes = express.Router();

const dbo = require("../../db/conn"); // connect to the database

const ObjectId = require("mongodb").ObjectId // convert the Id from String to ObjectId for the _id

//add
clientDesignRoutes.route("/add").post(function (req, response) {
	let db_connect = dbo.getDb("sansalu");
	let myobj = {
		designURL: req.body.designURL,
        designTime: new Date(req.body.designTime).toLocaleDateString(),
        templateName: req.body.templateName,
        printType: req.body.printType,
        material: req.body.material,
		totalCost: Number(req.body.totalCost),

	};
	db_connect.collection("clientDesign").insertOne(myobj, function (err, res) {
		if (err) throw err;
		response.json(res);
	});
});

//get
clientDesignRoutes.route("/:id").get(function (req, response) {
	let db_connect = dbo.getDb("sansalu");
	let myobject = { _id: ObjectId(req.params.id) };
	db_connect.collection("clientDesign").findOne(myobject, function (err, res) {
		if (err) throw err;
		response.json(res);
	});
});

module.exports = clientDesignRoutes;