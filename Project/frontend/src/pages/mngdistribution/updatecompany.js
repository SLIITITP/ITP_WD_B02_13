import React, {useState, useEffect} from "react";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

// import './CSS/addCompany.css';

export default function UpdateCompany() {

  // const[company,setCompany] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const [companyname, setCompanyName] = useState("");
  const [companyno, setcompanyno] = useState("");
  const [deliverycharge, setDeliveryCharge] = useState("");
  

  useEffect(() => {
    axios.get(`http://localhost:8070/company/${id}`)
      .then((response) => {
        const company = response.data;
        setCompanyName(company.companyname);
        setcompanyno(company.companyno);
        setDeliveryCharge(company.deliverycharge);
        
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
}, [id]);

const handleSubmit = (e) => {
  e.preventDefault();

    // Validation logic
    if (companyno.length !== 10 || !/^\d+$/.test(deliverycharge)) {
    alert('Please enter valid input data.');
    return;
  }
  
  const UpdateCompany = {
      companyname,
      companyno,
      deliverycharge
  }

  axios.post(`http://localhost:8070/company/update/${id}`, UpdateCompany)
    .then((response) => {
      console.log(response.data);
      navigate("/companyadd")
      Swal.fire({
        icon: "success",
        title: "Company Added",
        timer: 1500,
        showConfirmButton: false,
    });
          // show success message or redirect to another page
        })
        .catch((error) => {
          console.log(error);
          // show error message
        });
    };


return (

<div className="container">
<br/><br/>
<br/><br/>
<br/><br/>
<br/><br/>
<h2 className="titleStyle" style={{ marginTop: "20px", marginBottom: "10px", textAlign: "center", fontSize: "24px" }}>
  Update Company Details
</h2>

<form
  className="create"
  onSubmit={handleSubmit}
  style={{
    maxWidth: "500px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }}
>
  <div style={{ marginBottom: "20px" }}>
    <label htmlFor="companyName" style={{ marginBottom: "10px", fontSize: "16px", fontWeight: "bold" }}>
      Company Name:
    </label>
    <input
      type="text"
      id="companyName"
      onChange={(e) => setCompanyName(e.target.value)}
      value={companyname}
      required
      style={{
        width: "100%",
        padding: "10px",
        fontSize: "16px",
        borderRadius: "5px",
        border: "1px solid #ccc",
      }}
    />
  </div>

  <div style={{ marginBottom: "20px" }}>
    <label htmlFor="companyNumber" style={{ marginBottom: "10px", fontSize: "16px", fontWeight: "bold" }}>
      Company Number:
    </label>
    <input
      type="text"
      id="companyNumber"
      onChange={(e) => setcompanyno(e.target.value)}
      value={companyno}
      required
      style={{
        width: "100%",
        padding: "10px",
        fontSize: "16px",
        borderRadius: "5px",
        border: "1px solid #ccc",
      }}
    />
  </div>

  <div style={{ marginBottom: "20px" }}>
    <label htmlFor="deliveryCharge" style={{ marginBottom: "10px", fontSize: "16px", fontWeight: "bold" }}>
      Delivery Charge:
    </label>
    <input
      type="text"
      id="deliveryCharge"
      onChange={(e) => setDeliveryCharge(e.target.value)}
      value={deliverycharge}
      required
      style={{
        width: "100%",
        padding: "10px",
        fontSize: "16px",
        borderRadius: "5px",
        border: "1px solid #ccc",
      }}
    />
  </div>

  <button
    type="submit"
    style={{
      padding: "10px 20px",
      fontSize: "16px",
      borderRadius: "5px",
      border: "none",
      backgroundColor: "black",
      color: "white",
      cursor: "pointer",
    }}
  >
    Update Company
  </button>

</form>

</div>

  )

}