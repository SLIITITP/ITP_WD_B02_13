import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function Addsupplier() {
	const [Supplier_Name, setSupplier_Name] = useState("");
	const [Mobile_No, setMobile_No] = useState("");
	const [Email, setEmail] = useState("");
	const [Address, setAddress] = useState("");
	const [Description, setDescription] = useState("");

	/*const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("Category_Name", Category_Name);
    formData.append("Category_Code", Category_Code);
    formData.append("Description", Description);
    formData.append("photo", photo);

    try {
      const response = await fetch("http://localhost:8060/stock/addcategory", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Form submitted successfully");
      } else {
        console.error("Failed to submit form");
      }
    } catch (error) {
      console.error(error);
    }
  };*/

    function validateMobileNo(mobileNo) {
			const mobileNoRegex = /^\d{10}$/;
			return mobileNoRegex.test(mobileNo);
		}

	  function validateEmail(email) {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			return emailRegex.test(email);
		}

	function sendData(e) {
		e.preventDefault();

		    if (!validateMobileNo(Mobile_No)) {
					Swal.fire({
						icon: "error",
						title: "Invalid Mobile Number",
						text: "Please enter a 10-digit mobile number",
					});
					return;
				}

			    if (!validateEmail(Email)) {
						Swal.fire({
							icon: "error",
							title: "Invalid Email",
							text: "Please enter a valid email address",
						});
						return;
					}

		const newSupplier = {
			Supplier_Name,
			Mobile_No,
			Email,
			Address,
			Description,
		};

		axios
			.post("http://localhost:8070/stock/addsupplier", newSupplier)
			.then(() => {
				Swal.fire({
					icon: "success",
					title: "Supplier Added",
					timer: 1500,
					showConfirmButton: false,
				});
				setSupplier_Name("");
				setMobile_No("");
				setEmail("");
				setAddress("");
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
							<h1 style={{ fontSize: "30px" }}>Add Supplier</h1>
						</div>
						<form onSubmit={sendData}>
							<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridGap: "1rem" }}>
								<div>
									<div style={{ marginBottom: "0.5rem" }}>Supplier Name</div>
									<input
										type="text"
										placeholder="Enter supplier name"
										style={{ width: "100%", padding: "0.5rem" }}
										onChange={(event) => {
											setSupplier_Name(event.target.value);
										}}
									/>
								</div>
								<div>
									<div style={{ marginBottom: "0.5rem" }}>Mobile No</div>
									<input
										type="number"
										placeholder="Enter mobile no"
										style={{ width: "100%", padding: "0.5rem" }}
										onChange={(event) => {
											setMobile_No(event.target.value);
										}}
									/>
								</div>
								<div>
									<div style={{ marginBottom: "0.5rem" }}>Email</div>
									<input
										type="email"
										placeholder="Enter email"
										style={{ width: "100%", padding: "0.5rem" }}
										onChange={(event) => {
											setEmail(event.target.value);
										}}
									/>
								</div>
								<div>
									<div style={{ marginBottom: "0.5rem" }}>Address</div>
									<input
										type="text"
										placeholder="Enter address"
										style={{ width: "100%", padding: "0.5rem" }}
										onChange={(event) => {
											setAddress(event.target.value);
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
