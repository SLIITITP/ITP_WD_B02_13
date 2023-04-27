import React, {useState, useEffect} from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";


export default function Utemplate() {

    // const[template,setTemplate] = useState({});
   const { id } = useParams();

   const [templatename, setTemplatename] = useState("");
   const [cost, setTemplateCost] = useState("");
   

   useEffect(() => {
      axios.get(`http://localhost:8070/template/${id}`)
        .then((response) => {
          const template = response.data;
          setTemplatename(template.templatename);
          setTemplateCost(template.cost);
          
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const Utemplate = {
        templatename,
        cost,
    
    }

    axios.post(`http://localhost:8070/template/update/${id}`, Utemplate)
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
        <h3 className="titleStyle"><br /><strong>Update Design Template Details</strong></h3><br/>
        <form 
        onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Template Name</label>
                <div className="row">
                    <div className="col">
                        <input type="text" className="form-control" value={templatename} onChange={(e) => setTemplatename(e.target.value)} /><br/>

                    </div>
                    <div className="col">
                    <label htmlFor="name">cost </label>
                        <input type="text" className="form-control"  value={cost} onChange={(e) => setTemplateCost(e.target.value)} /><br/>
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