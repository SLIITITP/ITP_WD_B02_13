const express = require("express");

const templateRoutes = express.Router();


const dbo = require("../../db/conn"); // connect to the database


const ObjectId = require("mongodb").ObjectId // convert the Id from String to ObjectId for the _id

templateRoutes.route("/add").post(function (req, response) {
    let db_connect = dbo.getDb("sansalu");
    let myobj = {

        templatename : req.body.templatename,
        cost : Number(req.body.cost),

    };
    db_connect.collection("template").insertOne(myobj, function (err, res) {
        if (err) throw err;
        response.json(res);
    });
});

    module.exports = templateRoutes;