import React,{ useState, useEffect , useParams} from 'react';
import axios from "axios";
import SingleEmployee from './SingleEmployee';

//report gen
import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";

export default function AllEmployee(){

    // const { id } = useParams;
    const [employee, setEmployees] = useState([]); // using functional component
    const [allocation, setAllocation] = useState([]);
    const [query, setQuery] = useState("");
    useEffect(()=>{
      
        getEmployees();
        getAllocation();

    }, [])

    function getEmployees() {
        axios.get("http://localhost:8070/employee/").then((res)=> {
            console.log(res.data);
            setEmployees(res.data);
        }).catch((err) => {
            alert(err.message);
        })
    }

    //report
	const generateReport = () => {
		const doc = new jsPDF();

		// Add the report title to the PDF
		doc.setFontSize(18);
		doc.text("All employees and allocation", 14, 22);

		// Add the current date to the PDF
		const date = moment().format("MMMM Do YYYY, h:mm:ss a");
		doc.setFontSize(12);
		doc.text(`Report generated on ${date}`, 14, 32);

		// Create the table structure with headings for each column
		const columns = [
			"Employee name",
			"Gender",
			"Profession",
            "Allocation"
			//   "Age",
			//   "Gender",
			//   "Contact Number",
			//   "Email",
		];
		const rows = employee.map(
			({
				name,
				gender,
				profession,
                allocation,
				// applicant_age,
				// applicant_gender,
				// applicant_contact,
				// applicant_email,
			}) => [
                name,
				gender,
				profession,
                allocation,
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

		doc.save("Allemployee.pdf");
	};

    function getAllocation() {
        axios.get("http://localhost:8070/allocation/").then((res)=> {
            console.log(res.data);
            setAllocation(res.data);
        }).catch((err) => {
            alert(err.message);
        })
    }

    
    return(

    

  <div className="container">
  <br />
  <br />
  <br />
  <br />
  <br />

  {/* search bar */}
  <div>
    <input
      aria-label="Search"
      className="form-control-rounded form-control-prepended"
      placeholder="Search By Employee Name"
      type="search"
      onChange={(e) => setQuery(e.target.value)}
      style={{
        borderRadius: "8px",
        width: "600px",
        marginLeft: "350px",
        height: "40px",
        padding: "5px",
        marginLeft: "470px",
      }}
    /><br></br>
  </div><br/>

  {/* report generation button */}
  <button
    style={{
      marginTop: "-60px",
      marginRight: "10px",
      backgroundColor: "#1a1a1a",
      color: "white",
      borderRadius: "8px",
      width: "200px",
      height: "40px",
      padding: "10px",
      float: "right",
    }}
    className="btn-icon btn-3"
    color="success"
    type="button"
    onClick={generateReport}
  >
    Generate Report
  </button>

  <table style={{ marginLeft: "300px" }}>
    <thead>
      <tr>
        <th style={{ width: "175px", textAlign: "center" }}>Employee Name</th>
        <th style={{ width: "175px", textAlign: "center" }}>Gender</th>
        <th style={{ width: "175px", textAlign: "center" }}>Profession</th>
        <th style={{ width: "175px", textAlign: "center" }}>Allocate</th>
        <th style={{ width: "115px", textAlign: "center" }}>View</th>
        <th style={{ width: "115px", textAlign: "center" }}>Make Payment</th>
      </tr>
    </thead>
  </table>

  <div style={{  marginLeft: "110px"}}>
    <table
      style={{
        width: "1000px",
        fontFamily: "Arial, sans-serif",
        fontSize: "14px",
        color: "#333",
        borderCollapse: "collapse",
        marginLeft: "190px",
      }}
    >
      <thead></thead>
      <tbody>
        {employee
          .filter((item) =>
            item.name?.toLowerCase().includes(query.toLowerCase())
          )
          .map((employee, ind) => (
            <>
              <SingleEmployee employee={employee} allocation={allocation} />
            </>
          ))}
      </tbody>
    </table>
  </div>
</div>


    );
};