import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function Addpurchase() {
	const [Supplier_Name, setSupplier_Name] = useState("");
	const [Purchase_Date, setPurchase_Date] = useState("");
	const [Email, setEmail] = useState("");
	const [Material_Name, setMaterial_Name] = useState("");
	const [Quantity, setQuantity] = useState("");
	const [Refferance_No, setRefferance_No] = useState("");
	const [Unit_Price, setUnit_Price] = useState("");
	const [Total_Price, setTotal_Price] = useState("");
	const [Description, setDescription] = useState("");
	const [animals , setAnimals] = useState("");
		
		// Email validation
		  function validateEmail(email) {
				const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				return emailRegex.test(email);
			}


	function sendData(e) {
		e.preventDefault();
						// Email validation
					    if (!validateEmail(Email)) {
								Swal.fire({
									icon: "error",
									title: "Invalid Email",
									text: "Please enter a valid email address",
								});
								return;
							}

		const newOrder = {
			Supplier_Name,
			Purchase_Date,
			Email,
			Material_Name,
			Quantity,
			Refferance_No,
			Unit_Price,
			Total_Price: Quantity * Unit_Price, // Calculate the total price
			Description,
			animals,
		};

		axios
		//add purchase to the database
			.post("http://localhost:8070/stock/addpurchase", newOrder)
			.then(() => {
				Swal.fire({
					icon: "success",
					title: "Purchase Added",
					timer: 1500,
					showConfirmButton: false,
				});
				// Redirect to the all purchase page
				window.location.href = "/allpurchase";
				// Clear the form
				setSupplier_Name("");
				setPurchase_Date("");
				setEmail("");
				setMaterial_Name("");
				setQuantity("");
				setRefferance_No("");
				setUnit_Price("");
				setTotal_Price("");
				setDescription(" ");
				setAnimals("");
			})
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
					backgroundColor: "#0059b3",
					padding: "30px 30px 30px 30px",
					borderRadius: "5px",
				}}
			>
				<div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridGap: "1rem" }}>
					<div style={{ gridColumn: "1 / span 2" }}>
						<div style={{ marginBottom: "0.5rem" }}>
							<h1 style={{ fontSize: "30px" }}>Add Purchase</h1>
						</div>
						<form onSubmit={sendData}>
							<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridGap: "1rem" }}>
								<div>
									<div style={{ marginBottom: "0.5rem" }}>Supplier Name</div>
									<input
										type="text"
										placeholder="John Doe"
										style={{ width: "100%", padding: "0.5rem" }}
										onChange={(event) => {
											setSupplier_Name(event.target.value);
										}}
										required
									/>
								</div>
								<div>
									<div style={{ marginBottom: "0.5rem" }}>Purchase Date</div>
									<input
										type="date"
										placeholder=""
										style={{ width: "100%", padding: "0.5rem" }}
										onChange={(event) => {
											setPurchase_Date(event.target.value);
										}}
										required
									/>
								</div>

								<div>
									<div style={{ marginBottom: "0.5rem" }}>Email</div>
									<input
										type="text"
										placeholder="abc@gmail.com"
										style={{ width: "100%", padding: "0.5rem" }}
										onChange={(event) => {
											setEmail(event.target.value);
										}}
										required
									/>
								</div>
								<div>
									<div style={{ marginBottom: "0.5rem" }}>Material Name</div>
									<input
										type="text"
										placeholder="material name"
										style={{ width: "100%", padding: "0.5rem" }}
										onChange={(event) => {
											setMaterial_Name(event.target.value);
										}}
										required
									/>
								</div>

								<div>
									<div style={{ marginBottom: "0.5rem" }}>Refferance No</div>
									<input
										type="text"
										placeholder="reffrence no"
										style={{ width: "100%", padding: "0.5rem" }}
										onChange={(event) => {
											setRefferance_No(event.target.value);
										}}
										required
									/>
								</div>
								<div>
									<div style={{ marginBottom: "0.5rem" }}>Quantity</div>
									<input
										type="number"
										placeholder="quantity"
										style={{ width: "100%", padding: "0.5rem" }}
										onChange={(event) => {
											setQuantity(event.target.value);
										}}
										required
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
