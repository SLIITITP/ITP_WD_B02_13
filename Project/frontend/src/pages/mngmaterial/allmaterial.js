import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import editIcon from "../stockimg/edit.svg";
import deleteIcon from "../stockimg/delete.svg";
import viewIcon from "../stockimg/eye.svg";

export default function Allmaterial() {
	const [query, setQuery] = useState("");
	const [material, setmaterial] = useState([]);

	// Retrieve data
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

	// Delete function
	const handledelete = (id) => {
		axios.delete(`http://localhost:8070/stock/deletematerial/${id}`).then((res) => {
			console.log(res.data);
			setmaterial((prevData) => prevData.filter((item) => item._id !== id));
		});

		// Alert
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

			{/* <div
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
								<th>Material Name</th>
								<th>Category</th>
								<th>Price</th>
								<th>Quantity</th>
								<th>Description</th>
								<th ></th>
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
				</div> */}

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
							<th></th>
							<th></th>
							<th></th>
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

									<td>
										<a href={"/onematerial/" + item._id}>
											<img src={viewIcon} alt="View" />
										</a>
									</td>

									<td>
										<a href={"/Umaterial/" + item._id}>
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
			<div style={{ marginTop: "60px", marginLeft: "600px", display: "flex", gap: "40px" }}>
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
