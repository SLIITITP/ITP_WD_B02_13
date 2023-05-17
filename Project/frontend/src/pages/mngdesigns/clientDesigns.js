import React, { useEffect, useState } from "react";
import axios from "axios";

import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";

//components
import "../mngdesigns/designAdmin.css";

export default function ClientDesign() {
	//search
	const [query, setQuery] = useState("");
	const [allClientDesigns, setAllClientDesigns] = useState([]);
	const [error, setError] = useState(null);

	// retrieve all cv submissions from database
	useEffect(() => {
		const fetchAllDesigns = async () => {
			try {
				const res = await axios.get("http://localhost:8070/clientDesign/");
				setAllClientDesigns(res.data);
			} catch (err) {
				setError(err);
			}
		};
		fetchAllDesigns();
	}, []);
	//report
	const generateReport = () => {
		const doc = new jsPDF();

		// Add the report title to the PDF
		doc.setFontSize(18);
		doc.text("Client Designs Report", 14, 22);

		// Add the current date to the PDF
		const date = moment().format("MMMM Do YYYY, h:mm:ss a");
		doc.setFontSize(12);
		doc.text(`Report generated on ${date}`, 14, 32);

		// Create the table structure with headings for each column
		const columns = [
			"User ID",
			"Template Name",
			"Print Type",
			"Material",
			"Total Cost",
			"Created Date&Time",
			//   "Age",
			//   "Gender",
			//   "Contact Number",
			//   "Email",
		];
		const rows = allClientDesigns.map(
			({
				userID,
				templateName,
				printType,
				material,
				totalCost,
				createdAt,
				// applicant_age,
				// applicant_gender,
				// applicant_contact,
				// applicant_email,
			}) => [
				userID,
				templateName,
				printType,
				material,
				totalCost,
				new Date(createdAt).toLocaleString("en-US", {
					dateStyle: "short",
					timeStyle: "short",
				}),
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
				fontSize: 10, // Set font size for table content
				cellPadding: 3, // Set cell padding for table cells
			},
		});

		doc.save("Client Designs.pdf");
	};

	const handleDelete = (id) => {
		axios.delete(`http://localhost:8070/clientDesign/delete/${id}`).then((res) => {
			console.log(res.data);
			setAllClientDesigns((prevData) => prevData.filter((clientDesign) => clientDesign._id !== id));
		});
	};

	return (
		<div className="container">
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />

			<h1 className="header" style={{ color: "black" }}>
				Client Designs
			</h1>
			<br />
			<hr />
			<br />

			{/* search bar */}
			<input
				aria-label="Search"
				className="form-control-rounded form-control-prepended"
				placeholder="Search By Template Name"
				type="search"
				onChange={(e) => setQuery(e.target.value)}
				style={{ borderRadius: "8px", width: "600px", marginLeft: "350px", height: "40px", padding: "5px" }}
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

			<br />
			<br />

			<table style={{ fontFamily: "Arial, sans-serif", fontSize: "14px", color: "#333", borderCollapse: "collapse" }}>
				<thead>
					<tr>
						<th>User ID</th>
						<th>Design ID</th>
						<th>Design View</th>
						<th>Template Name</th>
						<th>Print Type</th>
						<th>Material</th>
						<th>Total Cost (LKR)</th>
						<th>Date</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					{allClientDesigns
						.filter(
							(clientDesign) =>
								clientDesign.userID?.toLowerCase().includes(query.toLowerCase()) ||
								clientDesign._id?.toLowerCase().includes(query.toLowerCase()) ||
                                clientDesign.templateName?.toLowerCase().includes(query.toLowerCase())
							// ||
							// vacancy.vacancy_type
							//   ?.toLowerCase()
							//   .includes(query.toLowerCase())
						)
						.map((clientDesign, index) => (
							<tr key={index}>
								<td>{clientDesign.userID}</td>
								<td>{clientDesign._id}</td>
								<td>
									<a href={clientDesign.designURL} style={{ textDecoration: "none" }}>
										<button
											size="sm"
											style={{ backgroundColor: "blue", color: "white", borderRadius: "5px", width: "50px" }}
										>
											View
										</button>
									</a>
								</td>
								<td>{clientDesign.templateName}</td>
								<td>{clientDesign.printType}</td>
								<td>{clientDesign.material}</td>
								<td>{clientDesign.totalCost}</td>
								<td>
									{new Date(clientDesign.createdAt).toLocaleString("en-US", { dateStyle: "short", timeStyle: "short" })}
								</td>
								<td>
									<span onClick={() => handleDelete(clientDesign._id)}>
										<i class="fa fa-trash" aria-hidden="true"></i>
									</span>
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
}
