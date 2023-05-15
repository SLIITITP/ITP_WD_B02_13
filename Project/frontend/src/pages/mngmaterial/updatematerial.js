import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function Umaterial() {
	//   const [category, setcategory] = useState({});
	const { id } = useParams();

	const [data, setData] = useState([]);
	const [Material_Name, setMaterial_Name] = useState("");
	const [Category, setCategory] = useState("");
	const [Price, setPrice] = useState("");
	const [Quantity, setQuantity] = useState("");
	const [Description, setDescription] = useState("");


	useEffect(() => {
		const getMaterial = async () => {
			const res = await axios.get(`http://localhost:8070/stock/getmaterial/${id}`);
			console.log(res.data);
			setData(res.data);

			setMaterial_Name(res.data.Material_Name);
			setCategory(res.data.Category);
			setPrice(res.data.Price);
			setQuantity(res.data.Quantity);
			setDescription(res.data.Description);
		};
		getMaterial();
	}, [id]);

	const handleSubmit = (e) => {
		e.preventDefault();

		const UMaterial = {
			Material_Name,
			Category,
			Price,
			Quantity,
			Description,
		};

		axios
			.put(`http://localhost:8070/stock/updatematerial/${id}`, UMaterial)
			.then((response) => {
				console.log(response.data);
				Swal.fire({
					icon: "success",
					title: "Material Updated",
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
							Update Category
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
								Material Name
							</label>
							<input
								type="text"
								className="form-control"
								defaultValue={data.Material_Name}
								onChange={(e) => setMaterial_Name(e.target.value)}
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
								Category
							</label>
							<input
								type="text"
								className="form-control"
								defaultValue={data.Category}
								onChange={(e) => setCategory(e.target.value)}
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
								type="text"
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
								Price
							</label>
							<input
								type="text"
								className="form-control"
								defaultValue={data.Price}
								onChange={(e) => setPrice(e.target.value)}
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
