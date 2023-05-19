import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function Upurchase() {
	//   const [category, setcategory] = useState({});
	const { id } = useParams();

	const [data, setData] = useState([]);
	const [Supplier_Name, setSupplier_Name] = useState("");
	const [Purchase_Date, setPurchase_Date] = useState("");
	const [Material_Name, setMaterial_Name] = useState("");
	const [Quantity, setQuantity] = useState("");
	const [Refferance_No, setRefferance_No] = useState("");
	const [Unit_Price, setUnit_Price] = useState("");
	const [Total_Price, setTotal_Price] = useState("");
	const [Description, setDescription] = useState("");

	useEffect(() => {
		const getPurchase = async () => {
			const res = await axios.get(`http://localhost:8070/stock/getpurchase/${id}`);
			console.log(res.data);
			setData(res.data);

			setSupplier_Name(res.data.Supplier_Name);
			setPurchase_Date(res.data.Purchase_Date);
			setMaterial_Name(res.data.Material_Name);
			setQuantity(res.data.Quantity);
            setRefferance_No(res.data.Refferance_No);
            setUnit_Price(res.data.Unit_Price);
			setTotal_Price(res.data.Total_Price);
			setDescription(res.data.Description);
		};
		getPurchase();
	}, [id]);

	const handleSubmit = (e) => {
		e.preventDefault();

		const UPurchase = {
			Supplier_Name,
			Purchase_Date,
			Material_Name,
			Quantity,
			Refferance_No,
			Unit_Price,
			Total_Price,
			Description,
		};

		axios
			.put(`http://localhost:8070/stock/updatepurchase/${id}`, UPurchase)
			.then((response) => {
				console.log(response.data);
				Swal.fire({
					icon: "success",
					title: "Purchase Details Updated",
					timer: 1500,
					showConfirmButton: false,
				});
				window.location.href = "/allpurchase";//navigate another page
				// show success message or redirect to another page
			})
			.catch((error) => {
				console.log(error);
				// show error message
			});
	};

	return (


		<div>
			<br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
			<div className="flex justify-center items-center h-screen bg-gray-100">
				<div className="w-96 bg-white rounded-lg shadow-md p-6">
					<h3 className="text-3xl text-center font-bold mb-6">Update Purchase</h3>
					<form onSubmit={handleSubmit}>
						<div className="mb-4">
							<label className="block text-lg mb-2" htmlFor="name">
								Supplier Name
							</label>
							<input
								type="text"
								className="form-control w-full p-2 border border-gray-300 rounded-lg"
								defaultValue={data.Supplier_Name}
								onChange={(e) => setSupplier_Name(e.target.value)}
							/>
						</div>
						<div className="mb-4">
							<label className="block text-lg mb-2" htmlFor="code">
								Purchase Date
							</label>
							<input

								type="text"
								className="form-control w-full p-2 border border-gray-300 rounded-lg"
								defaultValue={data.Purchase_Date}
								onChange={(e) => setPurchase_Date(e.target.value)}
							/>
						</div>

						<div className="mb-4">
							<label className="block text-lg mb-2" htmlFor="code">
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
							<label className="block text-lg mb-2" htmlFor="code">
								Refferance No
							</label>
							<input
								type="text"
								className="form-control w-full p-2 border border-gray-300 rounded-lg"
								defaultValue={data.Refferance_No}
								onChange={(e) => setRefferance_No(e.target.value)}
							/>
						</div>

						<div className="mb-4">
							<label className="block text-lg mb-2" htmlFor="code">
								Unit Price
							</label>
							<input
								type="text"
								className="form-control w-full p-2 border border-gray-300 rounded-lg"
								defaultValue={data.Unit_Price}
								onChange={(e) => setUnit_Price(e.target.value)}
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
			<br /> <br /> <br />
		</div>
	);
}
