  import React, { useEffect ,useState} from "react";
  // import { useDeliverydsContext } from "../../hooks/useDeliverydContext";
  import viewIcon from "../stockimg/eye.svg";

  //report gen
  import axios from "axios";
  import jsPDF from "jspdf";
  import "jspdf-autotable";
  import moment from "moment";

  //components
  import "../mngdistribution/deliveryAdmin.css";
  // import DeliverdForm from "./DeliverydForm";


  export default function Deliveryd() {

  //search
  const [query, setQuery] = useState("");
  //report gen
  const [allDeliveryds, setAllDeliveryds] = useState([]);
  // const { deliveryds, dispatch } = useDeliverydsContext();
  const [deliveryStatus , setdeliveryStatus] = useState("");

  const handlePassDeliver = (id) => {
    console.log(`Passed record with ID: ${id}`);
    const updateStatus = allDeliveryds.map((x) => {
        if (x._id === id) {
            x.delivered = true;
        }
        return x;
    });
    setAllDeliveryds(updateStatus);

    axios
        .put(`http://localhost:8070/delidetails/updatestatus/${id}`, { pending: 'delivered' })
        .then((response) => {
            console.log('Delivery status updated successfully');
            console.log(response.data);
            // Handle success, if needed
        })
        .catch((error) => {
            console.error('Error updating order production status:', error);
            // Handle error, if needed
        });
  };

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
  //report
  const generateReport = () => {
    const doc = new jsPDF();

    // Add the report title to the PDF
    doc.setFontSize(15);
    doc.text("Delivery Details Report", 14, 22);

    // Add the current date to the PDF
    const date = moment().format("MMMM Do YYYY, h:mm:ss a");
    doc.setFontSize(11);
    doc.text(`Report generated on ${date}`, 14, 32);

    // Create the table structure with headings for each column
    const columns = [
      "First Name",
      "Address",
      "City",
      "Postal Code",
      "Total Amount ",
      "Delivery Company",
    
    ];
    const rows = allDeliveryds.map(
      ({
        fname,
        address,
        city,
        postalCode,
        totalAmount,
        deliveryCompany,
      
      }) => [
        fname,
        address,
        city,
        postalCode,
        totalAmount,
        deliveryCompany,
        
      ]
    );
    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 40,
      styles: {
        fontSize: 9, // Set font size for table content
        cellPadding: 3, // Set cell padding for table cells
      },
    });

    doc.save("Deliverydetails.pdf");
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
      <h2 className="titleStyle" style={{ marginTop: "20px", marginBottom: "10px", textAlign: "center", fontSize: "24px" }}>
    Delivery Details
  </h2>

  {/* search bar */}
  <input
                      aria-label="Search"
                      className="form-control-rounded form-control-prepended"
                      placeholder="Search By City Name"
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
          onClick={generateReport}>
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
                  {/* <th>Last Name</th> */}
                  {/* <th>Telephone</th> */}
                  {/* <th>Address</th> */}
                  <th>City</th>
                  <th>Postal Code</th> 
                  <th>Total Amount</th>
                  <th>Delivery Company</th>
                  {/* <th>Delivery Option</th> */}
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
                )
                .map((delidetails, index) => (
                  <tr key={index}>
                    <td>{delidetails._id}</td>
                    {/* <td>{delidetails.fname}</td> */}
                    {/* <td>{delidetails.lname}</td> */}
                    {/* <td>{delidetails.telephone}</td> */}
                    {/* <td>{delidetails.address}</td>   */}
                    <td>{delidetails.city}</td>
                    <td>{delidetails.postalCode}</td>
                    <td>{delidetails.totalAmount}</td>
                    <td>{delidetails.deliveryCompany}</td>
                    {/* <td>{delidetails.deliveryOption}</td> */}

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


                  <td class="px-4 py-4 whitespace-no-wrap border-b border-gray-500">
                                                  <button
                                                      value={"Delivered"}
                                                      type="button"
                                                      class={`${delidetails.delivered
                                                          ? "bg-yellow-500 hover:bg-yellow-700"
                                                          : "bg-indigo-500 hover:bg-indigo-700"
                                                          } text-white font-bold py-2 px-4 rounded`}
                                                      onClick={() => handlePassDeliver(delidetails._id)}
                                                      

                                                  >
                                                    {delidetails.delivered ? "Delivered" : "Pending"}
                                                  </button>
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

