import React, { useEffect, useState } from "react"
import { useCardsContext } from "../../hooks/useCardsContext"

//report gen
import axios from "axios";

import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";

//components
import "../mngpayment/paymentAdmin.css"
import CardDetails from '../mngpayment/CardDetails'
import CardForm from "./CardForm";

export default function Pcard(){

    //search
	const [query, setQuery] = useState("");
	//report gen
	const [allPaymentCards, setAllPaymentCards] = useState([]);
    const {cards, dispatch}= useCardsContext()

    //report
	useEffect(() => {
		const fetchCards = async () => {
			try {
				const response = await axios.get("http://localhost:8070/cardType");
				setAllPaymentCards(response.data);
			} catch (err) {
				console.log(err);
			}
		};
		fetchCards();
	}, []);

    //report
	const generateReport = () => {
		const doc = new jsPDF();

		// Add the report title to the PDF
		doc.setFontSize(18);
		doc.text("Payment Card Report", 14, 22);

		// Add the current date to the PDF
		const date = moment().format("MMMM Do YYYY, h:mm:ss a");
		doc.setFontSize(12);
		doc.text(`Report generated on ${date}`, 14, 32);

		// Create the table structure with headings for each column
		const columns = [
			"Card Type",
			"Created Date&Time",
			//   "Age",
			//   "Gender",
			//   "Contact Number",
			//   "Email",
		];
		const rows = allPaymentCards.map(
			({
				CardType,
				createdAt,
				// applicant_age,
				// applicant_gender,
				// applicant_contact,
				// applicant_email,
			}) => [
				CardType,
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

		doc.save("Card Type.pdf");
	};

    const handleDelete = (id) => {
		axios.delete(`http://localhost:8070/cardType/delete/${id}`).then((res) => {
			console.log(res.data);
			setAllPaymentCards((prevData) => prevData.filter((cardType) => cardType._id !== id));
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
           <div className="cardss">
            <h1 className="header" style={{ color: 'black' }}>New Card Type</h1>
            <br/>
           <CardForm/>
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
								<th>card ID</th>
								<th>card Name</th>
								<th>Created Date</th>
								<th>Update</th>
								<th>Delete</th>
							</tr>
						</thead>

						<tbody>
							{allPaymentCards
								.filter(
									(cardType) =>
										cardType.CardType?.toLowerCase().includes(query.toLowerCase()) ||
										cardType._id?.toLowerCase().includes(query.toLowerCase())
									// ||
									// vacancy.vacancy_type
									//   ?.toLowerCase()
									//   .includes(query.toLowerCase())
								)
								.map((cardType, index) => (
									<tr key={index}>
										<td>{cardType._id}</td>
										<td>{cardType.CardType}</td>
										<td>
											{new Date(cardType.createdAt).toLocaleString("en-US", {
												dateStyle: "short",
												timeStyle: "short",
											})}
										</td>
										<td>
											<a href={"/updateCard/" + cardType._id}>
												{" "}
												<button>
													<i className="far fa-edit"></i>&nbsp;
												</button>
											</a>
										</td>
										<td>
											<span onClick={() => handleDelete(cardType._id)}>
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