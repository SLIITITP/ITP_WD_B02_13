const express = require ("express");
const mongoose = require ("mongoose");
const bodyParser = require ("body-parser");
const cors = require ("cors");
const dotenv = require ("dotenv");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

/* Connect to the Database */
mongoose.connect(URL, {
    // useCreateIndex: true, 
    useNewUrlParser: true,
    useUnifiedTopology: true
    // useFindAndModify: false
});

const connection = mongoose.connection;
connection.once ("open" , () => {
    console.log("MongoDB Connection success!");
})

app.listen(PORT, () => {
    console.log(`Server is up and running on port number: ${PORT}`)
})

