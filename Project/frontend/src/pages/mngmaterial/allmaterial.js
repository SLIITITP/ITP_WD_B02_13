import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import editIcon from "../stockimg/edit.svg";
import deleteIcon from "../stockimg/delete.svg";
import viewIcon from "../stockimg/eye.svg";

export default function Allmaterial() {
	const [query, setQuery] = useState("");
	const [material, setmaterial] = useState([]); // using functional component

	//retrive data 
	useEffect(() => {
		function getMaterial() {
			axios
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

	//delete function
	const handledelete = (id) => {
		axios.delete(`http://localhost:8070/stock/deletematerial/${id}`).then((res) => {
			console.log(res.data);
			setmaterial((prevData) => prevData.filter((item) => item._id !== id));
		});

		//alert 
		Swal.fire({
			title: "Are you sure?",
			text: "Once deleted, you will not be able to recover this material!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
			cancelButtonText: "Cancel",
		}).then((result) => {
			if (result.isConfirmed) {
				axios
					.delete(`http://localhost:8070/stock/deletematerial/${id}`)
					.then((res) => {
						console.log(res.data);
						setmaterial((prevData) => prevData.filter((item) => item._id !== id));
						Swal.fire("Deleted!", "The material has been deleted.", "success");
					})
					.catch((err) => {
						alert(err.message);
					});
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
					width: "1000px",
					margin: "auto",
					backgroundColor: "#99ccff",
					padding: "40px 40px 40px 20px",
					borderRadius: "5px",
				}}
			>
				<div style={{ maxWidth: "800px", margin: "0 auto" }}>
					<p style={{ fontSize: "24px", marginBottom: "20px" }}>All Materials</p>

					<input
						//serch bar
						aria-label="Search"
						style={{
							padding: "8px 12px",
							border: "none",
							borderRadius: "4px",
							fontSize: "16px",
							marginBottom: "20px",
							width: "100%",
						}}
						placeholder="Search By Material Name"
						type="search"
						onChange={(e) => setQuery(e.target.value)}
					/>

					<table style={{ width: "100%", borderCollapse: "collapse" }}>
						<thead>
							<tr style={{ borderBottom: "1px solid #ddd" }}>
								<th style={{ textAlign: "left", padding: "12px 16px" }}>Material Name</th>
								<th style={{ textAlign: "left", padding: "12px 16px" }}>Category</th>
								<th style={{ textAlign: "left", padding: "12px 16px" }}>Price</th>
								<th style={{ textAlign: "left", padding: "12px 16px" }}>Quantity</th>
								<th style={{ textAlign: "left", padding: "12px 16px" }}>Description</th>
								<th style={{ padding: "12px 16px" }}></th>
								<th style={{ padding: "12px 16px" }}></th>
							</tr>
						</thead>
						<tbody>
							{material
								.filter((material) => material.Material_Name?.toLowerCase().includes(query.toLowerCase()))
								.map((item) => (
									<tr key={item._id} style={{ borderBottom: "1px solid #ddd" }}>
										<td style={{ padding: "12px 16px" }}>{item.Material_Name}</td>
										<td style={{ padding: "12px 16px;" }}>{item.Category}</td>
										<td style={{ padding: "12px 16px" }}>{item.Price}</td>
										<td style={{ padding: "12px 16px" }}>{item.Quantity}</td>
										<td style={{ padding: "12px 16px" }}>{item.Description}</td>
										<td style={{ padding: "12px 16px" }}>
											<a href={"/onematerial/" + item._id}>
												<img src={viewIcon} alt="View" style={{ cursor: "pointer" }} />
											</a>
										</td>
										<td style={{ padding: "12px 16px" }}>
											<a href={"/Umaterial/" + item._id}>
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
