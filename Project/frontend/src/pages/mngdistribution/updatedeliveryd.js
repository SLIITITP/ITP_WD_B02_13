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
   const [deliverystatus,setdeliverystatus]=useState("");

 
   useEffect(() => {
      axios.get(`http://localhost:8070/delidetails/${id}`)
        .then((response) => {
          const delidetails = response.data;
          setfname(delidetails.fname);
          setlname(delidetails.lname);
          settelephone(delidetails.telephone);
          setaddress(delidetails.address);
          setcity(delidetails.city);
          setpostalcode(delidetails.postalCode);
          setdeliverycompany(delidetails.deliveryCompany);
          setdeliveryoption(delidetails.deliveryOption);
          setdeliverystatus(delidetails.deliStatus)
          
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
      <label htmlFor="name">Delivery status</label>
      <select type="text" className="form-control" value={deliverystatus} onChange={(e) => setdeliveryoption(e.target.value)} >
        <option value="Pending">Pending</option>
        <option value="Delivered">Delivered</option>
      </select>
    </div>

    <div className="text-center">
      <button type="submit" className="btn btn-primary">Update</button>
    </div>
  </form>
</div>
    )
}