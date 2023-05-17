const express = require("express");
const orderRoutes = express.Router();
const dbo = require("../../db/conn"); // connect to the database
const ObjectId = require("mongodb").ObjectId // convert the Id from String to ObjectId for the _id

//insert sizes details
orderRoutes.route("/add").post(function (req, response) {
    let db_connect = dbo.getDb("sansalu");

    let myobject = {
        clientID: req.body.company_name,
        designID: req.body.company_name,
        company_name: req.body.company_name,
        fname: req.body.fname,
        lname: req.body.lname,
        contactNo: req.body.contactNo,
        email: req.body.email,
        total: Number(req.body.sum),
        pdate: req.body.pdate,
        due_date: req.body.due_date,
        payable: Number(req.body.payable),
        accept: false, // Set accept as false
        pass: false // Set pass as false

    };

    if (req.body.xs !== null) {
        myobject.xs = Number(req.body.xs);
    }
    if (req.body.s !== null) {
        myobject.s = Number(req.body.s);
    }
    if (req.body.m !== null) {
        myobject.m = Number(req.body.m);
    }
    if (req.body.l !== null) {
        myobject.l = Number(req.body.l);
    }
    if (req.body.xl !== null) {
        myobject.xl = Number(req.body.xl);
    }
    if (req.body.xxl !== null) {
        myobject.xxl = Number(req.body.xxl);
    }




    if (myobject.total <= 0) {
        response.status(400).send(
            { message: "Total cannot be ZERO" });
        return;
    }
    db_connect.collection("order").insertOne(myobject, function (err, res) {

        if (err) throw err;
        response.json(res);
    });
});


orderRoutes.route("/ViewDetails/:id").get(function (req, response) {
    let db_connect = dbo.getDb("sansalu");
    let myobject = { _id: ObjectId(req.params.id) };
    db_connect.collection("order").findOne(myobject, function (err, res) {
        if (err) throw err;
        response.json(res);
    });
});

//to get the details relevant to the order id in the invoice page 
//http://localhost:8070/order/:id
orderRoutes.route("/invoice/:id").get(function (req, response) {
    let db_connect = dbo.getDb("sansalu");
    let myobjectID = { _id: ObjectId(req.params.id) };
    //let id = ObjectId(req.params.id);
    db_connect.collection("order").findOne(myobjectID, function (err, res) {
        if (err) throw err;
        response.json(res);
    });
});



//for order manager to retrieve all the orders 

//http://localhost:8070/order/getOadmin/
orderRoutes.route("/getOadmin").get(function (req, res) {
    let db_connect = dbo.getDb("sansalu");

    db_connect.collection("order").find({}).sort({ pdate: -1 }).toArray(function (err, result) {
        if (err) throw err;

        res.json(result);
    });
});

//get last inserted order
orderRoutes.route("/getLastOrder").get(function (req, res) {
    let db_connect = dbo.getDb("sansalu");

    db_connect.collection("order").find({}).sort({ _id: -1 }).limit(1).toArray(function (err, result) {
        if (err) throw err;

        res.json(result);
    });
});

//update order
orderRoutes.route("/update/:id").put(function (req, response) {
    let db_connect = dbo.getDb("sansalu");
    let myorder = { _id: ObjectId(req.params.id) };
    let newOrderDetails = {

        $set: {
            company_name: req.body.company_name,
            fname: req.body.fname,
            lname: req.body.lname,
            contactNo: req.body.contactNo,
            email: req.body.email,

            //acceptance: req.body.status,
            //pass: req.body.pass

        },

    };

    db_connect.collection("order").updateOne(myorder, newOrderDetails, function (err, res) {
        if (err) throw err;
        console.log("1 record updated");
        response.json(res);

    });

});



orderRoutes.route("/updateProduction/:id").put(function (req, response) {
    let db_connect = dbo.getDb("sansalu");
    let myorder = { _id: ObjectId(req.params.id) };
    const updateObject = {
        $set: {
            accept: req.body.accept === 'Yes', // Parse string value to boolean
            pass: req.body.pass === 'Passed' // Parse string value to boolean
        }
    };
    db_connect.collection("order").updateOne(myorder, updateObject, function (err, res) {
        if (err) throw err;
        console.log("1 record updated");
        response.json(res);

    });

});

//delete order

orderRoutes.route('/delete/:id').delete((req, res) => {
    let db_connect = dbo.getDb("sansalu");
    let myorder = { _id: ObjectId(req.params.id) };

    db_connect.collection("order").deleteOne(myorder, function (err, result) {
        if (err) {
            throw err;
        } else {
            res.json({ result });
        }
    });
})


module.exports = orderRoutes;