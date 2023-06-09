import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import printIcon from "../stockimg/printer.svg";
//report gen
import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";

// Display function
export default function Oneorder() {
	const [order, setorder] = useState({});
	const { id } = useParams();

	useEffect(() => {
		async function handleSubmit() {
			try {
				// get one order
				const res = await axios.get(`http://localhost:8070/production/getstockreq/${id}`);
				setorder(res.data);
			} catch (err) {
				alert(err);
			}
		}
		handleSubmit();
	}, [id]);

	function generateReport() {
		// Create a new jsPDF instance
		const doc = new jsPDF();

		// Add the report title to the PDF
		doc.setFontSize(18);
		doc.text("Order Details Report", 14, 22);

		// Add the current date to the PDF
		const date = moment().format("MMMM Do YYYY, h:mm:ss a");
		doc.setFontSize(12);
		doc.text(`Report generated on ${date}`, 14, 32);

		// Define the columns for the table
		const columns = ["Field", "Value"];

		// Define the rows for the table
		const rows = [
			["Material Name", order.materialname],
			["Material Color", order.materialcolor],
			["Material Quantity", order.materialquantity],
			["Button Color", order.buttoncolor],
			["Button Quantity", order.buttonquantity],
		];

		// Generate the table using the autoTable function
		doc.autoTable({
			head: [columns],
			body: rows,
			startY: 40, // Set the y-coordinate for the start of the table
			styles: {
				fontSize: 12, // Set font size for table content
				cellPadding: 3, // Set cell padding for table cells
				textAlign: "center", // Align text to center of cells
			},
		});

		// Save the PDF document as deliverydetails.pdf
		doc.save("Order Details.pdf");
	}
	// Form
	return (
		<div>
			<br />
			<br />

			<div
				className="container"
				style={{
					margin: "auto",
					backgroundColor: "#99ccff",
					padding: "40px 40px 40px 20px",
					borderRadius: "5px",
					width: "700px",
					marginTop: "100px",
					textAlign: "center",
				}}
			>
				<h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "40px", color: "#333" }}>Order Details</h1>

				<form style={{ maxWidth: "400px", margin: "0 auto" }}>
					<div style={{ marginBottom: "20px" }}>
						<label style={{ fontSize: "18px", fontWeight: "bold", color: "#555" }}>Material Name:</label>
						<input type="text" placeholder="Enter material name" value={order.materialname} style={inputStyle} />
					</div>

					<div style={{ marginBottom: "20px" }}>
						<label style={{ fontSize: "18px", fontWeight: "bold", color: "#555" }}>Material Color:</label>
						<input type="text" placeholder="Enter category" value={order.materialcolor} style={inputStyle} />
					</div>

					<div style={{ marginBottom: "20px" }}>
						<label style={{ fontSize: "18px", fontWeight: "bold", color: "#555" }}>Material Quantity:</label>
						<input type="text" placeholder="Enter price" value={order.materialquantity} style={inputStyle} />
					</div>

					<div style={{ marginBottom: "20px" }}>
						<label style={{ fontSize: "18px", fontWeight: "bold", color: "#555" }}>Button Color:</label>
						<input type="text" placeholder="Enter quantity" value={order.buttoncolor} style={inputStyle} />
					</div>

					<div style={{ marginBottom: "20px" }}>
						<label style={{ fontSize: "18px", fontWeight: "bold", color: "#555" }}>Button Quantity:</label>
						<input type="number" placeholder="Enter quantity" value={order.buttonquantity} style={inputStyle} />
					</div>

					<div style={{ marginBottom: "20px" }}>
						<label style={{ fontSize: "18px", fontWeight: "bold", color: "#555" }}>Description:</label>
						<textarea value={order.description} style={textareaStyle}></textarea>
					</div>

					<div style={{ display: "flex" }}>
						<div>
							<a href="/allreqorder" style={linkStyle}>
								Check Material
							</a>
						</div>
					</div>

					<div style={{ display: "flex", justifyContent: "center", marginTop: "35px" }}>
						<button
							style={{
								backgroundColor: "#1a1a1a",
								color: "white",
								borderRadius: "8px",
								width: "200px",
								height: "40px",
								padding: "5px",
							}}
							className="btn-icon btn-3"
							color="success"
							type="button"
							onClick={generateReport}
						>
							Generate Report
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

// CSS styles
const inputStyle = {
	padding: "10px",
	borderRadius: "5px",
	border: "1px solid #ccc",
	width: "100%",
	fontSize: "16px",
};

const textareaStyle = {
	padding: "10px",
	borderRadius: "5px",
	border: "1px solid #ccc",
	resize: "vertical",
	width: "100%",
	minHeight: "100px",
	fontSize: "16px",
};

const linkStyle = {
	textDecoration: "none",
	color: "#fff",
	backgroundColor: "#007bff",
	padding: "10px 20px",
	borderRadius: "5px",
	marginLeft: "115px",

};
