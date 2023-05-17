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
		// <div>
		// 	<br />
		// 	<br />
		// 	<br />
		// 	<br />
		// 	<div className="container" style={{ width: "1000px", margin: "auto", backgroundColor: "#99ccff" }}>
		// 		<div
		// 			style={{
		// 				marginTop: "50px",
		// 				backgroundColor: "#99ccff",
		// 				padding: "20px",
		// 				boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
		// 				borderRadius: "5px",
		// 			}}
		// 		>
		// 			<div
		// 				style={{
		// 					marginBottom: "30px",
		// 					textAlign: "center",
		// 				}}
		// 			>
		// 				<h3
		// 					style={{
		// 						color: "Black",
		// 						fontSize: "30px",
		// 						marginTop: "0px",
		// 						fontWeight: "bold",
		// 					}}
		// 				>
		// 					Update Purchase Details
		// 				</h3>
		// 			</div>
		// 			<form onSubmit={handleSubmit}>
		// 				<div style={{ marginBottom: "20px" }}>
		// 					<label
		// 						htmlFor="name"
		// 						style={{
		// 							display: "block",
		// 							fontSize: "18px",
		// 							marginBottom: "10px",
		// 						}}
		// 					>
		// 						Supplier Name
		// 					</label>
		// 					<input
		// 						type="text"
		// 						className="form-control"
		// 						defaultValue={data.Supplier_Name}
		// 						onChange={(e) => setSupplier_Name(e.target.value)}
		// 						style={{
		// 							width: "100%",
		// 							padding: "10px",
		// 							borderRadius: "5px",
		// 							border: "1px solid #CCC",
		// 							fontSize: "16px",
		// 						}}
		// 					/>
		// 				</div>
		// 				<div style={{ marginBottom: "20px" }}>
		// 					<label
		// 						htmlFor="code"
		// 						style={{
		// 							display: "block",
		// 							fontSize: "18px",
		// 							marginBottom: "10px",
		// 						}}
		// 					>
		// 						Purchase Date
		// 					</label>
		// 					<input
		// 						type="text"
		// 						className="form-control"
		// 						defaultValue={data.Purchase_Date}
		// 						onChange={(e) => setPurchase_Date(e.target.value)}
		// 						style={{
		// 							width: "100%",
		// 							padding: "10px",
		// 							borderRadius: "5px",
		// 							border: "1px solid #CCC",
		// 							fontSize: "16px",
		// 						}}
		// 					/>
		// 				</div>

		// 				<div style={{ marginBottom: "20px" }}>
		// 					<label
		// 						htmlFor="code"
		// 						style={{
		// 							display: "block",
		// 							fontSize: "18px",
		// 							marginBottom: "10px",
		// 						}}
		// 					>
		// 						Material Name
		// 					</label>
		// 					<input
		// 						type="text"
		// 						className="form-control"
		// 						defaultValue={data.Material_Name}
		// 						onChange={(e) => setMaterial_Name(e.target.value)}
		// 						style={{
		// 							width: "100%",
		// 							padding: "10px",
		// 							borderRadius: "5px",
		// 							border: "1px solid #CCC",
		// 							fontSize: "16px",
		// 						}}
		// 					/>
		// 				</div>

		// 				<div style={{ marginBottom: "20px" }}>
		// 					<label
		// 						htmlFor="code"
		// 						style={{
		// 							display: "block",
		// 							fontSize: "18px",
		// 							marginBottom: "10px",
		// 						}}
		// 					>
		// 						Quantity
		// 					</label>
		// 					<input
		// 						type="number"
		// 						className="form-control"
		// 						defaultValue={data.Quantity}
		// 						onChange={(e) => setQuantity(e.target.value)}
		// 						style={{
		// 							width: "100%",
		// 							padding: "10px",
		// 							borderRadius: "5px",
		// 							border: "1px solid #CCC",
		// 							fontSize: "16px",
		// 						}}
		// 					/>
		// 				</div>

		// 				<div style={{ marginBottom: "20px" }}>
		// 					<label
		// 						htmlFor="code"
		// 						style={{
		// 							display: "block",
		// 							fontSize: "18px",
		// 							marginBottom: "10px",
		// 						}}
		// 					>
		// 						Refferance No
		// 					</label>
		// 					<input
		// 						type="text"
		// 						className="form-control"
		// 						defaultValue={data.Refferance_No}
		// 						onChange={(e) => setRefferance_No(e.target.value)}
		// 						style={{
		// 							width: "100%",
		// 							padding: "10px",
		// 							borderRadius: "5px",
		// 							border: "1px solid #CCC",
		// 							fontSize: "16px",
		// 						}}
		// 					/>
		// 				</div>

		// 				<div style={{ marginBottom: "20px" }}>
		// 					<label
		// 						htmlFor="code"
		// 						style={{
		// 							display: "block",
		// 							fontSize: "18px",
		// 							marginBottom: "10px",
		// 						}}
		// 					>
		// 						Unit_Price
		// 					</label>
		// 					<input
		// 						type="number"
		// 						className="form-control"
		// 						defaultValue={data.Unit_Price}
		// 						onChange={(e) => setUnit_Price(e.target.value)}
		// 						style={{
		// 							width: "100%",
		// 							padding: "10px",
		// 							borderRadius: "5px",
		// 							border: "1px solid #CCC",
		// 							fontSize: "16px",
		// 						}}
		// 					/>
		// 				</div>

		// 				<div style={{ marginBottom: "20px" }}>
		// 					<label
		// 						htmlFor="code"
		// 						style={{
		// 							display: "block",
		// 							fontSize: "18px",
		// 							marginBottom: "10px",
		// 						}}
		// 					>
		// 						Total Price
		// 					</label>
		// 					<input
		// 						type="number"
		// 						className="form-control"
		// 						defaultValue={data.Total_Price}
		// 						onChange={(e) => setTotal_Price(e.target.value)}
		// 						style={{
		// 							width: "100%",
		// 							padding: "10px",
		// 							borderRadius: "5px",
		// 							border: "1px solid #CCC",
		// 							fontSize: "16px",
		// 						}}
		// 					/>
		// 				</div>

		// 				<div style={{ marginBottom: "20px" }}>
		// 					<label
		// 						htmlFor="description"
		// 						style={{
		// 							display: "block",
		// 							fontSize: "18px",
		// 							marginBottom: "10px",
		// 						}}
		// 					>
		// 						Description
		// 					</label>
		// 					<input
		// 						type="text"
		// 						className="form-control"
		// 						value={data.Description}
		// 						onChange={(e) => setDescription(e.target.value)}
		// 						style={{
		// 							width: "100%",
		// 							padding: "10px",
		// 							borderRadius: "5px",
		// 							border: "1px solid #CCC",
		// 							fontSize: "16px",
		// 						}}
		// 					/>
		// 				</div>
		// 				<button
		// 					type="submit"
		// 					className="register"
		// 					style={{
		// 						background: "#f0c967",
		// 						color: "white",
		// 						border: "none",
		// 						padding: "0.5rem",
		// 						borderRadius: "0.5rem",
		// 						cursor: "pointer",
		// 						width: "100px",
		// 					}}
		// 				>
		// 					Update
		// 				</button>
		// 			</form>
		// 		</div>
		// 	</div>
		// </div>

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
