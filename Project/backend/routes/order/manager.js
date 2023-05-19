const express = require("express");
const managerRoutes = express.Router();
const dbo = require("../../db/conn"); // connect to the database
const ObjectId = require("mongodb").ObjectId // convert the Id from String to ObjectId for the _id


//update order after manager accepts and pass it for production
managerRoutes.route("/manager/:id").post(function (req, res) {
    const db_connect = dbo.getDb("sansalu");
    const id = req.params.id;
    const { status, handlepass } = req.body;

    db_connect
        .collection("orderManager")
        .findOneAndUpdate(
            { _id: id },
            { $set: { status: 'Passed', handlepass } },
            { returnOriginal: false }
        )
        .then((updatedOrder) => {
            res.json({ success: true, updatedOrder });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: 'An error occurred while updating the order passing status' });
        });
});


module.exports = managerRoutes;