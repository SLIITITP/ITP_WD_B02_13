import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import "./managecus.css"

//report gen
import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";

export default function ViewCus() {

  const [form, setForm] = useState({
    fname: "",
    lname: "",
    contactno: "",
    address: "",
    email: "",
    totalpurchases: "",
    totalamount: "",
    records: [],
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/client/client/${params.id.toString()}`);

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/viewallcus");
        return;
      }

      setForm(record);
    }
    fetchData();

    return;
  }, [params.id, navigate]);


  function generateReport() {
		// Create a new jsPDF instance
		const doc = new jsPDF();

		// Add the report title to the PDF
		doc.setFontSize(18);
		doc.text("Client Profile Details", 14, 22);

		// Add the current date to the PDF
		const date = moment().format("MMMM Do YYYY, h:mm:ss a");
		doc.setFontSize(12);
		doc.text(`Report generated on ${date}`, 14, 32);

		// Define the columns for the table
		const columns = ["Field", "Value"];

		// Define the rows for the table
		const rows = [
			["Name", form.fname],
			["Contact No", form.contactno],
			["Address", form.address],
			["Email", form.email],
			["Total Purchase", form.totalpurchases],
      ["Total SpentAmount", form.totalpayments],
      ["Loyalty Level", form.loyaltylevel],
		];

		// Generate the table using the autoTable function
		doc.autoTable({
			head: [columns],
			body: rows,
			startY: 40, // Set the y-coordinate for the start of the table
			styles: {
				fontSize: 10, // Set font size for table content
				cellPadding: 3, // Set cell padding for table cells
				textAlign: "center", // Align text to center of cells
			},
		});

		// Save the PDF document as deliverydetails.pdf
		doc.save("Client Profile Details.pdf");
	}




  async function deleteRecord(id) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2',
            cancelButton: 'text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this! You will the Delete the This Customer Details!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
          fetch(`${process.env.REACT_APP_BACKEND_URL}/client/delete/${id}`, {
            method: "DELETE"
          });
      
          navigate("/viewallcus");

            swalWithBootstrapButtons.fire(
                'Deleted!',
                'This Client Profile has been deleted.',
                'success'
            )
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelled',
                'This Client Profile is Not Deleted:)',
                'info'
            )
        }
    })
}

  // This method will delete a record
  // async function deleteRecord(id) {
  //     await fetch(`http://localhost:8070/${id}`, {
  //         method: "DELETE"
  //     });

  //     const newRecords = records.filter((el) => el._id !== id);
  //     setRecords(newRecords);
  // }

  // This method will map out the records on the table
  // function recordList() {
  //   return records.map((record) => {
  //     return (
  //       <ViewCusTag
  //         record={record}
  //         // deleteRecord={() => deleteRecord(record._id)}
  //         key={record._id}
  //       />
  //     );
  //   });
  // }
  return (
    <div>
      <div class="viewcus dark:bg-gray-400 grid grid-cols-8 gap-4 hover:bg-gray-500 left">
        <div class="col-span-3"><img src={form.imgurl} alt="" />
          <button onClick={() => {
            deleteRecord(form._id);
          }}
            class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          > Delete Profile</button>
          <button onClick={generateReport}
           class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-10 py-2.5 text-center mr-2 mb-2">
            Report </button>
        </div>
{/* report generation button */}


{/* <button
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
					</button> */}
        <div class="cusdetailscard">
          <div class="p-4 text-xl text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-700 dark:text-gray-300 itemrows" role="alert">
            <span class="font-medium">{form.fname} {form.lname}</span>
          </div>
          <br />
          <div class="p-4 text-xl text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-700 dark:text-gray-300 itemrows" role="alert">
            <span class="font-medium">{form.contactno}</span>
          </div>
          <br />
          <div class="p-4 text-xl text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-700 dark:text-gray-300 itemrows" role="alert">
            <span class="font-medium">{form.address}</span>
          </div>
          <br />
          <div class="p-4 text-xl text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-700 dark:text-gray-300 itemrows" role="alert">
            <span class="font-medium">{form.email}</span>
          </div>
          <br />
          <div class="flex p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg cusrows" role="alert">
            <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
            <span class="sr-only">Info</span>
            <div>
              <ul class="mt-1.5 ml-4 text-blue-700 list-disc list-inside">
                <li>Total&#160;Purchases&#160;Done&#160;-{form.totalpurchases}</li>
                <li>Total&#160;Spent&#160;Amount&#160;-{form.totalpayments}</li>
                <li>Loyalty&#160;Level&#160;-&#160;{form.loyaltylevel}</li>
              </ul>
            </div>
          </div>


        </div>


      </div>
    </div>
  )
}