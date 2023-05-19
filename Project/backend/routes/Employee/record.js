const express = require("express");
const jwt = require("jsonwebtoken");

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
     allocation: req.body.allocation,
     mobile_no: req.body.mobile_no,
     salary_update : req.body.salary_update,
     
     };
     db_connect.collection("employee").insertOne(myobject, function (err, res) {
     if (err) throw err;
     console.log("1 record inserted");   
     response.json(res);
 });
    
    });

employeeRoutes.route("/update/:id").put(function (req, response) {
    let db_connect = dbo.getDb("sansalu");
    let myobject = { _id:ObjectId(req.params.id)};
   
    let newvalues = {

        $set: {

            emp_id: req.body.emp_id,
            name: req.body.name,
            gender: req.body.gender,
            profession: req.body.profession,
            monthly_salary: Number(req.body.monthly_salary),
            address: req.body.address,
            gmail: req.body.gmail,
            password: req.body.password,
            allocation: req.body.allocation,
            mobile_no: req.body.mobile_no,
            salary_update : req.body.salary_update,

            
        }
    }
    
    db_connect.collection("employee").updateOne(myobject, newvalues ,function (err, res) {
     if (err) throw err;
     console.log("1 record updated");   
    response.json(res);
});
       
});

employeeRoutes.route("/delete/:id").delete(function (req, response) {
    let db_connect = dbo.getDb("sansalu");
    let myobject1 = { _id:ObjectId(req.params.id)};
    
    db_connect.collection("employee").deleteOne(myobject1, function (err, res) {
        if (err) throw err;
        console.log("1 record deleted");   
        response.json(res);
    });
});


employeeRoutes.route("/").get(function (req, response) {
    let db_connect = dbo.getDb("sansalu");
    db_connect.collection("employee").find({}).toArray(function (err, res) {
        if (err) throw err;
        response.json(res);
    });
});

employeeRoutes.route("/count/:id").get(function (req, response) {
    let oid = req.params.id.toString() ;
    let db_connect = dbo.getDb("sansalu");
    db_connect.collection("employee").find({allocation: oid}).toArray(function (err, res) {
        let count = 0 ;
        res.map((item, ind)=> {
            count++ ;
        })
        if (err) throw err;
        response.json(count);
    });
});

employeeRoutes.route("/:id").get(function (req, response) {
    
    let db_connect = dbo.getDb("sansalu");
    let myobject = { _id:ObjectId(req.params.id)};
    db_connect.collection("employee").findOne(myobject, function (err, res) {
      if (err) throw err;
      response.json(res);
    });
});


employeeRoutes.route("/updateAllocation/:id").put(function (req, response) {
    let db_connect = dbo.getDb("sansalu");
    let myobject = { _id:ObjectId(req.params.id)};
    console.log(req.body.allc)
   
    let newvalues = {

        $set: {
            allocation: req.body.allc,   
        }
    }
    
    db_connect.collection("employee").updateOne(myobject, newvalues ,function (err, res) {
     if (err) throw err;
     console.log("1 record updated");   
    response.json(res);
});
       
});


employeeRoutes.route("/updateSalaryupdate/:id").put(function (req, response) {
    let db_connect = dbo.getDb("sansalu");
    let myobject = { _id:ObjectId(req.params.id)};
    console.log(req.body.salary_update)
   
    let newvalues = {

        $set: {
            salary_update : req.body.salary_update,
        }
    }
    
    db_connect.collection("employee").updateOne(myobject, newvalues ,function (err, res) {
     if (err) throw err;
     console.log("1 record updated");   
    response.json(res);
});
       
});

employeeRoutes.route("/login").post(function (req, response) {
	let db_connect = dbo.getDb("sansalu");
	let gmail = req.body.gmail;
	let password = req.body.password;

	db_connect.collection("employee").findOne({ gmail: gmail, password: password }, function (err, result) {
		if (err) throw err;
		if (result) {
			const token = jwt.sign(
				{
					id: result._id,
                    emp_id: result.emp_id,
					name: result.name,
					gender: result.gender,
					profession: result.profession,
					monthly_salary: result.monthly_salary,
					address: result.address,
					gmail: result.gmail,
					password: result.password,
					allocation: result.allocation,
					mobile_no: result.mobile_no,
					salary_update: result.salary_update,
				},
				"secretkey"
			);

			return response.json({ user: true, msg: "Login Success", status: "ok", token: token });
		} else {
			return response.json({ user: false, msg: "Login Failed", status: "error", gmail: gmail, password: password });
		}
	});
});

module.exports = employeeRoutes;