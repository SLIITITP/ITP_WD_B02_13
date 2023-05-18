import React, { useEffect, useState } from "react"
import { usePaymentDetailssContext } from "../../hooks/usePaymentDetailssContext"

//report gen
import axios from "axios";

import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";

//components
import "../mngpayment/paymentAdmin.css"
import PaymentDetailsDetails from './PaymentDetailsDetails'
import PaymentDetailsForm from "./PaymentDetailsForm";

export default function PpaymentDetails() {

    //search
	const [query, setQuery] = useState("");
	//report gen
	const [allPaymentDetailss, setAllPaymentDetailss] = useState([]);
    const { paymentDetailss, dispatch } = usePaymentDetailssContext()

    //report
	useEffect(() => {
		const fetchPaymentDetaulss = async () => {
			try {
				const response = await axios.get("http://localhost:8070/paymentDetails");
				setAllPaymentDetailss(response.data);
			} catch (err) {
				console.log(err);
			}
		};
		fetchPaymentDetaulss();
	}, []);

    //report
	const generateReport = () => {
		const doc = new jsPDF();

		// Add the report title to the PDF
		doc.setFontSize(18);
		doc.text("All Payment Details Report", 14, 22);

		// Add the current date to the PDF
		const date = moment().format("MMMM Do YYYY, h:mm:ss a");
		doc.setFontSize(12);
		doc.text(`Report generated on ${date}`, 14, 32);

		// Create the table structure with headings for each column
		const columns = [
			"Date",
			"Recipient Name",
            "TotalAmount(LKR)",
            "Recipient Email",
			"Recipoent Contact Number",
			//   "Age",
			//   "Gender",
			//   "Contact Number",
			//   "Email",
		];
		const rows = allPaymentDetailss.map(
			({
				Date,
				RecipientName,
                TotalAmount,
                RecipientEmail,
				ContactNumber,

				// applicant_age,
				// applicant_gender,
				// applicant_contact,
				// applicant_email,
			}) => [
				Date,
                RecipientName,
                TotalAmount,
                RecipientEmail,
				ContactNumber,
				
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

		doc.save("All Payment Details.pdf");
	};

    const handleDelete = (id) => {
		axios.delete(`http://localhost:8070/paymentDetails/delete/${id}`).then((res) => {
			console.log(res.data);
			setAllPaymentDetailss((prevData) => prevData.filter((paymentDetails) => paymentDetails._id !== id));
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
            <div className="paymentDetailss">
                <h1 className="header" style={{ color: 'black' }}>All Payment Details</h1>
                <br />
                <PaymentDetailsForm />
                <br />
                <br />
                <hr />
                <br />
                {/* search bar */}
                <input
                    aria-label="Search"
                    className="form-control-rounded form-control-prepended"
                    placeholder="Search By  name"
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
								<th>Payment ID</th>
								<th>date</th>
								<th>Recipient Name</th>
                                <th>Total Amount</th>
                                <th>Recipient Email</th>
								<th>Recipoent Contact Number</th>
								<th>Delete</th>
							</tr>
						</thead>

						<tbody>
							{allPaymentDetailss
								.filter(
									(paymentDetails) =>
                                    paymentDetails.RecipientName?.toLowerCase().includes(query.toLowerCase()) ||
                                    paymentDetails._id?.toLowerCase().includes(query.toLowerCase())
									// ||
									// vacancy.vacancy_type
									//   ?.toLowerCase()
									//   .includes(query.toLowerCase())
								)
								.map((paymentDetails, index) => (
									<tr key={index}>
										<td>{paymentDetails._id}</td>
										<td>{paymentDetails.Date}</td>
                                        <td>{paymentDetails.RecipientName}</td>
                                        <td>{paymentDetails.TotalAmount}</td>
                                        <td>{paymentDetails.RecipientEmail}</td>
										<td>{paymentDetails.ContactNumber}</td>
										<td>
											<span onClick={() => handleDelete(paymentDetails._id)}>
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