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
				//get all purchase details
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
		//delete purchase details
		axios.delete(`http://localhost:8070/stock/deletepurchase/${id}`).then((res) => {
			console.log(res.data);
			setpurchase((prevData) => prevData.filter((item) => item._id !== id));
		});
		//sweet alert
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
				placeholder="Search By Supplier Name"
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
							<th>Supplier Name</th>
							<th>Purchase Date</th>
							<th>Material Name</th>
							<th>Quantity</th>
							<th>Refferance No</th>
							<th>Description</th>
							<th>View</th>
							<th>Edit</th>
							<th>Delete</th>
						</tr>
					</thead>

					<tbody>
						{purchase
							.filter((purchase) => purchase.Supplier_Name?.toLowerCase().includes(query.toLowerCase()))
							.map((item) => (
								<tr key={item._id}>
									<td>{item.Supplier_Name}</td>
									<td>{item.Purchase_Date}</td>
									<td>{item.Material_Name}</td>
									<td>{item.Quantity}</td>
									<td>{item.Refferance_No}</td>
									<td>{item.Description}</td>

									<td>
										<a href={"/onepurchase/" + item._id}>
											<img src={viewIcon} alt="View" />
										</a>
									</td>

									<td>
										<a href={"/updatepurchase/" + item._id}>
											{" "}
											<button>
												<i className="far fa-edit"></i>&nbsp;
											</button>
										</a>
									</td>
									<td>
										<span onClick={() => handledelete(item._id)}>
											<i class="fa fa-trash" aria-hidden="true"></i>
										</span>
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
