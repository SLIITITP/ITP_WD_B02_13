import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Ucategory() {
	const { id } = useParams();

	const [data, setData] = useState([]);
	const [Category_Name, setCategory_Name] = useState("");
	const [Category_Code, setCategory_Code] = useState("");
	const [Description, setDescription] = useState("");

	useEffect(() => {
		const getCategory = async () => {
			//get one category
			const res = await axios.get(`http://localhost:8070/stock/getcategory/${id}`);
			console.log(res.data);
			setData(res.data);

			setCategory_Name(res.data.Category_Name);
			setCategory_Code(res.data.Category_Code);
			setDescription(res.data.Description);
		};
		getCategory();
	}, [id]);

	const handleSubmit = (e) => {
		e.preventDefault();

		const UCategory = {
			Category_Name,
			Category_Code,
			Description,
		};

		axios
		//update category
			.put(`http://localhost:8070/stock/updatecategory/${id}`, UCategory)
			.then((response) => {
				console.log(response.data);
				alert("Successfully updated");
				// show success message or redirect to another page
			})
			.catch((error) => {
				console.log(error);
				// show error message
			});
	};

	return (
		<div className="flex justify-center items-center h-screen bg-gray-100">
			<div className="w-96 bg-white rounded-lg shadow-md p-6">
				<h3 className="text-3xl text-center font-bold mb-6">Update Category</h3>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label className="block text-lg mb-2" htmlFor="name">
							Category Name
						</label>
						<input
							type="text"
							className="form-control w-full p-2 border border-gray-300 rounded-lg"
							defaultValue={data.Category_Name}
							onChange={(e) => setCategory_Name(e.target.value)}
						/>
					</div>
					<div className="mb-4">
						<label className="block text-lg mb-2" htmlFor="code">
							Category Code
						</label>
						<input
							type="text"
							className="form-control w-full p-2 border border-gray-300 rounded-lg"
							defaultValue={data.Category_Code}
							onChange={(e) => setCategory_Code(e.target.value)}
						/>
					</div>
					<div className="mb-4">
						<label className="block text-lg mb-2" htmlFor="description">
							Description
						</label>
						<input
							type="text"
							className="form-control w-full p-2 border border-gray-300 rounded-lg"
							value={data.Description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>
					<button type="submit" className="bg-yellow-500 text-white border-0 py-2 px-4 rounded-lg w-full">
						Update
					</button>
				</form>
			</div>
		</div>
	);
}
