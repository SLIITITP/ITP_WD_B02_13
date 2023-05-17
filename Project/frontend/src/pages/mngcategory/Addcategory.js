import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function Addcategory() {
	const [Category_Name, setCategory_Name] = useState("");
	const [Category_Code, setCategory_Code] = useState("");
	const [Description, setDescription] = useState("");

	function sendData(e) {
		e.preventDefault();

		const newCategory = {
			Category_Name,
			Category_Code,
			Description,
		};

		axios
			.post("http://localhost:8070/stock/addcategory", newCategory)
			.then(() => {
				Swal.fire({
					icon: "success",
					title: "Category Added",
					timer: 1500,
					showConfirmButton: false,
				});
				window.location.href = "/allcategory";
				setCategory_Name(" ");
				setCategory_Code(" ");
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
							<h1 style={{ fontSize: "30px" }}>Add Category</h1>
						</div>
						<form onSubmit={sendData}>
							<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridGap: "1rem" }}>
								<div>
									<div style={{ marginBottom: "0.5rem" }}>Category Name</div>
									<input
										type="text"
										placeholder="Enter category name"
										style={{ width: "100%", padding: "0.5rem" }}
										onChange={(event) => {
											setCategory_Name(event.target.value);
										}}
										required
									/>
								</div>

								<div>
									<div style={{ marginBottom: "0.5rem" }}>Category Code</div>
									<input
										type="text"
										placeholder="Enter category code"
										style={{ width: "100%", padding: "0.5rem" }}
										onChange={(event) => {
											setCategory_Code(event.target.value);
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
