import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Ucategory() {
	const { id } = useParams();

	const [data, setData] = useState([]);
	const [Category_Name, setCategory_Name] = useState("");
	const [Category_Code, setCategory_Code] = useState("");
	const [Description, setDescription] = useState("");

	useEffect(() => {
		const getCategory = async () => {
			const res = await axios.get(`http://localhost:8070/stock/getcategory/${id}`);
			console.log(res.data);
			setData(res.data);

			setCategory_Name(res.data.Category_Name);
			setCategory_Code(res.data.Category_Code);
			setDescription(res.data.Description);
		};
		getCategory();
	}, [id]);

	const handleSubmit = (e) => {
		e.preventDefault();

		const UCategory = {
			Category_Name,
			Category_Code,
			Description,
		};

		axios
			.put(`http://localhost:8070/stock/updatecategory/${id}`, UCategory)
			.then((response) => {
				console.log(response.data);
				alert("Successfully updated");
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
								Category Name
							</label>
							<input
								type="text"
								className="form-control"
								defaultValue={data.Category_Name}
								onChange={(e) => setCategory_Name(e.target.value)}
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
								Category Code
							</label>
							<input
								type="text"
								className="form-control"
								defaultValue={data.Category_Code}
								onChange={(e) => setCategory_Code(e.target.value)}
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