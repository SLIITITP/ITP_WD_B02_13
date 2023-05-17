import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import printIcon from "../stockimg/printer.svg";

// Display function
export default function Oneorder() {
	const [order, setorder] = useState({});
	const { id } = useParams();

	useEffect(() => {
		async function handleSubmit() {
			try {
				const res = await axios.get(`http://localhost:8070/production/getstockreq/${id}`);
				setorder(res.data);
			} catch (err) {
				alert(err);
			}
		}
		handleSubmit();
	}, [id]);

	// Form
	return (
		<div>
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
				<a href={""}>
					<img src={printIcon} alt="print" style={{ cursor: "pointer", width: "30px", marginLeft: "600px" }} />
				</a>
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

					<div>
						<a href="/allmaterial" style={linkStyle}>
							Check Material
						</a>
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
};
