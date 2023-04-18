const express = require("express");

const distributionRoutes = express.Router();

const dbo = require("../../db/conn"); // connect to the database

// convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

//get date
let date_ob = new Date();

// adjust 0 before single digit date
let date = ("0" + date_ob.getDate()).slice(-2);

// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// current year
let year = date_ob.getFullYear();

// prints date in YYYY-MM-DD format
let fulldate = year + "-" + month + "-" + date;
console.log(fulldate);

// This section will help you create a new record.
distributionRoutes.route("/add").post(function (req, response) {
    let db_connect = dbo.getDb("sansalu");
    let myobj = {

        name: req.body.name,
        date: fulldate,
        method: req.body.method,
        status: req.body.status,
    };

    db_connect.collection("distribution").insertOne(myobj, function (err, res) {

        if (err) throw err;

        response.json(res);

    });

});

//update

distributionRoutes.route("/update/:id").post(function (req, response) {

    let db_connect = dbo.getDb("sansalu");
    
    let myquery = { _id: ObjectId(req.params.id) };
    
    let newvalues = {
    
        $set: {
    
            name: req.body.name,
            date: fulldate,
            method: req.body.method,
            status: req.body.status,
        },
    
    };
    
    db_connect.collection("distribution").updateOne(myquery, newvalues, function (err, res) {
    
        if (err) throw err;
    
        response.json(res);
    
    });
    
});

//delete

distributionRoutes.route("/delete/:id").delete(function(req, response){
    let db_connect = dbo.getDb("sansalu");
    let myquery = { _id: ObjectId(req.params.id) };
        
    db_connect.collection("distribution").deleteOne(myquery, function (err, obj) {
        
        if (err) throw err;
        
        response.json(obj);
        
    });
        
});


module.exports = distributionRoutes;


