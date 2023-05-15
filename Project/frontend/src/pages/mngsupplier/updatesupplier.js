import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function Usupplier() {
	//   const [category, setcategory] = useState({});
	const { id } = useParams();

	const [data, setData] = useState([]);
	const [Supplier_Name, setSupplier_Name] = useState("");
	const [Mobile_No, setMobile_No] = useState("");
	const [Email, setEmail] = useState("");
	const [Address, setAddress] = useState("");
	const [Description, setDescription] = useState("");

	useEffect(() => {
		const getSupplier = async () => {
			const res = await axios.get(`http://localhost:8070/stock/getsupplier/${id}`);
			console.log(res.data);
			setData(res.data);

			setSupplier_Name(res.data.Supplier_Name);
			setMobile_No(res.data.Mobile_No);
			setEmail(res.data.Email);
			setAddress(res.data.Address);
			setDescription(res.data.Description);
		};
		getSupplier();
	}, [id]);

	const handleSubmit = (e) => {
		e.preventDefault();

		    if (!validateMobileNo(Mobile_No)) {
					Swal.fire({
						icon: "error",
						title: "Invalid Mobile Number",
						text: "Please enter a valid 10-digit mobile number",
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

		const USupplier = {
			Supplier_Name,
			Mobile_No,
			Email,
			Address,
			Description,
		};

		axios
			.put(`http://localhost:8070/stock/updatesupplier/${id}`, USupplier)
			.then((response) => {
				console.log(response.data);
				Swal.fire({
					icon: "success",
					title: "Supplier Details Updated",
					timer: 1500,
					showConfirmButton: false,
				});
				// show success message or redirect to another page
			})
			.catch((error) => {
				console.log(error);
				// show error message
			});
	};

	 function validateMobileNo(mobileNo) {
			const mobileNoRegex = /^\d{10}$/;
			return mobileNoRegex.test(mobileNo);
		}

		function validateEmail(email) {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			return emailRegex.test(email);
		}

	return (
		<div>
			<br />
			<br />
			<br />
			<br />
			<div className="container" style={{ width: "1000px", margin: "auto", backgroundColor: "#99ccff" }}>
				<div
					style={{
						marginTop: "50px",
						backgroundColor: "#99ccff",
						padding: "20px",
						boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
						borderRadius: "5px",
					}}
				>
					<div
						style={{
							marginBottom: "30px",
							textAlign: "center",
						}}
					>
						<h3
							style={{
								color: "Black",
								fontSize: "30px",
								marginTop: "0px",
								fontWeight: "bold",
							}}
						>
							Update Supplier
						</h3>
					</div>
					<form onSubmit={handleSubmit}>
						<div style={{ marginBottom: "20px" }}>
							<label
								htmlFor="name"
								style={{
									display: "block",
									fontSize: "18px",
									marginBottom: "10px",
								}}
							>
								Supplier Name
							</label>
							<input
								type="text"
								className="form-control"
								defaultValue={data.Supplier_Name}
								onChange={(e) => setSupplier_Name(e.target.value)}
								style={{
									width: "100%",
									padding: "10px",
									borderRadius: "5px",
									border: "1px solid #CCC",
									fontSize: "16px",
								}}
							/>
						</div>
						<div style={{ marginBottom: "20px" }}>
							<label
								htmlFor="code"
								style={{
									display: "block",
									fontSize: "18px",
									marginBottom: "10px",
								}}
							>
								Mobile No
							</label>
							<input
								type="number"
								className="form-control"
								defaultValue={data.Mobile_No}
								onChange={(e) => setMobile_No(e.target.value)}
								style={{
									width: "100%",
									padding: "10px",
									borderRadius: "5px",
									border: "1px solid #CCC",
									fontSize: "16px",
								}}
							/>
						</div>

						<div style={{ marginBottom: "20px" }}>
							<label
								htmlFor="code"
								style={{
									display: "block",
									fontSize: "18px",
									marginBottom: "10px",
								}}
							>
								Email
							</label>
							<input
								type="email"
								className="form-control"
								defaultValue={data.Email}
								onChange={(e) => setEmail(e.target.value)}
								style={{
									width: "100%",
									padding: "10px",
									borderRadius: "5px",
									border: "1px solid #CCC",
									fontSize: "16px",
								}}
							/>
						</div>

						<div style={{ marginBottom: "20px" }}>
							<label
								htmlFor="code"
								style={{
									display: "block",
									fontSize: "18px",
									marginBottom: "10px",
								}}
							>
								Address
							</label>
							<input
								type="text"
								className="form-control"
								defaultValue={data.Address}
								onChange={(e) => setAddress(e.target.value)}
								style={{
									width: "100%",
									padding: "10px",
									borderRadius: "5px",
									border: "1px solid #CCC",
									fontSize: "16px",
								}}
							/>
						</div>
						<div style={{ marginBottom: "20px" }}>
							<label
								htmlFor="description"
								style={{
									display: "block",
									fontSize: "18px",
									marginBottom: "10px",
								}}
							>
								Description
							</label>
							<input
								type="text"
								className="form-control"
								value={data.Description}
								onChange={(e) => setDescription(e.target.value)}
								style={{
									width: "100%",
									padding: "10px",
									borderRadius: "5px",
									border: "1px solid #CCC",
									fontSize: "16px",
								}}
							/>
						</div>
						<button
							type="submit"
							className="register"
							style={{
								background: "#f0c967",
								color: "white",
								border: "none",
								padding: "0.5rem",
								borderRadius: "0.5rem",
								cursor: "pointer",
								width: "100px",
							}}
						>
							Update
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
