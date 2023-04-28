import React, {useState, useEffect} from "react";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";

import './CSS/addCompany.css';



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
    
    const Ucompany = {
        companyname,
        companyno,
        deliverycharge
    }

    axios.post(`http://localhost:8070/company/update/${id}`, Ucompany)
      .then((response) => {
        console.log(response.data);
        navigate("/companyadd")
        alert("Successfully updated")
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
  <h2 className="titleStyle"><br />Update Company Details</h2>

  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label htmlFor="name">Company Name</label>
      <input type="text" className="form-control" value={companyname} onChange={(e) => setCompanyName(e.target.value)} />
        <required/>
    </div>

    <div className="form-group">
      <label htmlFor="name">Company Number</label>
      <input type="text" className="form-control"  value={companyno} onChange={(e) => setcompanyno(e.target.value)} required pattern="[0-9]{10}" title="Please enter 10 digit phone number" />
    </div>

    <div className="form-group">
      <label htmlFor="address">Delivery Charges</label>
      <input type="text" className="form-control" id="address" value={deliverycharge} onChange={(e) => setDeliveryCharge(e.target.value)} required pattern="[0-9]+" title="Please enter numbers only" />    </div>

    <div className="text-center">
      <button type="submit" className="btn btn-primary">Update</button>
    </div>
  </form>
</div>

    )

}