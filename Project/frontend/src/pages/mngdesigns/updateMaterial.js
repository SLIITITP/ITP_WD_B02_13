import React, {useState, useEffect} from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";


export default function Umaterial() {

    // const[template,setTemplate] = useState({});
   const { id } = useParams();
   const navigate = useNavigate();
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
        navigate("/material")
        alert("Successfully updated")
            // show success message or redirect to another page
          })
          .catch((error) => {
            console.log(error);
            // show error message
          });
      };


return (
  
	<div class="container mx-auto px-4 py-12">
    <br/><br/><br/>  
		<h3 class="text-3xl font-bold mb-8">
			<strong>Update Design Material Details</strong>
		</h3>
		<form class="w-full max-w-lg" onSubmit={handleSubmit}>
			<div class="flex flex-wrap -mx-3 mb-6">
				<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
					<label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="name">
						Material Name
					</label>
					<input
						class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
						id="name"
						type="text"
						value={name}
						onChange={(e) => setMaterialname(e.target.value)}
					/>
				</div>
				<div class="w-full md:w-1/2 px-3">
					<label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="cost">
						Cost
					</label>
					<input
						class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
						id="cost"
						type="text"
						value={cost}
						onChange={(e) => setMaterialCost(e.target.value)}
					/>
				</div>
			</div>
			<div class="flex items-center justify-center">
				<button
					class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					type="submit"
				>
					Update
				</button>
			</div>
		</form>
	</div>
);

}