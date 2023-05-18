import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function Addmaterial() {
	const [Material_Name, setMaterial_Name] = useState("");
	const [Category, setCategory] = useState("");
	const [Quantity, setQuantity] = useState("");
	const [Description, setDescription] = useState("");
	const [Price, setPrice] = useState("");


	function sendData(e) {
		e.preventDefault();

		const newMaterial = {
			Material_Name,
			Category,
			Quantity,
			Price,
			Description,
		};

		axios
		//add material to the database
			.post("http://localhost:8070/stock/addmaterial", newMaterial)
			.then(() => {
				Swal.fire({
					icon: "success",
					title: "Material Added",
					timer: 1500,
					showConfirmButton: false,
				});
				window.location.href = "/allmaterial";
				setMaterial_Name("");
				setCategory("");
				setQuantity("");
				setDescription(" ");
				setPrice("");
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
					backgroundColor: "#004080",
					padding: "30px 30px 30px 30px",
					borderRadius: "5px",
				}}
			>
				<div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridGap: "1rem" }}>
					<div style={{ gridColumn: "1 / span 2" }}>
						<div style={{ marginBottom: "0.5rem" }}>
							<h1 style={{fontSize:"30px"}}>Add Material</h1>
						</div>
						<form onSubmit={sendData}>
							<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridGap: "1rem" }}>
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
									<div style={{ marginBottom: "0.5rem" }}>Category</div>
									<input
										type="text"
										placeholder="category"
										style={{ width: "100%", padding: "0.5rem" }}
										onChange={(event) => {
											setCategory(event.target.value);
										}}
                                        required
									/>
								</div>
								<div>
									<div style={{ marginBottom: "0.5rem" }}>Price</div>
									<input
										type="number"
										placeholder="Rs.xxxx.xx"
										style={{ width: "100%", padding: "0.5rem" }}
										onChange={(event) => {
											setPrice(event.target.value);
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
											marginRight:"400px"
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