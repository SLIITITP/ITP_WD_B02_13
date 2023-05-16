/*const router = require("express").Router();
let supplier = require("../supplier/supplier");



// insert
//http://localhost:8060/stock/addsupplier
router.route("/addsupplier").post( (req, res) => {
	const Supplier_Name = req.body.Supplier_Name;
	const Mobile_No = parseInt(req.body.Mobile_No);
	const Email = req.body.Email;
	const Address = req.body.Address;
	const Description = req.body.Description;
	
	const newSupplier = new supplier({
		Supplier_Name,
		Mobile_No,
		Email,
		Address,
		Description,
    	});

	newSupplier
		.save()
		.then(() => {
			res.json("Detail added");
		})
		.catch((err) => {
			console.log(err);
		});
});

//retrive
//http://localhost:8060/stock/getsupplier
router.route("/getsupplier").get((req, res) => {
	supplier
		.find()
		.then((record) => {
			res.json(record);
		})
		.catch((err) => {
			console.log("err");
		});
});

//get one supplier detail

/*router.route("/getorder/:Supplier_name").get(async (req, res) => {
  let userId = req.params.id;

  const user = await addsupplier
    .findOne(Supplier_name)
    .then((Addsupplier) => {
      res.status(200).send({ status: "user fetched", Addsupplier });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ status: "eror with data fetching", eror: err.message });
    });
});*/
/*
//http://localhost:8060/stock/getsupplier:id
router.route("/getsupplier/:id").get(async (req, res) => {
	let userId = req.params.id;

	const user = await supplier
		.findById(userId)
		.then((record) => {
			res.status(200).send({ status: "Detail fetched", record });
		})
		.catch((err) => {
			res.status(500).send({ status: "eror with data fetching", eror: err.message });
		});
});

//update

/*router
  .route("/updatesupplier/:Supplier_Name")
  .put(upload.single("photo"), async (req, res) => {
    const { Supplier_Name, Mobile_No, Email, Address, Description } = req.body;
    const photo = req.file.filename;

    const updatesupplier = {
      Supplier_Name,
      Mobile_No,
      Email,
      Address,
      Description,
      photo,
    };

    const update = await addsupplier
      .findOneAndUpdate(Supplier_Name, updatesupplier)
      .then(() => {
        res.status(200).send({ status: "Supplier Details updated" });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .send({ status: "eror with updating", eror: err.message });
      });
  });*/

//http://localhost:8060/stock/updatesupplier:id
/*router.route("/updatesupplier/:id").put( async (req, res) => {
	let userId = req.params.id;

	const Supplier_Name = req.body.Supplier_Name;
	const Mobile_No = parseInt(req.body.Mobile_No);
	const Email = req.body.Email;
	const Address = req.body.Address;
	const Description = req.body.Description;

	const updatesupplier = {
		Supplier_Name,
		Mobile_No,
		Email,
		Address,
		Description,
	};

	const update = await supplier
		.findByIdAndUpdate(userId, updatesupplier)
		.then(() => {
			res.status(200).send({ status: "Supplier Details updated" });
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send({ status: "eror with updating", eror: err.message });
		});
});

//Delete
/*router.route("/deletesupplier/:Supplier_Name").delete(async (req, res) => {
  await addsupplier
    .findOneAndDelete(Supplier_Name)
    .then(() => {
      res.status(200).send({ status: "Supplier details deleted" });
    })
    .catch((err) => {
      console.log("eror message");
      res
        .status(500)
        .send({ status: "eror with delete user ", eror: err.message });
    });
});*/

//http://localhost:8060/stock/deletesupplier:id
// router.route("/deletesupplier/:id").delete(async (req, res) => {
// 	let userId = req.params.id;

// 	await supplier
// 		.findByIdAndDelete(userId)
// 		.then(() => {
// 			res.status(200).send({ status: "Supplier details deleted" });
// 		})
// 		.catch((err) => {
// 			console.log("eror message");
// 			res.status(500).send({ status: "eror with delete user ", eror: err.message });
// 		});
// });

// module.exports = router;*/



const express = require("express");
const supplierRoutes = require("express").Router();
//let category = require("../category/category");
const dbo = require("../../db/conn"); // connect to the database
const ObjectId = require("mongodb").ObjectId; // convert the Id from String to ObjectId for the _id

supplierRoutes.route("/addsupplier").post(function (req, response) {
	let db_connect = dbo.getDb("sansalu");

	let newsupplier = {
		Supplier_Name: req.body.Supplier_Name,
		Mobile_No: parseInt(req.body.Mobile_No),
		Email: req.body.Email,
		Address: req.body.Address,
		Description: req.body.Description,
	};

	db_connect.collection("supplier").insertOne(newsupplier, function (err, res) {
		if (err) throw err;

		response.json(res);
	});
});

supplierRoutes.route("/getsupplier").get(function (req, response) {
	let db_connect = dbo.getDb("sansalu");
	db_connect
		.collection("supplier")
		.find({})
		.toArray(function (err, res) {
			if (err) throw err;
			response.json(res);
		});
});

supplierRoutes.route("/getsupplier/:id").get(function (req, response) {
	let db_connect = dbo.getDb("sansalu");
	let myobject = { _id: ObjectId(req.params.id) };
	db_connect.collection("supplier").findOne(myobject, function (err, res) {
		if (err) throw err;
		response.json(res);
	});
});

supplierRoutes.route("/updatesupplier/:id").put(function (req, response) {
	let db_connect = dbo.getDb("sansalu");

	let myquery = { _id: ObjectId(req.params.id) };

	let newvalues = {
		$set: {
			Supplier_Name: req.body.Supplier_Name,
			Mobile_No: parseInt(req.body.Mobile_No),
			Email: req.body.Email,
			Address: req.body.Address,
			Description: req.body.Description,
		},
	};

	db_connect.collection("supplier").updateOne(myquery, newvalues, function (err, res) {
		if (err) throw err;

		response.json(res);
	});
});

supplierRoutes.route("/deletesupplier/:id").delete(function (req, response) {
	let db_connect = dbo.getDb("sansalu");

	let myquery = { _id: ObjectId(req.params.id) };

	db_connect.collection("supplier").deleteOne(myquery, function (err, obj) {
		if (err) throw err;

		response.json(obj);
	});
});

module.exports = supplierRoutes;


