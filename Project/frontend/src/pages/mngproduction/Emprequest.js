import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function Addemprequest() {
	const [orderid, setorderid] = useState("");
	const [empallocation, setempallocation] = useState("");
	const [description, setdescription] = useState("");

	function sendData(e) {
		e.preventDefault();

		const newRequest = {
			orderid,
			empallocation,
			description,
		};

		axios
			.post("http://localhost:8070/production/addempreq", newRequest)
			.then(() => {
				Swal.fire({
					icon: "success",
					title: "Employee alloction request Details Added",
					timer: 1500,
					showConfirmButton: false,
				});
				setorderid("");
				setempallocation("");
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
							<h1 style={{fontSize:"30px"}}>Request Employee Allocation</h1>
						</div>
						<form onSubmit={sendData}>
							<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridGap: "1rem" }}>
								<div>
									<div style={{ marginBottom: "0.5rem" }}> Order ID</div>
									<input
										type="text"
										placeholder="Enter order id"
										style={{ width: "100%", padding: "0.5rem" }}
										onChange={(event) => {
											setorderid(event.target.value);
										}}
										required
									/>
								</div>


								<div>
									<div style={{ marginBottom: "0.5rem" }}>Employee Allocation</div>
									<input
										type="text"
										placeholder="Enter Employee Allocation"
										style={{ width: "100%", padding: "0.5rem" }}
										onChange={(event) => {
											setempallocation(event.target.value);
										}}
										required
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