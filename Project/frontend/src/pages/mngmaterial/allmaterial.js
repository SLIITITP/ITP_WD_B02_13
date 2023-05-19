import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import editIcon from "../stockimg/edit.svg";
import deleteIcon from "../stockimg/delete.svg";
import viewIcon from "../stockimg/eye.svg";

//report gen
import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";

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

	//report
	const generateReport = () => {
		const doc = new jsPDF();

		// Add the report title to the PDF
		doc.setFontSize(18);
		doc.text("Material Detail Report", 14, 22);

		// Add the current date to the PDF
		const date = moment().format("MMMM Do YYYY, h:mm:ss a");
		doc.setFontSize(12);
		doc.text(`Report generated on ${date}`, 14, 32);

		// Create the table structure with headings for each column
		const columns = [
			"Material Name",
			"Category",
			"Price",
			"Quantity",
			//   "Age",
			//   "Gender",
			//   "Contact Number",
			//   "Email",
		];
		const rows = material.map(
			({
				Material_Name,
				Category,
				Price,
				Quantity,
				// applicant_age,
				// applicant_gender,
				// applicant_contact,
				// applicant_email,
			}) => [
				Material_Name,
				Category,
				Price,
				Quantity,
				// applicant_age,
				// applicant_gender,
				// applicant_contact,
				// applicant_email,
			]
		);
		doc.autoTable({
			head: [columns],
			body: rows,
			startY: 40,
			styles: {
				fontSize: 12, // Set font size for table content
				cellPadding: 3, // Set cell padding for table cells
			},
		});

		doc.save("Material.pdf");
	};

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
			{/* search bar */}
			<input
				aria-label="Search"
				style={{
					padding: "8px 12px",
					border: "none",
					borderRadius: "4px",
					fontSize: "16px",
					marginBottom: "20px",
					width: "600px",
					marginLeft: "400px",
				}}
				placeholder="Search By Material Name"
				type="search"
				onChange={(e) => setQuery(e.target.value)}
			/>
			{/* report generation button */}
			<button
				style={{
					marginLeft: "10px",
					backgroundColor: "#1a1a1a",
					color: "white",
					borderRadius: "8px",
					width: "200px",
					height: "40px",
					padding: "5px",
				}}
				className="btn-icon btn-3"
				color="success"
				type="button"
				onClick={generateReport}
			>
				Generate Report
			</button>
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
							<th>View</th>
							<th>Edit</th>
							<th>Delete</th>
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
