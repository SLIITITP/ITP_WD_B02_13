const express = require("express");

const productTypeRoutes = express.Router();


const dbo = require("../../db/conn"); // connect to the database


const ObjectId = require("mongodb").ObjectId // convert the Id from String to ObjectId for the _id

//add
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

//retrieve
productTypeRoutes.route("/").get(function(req ,response){
    let db_connect = dbo.getDb("sansalu");
    db_connect.collection("productType").find({ }).toArray(function(err,res){
        if(err) throw err;
        response.json(res);
    })
})

productTypeRoutes.route("/:id").get(function(req,response){
    let db_connect = dbo.getDb("sansalu");
    let myobject = {_id:ObjectId(req.params.id)};
    db_connect.collection("productType").findOne(myobject,function(err,res){
        if(err) throw err;
        response.json(res);
    })
})

//update
productTypeRoutes.route("/update/:id").post(function (req, response) {

    let db_connect = dbo.getDb("sansalu");
    
    let myquery = { _id: ObjectId(req.params.id) };
    
    let newvalues = {
    
        $set: {
    
            name : req.body.name,
            cost : Number(req.body.cost),
    
        },
    
    };
    
    db_connect.collection("productType").updateOne(myquery, newvalues, function (err, res) {
    
            if (err) throw err;
    
            response.json(res);
    
        });
    
    });

    //delete
    productTypeRoutes.route("/delete/:id").delete(function(req, response){

        let db_connect = dbo.getDb("sansalu");
        
        let myquery = { _id: ObjectId(req.params.id) };
        
        db_connect.collection("productType").deleteOne(myquery, function (err, obj) {
        
            if (err) throw err;
        
            response.json(obj);
        
        });
        
    });

    module.exports = productTypeRoutes;