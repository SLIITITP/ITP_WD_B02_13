import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function Uorder() {
	//   const [category, setcategory] = useState({});
	const { id } = useParams();

	const [data, setData] = useState([]);
	const [Product_Type, setProduct_Type] = useState("");
	const [Print_Type, setPrint_Type] = useState("");
	const [Template, setTemplate] = useState("");
	const [Color, setColor] = useState("");
	const [Quantity, setQuantity] = useState("");
	const [Total_Quantity, setTotal_Quantity] = useState("");
	const [Total_Price, setTotal_Price] = useState("");
	const [Description, setDescription] = useState("");

	useEffect(() => {
		const getPurchase = async () => {
			const res = await axios.get(`http://localhost:8070/stock/getorder/${id}`);
			console.log(res.data);
			setData(res.data);

			setProduct_Type(res.data.Product_Type);
			setPrint_Type(res.data.Print_Type);
			setTemplate(res.data.Template);
			setQuantity(res.data.Quantity);
			setColor(res.data.Color);
			setTotal_Quantity(res.data.Total_Quantity);
			setTotal_Price(res.data.Total_Price);
			setDescription(res.data.Description);
		};
		getPurchase();
	}, [id]);

	const handleSubmit = (e) => {
		e.preventDefault();

		const UOrder = {
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
			.put(`http://localhost:8070/stock/updateorder/${id}`, UOrder)
			.then((response) => {
				console.log(response.data);
				Swal.fire({
					icon: "success",
					title: "Order Details Updated",
					timer: 1500,
					showConfirmButton: false,
				});
				window.location.href = "/allorder";
				// show success message or redirect to another page
			})
			.catch((error) => {
				console.log(error);
				// show error message
			});
	};

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
							Update Order Details
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
								Product Type
							</label>
							<input
								type="text"
								className="form-control"
								defaultValue={data.Product_Type}
								onChange={(e) => setProduct_Type(e.target.value)}
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
								Print Type
							</label>
							<input
								type="text"
								className="form-control"
								defaultValue={data.Print_Type}
								onChange={(e) => setPrint_Type(e.target.value)}
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
								Template
							</label>
							<input
								type="text"
								className="form-control"
								defaultValue={data.Template}
								onChange={(e) => setTemplate(e.target.value)}
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
								Quantity
							</label>
							<input
								type="number"
								className="form-control"
								defaultValue={data.Quantity}
								onChange={(e) => setQuantity(e.target.value)}
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
								Color
							</label>
							<input
								type="text"
								className="form-control"
								defaultValue={data.Color}
								onChange={(e) => setColor(e.target.value)}
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
								Total Quantity
							</label>
							<input
								type="number"
								className="form-control"
								defaultValue={data.Total_Quantity}
								onChange={(e) => setTotal_Quantity(e.target.value)}
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
								Total Price
							</label>
							<input
								type="number"
								className="form-control"
								defaultValue={data.Total_Price}
								onChange={(e) => setTotal_Price(e.target.value)}
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
