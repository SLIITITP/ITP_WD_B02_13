import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import editIcon from "../stockimg/edit.svg";
import deleteIcon from "../stockimg/delete.svg";
import viewIcon from "../stockimg/eye.svg";
import printIcon from "../stockimg/printer.svg";


export default function Allorder() {
	const [query, setQuery] = useState("");
	const [order, setorder] = useState([]); // using functional component

	useEffect(() => {
		function getOrder() {
			axios
				.get("http://localhost:8070/production/getstockreq")
				.then((res) => {
					console.log(res.data);
					setorder(res.data);
				})
				.catch((err) => {
					alert(err.message);
				});
		}
		getOrder();
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
							<th>Material Color</th>
							<th>Material Quantity</th>
							<th>Button Color</th>
							<th>Button Quantity</th>
							<th>Description</th>
							<th>View</th>

						</tr>
					</thead>

					<tbody>
						{order
							.filter((order) => order.materialname?.toLowerCase().includes(query.toLowerCase()))
							.map((item) => (
								<tr key={item._id}>
									<td>{item.materialname}</td>
									<td>{item.materialcolor}</td>
									<td>{item.materialquantity}</td>
									<td>{item.buttoncolor}</td>
									<td>{item.buttonquantity}</td>
									<td>{item.description}</td>

									<td>
										<a href={"/oneorder/" + item._id}>
											<img src={viewIcon} alt="View" />
										</a>
									</td>


								</tr>
							))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
