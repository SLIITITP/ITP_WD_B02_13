import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

//report
import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";

export default function OnepaymentD() {
	const [paymentd, setpaymentd] = useState({});
	const { id } = useParams();

	useEffect(() => {
		async function handleSubmit() {
			try {
				const res = await axios.get(`http://localhost:8070/paymentDetails/${id}`);
				setpaymentd(res.data);
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
		doc.text("Client Payment Report", 14, 22);

		// Add the current date to the PDF
		const date = moment().format("MMMM Do YYYY, h:mm:ss a");
		doc.setFontSize(12);
		doc.text(`Report generated on ${date}`, 14, 32);

		// Define the columns for the table
		const columns = ["Field", "Value"];

		// Define the rows for the table
		const rows = [
			["Date", paymentd.Date],
			["Recipient Name", paymentd.RecipientName],
			["TotalAmount(In LKR)", paymentd.TotalAmount],
			["Recipient Email", paymentd.RecipientEmail],
			["Recipient Contact Number", paymentd.ContactNumber],
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
		doc.save("Personal Payment Details.pdf");
	}


	return (
		<div>
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
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
				<h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "40px", color: "#333" }}>Personal Payment Details</h1>
				<form style={{ maxWidth: "400px", margin: "0 auto" }}>
					<div style={{ marginBottom: "20px" }}>
						<label style={{ fontSize: "18px", fontWeight: "bold", color: "#555" }}>Payment ID:</label>
						<input type="text" placeholder="Enter material name" value={paymentd._id} style={inputStyle} />
					</div>

					<div style={{ marginBottom: "20px" }}>
						<label style={{ fontSize: "18px", fontWeight: "bold", color: "#555" }}>Date:</label>
						<input type="text" placeholder="Enter category" value={paymentd.Date} style={inputStyle} />
					</div>

					<div style={{ marginBottom: "20px" }}>
						<label style={{ fontSize: "18px", fontWeight: "bold", color: "#555" }}>Recipient Name:</label>
						<input type="text" placeholder="Enter price" value={paymentd.RecipientName} style={inputStyle} />
					</div>

					<div style={{ marginBottom: "20px" }}>
						<label style={{ fontSize: "18px", fontWeight: "bold", color: "#555" }}>Total Amount(In LKR):</label>
						<input type="number" placeholder="Enter quantity" value={paymentd.TotalAmount} style={inputStyle} />
					</div>

                    
					<div style={{ marginBottom: "20px" }}>
						<label style={{ fontSize: "18px", fontWeight: "bold", color: "#555" }}>Recipient Email:</label>
						<input type="text" placeholder="Enter quantity" value={paymentd.RecipientEmail} style={inputStyle} />
					</div>

					<div style={{ marginBottom: "20px" }}>
						<label style={{ fontSize: "18px", fontWeight: "bold", color: "#555" }}>Recipient Contact Number:</label>
						<input type="text" placeholder="Enter quantity" value={paymentd.ContactNumber} style={inputStyle} />
					</div>

					{/* report generation button */}
				<button
					style={{
						marginLeft: "10px",
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