import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function Addrequest() {
	const [materialname, setmaterialname] = useState("");
	const [materialcolor, setmaterialcolor] = useState("");
	const [materialquantity, setmaterialquantity] = useState("");
	const [buttoncolor, setbuttoncolor] = useState("");
    const [buttonquantity, setbuttonquantity] = useState("");
	const [description, setdescription] = useState("");

	function sendData(e) {
		e.preventDefault();

		const newRequest = {
			materialname,
			materialcolor,
			materialquantity,
			buttoncolor,
            buttonquantity,
			description,
		};

		axios
			.post("http://localhost:8070/production/addstockreq", newRequest)
			.then(() => {
				// Swal.fire({
				// 	icon: "success",
				// 	title: "Production request Details Added",
				// 	timer: 1500,
				// 	showConfirmButton: false,
				// });
				setmaterialname("");
				setmaterialcolor("");
				setmaterialquantity("");
				setbuttoncolor("");
                setbuttonquantity("");
				setdescription(" ");
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
							<h1 style={{fontSize:"30px"}}>Request for Materials</h1>
						</div>
						<form onSubmit={sendData}>
							<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridGap: "1rem" }}>
								<div>
									<div style={{ marginBottom: "0.5rem" }}> Material Name</div>
									<input
										type="text"
										placeholder="Enter  material name"
										style={{ width: "100%", padding: "0.5rem" }}
										onChange={(event) => {
											setmaterialname(event.target.value);
										}}
										required
									/>
								</div>


								<div>
									<div style={{ marginBottom: "0.5rem" }}>Material Color</div>
									<input
										type="text"
										placeholder="Enter machine quantity"
										style={{ width: "100%", padding: "0.5rem" }}
										onChange={(event) => {
											setmaterialcolor(event.target.value);
										}}
										required
									/>
								</div>

                                <div>
									<div style={{ marginBottom: "0.5rem" }}>Material Quantity</div>
									<input
										type="number"
										placeholder="Enter material quantity"
										style={{ width: "100%", padding: "0.5rem" }}
										onChange={(event) => {
											setmaterialquantity(event.target.value);
										}}
										required
									/>
								</div>

                                <div>
									<div style={{ marginBottom: "0.5rem" }}>Button Color</div>
									<input
										type="text"
										placeholder="Enter button color"
										style={{ width: "100%", padding: "0.5rem" }}
										onChange={(event) => {
											setbuttoncolor(event.target.value);
										}}
									/>
								</div>

                                <div>
									<div style={{ marginBottom: "0.5rem" }}>Button Quantity</div>
									<input
										type="number"
										placeholder="Enter button quantity"
										style={{ width: "100%", padding: "0.5rem" }}
										onChange={(event) => {
											setbuttonquantity(event.target.value);
										}}

									/>
								</div>

								<div style={{ gridColumn: "1 / span 2" }}>
									<div style={{ marginBottom: "0.5rem" }}>Description</div>
									<textarea
										style={{ width: "100%", padding: "0.5rem" }}
										onChange={(event) => {
											setdescription(event.target.value);
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

								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}