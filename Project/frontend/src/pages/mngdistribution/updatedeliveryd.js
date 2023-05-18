import React, {useState, useEffect} from "react";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";

import './CSS/addCompany.css';

export default function Updatedeliveryd() {

    // const[company,setCompany] = useState({});
   const { id } = useParams();
   const navigate = useNavigate();
   const [fname, setfname] = useState("");
   const [lname, setlname] = useState("");
   const [telephone, settelephone] = useState("");
   const [address, setaddress] = useState("");
   const [city,setcity]=useState("");
   const [postalcode,setpostalcode]=useState("");
   const [deliveryCompany,setdeliverycompany]=useState("");
   const [deliveryOption,setdeliveryoption]=useState("");
 
   useEffect(() => {
      axios.get(`http://localhost:8070/delidetails/${id}`)
        .then((response) => {
          const delidetails = response.data;
          setfname(delidetails.fname);
          setlname(delidetails.lname);
          settelephone(delidetails.telephone);
          setaddress(delidetails.address);
          setcity(delidetails.city);
          setpostalcode(delidetails.postalcode);
          setdeliverycompany(delidetails.deliverycompany);
          setdeliveryoption(delidetails.deliveryoption);
          
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    
    const Updatedeliveryd = {
        fname,
        lname,
        telephone,
        address,
        city,
        postalcode,
        deliveryCompany,
        deliveryOption,
    }

    axios.post(`http://localhost:8070/delidetails/update/${id}`,Updatedeliveryd)
      .then((response) => {
        console.log(response.data);
        navigate("/deliveryd")
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
  <h2 className="titleStyle"><br />Update Delivery Details</h2>

  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label htmlFor="name">First Name</label>
      <input type="text" className="form-control" value={fname} onChange={(e) => setfname(e.target.value)} />
        <required/>
    </div>

    <div className="form-group">
      <label htmlFor="name">Last Name</label>
      <input type="text" className="form-control" value={lname} onChange={(e) => setlname(e.target.value)} />
    </div>

    <div className="form-group">
      <label htmlFor="name">Telephone</label>
      <input type="text" className="form-control"  value={telephone} onChange={(e) => settelephone(e.target.value)} required pattern="[0-9]{10}" title="Please enter 10 digit phone number" />
    </div>

    <div className="form-group">
      <label htmlFor="name">Address</label>
      <input type="text" className="form-control" value={address} onChange={(e) => setaddress(e.target.value)} />
    </div>

    <div className="form-group">
      <label htmlFor="name">City</label>
      <input type="text" className="form-control" value={city} onChange={(e) => setcity(e.target.value)} />
    </div>

    <div className="form-group">
      <label htmlFor="name">Postal Code</label>
      <input type="text" className="form-control" value={postalcode} onChange={(e) => setpostalcode(e.target.value)} />
    </div>

    <div className="form-group">
      <label htmlFor="name">Delivery Company</label>
      <input type="text" className="form-control" value={deliveryCompany} onChange={(e) => setdeliverycompany(e.target.value)} />
    </div>


    <div className="form-group">
      <label htmlFor="name">Delivery Option</label>
      <input type="text" className="form-control" value={deliveryOption} onChange={(e) => setdeliveryoption(e.target.value)} />
    </div>

    <div className="text-center">
      <button type="submit" className="btn btn-primary">Update</button>
    </div>
  </form>
</div>
    )
}