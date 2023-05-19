import React, { useEffect, useState } from "react";
import { useMaterialsContext } from "../../hooks/useMaterialsContext";
import Swal from "sweetalert2";
import axios from "axios";

import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";

//components
import "../mngdesigns/designAdmin.css";
import MaterialForm from "./MaterialForm";

export default function Material() {
	const [query, setQuery] = useState("");

	const [allMaterials, setAllMaterials] = useState([]);

	useEffect(() => {
		const fetchMaterials = async () => {
			try {
				const response = await axios.get("http://localhost:8070/material");
				setAllMaterials(response.data);
			} catch (err) {
				console.log(err);
			}
		};
		fetchMaterials();
	}, []);

	const generateReport = () => {
		const doc = new jsPDF();

		// Add the report title to the PDF
		doc.setFontSize(18);
		doc.text("Product Material Report", 14, 22);

		// Add the current date to the PDF
		const date = moment().format("MMMM Do YYYY, h:mm:ss a");
		doc.setFontSize(12);
		doc.text(`Report generated on ${date}`, 14, 32);

		// Create the table structure with headings for each column
		const columns = [
			"Material Name",
			"Material Cost",
			"Created Date & Time",
			//   "Age",
			//   "Gender",
			//   "Contact Number",
			//   "Email",
		];
		const rows = allMaterials.map(
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

		doc.save("Materials.pdf");
	};

	const handleDelete = (id) => {
		axios.delete(`http://localhost:8070/material/delete/${id}`).then((res) => {
			console.log(res.data);
			setAllMaterials((prevData) => prevData.filter((material) => material._id !== id));
		});
		//sweet alert
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
				Swal.fire("Deleted!", "Material has been deleted.", "success");
			}
		});
	};

	return (
		<div className="Home">
			<br />
			<br />
			<br />
			<br />
			
			<div className="materials">
				<h1 className="header" style={{ color: "black" }}>
					Product Materials
				</h1>
				<br />
				<MaterialForm />
				<br />
				<br />
				<hr />
				<br />

				<input
					aria-label="Search"
					className="form-control-rounded form-control-prepended"
					placeholder="Search By Material Name"
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
								<th>Material ID</th>
								<th>Material Name</th>
								<th>Cost(in LKR)</th>
								<th>Created Date</th>
								<th>Update</th>
								<th>Delete</th>
							</tr>
						</thead>

						<tbody>
							{allMaterials
								.filter(
									(material) =>
										material.name?.toLowerCase().includes(query.toLowerCase()) ||
										material._id?.toLowerCase().includes(query.toLowerCase())
									// ||
									// vacancy.vacancy_type
									//   ?.toLowerCase()
									//   .includes(query.toLowerCase())
								)
								.map((material, index) => (
									<tr key={index}>
										<td>{material._id}</td>
										<td>{material.name}</td>
										<td>{material.cost}</td>
										<td>
											{new Date(material.createdAt).toLocaleString("en-US", {
												dateStyle: "short",
												timeStyle: "short",
											})}
										</td>
										<td>
											<a href={"/updateMaterial/" + material._id}>
												{" "}
												<button>
													<i className="far fa-edit"></i>&nbsp;
												</button>
											</a>
										</td>
										<td>
											<span onClick={() => handleDelete(material._id)}>
												<i class="fa fa-trash" aria-hidden="true"></i>
											</span>
										</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
				{/* {materials && materials
        .filter(
            (material) =>
              material.name
                ?.toLowerCase()
                 .includes(query.toLowerCase()) 
             // ||
              // vacancy.vacancy_type
              //   ?.toLowerCase()
              //   .includes(query.toLowerCase())
          ).map((material)=>(
            <MaterialDetails key={material._id} material = {material}/>
        ))} */}
			</div>
		</div>
	);
}
