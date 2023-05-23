
const express = require("express");
const supplierRoutes = require("express").Router();
//let category = require("../category/category");
const dbo = require("../../db/conn"); // connect to the database
const ObjectId = require("mongodb").ObjectId; // convert the Id from String to ObjectId for the _id

//add supplier to the database
//http://localhost:8070/stock/addsupplier
supplierRoutes.route("/addsupplier").post(function (req, response) {
	    const Supplier_Name = req.body.Supplier_Name;
		const Mobile_No = Number(req.body.Mobile_No);
		const Email = req.body.Email;
		const Address = req.body.Address;
		const Description = req.body.Description;

	// Check for required fields
	if (!Supplier_Name || !Mobile_No || !Email || !Address || !Description) {
		return response.status(400).json({ error: "All fields are required." });
	}

	// Validate Mobile_No as an integer
	if (isNaN(parseInt(Mobile_No))) {
		return response.status(400).json({ error: "Mobile number must be an integer." });
	}

	// Validate Email format
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(Email)) {
		return response.status(400).json({ error: "Invalid email address." });
	}

	let db_connect = dbo.getDb("sansalu");

	let newsupplier = {
		Supplier_Name: Supplier_Name,
		Mobile_No: parseInt(Mobile_No),
		Email: Email,
		Address: Address,
		Description: Description,
	};

	db_connect.collection("supplier").insertOne(newsupplier, function (err, res) {
		if (err) throw err;

		response.json(res);
	});
});

//get all suppliers from the database
//http://localhost:8070/stock/getsupplier
supplierRoutes.route("/getsupplier").get(function (req, response) {
	let db_connect = dbo.getDb("sansalu");
	db_connect
		.collection("supplier")
		.find({})
		.toArray(function (err, res) {
			if (err) throw err;
			response.json(res);
		});
});


//get a supplier from the database
//http://localhost:8070/stock/getsupplier/:id
supplierRoutes.route("/getsupplier/:id").get(function (req, response) {
	let db_connect = dbo.getDb("sansalu");
	let myobject = { _id: ObjectId(req.params.id) };
	db_connect.collection("supplier").findOne(myobject, function (err, res) {
		if (err) throw err;
		response.json(res);
	});
});


//update a supplier in the database
//http://localhost:8070/stock/updatesupplier/:id
supplierRoutes.route("/updatesupplier/:id").put(function (req, response) {
	let db_connect = dbo.getDb("sansalu");

	let myquery = { _id: ObjectId(req.params.id) };

	let newvalues = {
		$set: {
			Supplier_Name: req.body.Supplier_Name,
			Mobile_No: parseInt(req.body.Mobile_No),
			Email: req.body.Email,
			Address: req.body.Address,
			Description: req.body.Description,
		},
	};

	db_connect.collection("supplier").updateOne(myquery, newvalues, function (err, res) {
		if (err) throw err;

		response.json(res);
	});
});


//delete a supplier from the database
//http://localhost:8070/stock/deletesupplier/:id
supplierRoutes.route("/deletesupplier/:id").delete(function (req, response) {
	let db_connect = dbo.getDb("sansalu");

	let myquery = { _id: ObjectId(req.params.id) };

	db_connect.collection("supplier").deleteOne(myquery, function (err, obj) {
		if (err) throw err;

		response.json(obj);
	});
});

module.exports = supplierRoutes;


