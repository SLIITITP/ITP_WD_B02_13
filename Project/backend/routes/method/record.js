const express = require("express");


const methodRoutes = express.Router();


// connect to the database
const dbo = require("../../db/conn");


// convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you create a new record.
methodRoutes.route("/add").post(function (req, response) {
    let db_connect = dbo.getDb("sansalu");
    let myobj = {
        name: req.body.name,
        
    };
    db_connect.collection("method").insertOne(myobj, function (err, res) {
    if (err) throw err;

    console.log("1 record inserted");
    response.json(res);
    });
});

module.exports = methodRoutes;