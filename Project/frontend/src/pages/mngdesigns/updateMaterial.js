import React, {useState, useEffect} from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";


export default function Umaterial() {

    // const[template,setTemplate] = useState({});
   const { id } = useParams();

   const [name, setMaterialname] = useState("");
   const [cost, setMaterialCost] = useState("");
   

   useEffect(() => {
      axios.get(`http://localhost:8070/material/${id}`)
        .then((response) => {
          const material = response.data;
          setMaterialname(material.name);
          setMaterialCost(material.cost);
          
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const Umaterial = {
        name,
        cost,
    
    }

    axios.post(`http://localhost:8070/material/update/${id}`, Umaterial)
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
        <h3 className="titleStyle"><br /><strong>Update Design Material Details</strong></h3><br/>
        <form 
        onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Material Name</label>
                <div className="row">
                    <div className="col">
                        <input type="text" className="form-control" value={name} onChange={(e) => setMaterialname(e.target.value)} /><br/>

                    </div>
                    <div className="col">
                    <label htmlFor="name">cost </label>
                        <input type="text" className="form-control"  value={cost} onChange={(e) => setMaterialCost(e.target.value)} /><br/>
                    </div>
                </div>
            </div>


            <div className = "btns">
                <button type="submit" className = "register">Update</button>
                </div>

            </form>
        </div>

    )

}