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

export default function Allproduction() {
	const [query, setQuery] = useState("");
	const [production, setproduction] = useState([]); // using functional component

	//report gen
	const [allTemplates, setAllTemplates] = useState([]);

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

	//report
	const generateReport = () => {
		const doc = new jsPDF();

		// Add the report title to the PDF
		doc.setFontSize(18);
		doc.text("Production Details Report", 14, 22);

		// Add the current date to the PDF
		const date = moment().format("MMMM Do YYYY, h:mm:ss a");
		doc.setFontSize(12);
		doc.text(`Report generated on ${date}`, 14, 32);

		// Create the table structure with headings for each column
		const columns = [
			"Production Name",
			"Date",
			"Materail",
			"Machine",
			"Employee",
			"Description",
			//   "Age",
			//   "Gender",
			//   "Contact Number",
			//   "Email",
		];
		const rows = production.map(
			({
				name,
				date,
				material,
				machine,
				employee,
				description,
				// applicant_age,
				// applicant_gender,
				// applicant_contact,
				// applicant_email,
			}) => [
				name,
				date,
				material,
				machine,
				employee,
				description,
				
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

		doc.save("Production Details.pdf");
	};

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

			{/* <div
				className="container"
				style={{
					width: "1200px",
					margin: "auto",
					backgroundColor: "#17A2BB",
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

			{/* report generation button */}
				<button
					style={{
						marginLeft: "180px",
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
							<th>Production Name</th>
							<th>Date</th>
							<th>Material</th>
							<th>Machine</th>
							<th>Employee</th>
							<th>Description</th>
							<th></th>
							<th></th>

						</tr>
					</thead>

					<tbody>
						{production
							.filter((production) => production.name?.toLowerCase().includes(query.toLowerCase()))
							.map((item) => (
								<tr key={item._id}>
									<td >{item.name}</td>
									<td >{item.date}</td>
									<td >{item.material}</td>
									<td >{item.machine}</td>
									<td >{item.employee}</td>
									<td >{item.description}</td>



									<td>
										<a href={"/updateproduct/" + item._id}>
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