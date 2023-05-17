const express = require("express");
const  stockreqRoutes = express.Router();
const dbo = require("../../db/conn"); // connect to the database
const ObjectId = require("mongodb").ObjectId // convert the Id from String to ObjectId for the _id


// http://localhost:8070/ production/addstockreq ( created 1 record )
 stockreqRoutes.route("/addstockreq").post(function (req, response) {
     let db_connect = dbo.getDb("sansalu");
         let myobject = {

         materialname: req.body.materialname,
         materialquantity: parseInt(req.body.materialquantity),
         materialcolor: req.body.materialcolor,
         buttoncolor: req.body.buttoncolor,
         buttonquantity: parseInt(req.body.buttonquantity),
         description : req.body.description,
     };
 db_connect.collection("stockrequest").insertOne(myobject, function (err, res) {

     if (err) throw err;

        console.log("1 record inserted");

        response.json(res);
     });

});

stockreqRoutes.route("/getstockreq").get(function (req, response) {
	let db_connect = dbo.getDb("sansalu");
	db_connect
		.collection("stockrequest")
		.find({})
		.toArray(function (err, res) {
			if (err) throw err;
			response.json(res);
		});
});

stockreqRoutes.route("/getstockreq/:id").get(function (req, response) {
	let db_connect = dbo.getDb("sansalu");
	let myobject = { _id: ObjectId(req.params.id) };
	db_connect.collection("stockrequest").findOne(myobject, function (err, res) {
		if (err) throw err;
		response.json(res);
	});
});




module.exports =  stockreqRoutes;