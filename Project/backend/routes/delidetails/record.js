const express = require("express");

const delidetailsRoutes = express.Router();

const dbo = require("../../db/conn"); // connect to the database

const ObjectId = require("mongodb").ObjectId;// convert the id from string to ObjectId for the _id.

// This section will help you create a new record.
delidetailsRoutes.route("/add").post(function (req, response) {
    let db_connect = dbo.getDb("sansalu");
    let myobj = {

        deliveryid:req.body.deliveryid,
        fname: req.body.fname,
        lname: req.body.lname,
        telephone:req.body.telephone,
        address:req.body.address,
        city:req.body.city,
        postalCode:Number(req.body.postalCode),
        deliveryCompany:req.body.deliveryCompany,
        deliveryOption:req.body.deliveryOption,
        totalAmount:Number(req.body.totalAmount),
        deliStatus:req.body.deliStatus,
        
    };

    //get last inserted delivery
    delidetailsRoutes.route("/getLastDelivery").get(function (req, res) {
	let db_connect = dbo.getDb("sansalu");

	db_connect
		.collection("delidetails")
		.find({})
		.sort({ _id: -1 })
		.limit(1)
		.toArray(function (err, result) {
			if (err) throw err;

			res.json(result);
		});
});

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

delidetailsRoutes.route("/:id").get(function(req,response){
    let db_connect = dbo.getDb("sansalu");
    let myobject={_id:ObjectId(req.params.id)};
    db_connect.collection("delidetails").findOne(myobject,function(err,res){
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
        // deliveryid: req.body.deliveryid,
        fname: req.body.fname,
        lname: req.body.lname,
        telephone: req.body.telephone,
        address: req.body.address,
        city: req.body.city,
        postalCode: Number(req.body.postalCode),
        deliveryCompany: req.body.deliveryCompany,
        deliveryOption: req.body.deliveryOption,
        deliStatus: req.body.deliStatus,
      },
    };
  
    db_connect.collection("delidetails").updateOne(myquery, newvalues, function (
      err,
      res
    ) {
      if (err) throw err;
      response.json("Delivery status updated successfully");
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



delidetailsRoutes.route("/updateStatus/:id").post(function (req, response) {
  let db_connect = dbo.getDb("sansalu");
  let myquery = { _id: ObjectId(req.params.id) };

  let newvalues = {
    $set: {
      deliStatus: req.body.deliStatus , // Set default value to "pending"
    },
  };

  db_connect.collection("delidetails").updateOne(myquery, newvalues, function (
    err,
    res
  ) {
    if (err) throw err;
    response.json("Delivery status updated successfully");
  });
});


module.exports = delidetailsRoutes;


