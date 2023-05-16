const express = require("express");
const allocationRoutes = express.Router();
const dbo = require("../../db/conn"); // connect to the database
const ObjectId = require("mongodb").ObjectId // convert the Id from String to ObjectId for the _id

allocationRoutes.route("/add").post(function (req, response) {
    let db_connect = dbo.getDb("sansalu");
    let myobject = {

    order_id: req.body.order_id,
    requested_employee: Number(req.body.requested_employee),
    allocated_employee: Number(req.body.allocated_employee),
    
    };
    db_connect.collection("allocation").insertOne(myobject, function (err, res) {
    if (err) throw err;
    console.log("1 record inserted");   
    response.json(res);
});
   
});




allocationRoutes.route("/update/:id").put(function (req, response) {
    let db_connect = dbo.getDb("sansalu");
    let myobject = { _id:ObjectId(req.params.id)};
   
    let newvalues = {

        $set: {

           order_id: req.body.order_id,
           requested_employee: Number(req.body.requested_employee),
           allocated_employee: Number(req.body.allocated_employee),
  
        }
    }
    
    db_connect.collection("allocation").updateOne(myobject, newvalues ,function (err, res) {
     if (err) throw err;
     console.log("1 record updated");   
    response.json(res);
});
       
});


allocationRoutes.route("/delete/:id").delete(function (req, response) {
    let db_connect = dbo.getDb("sansalu");
    let myobject1 = { _id:ObjectId(req.params.id)};
    
    db_connect.collection("allocation").deleteOne(myobject1, function (err, res) {
        if (err) throw err;
        console.log("1 record deleted");   
        response.json(res);
    });
});

allocationRoutes.route("/").get(function (req, response) {
    let db_connect = dbo.getDb("sansalu");
    db_connect.collection("allocation").find({}).toArray(function (err, res) {
        if (err) throw err;
        response.json(res);
    });
});

allocationRoutes.route("/:id").get(function (req, response) {
    let db_connect = dbo.getDb("sansalu");
    let myobject = { _id:ObjectId(req.params.id)};
    db_connect.collection("allocation").findOne(myobject, function (err, res) {
      if (err) throw err;
      response.json(res);
    });
  });


module.exports = allocationRoutes;