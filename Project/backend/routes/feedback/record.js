const express = require("express");

const feedbackRoutes = express.Router();

const dbo = require("../../db/conn"); // connect to the database

const ObjectId = require("mongodb").ObjectId // convert the Id from String to ObjectId for the _id


// http://localhost:8070/feedback/ ( get all record )
feedbackRoutes.route("/").get(function (req, res) {

	let db_connect = dbo.getDb("sansalu");

	db_connect.collection("feedback").find({}).toArray(function (err, result) {
			if (err) throw err;

			res.json(result);
		});
});

// http://localhost:8070/feedback/feedback/:id ( get a single record by id )
feedbackRoutes.route("/feedback/:id").get(function (req, res) {

	let db_connect = dbo.getDb("sansalu");

	let myquery = { _id: ObjectId(req.params.id) };

	db_connect.collection("feedback").findOne(myquery, function (err, result) {
		if (err) throw err;

		res.json(result);
	});
});

// http://localhost:8070/feedback/add ( created 1 record )
feedbackRoutes.route("/add").post(function (req, response) {

	let db_connect = dbo.getDb("sansalu");

	let myobject = {
		name:req.body.name,
        description:req.body.description
	};

	db_connect.collection("feedback").insertOne(myobject, function (err, res) {
		if (err) throw err;

		console.log("1 record inserted");
		response.json(res);
	});
});


// http://localhost:8070/feedback/update/:id ( update a record by id )
feedbackRoutes.route("/update/:id").post(function (req, response) {

	let db_connect = dbo.getDb("sansalu");

	let myquery = { _id: ObjectId(req.params.id) };

	let newvalues = {
		$set: {
			name:req.body.name,
            description:req.body.description
		},
	};

	db_connect.collection("feedback").updateOne(myquery, newvalues, function (err, res) {
		if (err) throw err;

		console.log("1 record updated");
		response.json(res);
	});
});


// http://localhost:8070/feedback/delete/:id ( delete a record by id )
feedbackRoutes.route("/delete/:id").delete((req, response) => {

	let db_connect = dbo.getDb("sansalu");

	let myquery = { _id: ObjectId(req.params.id) };

	db_connect.collection("feedback").deleteOne(myquery, function (err, obj) {
		if (err) throw err;
        
		console.log("1 record deleted");
		response.json(obj);
	});
});


module.exports = feedbackRoutes;