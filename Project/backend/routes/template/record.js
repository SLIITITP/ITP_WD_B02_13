const express = require("express");

const templateRoutes = express.Router();


const dbo = require("../../db/conn"); // connect to the database


const ObjectId = require("mongodb").ObjectId // convert the Id from String to ObjectId for the _id

//add
templateRoutes.route("/add").post(function (req, response) {
    let db_connect = dbo.getDb("sansalu");
    let myobj = {
			templatename: req.body.templatename,
			cost: Number(req.body.cost),
			createdAt: new Date(), // add current date and time
		};
    db_connect.collection("template").insertOne(myobj, function (err, res) {
        if (err) throw err;
        response.json(res);
    });
});

//retrieve
templateRoutes.route("/").get(function(req ,response){
    let db_connect = dbo.getDb("sansalu");
    db_connect.collection("template").find({ }).toArray(function(err,res){
        if(err) throw err;
        response.json(res);
    })
})

templateRoutes.route("/:id").get(function(req,response){
    let db_connect = dbo.getDb("sansalu");
    let myobject = {_id:ObjectId(req.params.id)};
    db_connect.collection("template").findOne(myobject,function(err,res){
        if(err) throw err;
        response.json(res);
    })
})



//update
templateRoutes.route("/update/:id").post(function (req, response) {

    let db_connect = dbo.getDb("sansalu");
    
    let myquery = { _id: ObjectId(req.params.id) };
    
    let newvalues = {
			$set: {
				templatename: req.body.templatename,
				cost: Number(req.body.cost),
			},
		};
    
    db_connect.collection("template").updateOne(myquery, newvalues, function (err, res) {
    
            if (err) throw err;
    
            response.json(res);
    
        });
    
    });

    //delete
    templateRoutes.route("/delete/:id").delete(function(req, response){

        let db_connect = dbo.getDb("sansalu");
        
        let myquery = { _id: ObjectId(req.params.id) };
        
        db_connect.collection("template").deleteOne(myquery, function (err, obj) {
        
            if (err) throw err;
        
            response.json(obj);
        
        });
        
    });

    module.exports = templateRoutes;