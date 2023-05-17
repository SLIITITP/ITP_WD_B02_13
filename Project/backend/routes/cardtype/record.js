const express = require("express");


const cardTypeRoutes = express.Router();


// connect to the database
const dbo = require("../../db/conn");


// convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you create a new record.
cardTypeRoutes.route("/add").post(function (req, response) {
    let db_connect = dbo.getDb("sansalu");
    let myobj = {
        CardType: req.body.CardType,
        createdAt: new Date(), // add current date and time
        
    };
    db_connect.collection("cardType").insertOne(myobj, function (err, res) {
    if (err) throw err;

    console.log("1 record inserted");
    response.json(res);
    });
});

//retrieve
cardTypeRoutes.route("/").get(function (req, response) {
    let db_connect = dbo.getDb("sansalu");
    db_connect.collection("cardType").find({}).toArray(function(err, res) {
        if (err) throw err;
        response.json(res);
    });
});

cardTypeRoutes.route("/:id").get(function (req, response) {
    let db_connect = dbo.getDb("sansalu");
    let myobject = {_id:ObjectId(req.params.id)};
    db_connect.collection("cardType").findOne(myobject, function(err, res) {
        if (err) throw err;
        response.json(res);
    });
});

//update
cardTypeRoutes.route("/update/:id").post(function (req, response) {

    let db_connect = dbo.getDb("sansalu");
    
    let myquery = { _id: ObjectId(req.params.id) };
    
    let newvalues = {
    
        $set: {
    
            CardType : req.body.CardType,
    
        },
    
    };
    
    db_connect.collection("cardType").updateOne(myquery, newvalues, function (err, res) {
    
        if (err) throw err;
    
        response.json(res);
    
    });
    
});

//delete
cardTypeRoutes.route("/delete/:id").delete(function(req, response){

    let db_connect = dbo.getDb("sansalu");
    
    let myquery = { _id: ObjectId(req.params.id) };
    
    db_connect.collection("cardType").deleteOne(myquery, function (err, obj) {
    
        if (err) throw err;
    
        response.json(obj);
    
    });
    
});

module.exports = cardTypeRoutes;