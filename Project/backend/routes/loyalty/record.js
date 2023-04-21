const express = require("express");

const loyaltyRoutes = express.Router();

const dbo = require("../../db/conn"); // connect to the database

const ObjectId = require("mongodb").ObjectId // convert the Id from String to ObjectId for the _id


// http://localhost:8070/loyalty/ ( get all record )
loyaltyRoutes.route("/").get(function (req, res) {

	let db_connect = dbo.getDb("sansalu");

	db_connect.collection("loyalty").find({}).sort({ discount: 1 }).toArray(function (err, result) {
			if (err) throw err;

			res.json(result);
		});
});

// http://localhost:8070/loyalty/loyalty/:id ( get a single record by id )
loyaltyRoutes.route("/loyalty/:id").get(function (req, res) {

	let db_connect = dbo.getDb("sansalu");

	let myquery = { _id: ObjectId(req.params.id) };

	db_connect.collection("loyalty").findOne(myquery, function (err, result) {
		if (err) throw err;

		res.json(result);
	});
});


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

		console.log("1 record inserted");
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

		console.log("1 record updated");
		response.json(res);
	});
});


// http://localhost:8070/loyalty/delete/:id ( delete a record by id )
loyaltyRoutes.route("/delete/:id").delete((req, response) => {

	let db_connect = dbo.getDb("sansalu");

	let myquery = { _id: ObjectId(req.params.id) };

	db_connect.collection("loyalty").deleteOne(myquery, function (err, obj) {
		if (err) throw err;

		console.log("1 record deleted");
		response.json(obj);
	});
});


module.exports = loyaltyRoutes;