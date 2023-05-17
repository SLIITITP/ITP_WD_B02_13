import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function Addproduction() {
	const [name, setname] = useState("");
	const [date, setdate] = useState("");
	const [material, setmaterial] = useState("");
	const [machine, setmachine] = useState("");
    const [employee, setemployee] = useState("");
	const [description, setDescription] = useState("");

	function sendData(e) {
		e.preventDefault();

		const newProduct = {
			name,
			date,
			material,
			machine,
            employee,
			description,
		};

		axios
			.post("http://localhost:8070/production/add", newProduct)
			.then(() => {
				Swal.fire({
					icon: "success",
					title: "Production Details Added",
					timer: 1500,
					showConfirmButton: false,
				});
				window.location.href = "/allproduct";
				setname("");
				setdate("");
				setmaterial("");
				setmachine("");
                setemployee("");
				setDescription(" ");
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
					width: "2000px",
					margin: "auto",
					backgroundColor: "#FFFFFF",
					padding: "30px 30px 30px 30px",
					borderRadius: "5px",
				}}
			>
				<div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridGap: "1rem" }}>
					<div style={{ gridColumn: "1 / span 2" }}>
						<div style={{ marginBottom: "0.5rem" }}>
							<h1 style={{fontSize:"30px"}}>Add Production Details</h1>
						</div>
						<form onSubmit={sendData}>
							<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridGap: "1rem" }}>
								<div>
									<div style={{ marginBottom: "0.5rem" }}>Name</div>
									<input
										type="text"
										placeholder="Enter production name"
										style={{ width: "100%", padding: "0.5rem" }}
										onChange={(event) => {
											setname(event.target.value);
										}}
										required
									/>
								</div>
								<div>
									<div style={{ marginBottom: "0.5rem" }}>Date</div>
									<input
										type="date"
										placeholder=""
										style={{ width: "100%", padding: "0.5rem" }}
										onChange={(event) => {
											setdate(event.target.value);
										}}
									/>
								</div>
								<div>
									<div style={{ marginBottom: "0.5rem" }}>Material</div>
									<input
										type="text"
										placeholder="Enter material name"
										style={{ width: "100%", padding: "0.5rem" }}
										onChange={(event) => {
											setmaterial(event.target.value);
										}}
										required
									/>
								</div>
								<div>
									<div style={{ marginBottom: "0.5rem" }}>Machine Quantity</div>
									<input
										type="number"
										placeholder="Enter machine quantity"
										style={{ width: "100%", padding: "0.5rem" }}
										onChange={(event) => {
											setmachine(event.target.value);
										}}
										required
									/>
								</div>

                                <div>
									<div style={{ marginBottom: "0.5rem" }}>Employee Quantity</div>
									<input
										type="number"
										placeholder="Enter machine quantity"
										style={{ width: "100%", padding: "0.5rem" }}
										onChange={(event) => {
											setemployee(event.target.value);
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
										required
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