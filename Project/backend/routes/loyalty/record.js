const express = require("express");

const loyaltyRoutes = express.Router();

const dbo = require("../../db/conn"); // connect to the database

const ObjectId = require("mongodb").ObjectId // convert the Id from String to ObjectId for the _id


// http://localhost:8070/loyalty/add ( created 1 record )
loyaltyRoutes.route("/add").post(function (req, response) {

	let db_connect = dbo.getDb("sansalu");

	let myobject = {
		type: req.body.type,
		discount: Number(req.body.discount),
		payments: Number(req.body.payments),
	};

	db_connect.collection("loyalty").insertOne(myobject, function (err, res) {
		if (err) throw err;
		response.json(res);
	});
});

// http://localhost:8070/loyalty/update/:id ( update a record by id )
loyaltyRoutes.route("/update/:id").post(function (req, response) {
	let db_connect = dbo.getDb("sansalu");
	let myquery = { _id: ObjectId(req.params.id) };
	let newvalues = {
		$set: {
			type: req.body.type,
			discount: Number(req.body.discount),
			payments: Number(req.body.payments),
		},
	};
	db_connect.collection("loyalty").updateOne(myquery, newvalues, function (err, res) {
		if (err) throw err;
		response.json(res);
	});
});