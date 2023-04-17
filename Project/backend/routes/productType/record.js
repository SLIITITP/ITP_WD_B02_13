const express = require("express");

const productTypeRoutes = express.Router();


const dbo = require("../../db/conn"); // connect to the database


const ObjectId = require("mongodb").ObjectId // convert the Id from String to ObjectId for the _id

productTypeRoutes.route("/add").post(function (req, response) {
    let db_connect = dbo.getDb("sansalu");
    let myobj = {

        name : req.body.name,
         cost : Number(req.body.cost),

    };
    db_connect.collection("productType").insertOne(myobj, function (err, res) {
        if (err) throw err;
        response.json(res);
    });
});

    module.exports = productTypeRoutes;