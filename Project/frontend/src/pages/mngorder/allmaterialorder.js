import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import editIcon from "../stockimg/edit.svg";
import deleteIcon from "../stockimg/delete.svg";
import viewIcon from "../stockimg/eye.svg";

export default function OrderMaterial() {
	const [query, setQuery] = useState("");
	const [material, setmaterial] = useState([]);

	// Retrieve data
	useEffect(() => {
		function getMaterial() {
			axios
			    //get all material details
				.get("http://localhost:8070/stock/getmaterial")
				.then((res) => {
					console.log(res.data);
					setmaterial(res.data);
				})
				.catch((err) => {
					alert(err.message);
				});
		}
		getMaterial();
	}, []);




	return (
		<div>
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />


			<input
				aria-label="Search"
				style={{
					padding: "8px 12px",
					border: "none",
					borderRadius: "4px",
					fontSize: "16px",
					marginBottom: "20px",
					width: "600px",
					marginLeft: "500px",
				}}
				placeholder="Search By Material Name"
				type="search"
				onChange={(e) => setQuery(e.target.value)}
			/>

			<div style={{ display: "flex", justifyContent: "center" }}>
				<table
					style={{
						width: "1000px",
						fontFamily: "Arial, sans-serif",
						fontSize: "14px",
						color: "#333",
						borderCollapse: "collapse",
					}}
				>
					<thead>
						<tr>
							<th>Material Name</th>
							<th>Category</th>
							<th>Price</th>
							<th>Quantity</th>
							<th>Description</th>

						</tr>
					</thead>

					<tbody>
						{material
							.filter((material) => material.Material_Name?.toLowerCase().includes(query.toLowerCase()))
							.map((item) => (
								<tr key={item._id}>
									<td>{item.Material_Name}</td>
									<td>{item.Category}</td>
									<td>{item.Price}</td>
									<td>{item.Quantity}</td>
									<td>{item.Description}</td>


								</tr>
							))}
					</tbody>
				</table>
			</div>
			<div style={{ marginTop: "60px", marginLeft: "550px", display: "flex", gap: "40px" }}>
				<a href="/addpurchase" style={linkStyle}>
					Make Purchase
				</a>
				<a href="/sendmail" style={linkStyle}>
					Release Stock
				</a>
			</div>
		</div>
	);
}

const linkStyle = {
	textDecoration: "none",
	color: "#fff",
	backgroundColor: "#007bff",
	padding: "10px 20px",
	borderRadius: "5px",
};
