import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function UMaterial() {
	const { id } = useParams();

	const [data, setData] = useState([]);
	const [Material_Name, setMaterial_Name] = useState("");
	const [Category, setCategory] = useState("");
	const [Price, setPrice] = useState("");
	const [Quantity, setQuantity] = useState("");
	const [Description, setDescription] = useState("");

	useEffect(() => {
		const getMaterial = async () => {
			const res = await axios.get(`http://localhost:8070/stock/getmaterial/${id}`);
			console.log(res.data);
			setData(res.data);

			setMaterial_Name(res.data.Material_Name);
			setCategory(res.data.Category);
			setPrice(res.data.Price);
			setQuantity(res.data.Quantity);
			setDescription(res.data.Description);
		};
		getMaterial();
	}, [id]);

	const handleSubmit = (e) => {
		e.preventDefault();

		const UMaterial = {
			Material_Name,
			Category,
			Price,
			Quantity,
			Description,
		};

		axios
			.put(`http://localhost:8070/stock/updatematerial/${id}`, UMaterial)
			.then((response) => {
				console.log(response.data);
				Swal.fire({
					icon: "success",
					title: "Material Updated",
					timer: 1500,
					showConfirmButton: false,
				});
				window.location.href = "/allmaterial";
				// show success message or redirect to another page
			})
			.catch((error) => {
				console.log(error);
				// show error message
			});
	};

	return (
		// <div className="flex justify-center items-center h-screen bg-gray-100">
		// 	<div className="container mx-auto bg-blue-200 p-4 rounded-lg" style={{ width: "1000px" }}>
		// 		<div className="bg-blue-200 p-6 rounded-lg shadow-md">
		// 			<div className="mb-6 text-center">
		// 				<h3 className="text-black text-3xl font-bold">Update Material</h3>
		// 			</div>
		// 			<form onSubmit={handleSubmit}>
		// 				<div className="mb-4">
		// 					<label className="block text-lg mb-2" htmlFor="name">
		// 						Material Name
		// 					</label>
		// 					<input
		// 						type="text"
		// 						className="w-full p-2 border border-gray-300 rounded-lg"
		// 						defaultValue={data.Material_Name}
		// 						onChange={(e) => setMaterial_Name(e.target.value)}
		// 					/>
		// 				</div>
		// 				<div className="mb-4">
		// 					<label className="block text-lg mb-2" htmlFor="code">
		// 						Category
		// 					</label>
		// 					<input
		// 						type="text"
		// 						className="w-full p-2 border border-gray-300 rounded-lg"
		// 						defaultValue={data.Category}
		// 						onChange={(e) => setCategory(e.target.value)}
		// 					/>
		// 				</div>
		// 				<div className="mb-4">
		// 					<label className="block text-lg mb-2" htmlFor="code">
		// 						Quantity
		// 					</label>
		// 					<input
		// 						type="text"
		// 						className="w-full p-2 border border-gray-300 rounded-lg"
		// 						defaultValue={data.Quantity}
		// 						onChange={(e) => setQuantity(e.target.value)}
		// 					/>
		// 				</div>
		// 				<div className="mb-4">
		// 					<label className="block text-lg mb-2" htmlFor="code">
		// 						Price
		// 					</label>
		// 					<input
		// 						type="text"
		// 						className="w-full p-2 border border-gray-300 rounded-lg"
		// 						defaultValue={data.Price}
		// 						onChange={(e) => setPrice(e.target.value)}
		// 					/>
		// 				</div>
		// 				<div className="mb-4">
		// 					<label className="block text-lg mb-2" htmlFor="description">
		// 						Description
		// 					</label>
		// 					<input
		// 						type="text"
		// 						className="w-full p-2 border border-gray-300 rounded-lg"
		// 						value={data.Description}
		// 						onChange={(e) => setDescription(e.target.value)}
		// 					/>
		// 				</div>
		// 				<button type="submit" className="bg-yellow-500 text-white border-0 py-2 px-4 rounded-lg w-24">
		// 					Update
		// 				</button>
		// 			</form>
		// 		</div>
		// 	</div>
		// </div>
		<div>
			<br /> <br /> <br /> <br /> <br /> <br />
			<div className="flex justify-center items-center h-screen bg-gray-100">
				<div className="w-96 bg-white rounded-lg shadow-md p-6">
					<h3 className="text-3xl text-center font-bold mb-6">Update Material</h3>
					<form onSubmit={handleSubmit}>
						<div className="mb-4">
							<label className="block text-lg mb-2" htmlFor="name">
								Material Name
							</label>
							<input
								type="text"
								className="form-control w-full p-2 border border-gray-300 rounded-lg"
								defaultValue={data.Material_Name}
								onChange={(e) => setMaterial_Name(e.target.value)}
							/>
						</div>
						<div className="mb-4">
							<label className="block text-lg mb-2" htmlFor="code">
								Category
							</label>
							<input
								type="text"
								className="form-control w-full p-2 border border-gray-300 rounded-lg"
								defaultValue={data.Category}
								onChange={(e) => setCategory(e.target.value)}
							/>
						</div>

						<div className="mb-4">
							<label className="block text-lg mb-2" htmlFor="code">
								Price
							</label>
							<input
								type="text"
								className="form-control w-full p-2 border border-gray-300 rounded-lg"
								defaultValue={data.Price}
								onChange={(e) => setPrice(e.target.value)}
							/>
						</div>

						<div className="mb-4">
							<label className="block text-lg mb-2" htmlFor="code">
								Quantity
							</label>
							<input
								type="text"
								className="form-control w-full p-2 border border-gray-300 rounded-lg"
								defaultValue={data.Quantity}
								onChange={(e) => setQuantity(e.target.value)}
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
		</div>
	);
}
