const express = require("express");

const companyRoutes = express.Router();

const dbo = require("../../db/conn"); // connect to the database

const ObjectId = require("mongodb").ObjectId // convert the Id from String to ObjectId for the _id

companyRoutes.route("/add").post(function (req, response) {

    let db_connect = dbo.getDb("sansalu");

    let myobj = {

        companyname: req.body.companyname,

        companyno: req.body.companyno,

        deliverycharge: Number(req.body.deliverycharge),

    };

    db_connect.collection("company").insertOne(myobj, function (err, res) {

        if (err) throw err;

        response.json(res);

    });

});


//retrieve
companyRoutes.route("/").get(function (req, response) {
    let db_connect = dbo.getDb("sansalu");
    db_connect.collection("company").find({}).toArray(function (err, res) {
        if (err) throw err;
        response.json(res);
    });
});

//retrieve by id 
//retrieve
companyRoutes.route("/:id").get(function (req, response) {
    let db_connect = dbo.getDb("sansalu");
    db_connect.collection("company").find({}).toArray(function (err, res) {
        if (err) throw err;
        response.json(res);
    });
});

companyRoutes.route("/:id").get(function (req, response) {
    let db_connect = dbo.getDb("sansalu");
    let myobject = { _id: ObjectId(req.params.id) };
    db_connect.collection("company").findOne(myobject, function (err, response) {
        if (err) throw err;
        response.json(res);
    });
});



//update

companyRoutes.route("/update/:id").post(function (req, response) {

    let db_connect = dbo.getDb("sansalu");

    let myquery = { _id: ObjectId(req.params.id) };

    let newvalues = {

        $set: {

            companyname: req.body.companyname,

            companyno: req.body.companyno,

            deliverycharge: Number(req.body.deliverycharge),

        },

    };

    db_connect.collection("company").updateOne(myquery, newvalues, function (err, res) {

        if (err) throw err;

        response.json(res);

    });

});

//delete

companyRoutes.route("/delete/:id").delete(function (req, response) {

    let db_connect = dbo.getDb("sansalu");

    let myquery = { _id: ObjectId(req.params.id) };

    db_connect.collection("company").deleteOne(myquery, function (err, obj) {

        if (err) throw err;

        response.json(obj);

    });

});


module.exports = companyRoutes;


