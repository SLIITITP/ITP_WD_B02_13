import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import editIcon from "../stockimg/edit.svg";
import deleteIcon from "../stockimg/delete.svg";
import viewIcon from "../stockimg/eye.svg";

export default function Allsupplier() {
	const [query, setQuery] = useState("");
	const [supplier, setsupplier] = useState([]); // using functional component

	useEffect(() => {
		function getSupplier() {
			axios
			//get all supplier details
				.get("http://localhost:8070/stock/getsupplier")
				.then((res) => {
					console.log(res.data);
					setsupplier(res.data);
				})
				.catch((err) => {
					alert(err.message);
				});
		}
		getSupplier();
	}, []);

	const handledelete = (id) => {
		//delete supplier details
		axios.delete(`http://localhost:8070/stock/deletesupplier/${id}`).then((res) => {
			console.log(res.data);
			setsupplier((prevData) => prevData.filter((item) => item._id !== id));
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
				Swal.fire("Deleted!", "Your supplier has been deleted.", "success");
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
							<th>Mobile No</th>
							<th>Email</th>
							<th>Address</th>
							<th>Description</th>
							<th>View</th>
							<th>Edit</th>
							<th>Delete</th>
						</tr>
					</thead>

					<tbody>
						{supplier
							.filter((supplier) => supplier.Supplier_Name?.toLowerCase().includes(query.toLowerCase()))
							.map((item) => (
								<tr key={item._id}>
									<td >{item.Supplier_Name}</td>
									<td >{item.Mobile_No}</td>
									<td >{item.Email}</td>
									<td >{item.Address}</td>
									<td >{item.Description}</td>

									<td>
										<a href={"/onesupplier/" + item._id}>
											<img src={viewIcon} alt="View" />
										</a>
									</td>

									<td>
										<a href={"/updatesupplier/" + item._id}>
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
