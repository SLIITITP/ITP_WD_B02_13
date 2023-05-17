const express = require("express");
const  stockreqRoutes = express.Router();
const dbo = require("../../db/conn"); // connect to the database
const ObjectId = require("mongodb").ObjectId // convert the Id from String to ObjectId for the _id


// http://localhost:8070/ production/addstockreq ( created 1 record )
 stockreqRoutes.route("/addstockreq").post(function (req, response) {
     let db_connect = dbo.getDb("sansalu");
         let myobject = {

         materialname: req.body.materialname,
         materialquantity: parseInt(req.body.materialquantity),
         materialcolor: req.body.materialcolor,
         buttoncolor: req.body.buttoncolor,
         buttonquantity: parseInt(req.body.buttonquantity),
         description : req.body.description,
     };
 db_connect.collection("stockrequest").insertOne(myobject, function (err, res) {

     if (err) throw err;

        console.log("1 record inserted");

        response.json(res);
     });

});






module.exports =  stockreqRoutes;