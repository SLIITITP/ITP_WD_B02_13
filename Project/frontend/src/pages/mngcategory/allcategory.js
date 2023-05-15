import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import editIcon from "../stockimg/edit.svg";
import deleteIcon from "../stockimg/delete.svg";
import viewIcon from "../stockimg/eye.svg";

export default function Allcategory() {
	const [query, setQuery] = useState("");
	const [category, setcategory] = useState([]); // using functional component

	useEffect(() => {
		function getCategory() {
			axios
				.get("http://localhost:8070/stock/getcategory")
				.then((res) => {
					console.log(res.data);
					setcategory(res.data);
				})
				.catch((err) => {
					alert(err.message);
				});
		}
		getCategory();
	}, []);

	const handledelete = (id) => {
		axios.delete(`http://localhost:8070/stock/deletecategory/${id}`).then((res) => {
			console.log(res.data);
			setcategory((prevData) => prevData.filter((item) => item._id !== id));
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
		Swal.fire("Deleted!", "Your category has been deleted.", "success");
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

			<div
				className="container"
				style={{
					width: "1000px",
					margin: "auto",
					backgroundColor: "#99ccff",
					padding: "40px 40px 40px 20px",
					borderRadius: "5px",
				}}
			>
				<div style={{ maxWidth: "800px", margin: "0 auto" }}>
					<p style={{ fontSize: "24px", marginBottom: "20px" }}>All Categories</p>

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
						placeholder="Search By Category Name"
						type="search"
						onChange={(e) => setQuery(e.target.value)}
					/>

					<table style={{ width: "100%", borderCollapse: "collapse" }}>
						<thead>
							<tr>
								<th style={{ textAlign: "left", padding: "12px 16px" }}>Category Name</th>
								<th style={{ textAlign: "left", padding: "12px 16px" }}>Category Code</th>
								<th style={{ textAlign: "left", padding: "12px 16px" }}>Description</th>
								<th style={{ padding: "12px 16px" }}></th>
								<th style={{ padding: "12px 16px" }}></th>
							</tr>
						</thead>
						<tbody>
							{category
								.filter((category) => category.Category_Name?.toLowerCase().includes(query.toLowerCase()))
								.map((item) => (
									<tr key={item._id} style={{ borderBottom: "1px solid #ddd" }}>
										<td style={{ padding: "12px 16px" }}>{item.Category_Name}</td>
										<td style={{ padding: "12px 16px" }}>{item.Category_Code}</td>
										<td style={{ padding: "12px 16px" }}>{item.Description}</td>
										<td style={{ padding: "12px 16px" }}>
											<a href={"/allcategory/" + item._id}>
												<img src={viewIcon} alt="View" style={{ cursor: "pointer" }} />
											</a>
										</td>
										<td style={{ padding: "12px 16px" }}>
											<a href={"/updatecategory/" + item._id}>
												<img src={editIcon} alt="Edit" style={{ cursor: "pointer" }} />
											</a>
										</td>
										<td style={{ padding: "12px 16px" }}>
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
