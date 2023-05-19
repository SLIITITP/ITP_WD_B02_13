import React, {useState, useEffect} from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


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
		        Swal.fire({
							icon: "success",
							title: "Material Updated",
							timer: 1500,
							showConfirmButton: false,
						});
        navigate("/material")
        
            // show success message or redirect to another page
          })
          .catch((error) => {
            console.log(error);
            // show error message
          });
      };


return (
	<div class="container mx-auto py-8">
		<br />
		<br />
		<br />
		<h3 class="text-3xl font-semibold mb-6">
			<strong>Update Design Material Details</strong>
		</h3>
		<form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
			<div class="mb-4">
				<label class="block text-gray-700 font-bold mb-2" for="name">
					Material Name
				</label>
				<div class="flex">
					<input
						class="appearance-none border border-gray-400 rounded w-full py-2 px-3 mr-2 leading-tight focus:outline-none focus:border-blue-500"
						id="name"
						type="text"
						placeholder="Enter template name"
						value={name}
						onChange={(e) => setMaterialname(e.target.value)}
					/>
				</div>
			</div>
			<div class="mb-4">
				<label class="block text-gray-700 font-bold mb-2" for="cost">
					Cost
				</label>
				<div class="flex">
					<span class="inline-block w-32 py-2 px-3 rounded-l border border-r-0 border-gray-400 bg-gray-200 text-gray-700 font-bold">
						LKR
					</span>
					<input
						class="appearance-none border border-gray-400 rounded-r w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
						id="cost"
						type="text"
						placeholder="Enter cost"
						value={cost}
						onChange={(e) => setMaterialCost(e.target.value)}
					/>
				</div>
			</div>
			<div class="flex justify-center">
				<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
					Update
				</button>
			</div>
		</form>
	</div>
);

}