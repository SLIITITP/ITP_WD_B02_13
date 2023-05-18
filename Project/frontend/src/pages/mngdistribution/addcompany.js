import React, { useEffect ,useState} from "react";
import { useCompaniesContext } from "../../hooks/useCompaniesContext";


//report gen
import axios from "axios";

import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";

//components
import "../mngdistribution/deliveryAdmin.css";
import CompanyDetails from '../mngdistribution/CompanyDetails';
import CompanyForm from "./CompanyForm";

import './CSS/addCompany.css';

export default function AddCompany() {

  //search
	const [query, setQuery] = useState("");
	//report gen
	const [allCompanies, setAllCompanies] = useState([]);

  const { companies, dispatch } = useCompaniesContext();


//report
useEffect(() => {
  const fetchCompanies = async () => {
    try {
      const response = await axios.get("http://localhost:8070/company");
      setAllCompanies(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  fetchCompanies();
}, []);

//report
const generateReport = () => {
  const doc = new jsPDF();

  // Add the report title to the PDF
  doc.setFontSize(18);
  doc.text("Delivery Company Report", 14, 22);

  // Add the current date to the PDF
  const date = moment().format("MMMM Do YYYY, h:mm:ss a");
  doc.setFontSize(12);
  doc.text(`Report generated on ${date}`, 14, 32);

  // Create the table structure with headings for each column
  const columns = [
    "Company Name",
    "Company Number",
    "Delivery Charge",
  ];

  const rows = allCompanies.map(
    ({
      companyname,
      companyno,
      deliverycharge,
      
    }) => [
      companyname,
      companyno,
      deliverycharge,
     
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
  doc.save("Companies.pdf");
};
const handleDelete = (id) => {
  axios.delete(`http://localhost:8070/company/delete/${id}`).then((res) => {
    console.log(res.data);
    setAllCompanies((prevData) => prevData.filter((company) => company._id !== id));
  });
};

  return ( 
    <div className="home-container">
      <br/>
      <br/>
      <br/>
      <br/>
      <div className="companies-container">
      <br/>
      <br/>
      <br/>
      <h3 className="header">Delivery Companies</h3> <hr />
        <div className="form-container">
          <h3 className="form-header">Add New Company</h3>
          <CompanyForm />
        </div>
{/* search bar */}
<input
                        aria-label="Search"
                        className="form-control-rounded form-control-prepended"
                        placeholder="Search By Company Name"
                        type="search"
                        onChange={(e) => setQuery(e.target.value)}
                        style={{borderRadius:"8px",width:"600px",marginLeft:"350px",height:"40px",padding:"5px"}}
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
                <th>Company ID</th>
								<th>Company Name</th>
								<th>Company Number</th>
								<th>Delivery Charge</th>
							
								<th>Update</th>
								<th>Delete</th>
							</tr>
						</thead>

						<tbody>
							{allCompanies
								.filter(
									(company) =>
										company.companyname?.toLowerCase().includes(query.toLowerCase()) ||
										company._id?.toLowerCase().includes(query.toLowerCase())
								)
								.map((company, index) => (
									<tr key={index}>
										<td>{company._id}</td>
										<td>{company.companyname}</td>
										<td>{company.companyno}</td>
                    <td>{company.deliverycharge}</td>
										<td>
											<a href={"/updatecompany/" + company._id}>
												{" "}
												<button>
													<i className="far fa-edit"></i>&nbsp;
												</button>
											</a>
										</td>
										<td>
											<span onClick={() => handleDelete(company._id)}>
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
