const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./.env" });

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(express.json());

//get database connection
const dbo = require("./db/conn");

//get routes files
app.use("/order", require("./routes/order/record"));

app.listen(PORT, () => {
	//perform connection to database
	dbo.connectToServer(function (err) {
		if (err) console.error(err);
	});
	console.log("................");
	console.log(`Server is up and running on port ${PORT}`);
});