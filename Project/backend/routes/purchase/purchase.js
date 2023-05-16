// const mongoose = require("mongoose");

// const addpurchase = new mongoose.Schema({
// 	Supplier_Name: {
// 		type: String,
// 		required: true,
// 	},

// 	Purchase_Date: {
// 		type: Number,
// 		required: true,
// 		validate: {
// 			validator: (value) => {
// 				return !isNaN(value);
// 			},
// 			message: "Order_Date must be a valid number",
// 		},
// 	},

// 	Material_Name: {
// 		type: String,
// 		required: true,
// 	},

// 	Quantity: {
// 		type: Number,
// 		required: true,
// 		validate: {
// 			validator: (value) => {
// 				return !isNaN(value);
// 			},
// 			message: "Order_Date must be a valid number",
// 		},
// 	},

// 	Refferance_No: {
// 		type: String,
// 		required: true,
// 	},

// 	Description: {
// 		type: String,
// 		required: true,
// 	},

// 	Unit_Price: {
// 		type: Number,
// 		required: true,
// 		validate: {
// 			validator: (value) => {
// 				return !isNaN(value);
// 			},
// 			message: "Order_Date must be a valid number",
// 		},
// 	},

// 	Total_Price: {
// 		type: Number,
// 		required: true,
// 		validate: {
// 			validator: (value) => {
// 				return !isNaN(value);
// 			},
// 			message: "Order_Date must be a valid number",
// 		},
// 	},
// });

// module.exports = mongoose.model("purchase", addpurchase);
