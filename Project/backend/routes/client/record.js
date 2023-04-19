const express = require("express");

const clientRoutes = express.Router();

const dbo = require("../../db/conn"); // connect to the database

const ObjectId = require("mongodb").ObjectId // convert the Id from String to ObjectId for the _id


// http://localhost:8070/client/  ( get a list of all records from the client collection)
clientRoutes.route("/").get(function (req, res) {
	let db_connect = dbo.getDb("sansalu");
	
    db_connect.collection("client").find({}).toArray(function (err, result) {
			if (err) throw err;

			res.json(result);
		});
});


// http://localhost:8070/client/new5 ( get new 5 clients records)
clientRoutes.route("/new5").get(function (req, res) {
	let db_connect = dbo.getDb("sansalu");
    
	db_connect.collection("client").find({}).sort({ _id: -1 }).limit(5).toArray(function (err, result) {
			if (err) throw err;

			res.json(result);
		});
});


// http://localhost:8070/client/client/:id  ( get 1 record by id)
clientRoutes.route("/client/:id").get(function (req, res) {
	let db_connect = dbo.getDb("sansalu");

	let myquery = { _id: ObjectId(req.params.id) };
	
    db_connect.collection("client").findOne(myquery, function (err, result) {
		if (err) throw err;

		res.json(result);
	});
});


// http://localhost:8070/client/add ( created 1 record )
clientRoutes.route("/add").post(function(req,response){
    let db_connect = dbo.getDb("sansalu");

    let myquery = { email: req.params.id };

    db_connect.collection("client").findOne(myquery, function(err,result){
            if (err) throw err;

            if(result) {
                console.log("Email is already exists");
                console.log(req.body.email);
                return response.status(400).json({ success:false, msg:"Email already exists", found: "email" })
            } else 
        {
            let myquery = { contactno: req.params.id };  

            db_connect.collection("client").findOne(myquery, function(err,result){
                if (err) throw err;

                if(result) {
                    console.log("Contact No already exists");
                    console.log(req.body.contactno);
                    return response.status(400).json({ success:false, msg:"Contact No already exists", found:"contactNo" })
                } else 
                {
                    let myObject = {
                        fname: req.body.fname,
                        lname: req.body.lname,
                        address: req.body.address,
                        contactno: req.body.contactno,
                        email: req.body.email,
                        password: req.body.password,
                        imgurl: req.body.imgurl,
                    };
                        
                    console.log(req.body.imgurl);

                    db_connect.collection("client").insertOne(myObject, function(err,res){
                        if(err) throw err;

                        console.log("1 record inserted Successfully");    
                        return response.status(400).json({ success: true, msg: "1 record inserted Successfully" });
                    });
                }
            });
        }
    });
})


// http://localhost:8070/client/update/:id  (update a record by id)
clientRoutes.route("/update/:id").post(function (req, response) {
	let db_connect = dbo.getDb("sansalu");

	let myquery = { _id: ObjectId(req.params.id) };

	let newvalues = {

		$set: {
			fname: req.body.fname,
            lname: req.body.lname,
            address: req.body.address,
            contactno: req.body.contactno,
            email: req.body.email,
            imgurl: req.body.imgurl
		},

	};

	db_connect.collection("client").updateOne(myquery, newvalues, function (err, res) {
		if (err) throw err;

        console.log("1 record updated Successfully"); 
		response.json(res);
	});
});


// http://localhost:8070/client/delete/:id  (delete a record by id)
clientRoutes.route("/delete/:id").delete((req, response) => {
	let db_connect = dbo.getDb("sansalu");

	let myquery = { _id: ObjectId(req.params.id) };

	db_connect.collection("client").deleteOne(myquery, function (err, obj) {
		if (err) throw err;

		console.log("1 record deleted Successfully");
		response.json(obj);
	});
});


module.exports = clientRoutes;