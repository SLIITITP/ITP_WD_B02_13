const express = require("express");

const delidetailsRoutes = express.Router();

const dbo = require("../../db/conn"); // connect to the database

const ObjectId = require("mongodb").ObjectId;// convert the id from string to ObjectId for the _id.

// This section will help you create a new record.
delidetailsRoutes.route("/add").post(function (req, response) {
    let db_connect = dbo.getDb("sansalu");
    let myobj = {

        deliveryid:req.body.deliveryid,
        name: req.body.name,
        telephone:req.body.telephone,
        address:req.body.address,
        city:req.body.city,
        postalCode:req.body.postalCode,
        deliveryCompany:req.body.deliveryCompany,
        deliveryOption:req.body.deliveryOption
        
    };

    db_connect.collection("delidetails").insertOne(myobj, function (err, res) {

        if (err) throw err;

        response.json(res);

    });

});

//retrieve
delidetailsRoutes.route("/").get(function(req,response){
    let db_connect=dbo.getDb("sansalu");
    db_connect.collection("delidetails").find({}).toArray(function(err,res){
        if(err)throw err;
        response.json(res);
    });
});

delidetailsRoutes.route("/id").get(function(req,response){
    let db_connect = dbo.getDb("sansalu");
    let myobject={_id:ObjectId(req.params.id)};
    db_connect.collection("delidetails").findOne(myobject,function(err,response){
        if(err)throw err;
        response.json(res);
    });
});

//update

delidetailsRoutes.route("/update/:id").post(function (req, response) {

    let db_connect = dbo.getDb("sansalu");
    
    let myquery = { _id: ObjectId(req.params.id) };
    
    let newvalues = {
    
        $set: {
    
       // deliveryid:req.deliveryid,
       deliveryid:req.body.deliveryid,
        name: req.body.name,
        telephone:req.body.telephone,
        address:req.body.address,
        city:req.body.city,
        postalCode:req.body.postalCode,
        deliveryCompany:req.body.deliveryCompany,
        deliveryOption:req.body.deliveryOption
    },
    
    };
    
    db_connect.collection("delidetails").updateOne(myquery, newvalues, function (err, res) {
    
        if (err) throw err;
    
        response.json(res);
    
    });
    
});

//delete

delidetailsRoutes.route("/delete/:id").delete(function(req, response){
    let db_connect = dbo.getDb("sansalu");
    let myquery = { _id: ObjectId(req.params.id) };
        
    db_connect.collection("delidetails").deleteOne(myquery, function (err, obj) {
        
        if (err) throw err;
        
        response.json(obj);
        
    });
        
});


module.exports = delidetailsRoutes;


