const express = require("express");
const  emprequestRoutes = express.Router();
const dbo = require("../../db/conn"); // connect to the database
const ObjectId = require("mongodb").ObjectId // convert the Id from String to ObjectId for the _id


// http://localhost:8070/ production/addempreq ( created 1 record )
 emprequestRoutes.route("/addempreq").post(function (req, response) {
     let db_connect = dbo.getDb("sansalu");
         let myobject = {

         orderid: req.body.orderid,
         empallocation: parseInt(req.body.empallocation),
         description : req.body.description,
     };
 db_connect.collection("allocation").insertOne(myobject, function (err, res) {

     if (err) throw err;

        console.log("1 record inserted");

        response.json(res);
     });

});






module.exports =  emprequestRoutes;