const express = require("express");

const printTypeRoutes = express.Router();


const dbo = require("../../db/conn"); // connect to the database


const ObjectId = require("mongodb").ObjectId // convert the Id from String to ObjectId for the _id

printTypeRoutes.route("/add").post(function (req, response) {
    let db_connect = dbo.getDb("sansalu");
    let myobj = {

                name : req.body.name,
                cost : Number(req.body.cost),

    };
    db_connect.collection("printType").insertOne(myobj, function (err, res) {
        if (err) throw err;
        response.json(res);
    });
});

    module.exports = printTypeRoutes;