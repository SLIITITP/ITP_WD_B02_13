import React, {useState, useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


export default function UpdateStatus() {

   const { id } = useParams();

   const [name, setStatusname] = useState("");
   const [date, setstatusdate] = useState("");
   const [method, setStatusmethod] = useState("");
   const [status, setStatusstatus] = useState("");


   

   useEffect(() => {
      axios.get(`http://localhost:8070/distribution/get/${id}`)
        .then((response) => {
          const status = response.data;
          setStatusname=(status.name);
          setstatusdate=(status.date);
          setStatusmethod=(status.method);
          setStatusstatus=(status.status);
          
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const UpdateStatus = {
      name,
      date,
      method,
      status,
        
    }

    axios.post(`http://localhost:8070/distribution/update/${id}`,UpdateStatus)
      .then((response) => {
        console.log(response.data);
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
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/> 
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>  
        <h2 className="titleStyle"><br />Update status Details</h2>

        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name"> Name</label>
                <div className="row">
                    <div className="col">
                        <input type="text" className="form-control" value={name} onChange={(e) => setStatusname(e.target.value)} /><br/>

                    </div>
                    <div className="col">
                    <label htmlFor="name">Date</label>
                        <input type="text" className="form-control" id="date"  value={date} onChange={(e) => setstatusdate(e.target.value)} /><br/>
                    </div>
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="address">Method</label>
                <input type="text" className="form-control" id="method" value={method} onChange={(e) => setStatusmethod(e.target.value)} /><br/>
            </div>

            <div className="form-group">
                <label htmlFor="address">Status</label>
                <input type="text" className="form-control" id="status" value={status} onChange={(e) => setStatusstatus(e.target.value)} /><br/>
            </div>

            </form>
        </div>

    )

}