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

app.use("/client", require("./routes/client/record"));
app.use("/loyalty", require("./routes/loyalty/record"));
app.use("/feedback", require("./routes/feedback/record"));
app.use("/admin", require("./routes/admin/record"));

app.use("/employee", require("./routes/employee/record"));
app.use("/allocation", require("./routes/allocation/record"));

app.use("/template", require("./routes/template/record"));
app.use("/productType", require("./routes/productType/record"));
app.use("/printType", require("./routes/printType/record"));
app.use("/material", require("./routes/material/record"));
app.use("/clientDesign", require("./routes/clientDesigns/record"));

app.use("/order", require("./routes/order/record"));
app.use("/order", require("./routes/order/invoice"));

app.use("/production", require("./routes/production/record"));
app.use("/production", require("./routes/stockrequest/record"));
app.use("/production", require("./routes/emprequest/record"));

app.use("/distribution", require("./routes/distribution/record"));
app.use("/company", require("./routes/company/record"));

app.use("/delidetails", require("./routes/delidetails/record"));

app.use("/method", require("./routes/method/record"));

app.use("/cardType", require("./routes/cardType/record"));
app.use("/cardDetails", require("./routes/cardDetails/record"));
app.use("/paymentDetails", require("./routes/paymentDetails/record"));

app.use("/stock", require("./routes/category/record"));
app.use("/stock", require("./routes/purchase/record"));
app.use("/stock", require("./routes/rawmaterial/record"));
app.use("/stock", require("./routes/stockorder/record"));
app.use("/stock", require("./routes/supplier/record"));
app.use("/stock", require("./routes/stocksendmail/record"));

app.listen(PORT, () => {
	//perform connection to database
	dbo.connectToServer(function (err) {
		if (err) console.error(err);
	});
	console.log("................");
	console.log(`Server is up and running on port ${PORT}`);
});
