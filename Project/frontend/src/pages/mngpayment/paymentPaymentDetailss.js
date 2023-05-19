import React, { useEffect, useState } from "react";
import { usePaymentDetailssContext } from "../../hooks/usePaymentDetailssContext";
import viewIcon from "../stockimg/eye.svg";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

//report gen
import axios from "axios";

import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";

//components
import "../mngpayment/paymentAdmin.css";
import PaymentDetailsDetails from "./PaymentDetailsDetails";
import PaymentDetailsForm from "./PaymentDetailsForm";

export default function PpaymentDetails() {
	const { id } = useParams();
	//search
	const [query, setQuery] = useState("");
	//report gen
	const [allPaymentDetailss, setAllPaymentDetailss] = useState([]);
	const { paymentDetailss, dispatch } = usePaymentDetailssContext();

	const [orderDetails, setOrderDetails] = useState("");
	const [invoice, setInvoice] = useState("");

	useEffect(() => {
		async function fetchOrder() {
			console.log(id);
			try {
				const response = await axios.get("http://localhost:8070/order/getLastOrder/");
				// handle the response data here
				const Oid = response.data[0]._id;
				setInvoice(Oid);
				console.log(Oid);

				// Fetch order details using the orderId
				const orderDetailsResponse = await axios.get(`http://localhost:8070/order/invoice/${Oid}`);
				// handle the order details response data here
				const orderDetails = orderDetailsResponse.data;
				console.log("Fetching order details...");
				console.log(orderDetails);

				setOrderDetails(orderDetails);
			} catch (error) {
				alert(error);
			}
		}
		fetchOrder();
	}, []);

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
			"Total Amount(In LKR)",
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

		Swal.fire({
			title: "Do you want to delete the record?",
			showDenyButton: true,
			confirmButtonText: "No",
			denyButtonText: "Yes",
		}).then((result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
				Swal.fire("Saved!", "", "success");
			} else if (result.isDenied) {
				Swal.fire("deleted Succesfully", "", "info");
			}
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
				<h1 className="header" style={{ color: "black" }}>
					All Payment Details
				</h1>
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
								{/* <th>User ID</th>
								<th>Design ID</th>
								<th>Delivery ID</th> */}
								<th>Order ID</th>
								<th>Payment ID</th>
								<th>date</th>
								<th>Recipient Name</th>
								<th>Total Amount</th>
								<th>Recipient Email</th>
								<th>Recipoent Contact Number</th>
								<th>View</th>
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
										<td>{orderDetails._id}</td>
										<td>{paymentDetails._id}</td>
										<td>{paymentDetails.Date}</td>
										<td>{paymentDetails.RecipientName}</td>
										<td>{paymentDetails.TotalAmount}</td>
										<td>{paymentDetails.RecipientEmail}</td>
										<td>{paymentDetails.ContactNumber}</td>
										<td>
											<a href={"/onepaymentd/" + paymentDetails._id}>
												<img src={viewIcon} alt="View" />
											</a>
										</td>

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
