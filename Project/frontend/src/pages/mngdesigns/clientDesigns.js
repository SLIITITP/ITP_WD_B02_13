import React, { useEffect, useState } from "react";
import axios from "axios";

import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";

//components
import "../mngdesigns/designAdmin.css";

export default function ClientDesign() {
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
					{allClientDesigns.map((clientDesign, index) => (
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
