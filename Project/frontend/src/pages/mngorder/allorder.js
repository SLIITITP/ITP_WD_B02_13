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
				.get("http://localhost:8070/stock/getorder")
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

	const handledelete = (id) => {
		axios.delete(`http://localhost:8070/stock/deleteorder/${id}`).then((res) => {
			console.log(res.data);
			setorder((prevData) => prevData.filter((item) => item._id !== id));
		});

		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then((result) => {
			if (result.isConfirmed) {
				// If the user confirms, delete the category
				// Show a success message using SweetAlert
				Swal.fire("Deleted!", "Order details has been deleted.", "success");
			}
		});
	};

	return (
		<div>
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />

			<div
				className="container"
				style={{
					width: "1200px",
					margin: "auto",
					backgroundColor: "#99ccff",
					padding: "40px 40px 40px 20px",
					borderRadius: "5px",
				}}
			>
				<div style={{ maxWidth: "800px" }}>
					<p style={{ fontSize: "24px", marginBottom: "20px" }}>All Orders</p>

					<a href={""}>
						<img src={printIcon} alt="print" style={{ cursor: "pointer", width: "30px", marginLeft: "1000px", marginBottom:"30px" }} />
					</a>

					<input
						aria-label="Search"
						style={{
							padding: "8px 12px",
							border: "none",
							borderRadius: "4px",
							fontSize: "16px",
							marginBottom: "20px",
							width: "100%",
						}}
						placeholder="Search By Product Type"
						type="search"
						onChange={(e) => setQuery(e.target.value)}
					/>

					<table style={{ width: "1200px", borderCollapse: "collapse" }}>
						<thead>
							<tr style={{ borderBottom: "1px solid #ddd" }}>
								<th style={{ textAlign: "left", padding: "12px 16px" }}>Product Type</th>
								<th style={{ textAlign: "left", padding: "12px 16px" }}>Print Type</th>
								<th style={{ textAlign: "left", padding: "12px 16px" }}>Template</th>
								<th style={{ textAlign: "left", padding: "12px 16px" }}>Color</th>
								<th style={{ textAlign: "left", padding: "12px 16px" }}>Quantity</th>
								<th style={{ textAlign: "left", padding: "12px 16px" }}>Total_Quantity</th>
								<th style={{ textAlign: "left", padding: "12px 16px" }}>Total Price</th>
								<th style={{ textAlign: "left", padding: "12px 16px" }}>Description</th>
								<th style={{ padding: "12px 16px" }}></th>
								<th style={{ padding: "12px 16px" }}></th>
								<th style={{ padding: "12px 16px" }}></th>
							</tr>
						</thead>
						<tbody>
							{order
								.filter((order) => order.Product_Type?.toLowerCase().includes(query.toLowerCase()))
								.map((item) => (
									<tr key={item._id} style={{ borderBottom: "1px solid #ddd" }}>
										<td style={{ padding: "12px 16px" }}>{item.Product_Type}</td>
										<td style={{ padding: "12px 16px" }}>{item.Print_Type}</td>
										<td style={{ padding: "12px 16px" }}>{item.Template}</td>
										<td style={{ padding: "12px 16px" }}>{item.Color}</td>
										<td style={{ padding: "12px 16px" }}>{item.Quantity}</td>
										<td style={{ padding: "12px 16px" }}>{item.Total_Quantity}</td>
										<td style={{ padding: "12px 16px" }}>{item.Total_Price}</td>
										<td style={{ padding: "12px 16px" }}>{item.Description}</td>
										<td style={{ padding: "12px 16px" }}>
											<a href={"/oneorder/" + item._id}>
												<img src={viewIcon} alt="View" style={{ cursor: "pointer", width: "30px" }} />
											</a>
										</td>
										<td style={{ padding: "12px 16px" }}>
											<a href={"/updateorder/" + item._id}>
												<img src={editIcon} alt="Edit" style={{ cursor: "pointer", width: "20px" }} />
											</a>
										</td>
										<td style={{ padding: "12px 16px", width: "100px" }}>
											<img
												src={deleteIcon}
												alt="Delete"
												style={{ cursor: "pointer" }}
												onClick={() => handledelete(item._id)}
											/>
										</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
