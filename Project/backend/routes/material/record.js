const express = require("express");


const materialRoutes = express.Router();


const dbo = require("../../db/conn"); // connect to the database


const ObjectId = require("mongodb").ObjectId // convert the Id from String to ObjectId for the _id

//add
materialRoutes.route("/add").post(function (req, response) {
	// Validate input data
	const { name, cost } = req.body;
	if (!name || !cost) {
		return response.status(400).json({ error: "Missing required fields." });
	}
	if (typeof name !== "string" || typeof cost !== "number") {
		return response.status(400).json({ error: "Invalid data types." });
	}

	// Additional validations can be added here

	let db_connect = dbo.getDb("sansalu");
	let myobj = {
		name: name,
		cost: Number(cost),
		createdAt: new Date(), // add current date and time
	};
	db_connect.collection("material").insertOne(myobj, function (err, res) {
		if (err) throw err;
		response.json(res);
	});
});


//retrieve
materialRoutes.route("/").get(function(req ,response){
    let db_connect = dbo.getDb("sansalu");
    db_connect.collection("material").find({ }).toArray(function(err,res){
        if(err) throw err;
        response.json(res);
    })
})

materialRoutes.route("/:id").get(function(req,response){
    let db_connect = dbo.getDb("sansalu");
    let myobject = {_id:ObjectId(req.params.id)};
    db_connect.collection("material").findOne(myobject,function(err,res){
        if(err) throw err;
        response.json(res);
    })
})

//update
materialRoutes.route("/update/:id").post(function (req, response) {

    let db_connect = dbo.getDb("sansalu");
    
    let myquery = { _id: ObjectId(req.params.id) };
    
    let newvalues = {
			$set: {
				name: req.body.name,
				cost: Number(req.body.cost),
				
			},
		};
    
    db_connect.collection("material").updateOne(myquery, newvalues, function (err, res) {
    
            if (err) throw err;
    
            response.json(res);
    
        });
    
    });

    //delete
    materialRoutes.route("/delete/:id").delete(function(req, response){

        let db_connect = dbo.getDb("sansalu");
        
        let myquery = { _id: ObjectId(req.params.id) };
        
        db_connect.collection("material").deleteOne(myquery, function (err, obj) {
        
            if (err) throw err;
        
            response.json(obj);
        
        });
        
    });

    module.exports = materialRoutes;