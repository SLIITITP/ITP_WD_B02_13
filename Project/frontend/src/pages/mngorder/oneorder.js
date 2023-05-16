import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import printIcon from "../stockimg/printer.svg"

//display function
export default function Oneorder() {
	const [order, setorder] = useState({});
	const { id } = useParams();

	useEffect(() => {
		async function handleSubmit() {
			try {
				const res = await axios.get(`http://localhost:8070/stock/getorder/${id}`);
				setorder(res.data);
			} catch (err) {
				alert(err);
			}
		}
		handleSubmit();
	}, [id]);

	//form
	return (
		<div>
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
				<a href={""}>
					<img src={printIcon} alt="print" style={{ cursor: "pointer", width: "30px", marginLeft:"600px" }} />
				</a>
				<h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "40px", color: "#333" }}>Order Details</h1>
				<form style={{ maxWidth: "400px", margin: "0 auto" }}>
					<div style={{ marginBottom: "20px" }}>
						<label style={{ fontSize: "18px", fontWeight: "bold", color: "#555" }}>Product Type:</label>
						<input type="text" placeholder="Enter material name" value={order.Product_Type} style={inputStyle} />
					</div>

					<div style={{ marginBottom: "20px" }}>
						<label style={{ fontSize: "18px", fontWeight: "bold", color: "#555" }}>Print Type:</label>
						<input type="text" placeholder="Enter category" value={order.Print_Type} style={inputStyle} />
					</div>

					<div style={{ marginBottom: "20px" }}>
						<label style={{ fontSize: "18px", fontWeight: "bold", color: "#555" }}>Template:</label>
						<input type="text" placeholder="Enter price" value={order.Template} style={inputStyle} />
					</div>

					<div style={{ marginBottom: "20px" }}>
						<label style={{ fontSize: "18px", fontWeight: "bold", color: "#555" }}>Color:</label>
						<input type="text" placeholder="Enter quantity" value={order.Color} style={inputStyle} />
					</div>

					<div style={{ marginBottom: "20px" }}>
						<label style={{ fontSize: "18px", fontWeight: "bold", color: "#555" }}>Quantity:</label>
						<input type="number" placeholder="Enter quantity" value={order.Quantity} style={inputStyle} />
					</div>

					<div style={{ marginBottom: "20px" }}>
						<label style={{ fontSize: "18px", fontWeight: "bold", color: "#555" }}>Total Quantity:</label>
						<input type="number" placeholder="Enter quantity" value={order.Total_Quantity} style={inputStyle} />
					</div>

					<div style={{ marginBottom: "20px" }}>
						<label style={{ fontSize: "18px", fontWeight: "bold", color: "#555" }}>Total Price:</label>
						<input type="number" placeholder="Enter quantity" value={order.Total_Price} style={inputStyle} />
					</div>

					<div style={{ marginBottom: "20px" }}>
						<label style={{ fontSize: "18px", fontWeight: "bold", color: "#555" }}>Description:</label>
						<textarea value={order.Description} style={textareaStyle}></textarea>
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
