import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import editIcon from "../stockimg/edit.svg";
import deleteIcon from "../stockimg/delete.svg";
import viewIcon from "../stockimg/eye.svg";
import style from "../styles/style.css";

export default function Allcategory() {
	const [query, setQuery] = useState("");
	const [category, setcategory] = useState([]); // using functional component

	useEffect(() => {
		function getCategory() {
			axios
			    // get all categories
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

	//category delete function
	const handledelete = (id) => {
		//delete category
		axios.delete(`http://localhost:8070/stock/deletecategory/${id}`).then((res) => {
			console.log(res.data);
			setcategory((prevData) => prevData.filter((item) => item._id !== id));
		});
		//delete alert
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
				placeholder="Search By Category Name"
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
							<th>Category Name</th>
							<th>Category Code</th>
							<th>Description</th>
							<th>View</th>
							<th>Edit</th>
							<th>Delete</th>
						</tr>
					</thead>

					<tbody>
						{category
							.filter((category) => category.Category_Name?.toLowerCase().includes(query.toLowerCase()))
							.map((item) => (
								<tr key={item._id}>
									<td>{item.Category_Name}</td>
									<td>{item.Category_Code}</td>
									<td>{item.Description}</td>

									<td>
										<a href={"/onecategory/" + item._id}>
											<img src={viewIcon} alt="View" />
										</a>
									</td>

									<td>
										<a href={"/updatecategory/" + item._id}>
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
