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
	<div className="container mx-auto my-8">
    <br/><br/><br/>
		<h3 className="text-2xl font-bold mb-4">Update Print Type Details</h3>
		<form onSubmit={handleSubmit} className="max-w-md">
			<div className="mb-4">
				<label htmlFor="name" className="block mb-2 font-bold" >
					Print Type Name
				</label>
				<div className="flex flex-wrap">
					<div className="w-full mb-4 md:mb-0 md:w-1/2 md:pr-2">
						<input
							type="text"
							className="w-full border border-gray-300 p-2"
							value={name}
							onChange={(e) => setPrintTypename(e.target.value)}
						/>
					</div>
					<div className="w-full md:w-1/2 md:pl-2">
						<label htmlFor="cost" className="block mb-2 font-bold">
							Cost
						</label>
						<input
							type="text"
							className="w-full border border-gray-300 p-2"
							value={cost}
							onChange={(e) => setPrintTypeCost(e.target.value)}
						/>
					</div>
				</div>
			</div>
			<div className="flex justify-center">
				<button
					type="submit"
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				>
					Update
				</button>
			</div>
		</form>
	</div>
);

}