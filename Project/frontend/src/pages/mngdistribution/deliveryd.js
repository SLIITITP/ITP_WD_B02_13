import React, { useEffect ,useState} from "react";
import { useDeliverydsContext } from "../../hooks/useDeliverydContext";
import viewIcon from "../stockimg/eye.svg";

//report gen
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";

//components
import "../mngdistribution/deliveryAdmin.css";

import DeliverdForm from "./DeliverydForm";

// import './CSS/addCompany.css';

export default function Deliveryd() {

  //search
	const [query, setQuery] = useState("");
	//report gen
	const [allDeliveryds, setAllDeliveryds] = useState([]);
    const { deliveryds, dispatch } = useDeliverydsContext();
    const [deliveryStatus , setdeliveryStatus] = useState("");

//report
/*useEffect(() => {
  axios.get(`http://localhost:8070/delidetails/updateStatus/${id}`)
    .then((response) => {
      const delivery = response.data;
      setdeliveryStatus()
 

      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}, []);*/


useEffect(() => {
  const fetchDeliveryds = async () => {
    try {
      const response = await axios.get("http://localhost:8070/delidetails");
      setAllDeliveryds(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  fetchDeliveryds();
}, []);

const handleUpdateStatus = (id) => {
  console.log(id);
  const updatedDelivery = allDeliveryds.map((delidetails) => {
    if(delidetails._id === id) {
      delidetails.delivered = true;
    }
    return delidetails
  });
  setAllDeliveryds(updatedDelivery);

  // axios
  //   .post(`http://localhost:8070/update/${id}`, updatedDelivery)
  //   .then((res) => {
  //     console.log(res.data);
  //     // Update the delivery status in the frontend
  //     setAllDeliveryds((prevData) =>
  //       prevData.map((delidetails) => {
  //         if (delidetails._id === id) {
  //           return { ...delidetails, deliStatus: status };
  //         }
  //         return delidetails;
  //       })
  //     );
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
};


//report
const generateReport = () => {
  const doc = new jsPDF();

  // Add the report title to the PDF
  doc.setFontSize(18);
  doc.text("Delivery detail Report", 14, 22);

  // Add the current date to the PDF
  const date = moment().format("MMMM Do YYYY, h:mm:ss a");
  doc.setFontSize(12);
  doc.text(`Report generated on ${date}`, 14, 32);

  // Create the table structure with headings for each column
  const columns = [
    "Delivery ID",
    "First Name",
    "Last Name",
    "Telephone Number",
    "Address",
    "City",
    "Postal Code",
    "Delivery Company",
    "Delivery Option",
    

  ];

  const rows = allDeliveryds.map(
    ({
      deveryid,
      fname,
      lname,
      telephone,
      address,
      city,
      postalcode,
      deliverycompany,
      deliveryoption,
      
    }) => [
        deveryid,
        fname,
        lname,
        telephone,
        address,
        city,
        postalcode,
        deliverycompany,
        deliveryoption,
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

  doc.save("deliverydetails.pdf");
};

const handleDelete = (id) => {
  axios.delete(`http://localhost:8070/delidetails/delete/${id}`).then((res) => {
    console.log(res.data);
    setAllDeliveryds((prevData) => prevData.filter((delidetails) => delidetails._id !== id));
  });
};


  return (
    
    <div className="home-container">

      <div className="deliveryds-container">
        <br/>
        <br/><br/>
        <br/><br/>
        <br/>
        <hr />
        <h1>Delivery Details</h1>
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
        <br/>
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
                  <th>Delivery Id</th>
								  {/* <th>First Name</th> */}
								  <th>Last Name</th>
                  <th>Telephone</th>
								  {/* <th>Address</th>
                  <th>City</th>
                  <th>Postal Code</th> */}
                  <th>Total Amount</th>
							    <th>Delivery Company</th>
                  <th>Delivery Option</th>
                  <th>View</th>
							  	<th>Update</th>
							  	<th>Delete</th>
                  <th>Status</th>

							</tr>
						</thead>

						<tbody>
							{allDeliveryds
								.filter(
									(delidetails) =>
										delidetails.fname?.toLowerCase().includes(query.toLowerCase()) ||
										delidetails._id?.toLowerCase().includes(query.toLowerCase())
									// ||
									// vacancy.vacancy_type
									//   ?.toLowerCase()
									//   .includes(query.toLowerCase())
								)
								.map((delidetails, index) => (
									<tr key={index}>
										<td>{delidetails._id}</td>
										{/* <td>{delidetails.fname}</td> */}
										<td>{delidetails.lname}</td>
                    <td>{delidetails.telephone}</td>
                                        {/* <td>{delidetails.address}</td>  
                                        <td>{delidetails.city}</td>
                                        <td>{delidetails.postalCode}</td> */}
                                        <td>{delidetails.totalAmount}</td>
                                        <td>{delidetails.deliveryCompany}</td>
                                        <td>{delidetails.deliveryOption}</td>

                                        <td>
										<a href={"/onedeliveryd/" + delidetails._id}>
											<img src={viewIcon} alt="View" />
										</a>
									</td>
										<td>
											<a href={"/updatedeliveryd/" + delidetails._id}>
												{" "}
												<button>
													<i className="far fa-edit"></i>&nbsp;
												</button>
											</a>
										</td>
										<td>
											<span onClick={() => handleDelete(delidetails._id)}>
												<i class="fa fa-trash" aria-hidden="true"></i>
											</span>
										</td>


                    <td>
                      {delidetails.deliveryStatus}
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
