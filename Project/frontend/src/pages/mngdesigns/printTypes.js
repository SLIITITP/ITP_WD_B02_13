import React, { useEffect, useState } from "react";
import { usePrintTypesContext } from "../../hooks/usePrintTypesContext";
import axios from "axios";

import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";

//components
import "../mngdesigns/designAdmin.css";
import PrintTypeForm from "./PrintTypeForm";

export default function Ptype() {
	const [query, setQuery] = useState("");

	const [allPrintTypes, setAllPrintTypes] = useState([]);

	useEffect(() => {
		const fetchPrintTypes = async () => {
			try {
				const response = await axios.get("http://localhost:8070/printType");
				setAllPrintTypes(response.data);
			} catch (err) {
				console.log(err);
			}
		};
		fetchPrintTypes();
	}, []);

	const generateReport = () => {
		const doc = new jsPDF();

		// Add the report title to the PDF
		doc.setFontSize(18);
		doc.text("Design Print Types Report", 14, 22);

		// Add the current date to the PDF
		const date = moment().format("MMMM Do YYYY, h:mm:ss a");
		doc.setFontSize(12);
		doc.text(`Report generated on ${date}`, 14, 32);

		// Create the table structure with headings for each column
		const columns = [
			"PrintType Name",
			"PrintType Cost",
			"Created Date & Time",
			//   "Age",
			//   "Gender",
			//   "Contact Number",
			//   "Email",
		];
		const rows = allPrintTypes.map(
			({
				name,
				cost,
				createdAt,
				// applicant_age,
				// applicant_gender,
				// applicant_contact,
				// applicant_email,
			}) => [
				name,
				cost,
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
				fontSize: 12, // Set font size for table content
				cellPadding: 3, // Set cell padding for table cells
			},
		});

		doc.save("Print Types.pdf");
	};

	const handleDelete = (id) => {
		axios.delete(`http://localhost:8070/printType/delete/${id}`).then((res) => {
			console.log(res.data);
			setAllPrintTypes((prevData) => prevData.filter((printType) => printType._id !== id));
		});
	};

	return (
		<div className="Home">
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<div className="printtypes">
				<h1 className="header" style={{ color: "black" }}>
					Print Types
				</h1>
				<br />
				<PrintTypeForm />
				<br />
				<br />
				<hr />
				<br />
				<input
					aria-label="Search"
					className="form-control-rounded form-control-prepended"
					placeholder="Search By PrintType Name"
					type="search"
					onChange={(e) => setQuery(e.target.value)}
					style={{ borderRadius: "8px", width: "600px", marginLeft: "400px", height: "40px", padding: "5px" }}
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
								<th>Print Type ID</th>
								<th>Print Type Name</th>
								<th>Cost(in LKR)</th>
								<th>Created Date</th>
								<th>Update</th>
								<th>Delete</th>
							</tr>
						</thead>

						<tbody>
							{allPrintTypes
								.filter(
									(printType) =>
										printType.name?.toLowerCase().includes(query.toLowerCase()) ||
										printType._id?.toLowerCase().includes(query.toLowerCase())
									// ||
									// vacancy.vacancy_type
									//   ?.toLowerCase()
									//   .includes(query.toLowerCase())
								)
								.map((printType, index) => (
									<tr key={index}>
										<td>{printType._id}</td>
										<td>{printType.name}</td>
										<td>{printType.cost}</td>
										<td>
											{new Date(printType.createdAt).toLocaleString("en-US", {
												dateStyle: "short",
												timeStyle: "short",
											})}
										</td>
										<td>
											<a href={"/updatePrintType/" + printType._id}>
												{" "}
												<button>
													<i className="far fa-edit"></i>&nbsp;
												</button>
											</a>
										</td>
										<td>
											<span onClick={() => handleDelete(printType._id)}>
												<i class="fa fa-trash" aria-hidden="true"></i>
											</span>
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
