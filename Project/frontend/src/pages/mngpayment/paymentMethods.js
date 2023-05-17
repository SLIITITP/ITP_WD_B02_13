import React, { useEffect, useState } from "react"
import { useMethodsContext } from "../../hooks/useMethodsContext"

//report gen
import axios from "axios";

import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";

//components
import "../mngpayment/paymentAdmin.css"
import MethodDetails from '../mngpayment/MethodDetails'
import MethodForm from "./MethodForm";

export default function Pmethod(){

    //search
	const [query, setQuery] = useState("");
	//report gen
	const [allPaymentMethods, setAllPaymentMethods] = useState([]);
    const {methods, dispatch}= useMethodsContext()

    //report
	useEffect(() => {
		const fetchMethods = async () => {
			try {
				const response = await axios.get("http://localhost:8070/method");
				setAllPaymentMethods(response.data);
			} catch (err) {
				console.log(err);
			}
		};
		fetchMethods();
	}, []);

    //report
	const generateReport = () => {
		const doc = new jsPDF();

		// Add the report title to the PDF
		doc.setFontSize(18);
		doc.text("Payment Method Report", 14, 22);

		// Add the current date to the PDF
		const date = moment().format("MMMM Do YYYY, h:mm:ss a");
		doc.setFontSize(12);
		doc.text(`Report generated on ${date}`, 14, 32);

		// Create the table structure with headings for each column
		const columns = [
			"Paymet Method",
			"Created Date&Time",
			//   "Age",
			//   "Gender",
			//   "Contact Number",
			//   "Email",
		];
		const rows = allPaymentMethods.map(
			({
				name,
				createdAt,
				// applicant_age,
				// applicant_gender,
				// applicant_contact,
				// applicant_email,
			}) => [
				name,
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

		doc.save("Payment Methods.pdf");
	};

    const handleDelete = (id) => {
		axios.delete(`http://localhost:8070/method/delete/${id}`).then((res) => {
			console.log(res.data);
			setAllPaymentMethods((prevData) => prevData.filter((method) => method._id !== id));
		});
	};

    return(
        <div className="Home">
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
           <div className="methods">
           <h1 className="header" style={{ color: 'black' }}>Payment Methods</h1>
            <br/>
           <MethodForm/>
           <br/>
           <br/>
           <hr/>
           <br/>
           {/* search bar */}
				<input
					aria-label="Search"
					className="form-control-rounded form-control-prepended"
					placeholder="Search By Name"
					type="search"
					onChange={(e) => setQuery(e.target.value)}
					style={{ borderRadius: "8px", width: "600px", marginLeft: "350px", height: "40px", padding: "5px" }}
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
           <br/><br/>
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
								<th>method ID</th>
								<th>method Name</th>
								<th>Created Date</th>
								<th>Update</th>
								<th>Delete</th>
							</tr>
						</thead>

						<tbody>
							{allPaymentMethods
								.filter(
									(method) =>
										method.name?.toLowerCase().includes(query.toLowerCase()) ||
										method._id?.toLowerCase().includes(query.toLowerCase())
									// ||
									// vacancy.vacancy_type
									//   ?.toLowerCase()
									//   .includes(query.toLowerCase())
								)
								.map((method, index) => (
									<tr key={index}>
										<td>{method._id}</td>
										<td>{method.name}</td>
										<td>
											{new Date(method.createdAt).toLocaleString("en-US", {
												dateStyle: "short",
												timeStyle: "short",
											})}
										</td>
										<td>
											<a href={"/updateMethod/" + method._id}>
												{" "}
												<button>
													<i className="far fa-edit"></i>&nbsp;
												</button>
											</a>
										</td>
										<td>
											<span onClick={() => handleDelete(method._id)}>
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