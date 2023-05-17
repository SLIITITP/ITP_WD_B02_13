import React, {useState, useEffect} from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";


export default function Utemplate() {

    // const[template,setTemplate] = useState({});
   const { id } = useParams();
   const navigate = useNavigate();
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
        navigate("/template")
        alert("Successfully updated")
            // show success message or redirect to another page
          })
          .catch((error) => {
            console.log(error);
            // show error message
          });
      };


return (
	<div class="container mx-auto py-8">
		<h3 class="text-3xl font-semibold mb-6">Update Design Template Details</h3>
		<form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
			<div class="mb-4">
				<label class="block text-gray-700 font-bold mb-2" for="name">
					Template Name
				</label>
				<div class="flex">
					<input
						class="appearance-none border border-gray-400 rounded w-full py-2 px-3 mr-2 leading-tight focus:outline-none focus:border-blue-500"
						id="name"
						type="text"
						placeholder="Enter template name"
						value={templatename}
						onChange={(e) => setTemplatename(e.target.value)}
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
						onChange={(e) => setTemplateCost(e.target.value)}
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