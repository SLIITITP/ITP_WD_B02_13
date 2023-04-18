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

//update
methodRoutes.route("/update/:id").post(function (req, response) {

    let db_connect = dbo.getDb("sansalu");
    
    let myquery = { _id: ObjectId(req.params.id) };
    
    let newvalues = {
    
        $set: {
    
            name : req.body.name,
    
        },
    
    };
    
    db_connect.collection("method").updateOne(myquery, newvalues, function (err, res) {
    
        if (err) throw err;
    
        response.json(res);
    
    });
    
});

//delete
methodRoutes.route("/delete/:id").delete(function(req, response){

    let db_connect = dbo.getDb("sansalu");
    
    let myquery = { _id: ObjectId(req.params.id) };
    
    db_connect.collection("method").deleteOne(myquery, function (err, obj) {
    
        if (err) throw err;
    
        response.json(obj);
    
    });
    
});

module.exports = methodRoutes;