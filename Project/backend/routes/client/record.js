const express = require("express");
let alert = require("alert");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");



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

// http://localhost:8070/client/top10 ( get top 10 clients records)
clientRoutes.route("/top10").get(function (req, res) {
	let db_connect = dbo.getDb("sansalu");
	db_connect
		.collection("clients")
		.find({})
		.sort({ totalpayments: -1 })
		.limit(10)
		.toArray(function (err, result) {
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

clientRoutes.route("/email/:id").get(function (req, res) {
	let db_connect = dbo.getDb("sansalu");
	let myquery = { email: req.params.id };
	db_connect
		.collection("client")
		.findOne(myquery, function (err, result) {
		if (err) throw err;
		res.json(result);
	});
});


// http://localhost:8070/client/add ( created 1 record )
clientRoutes.route("/add").post(function(req,response){
    let db_connect = dbo.getDb("sansalu");

    let myquery = { email: req.body.email.email };

    db_connect.collection("client").findOne(myquery, function(err,result){
            if (err) throw err;

            if(result) {
                console.log("Email is already exists");
                console.log(req.body.email);
                return response.status(400).json({ success:false, msg:"Email already exists", found: "email" })
            } else 
        {

	let myquery = { contactno: req.body.contactno.contactno }; 

            db_connect.collection("client").findOne(myquery, function(err,result){
                if (err) throw err;

                if(result) {
                    console.log("Contact No already exists");
                    console.log(req.body.contactno);
                    return response.status(400).json({ success:false, msg:"Contact No already exists", found:"contactNo" })
                } else 
                {
                    let myObject = {
                        fname: req.body.fname.fname,
                        lname: req.body.lname.lname,
                        address: req.body.address.address,
                        contactno: req.body.contactno.contactno,
                        email: req.body.email.email,
                        password: req.body.password.password,
                        totalpurchases: 0,
						totalpayments: 0,
                        imgurl: req.body.imgurl,
                        loyaltylevel: "0",
                    };
                        
                    console.log(req.body.imgurl);

                    db_connect.collection("client").insertOne(myObject, function(err,res){
                        if(err) throw err;

                        console.log("1 record inserted Successfully");    

						const transporter = nodemailer.createTransport({
							host: 'smtp.zoho.com',
							port: 465,
							secure: true,
							auth: {
								user:'sansalu@zohomail.com',
								pass: 'Kusal@123'
							}
						});
						
						const mailOptions ={
							from: 'sansalu@zohomail.com',
							to: `thanishahamed321@gmail.com`,
							subject: 'Registration Successfully',
							text: `hello ${req.body.fname.fname},\n Thank you`
						};

						transporter.sendMail(mailOptions, (error, info) =>{
							if(error){
								console.log(error);
							} else {
								console.log('Email sent' + info.response);
							}
						})


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


// update customer loyalty level
clientRoutes.route("/updatelevel/:id").post(function (req, response) {
	let db_connect = dbo.getDb("sansalu");
	let myquery = { _id: ObjectId(req.params.id) };
	let newvalues = {
		$set: {
			loyaltylevel: req.body.loyaltylevel,
		},
	};
	db_connect.collection("client").updateOne(myquery, newvalues, function (err, res) {
		if (err) throw err;
		response.json(res);
	}
	);
});


//update customer password 
clientRoutes.route("/updatepassword/:id").post(function (req, response) {
	let db_connect = dbo.getDb("sansalu");
	let myquery = { _id: ObjectId(req.params.id) };
	let newvalues = {
		$set: {
			password: req.body.password,
		},
	};
	db_connect.collection("client").updateOne(myquery, newvalues, function (err, res) {
		if (err) throw err;
		response.json(res);
	}
	);
});


// http://localhost:8070/client/delete/:id  (delete a record by id)
clientRoutes.route("/delete/:id").delete((req, response) => {
	let db_connect = dbo.getDb("sansalu");

	let myquery = { _id: ObjectId(req.params.id) };

	db_connect.collection("client").deleteOne(myquery, function (err, obj) {
		if (err) throw err;

		const transporter = nodemailer.createTransport({
			host: 'smtp.zoho.com',
			port: 465,
			secure: true,
			auth: {
				user:'sansalu@zohomail.com',
				pass: 'Kusal@123'
			}
		});

		const mailOptions1 ={
			from: 'sansalu@zohomail.com',
			to: `${req.body.email.email}`,
			subject: 'Deletion of the Account',
			text: `hello deleted\n Delete Account Your Successfully`
		};

		transporter.sendMail(mailOptions1, (error, info) =>{
			if(error){
				console.log(error);
			} else {
				console.log('Email sent' + info.response);
			}
		})

		console.log("1 record deleted Successfully");
		response.json(obj);
	});
});

// Client Login
clientRoutes.route("/login").post(function (req, response) {
	let db_connect = dbo.getDb("sansalu");
	let email = req.body.email;
	let password = req.body.password;

	db_connect.collection("client").findOne({ email: email, password: password }, function (err, result) {
		if (err) throw err;
		if (result) {
			const token = jwt.sign(
				{
					id: result._id,
					fname: result.fname,
					lname: result.lname,
					address: result.address,
					contactno: result.contactno,
					email: result.email,
					password: result.password,
					totalpurchases: result.totalpurchases,
					totalpayments: result.totalpayments,
					imgurl: result.imgurl,
					loyaltylevel: result.loyaltylevel,
				},
				"secretkey"
			);

			return response.json({ user: true, msg: "Login Success", status: "ok", token: token });
		} else {
			return response.json({ user: false, msg: "Login Failed", status: "error" });
		}
	});
});

// search by fname
clientRoutes.route("/search/:key").get(function (req, response) {
	let db_connect = dbo.getDb("sansalu");
	let key = req.params.key;
	let myquery = { fname: { $regex: key, $options: "i" } };
	db_connect.collection("client").find(myquery).toArray(function (err, result) {
		if (err) throw err;
		response.json(result);
	});
});

module.exports = clientRoutes;