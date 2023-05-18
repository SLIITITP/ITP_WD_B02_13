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
    
  <div class="container mx-auto p-10">
  <h3 class="text-2xl font-bold mb-6">Update Card Type</h3>
    <form onSubmit={handleSubmit} class="max-w-sm">
      <div class="mb-4">
          <label for="name" class="block text-gray-700">Card Type</label>
          <input type="text" id="name" class="form-input mt-1 block w-full" value={CardType} onChange={(e) => setCardType(e.target.value)} />
      </div>
      <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Update</button>
    </form>
  </div>


    )

}