import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import editIcon from "../stockimg/edit.svg";
import deleteIcon from "../stockimg/delete.svg";
import viewIcon from "../stockimg/eye.svg";

export default function Allproduction() {
	const [query, setQuery] = useState("");
	const [production, setproduction] = useState([]); // using functional component

	//retrive data 
	useEffect(() => {
		function getProduction() {
			axios
				.get("http://localhost:8070/production/get")
				.then((res) => {
					console.log(res.data);
					setproduction(res.data);
				})
				.catch((err) => {
					alert(err.message);
				});
		}
		getProduction();
	}, []);

	//delete function
	const handledelete = (id) => {
		axios.delete(`http://localhost:8070/production/delete/${id}`).then((res) => {
			console.log(res.data);
			setproduction((prevData) => prevData.filter((item) => item._id !== id));
		});

		//alert 
		Swal.fire({
			title: "Are you sure?",
			text: "Once deleted, you will not be able to recover this production details!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
			cancelButtonText: "Cancel",
		}).then((result) => {
			if (result.isConfirmed) {
				axios
					.delete(`http://localhost:8070/production/delete/${id}`)
					.then((res) => {
						console.log(res.data);
						setproduction((prevData) => prevData.filter((item) => item._id !== id));
						Swal.fire("Deleted!", "The production dtails has been deleted.", "success");
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
					width: "1200px",
					margin: "auto",
					backgroundColor: "#99ccff",
					padding: "40px 40px 40px 20px",
					borderRadius: "5px",
				}}
			>
				<div style={{ maxWidth: "800px", margin: "0 auto" }}>
					<p style={{ fontSize: "24px", marginBottom: "20px" }}>All Production Details</p>

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
						placeholder="Search By Production Name"
						type="search"
						onChange={(e) => setQuery(e.target.value)}
					/>

					<table style={{ width: "900px", borderCollapse: "collapse", marginRight:"250px" }}>
						<thead>
							<tr style={{ borderBottom: "1px solid #ddd" }}>
								<th style={{ textAlign: "left", padding: "15px 20px" }}>Production Name</th>
								<th style={{ textAlign: "left", padding: "15px 20px" }}>Date</th>
								<th style={{ textAlign: "left", padding: "15px 20px" }}>Material</th>
								<th style={{ textAlign: "left", padding: "15px 20px" }}>Machine</th>
                                <th style={{ textAlign: "left", padding: "15px 20px" }}>Employee</th>
								<th style={{ textAlign: "left", padding: "15px 20px" }}>Description</th>
								<th style={{ padding: "15px 20px" }}></th>
								<th style={{ padding: "15px 20px" }}></th>
							</tr>
						</thead>
						<tbody>
							{production
								.filter((production) => production.name?.toLowerCase().includes(query.toLowerCase()))
								.map((item) => (
									<tr key={item._id} style={{ borderBottom: "1px solid #ddd" }}>
										<td style={{ padding: "15px 20px" }}>{item.name}</td>
										<td style={{ padding: "15px 20px;" }}>{item.date}</td>
										<td style={{ padding: "15px 20px" }}>{item.material}</td>
										<td style={{ padding: "15px 20px" }}>{item.machine}</td>
                                        <td style={{ padding: "15px 20px" }}>{item.employee}</td>
										<td style={{ padding: "15px 20px" }}>{item.description}</td>

										<td style={{ padding: "15px 20px" }}>
											<a href={"/updateproduct/" + item._id}>
												<img src={editIcon} alt="Edit" style={{ cursor: "pointer" }} />
											</a>
										</td>
										<td style={{ padding: "15px 20px" }}>
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