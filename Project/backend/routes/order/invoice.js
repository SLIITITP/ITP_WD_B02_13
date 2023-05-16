const express = require("express");
const invoiceRoutes = express.Router();
const dbo = require("../../db/conn"); // connect to the database
//const ObjectId = require("mongodb").ObjectId;

//insert the orderid and the invoice id generated for this
invoiceRoutes.route("/add").post(function (req, response) {
    let db_connect = dbo.getDb("sansalu");

    let myobject = {
        orderID: req.body.orderID,
        placed_date: Date(req.body.placed_date)

    };

    db_connect.collection("orderInvoice").insertOne(myobject, function (err, res) {

        if (err) throw err;
        response.json(res);
    });
});

module.exports = invoiceRoutes;