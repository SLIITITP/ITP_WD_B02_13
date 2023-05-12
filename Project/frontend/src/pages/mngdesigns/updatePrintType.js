import React, {useState, useEffect} from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";


export default function UprintType() {

    // const[template,setTemplate] = useState({});
   const { id } = useParams();
   const navigate = useNavigate();
   const [name, setPrintTypename] = useState("");
   const [cost, setPrintTypeCost] = useState("");
   

   useEffect(() => {
      axios.get(`http://localhost:8070/printType/${id}`)
        .then((response) => {
          const printType = response.data;
          setPrintTypename(printType.name);
          setPrintTypeCost(printType.cost);
          
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const UprintType = {
        name,
        cost,
    
    }

    axios.post(`http://localhost:8070/printType/update/${id}`, UprintType)
      .then((response) => {
        console.log(response.data);
        navigate("/print")
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
        <h3 className="titleStyle"><br/><strong>Update Print Type Details</strong></h3><br/>
        <form 
        onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Print Type Name</label>
                <div className="row">
                    <div className="col">
                        <input type="text" className="form-control" value={name} onChange={(e) => setPrintTypename(e.target.value)} /><br/>

                    </div>
                    <div className="col">
                    <label htmlFor="name">cost </label>
                        <input type="text" className="form-control"  value={cost} onChange={(e) => setPrintTypeCost(e.target.value)} /><br/>
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