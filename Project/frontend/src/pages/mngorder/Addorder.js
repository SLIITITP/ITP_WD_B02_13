import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function Addorder() {
	const [Product_Type, setProduct_Type] = useState("");
	const [Print_Type, setPrint_Type] = useState("");
	const [Template, setTemplate] = useState("");
	const [Color, setColor] = useState("");
	const [Quantity, setQuantity] = useState("");
	const [Total_Quantity, setTotal_Quantity] = useState("");
	const [Total_Price, setTotal_Price] = useState("");
	const [Description, setDescription] = useState("");



	function sendData(e) {
		e.preventDefault();

		const newOrder = {
			Product_Type,
			Print_Type,
			Template,
			Color,
			Quantity,
			Total_Quantity,
			Total_Price,
			Description,
		};

		axios
			.post("http://localhost:8070/stock/addorder", newOrder)
			.then(() => {
				Swal.fire({
					icon: "success",
					title: "Order Added",
					timer: 1500,
					showConfirmButton: false,
				});
				setProduct_Type("");
				setPrint_Type("");
				setTemplate("");
				setColor("");
				setQuantity("");
				setTotal_Quantity("");
				setTotal_Price("");
				setDescription(" ");			})
			.catch((err) => {
				alert(err);
			});
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
			<div
				className="container"
				style={{
					width: "700px",
					margin: "auto",
					backgroundColor: "#004080",
					padding: "30px 30px 30px 30px",
					borderRadius: "5px",
				}}
			>
				<div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridGap: "1rem" }}>
					<div style={{ gridColumn: "1 / span 2" }}>
						<div style={{ marginBottom: "0.5rem" }}>
							<h1 style={{ fontSize: "30px" }}>Add Orde</h1>
						</div>
						<form onSubmit={sendData}>
							<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridGap: "1rem" }}>
								<div>
									<div style={{ marginBottom: "0.5rem" }}>Product Type</div>
									<input
										type="text"
										placeholder="Enter product"
										style={{ width: "100%", padding: "0.5rem" }}
										onChange={(event) => {
											setProduct_Type(event.target.value);
										}}
									/>
								</div>
								<div>
									<div style={{ marginBottom: "0.5rem" }}>Print Type</div>
									<input
										type="text"
										placeholder="Enter print type "
										style={{ width: "100%", padding: "0.5rem" }}
										onChange={(event) => {
											setPrint_Type(event.target.value);
										}}
									/>
								</div>
								<div>
									<div style={{ marginBottom: "0.5rem" }}>Color</div>
									<input
										type="text"
										placeholder="Enter color"
										style={{ width: "100%", padding: "0.5rem" }}
										onChange={(event) => {
											setColor(event.target.value);
										}}
									/>
								</div>

								<div>
									<div style={{ marginBottom: "0.5rem" }}>Template</div>
									<input
										type="text"
										placeholder="Enter template"
										style={{ width: "100%", padding: "0.5rem" }}
										onChange={(event) => {
											setTemplate(event.target.value);
										}}
									/>
								</div>
								<div>
									<div style={{ marginBottom: "0.5rem" }}>Quantity</div>
									<input
										type="number"
										placeholder="Enter quantity"
										style={{ width: "100%", padding: "0.5rem" }}
										onChange={(event) => {
											setQuantity(event.target.value);
										}}
									/>
								</div>

								<div>
									<div style={{ marginBottom: "0.5rem" }}>Total Quantity</div>
									<input
										type="number"
										placeholder="Enter quantity"
										style={{ width: "100%", padding: "0.5rem" }}
										onChange={(event) => {
											setTotal_Quantity(event.target.value);
										}}
									/>
								</div>

								<div>
									<div style={{ marginBottom: "0.5rem" }}>Total Price</div>
									<input
										type="number"
										placeholder="Enter quantity"
										style={{ width: "100%", padding: "0.5rem" }}
										onChange={(event) => {
											setTotal_Price(event.target.value);
										}}
									/>
								</div>
								<div style={{ gridColumn: "1 / span 2" }}>
									<div style={{ marginBottom: "0.5rem" }}>Description</div>
									<textarea
										style={{ width: "100%", padding: "0.5rem" }}
										onChange={(event) => {
											setDescription(event.target.value);
										}}
									></textarea>
								</div>
								<div
									style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridGap: "1rem", gridColumn: "1 / span 2" }}
								>
									<button
										type="submit"
										style={{
											background: "green",
											color: "white",
											border: "none",
											padding: "0.5rem",
											borderRadius: "0.5rem",
											cursor: "pointer",
											width: "100px",
										}}
									>
										Submit
									</button>
									<button
										type="button"
										style={{
											background: "gray",
											color: "white",
											border: "none",
											padding: "0.5rem",
											borderRadius: "0.5rem",
											cursor: "pointer",
											width: "100px",
											marginRight: "400px",
										}}
									>
										Cancel
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
									}