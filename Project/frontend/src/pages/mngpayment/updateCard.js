import React, {useState, useEffect} from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";


export default function Ucard() {

    //const[CardType,setCardType] = useState({});
   const { id } = useParams();

   const navigate = useNavigate();

   const [CardType, setCardType] = useState("");
   
   useEffect(() => {
      axios.get(`http://localhost:8070/cardType/${id}`)
        .then((response) => {
          const cardType = response.data;
          setCardType(cardType.CardType);
          
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const Ucard = {
        CardType,
    
    }

    axios.post(`http://localhost:8070/cardType/update/${id}`, Ucard)
      .then((response) => {
        console.log(response.data);
        navigate("/card")
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
        <h3 className="titleStyle"><br />Update Card Type</h3>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Card Type</label>
                <div className="row">
                    <div className="col">
                        <input type="text" className="form-control" value={CardType} onChange={(e) => setCardType(e.target.value)} /><br/>

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