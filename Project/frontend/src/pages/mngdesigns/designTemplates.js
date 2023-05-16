import React, { useEffect, useState } from "react";
import { useTemplatesContext } from "../../hooks/useTemplatesContext";

//report gen
import axios from "axios";

import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";

//components
import "../mngdesigns/designAdmin.css";
import TemplateForm from "./TemplateForm";

export default function Dtemplate() {
	//search
	const [query, setQuery] = useState("");
	//report gen
	const [allTemplates, setAllTemplates] = useState([]);

	//report
	useEffect(() => {
		const fetchTemplates = async () => {
			try {
				const response = await axios.get("http://localhost:8070/template");
				setAllTemplates(response.data);
			} catch (err) {
				console.log(err);
			}
		};
		fetchTemplates();
	}, []);
	//report
	const generateReport = () => {
		const doc = new jsPDF();

		// Add the report title to the PDF
		doc.setFontSize(18);
		doc.text("Design Template Report", 14, 22);

		// Add the current date to the PDF
		const date = moment().format("MMMM Do YYYY, h:mm:ss a");
		doc.setFontSize(12);
		doc.text(`Report generated on ${date}`, 14, 32);

		// Create the table structure with headings for each column
		const columns = [
			"Template Name",
			"Template Cost",
			"Created Date&Time",
			//   "Age",
			//   "Gender",
			//   "Contact Number",
			//   "Email",
		];
		const rows = allTemplates.map(
			({
				templatename,
				cost,
				createdAt,
				// applicant_age,
				// applicant_gender,
				// applicant_contact,
				// applicant_email,
			}) => [
				templatename,
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

		doc.save("Templates.pdf");
	};

	const handleDelete = (id) => {
		axios.delete(`http://localhost:8070/template/delete/${id}`).then((res) => {
			console.log(res.data);
			setAllTemplates((prevData) => prevData.filter((template) => template._id !== id));
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
			<div className="templates">
				<h1 className="header" style={{ color: "black" }}>
					Design Templates
				</h1>
				<br />
				<TemplateForm />
				<br />
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
								<th>Template ID</th>
								<th>Template Name</th>
								<th>Cost(in LKR)</th>
								<th>Created Date</th>
								<th>Update</th>
								<th>Delete</th>
							</tr>
						</thead>

						<tbody>
							{allTemplates
								.filter(
									(template) =>
										template.templatename?.toLowerCase().includes(query.toLowerCase()) ||
										template._id?.toLowerCase().includes(query.toLowerCase())
									// ||
									// vacancy.vacancy_type
									//   ?.toLowerCase()
									//   .includes(query.toLowerCase())
								)
								.map((template, index) => (
									<tr key={index}>
										<td>{template._id}</td>
										<td>{template.templatename}</td>
										<td>{template.cost}</td>
										<td>
											{new Date(template.createdAt).toLocaleString("en-US", {
												dateStyle: "short",
												timeStyle: "short",
											})}
										</td>
										<td>
											<a href={"/updateTemplate/" + template._id}>
												{" "}
												<button>
													<i className="far fa-edit"></i>&nbsp;
												</button>
											</a>
										</td>
										<td>
											<span onClick={() => handleDelete(template._id)}>
												<i class="fa fa-trash" aria-hidden="true"></i>
											</span>
										</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
				{/* search
        {templates && templates.filter(
                      (template) =>
                        template.templatename
                          ?.toLowerCase()
                           .includes(query.toLowerCase())
                         ||  
                       template._id
                          ?.toLowerCase()
                           .includes(query.toLowerCase()) 
                       // ||
                        // vacancy.vacancy_type
                        //   ?.toLowerCase()
                        //   .includes(query.toLowerCase())
                    ).map((template)=>(
            <TemplateDetails key={template._id} template = {template}/>
        ))} */}
			</div>
		</div>
	);
}
