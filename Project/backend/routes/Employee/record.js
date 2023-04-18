const express = require("express");
const employeeRoutes = express.Router();
const dbo = require("../../db/conn"); // connect to the database
const ObjectId = require("mongodb").ObjectId // convert the Id from String to ObjectId for the _id

employeeRoutes.route("/add").post(function (req, response) {
     let db_connect = dbo.getDb("sansalu");
     let myobject = {

     emp_id: req.body.emp_id,
     name: req.body.name,
     gender: req.body.gender,
     profession: req.body.profession,
     monthly_salary: Number(req.body.monthly_salary),
     address: req.body.address,
     gmail: req.body.gmail,
     password: req.body.password,
     allocation: req.body.allocation
     
     };
     db_connect.collection("employee").insertOne(myobject, function (err, res) {
     if (err) throw err;
     console.log("1 record inserted");   
     response.json(res);
 });
    
    });

    module.exports = employeeRoutes;