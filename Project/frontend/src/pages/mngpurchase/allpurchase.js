import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import editIcon from "../stockimg/edit.svg";
import deleteIcon from "../stockimg/delete.svg";
import viewIcon from "../stockimg/eye.svg";

export default function Allpurchase() {
	const [query, setQuery] = useState("");
	const [purchase, setpurchase] = useState([]); // using functional component

	useEffect(() => {
		function getPurchase() {
			axios
				.get("http://localhost:8070/stock/getpurchase")
				.then((res) => {
					console.log(res.data);
					setpurchase(res.data);
				})
				.catch((err) => {
					alert(err.message);
				});
		}
		getPurchase();
	}, []);

	const handledelete = (id) => {
		axios.delete(`http://localhost:8070/stock/deletepurchase/${id}`).then((res) => {
			console.log(res.data);
			setpurchase((prevData) => prevData.filter((item) => item._id !== id));
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
				Swal.fire("Deleted!", "Your purchase has been deleted.", "success");
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
				<div style={{ maxWidth: "800px"}}>
					<p style={{ fontSize: "24px", marginBottom: "20px" }}>All Purchases</p>

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
						placeholder="Search By Supplier Name"
						type="search"
						onChange={(e) => setQuery(e.target.value)}
					/>

					<table style={{ width: "1200px", borderCollapse: "collapse"}}>
						<thead>
							<tr style={{ borderBottom: "1px solid #ddd" }}>
								<th style={{ textAlign: "left", padding: "12px 16px" }}>Supplier Name</th>
								<th style={{ textAlign: "left", padding: "12px 16px" }}>Purchase Date</th>
								<th style={{ textAlign: "left", padding: "12px 16px" }}>Material Name</th>
								<th style={{ textAlign: "left", padding: "12px 16px" }}>Quantity</th>
								<th style={{ textAlign: "left", padding: "12px 16px" }}>Refferance No</th>
								<th style={{ textAlign: "left", padding: "12px 16px" }}>Unit Price</th>
								<th style={{ textAlign: "left", padding: "12px 16px" }}>Total Price</th>
								<th style={{ textAlign: "left", padding: "12px 16px" }}>Description</th>
								<th style={{ padding: "12px 16px" }}></th>
								<th style={{ padding: "12px 16px" }}></th>
								<th style={{ padding: "12px 16px" }}></th>
							</tr>
						</thead>
						<tbody>
							{purchase
								.filter((purchase) => purchase.Supplier_Name?.toLowerCase().includes(query.toLowerCase()))
								.map((item) => (
									<tr key={item._id} style={{ borderBottom: "1px solid #ddd" }}>
										<td style={{ padding: "12px 16px" }}>{item.Supplier_Name}</td>
										<td style={{ padding: "12px 16px" }}>{item.Purchase_Date}</td>
										<td style={{ padding: "12px 16px" }}>{item.Material_Name}</td>
										<td style={{ padding: "12px 16px" }}>{item.Quantity}</td>
										<td style={{ padding: "12px 16px" }}>{item.Refferance_No}</td>
										<td style={{ padding: "12px 16px" }}>{item.Unit_Price}</td>
										<td style={{ padding: "12px 16px" }}>{item.Total_Price}</td>
										<td style={{ padding: "12px 16px" }}>{item.Description}</td>
										<td style={{ padding: "12px 16px" }}>
											<a href={"/onepurchase/" + item._id}>
												<img src={viewIcon} alt="View" style={{ cursor: "pointer", width: "30px" }} />
											</a>
										</td>
										<td style={{ padding: "12px 16px" }}>
											<a href={"/updatepurchase/" + item._id}>
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
