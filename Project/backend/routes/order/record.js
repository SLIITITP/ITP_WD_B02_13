//const router = require("express").Router();
//const OrderDetails = require('../models/OrderDetails');
const express = require("express");
const orderRoutes = express.Router();
const dbo = require("../../db/conn"); // connect to the database
const ObjectId = require("mongodb").ObjectId // convert the Id from String to ObjectId for the _id

//insert sizes details
orderRoutes.route("/add").post(function (req, response) {
    let db_connect = dbo.getDb("sansalu");

    let myobject = {
        company_name: req.body.company_name,
        fname: req.body.fname,
        lname: req.body.lname,
        contactNo: req.body.contactNo,
        email: req.body.email,
        xs: Number(req.body.xs),
        s: Number(req.body.s),
        m: Number(req.body.m),
        l: Number(req.body.l),
        xl: Number(req.body.xl),
        xxl: Number(req.body.xxl),
        total: Number(req.body.sum),
        placed_date: req.body.pdate,
        due_date: req.body.dueDate

    };

    db_connect.collection("order").insertOne(myobject, function (err, res) {

        if (err) throw err;
        response.json(res);
    });
});

//get order details (order id ,  sizes )
orderRoutes.route("/getOdetails/:id").get(function (req, res) {
    let db_connect = dbo.getDb("sansalu");

    let myquery = { _id: ObjectId(req.params.id) };

    db_connect.collection("order").findOne(myquery, function (err, result) {
        if (err) {
            throw err;
        } else {
            res.json({ result });
        }

    });
});

//update order
orderRoutes.route("/update/:id").put(function (req, response) {
    let db_connect = dbo.getDb("sansalu");
    let myquery = { _id: ObjectId(req.params.id) };
    let newOrderDetails = {

        $set: {
            company_name: req.body.company_name,
            fname: req.body.fname,
            lname: req.body.lname,
            contactNo: req.body.contactNo,
            email: req.body.email,

        },

    };

    db_connect.collection("order").updateOne(myquery, newOrderDetails, function (err, res) {
        if (err) throw err;
        console.log("1 record updated");
        response.json(res);

    });

});

//delete order
orderRoutes.route("delOrder/:id").delete((req, res) => {
    let db_connect = dbo.getDb("sansalu");
    let myquery = { _id: ObjectId(req.params.id) };

    //let deleteOrder = { _id: ObjectId(req.params.id) };
    db_connect.collection("order").deleteOne(myquery, function (err, result) {
        if (err) {
            throw err;
        } else {
            res.json({ result });
        }
    });
})


module.exports = orderRoutes;
