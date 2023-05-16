import React, {useState, useEffect} from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";


export default function Umethod() {

    //const[method,setMethod] = useState({});
   const { id } = useParams();

   const navigate = useNavigate();

   const [name, setMethod] = useState("");
   
   useEffect(() => {
      axios.get(`http://localhost:8070/method/${id}`)
        .then((response) => {
          const method = response.data;
          setMethod(method.name);
          
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const Umethod = {
        name,
    
    }

    axios.post(`http://localhost:8070/method/update/${id}`, Umethod)
      .then((response) => {
        console.log(response.data);
        navigate("/method")
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
        <h3 className="titleStyle"><br />Update Method Type</h3>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Card Type</label>
                <div className="row">
                    <div className="col">
                        <input type="text" className="form-control" value={name} onChange={(e) => setMethod(e.target.value)} /><br/>

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