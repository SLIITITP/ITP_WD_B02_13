const express = require("express");




const  productionRoutes = express.Router();




const dbo = require("../../db/conn"); // connect to the database




const ObjectId = require("mongodb").ObjectId // convert the Id from String to ObjectId for the _id





// http://localhost:8070/ production/ production/:id ( get a single record by id )

 productionRoutes.route("/production/:id").get(function (req, res) {




     let db_connect = dbo.getDb("sansalu");




    let myquery = { _id: ObjectId(req.params.id) };



     db_connect.collection("production").findOne(myquery, function (err, result) {

     if (err) throw err;

         res.json(result);

     });

});





// http://localhost:8070/ production/add ( created 1 record )

 productionRoutes.route("/add").post(function (req, response) {




     let db_connect = dbo.getDb("sansalu");




         let myobject = {

         name: req.body.name,

         date: req.body.date,

        material: req.body.material,

        machine: Number(req.body.machine),

        employee: Number(req.body.employee),

     };




 db_connect.collection("production").insertOne(myobject, function (err, res) {

     if (err) throw err;

        console.log("1 record inserted");

        response.json(res);

     });

});





// http://localhost:8070/ production/update/:id ( update a record by id )

 productionRoutes.route("/update/:id").post(function (req, response) {




    let db_connect = dbo.getDb("sansalu");




    let myquery = { _id: ObjectId(req.params.id) };




    let newvalues = {

    $set: {
    name: req.body.name,

         date: req.body.date,
    
            material: req.body.material,
    
            machine: Number(req.body.machine),
    
            employee: Number(req.body.employee),
    

         },

     };




     db_connect.collection("production").updateOne(myquery, newvalues, function (err, res) {

     if (err) throw err;

         console.log("1 record updated");

         response.json(res);

     });

});





// http://localhost:8070/ production/delete/:id ( delete a record by id )

 productionRoutes.route("/delete/:id").delete((req, response) => {




     let db_connect = dbo.getDb("sansalu");




    let myquery = { _id: ObjectId(req.params.id) };




     db_connect.collection("production").deleteOne(myquery, function (err, obj) {

        if (err) throw err;

 console.log("1 record deleted");

         response.json(obj);

     });

});





module.exports =  productionRoutes;