import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function Usupplier() {
	//   const [category, setcategory] = useState({});
	const { id } = useParams();

	const [data, setData] = useState([]);
	const [Supplier_Name, setSupplier_Name] = useState("");
	const [Mobile_No, setMobile_No] = useState("");
	const [Email, setEmail] = useState("");
	const [Address, setAddress] = useState("");
	const [Description, setDescription] = useState("");

	// Mobile number validation
		 function validateMobileNo(mobileNo) {
				const mobileNoRegex = /^\d{10}$/;
				return mobileNoRegex.test(mobileNo);
			}

	// Email validation
			function validateEmail(email) {
				const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				return emailRegex.test(email);
			}

	useEffect(() => {
		const getSupplier = async () => {
			//get supplier details
			const res = await axios.get(`http://localhost:8070/stock/getsupplier/${id}`);
			console.log(res.data);
			setData(res.data);

			setSupplier_Name(res.data.Supplier_Name);
			setMobile_No(res.data.Mobile_No);
			setEmail(res.data.Email);
			setAddress(res.data.Address);
			setDescription(res.data.Description);
		};
		getSupplier();
	}, [id]);

	const handleSubmit = (e) => {
		e.preventDefault();
			// Mobile number validation
		    if (!validateMobileNo(Mobile_No)) {
					Swal.fire({
						icon: "error",
						title: "Invalid Mobile Number",
						text: "Please enter a valid 10-digit mobile number",
					});
					return;
				}
				// Email validation
				if (!validateEmail(Email)) {
					Swal.fire({
						icon: "error",
						title: "Invalid Email",
						text: "Please enter a valid email address",
					});
					return;
				}

		const USupplier = {
			Supplier_Name,
			Mobile_No,
			Email,
			Address,
			Description,
		};

		axios
		//update supplier details
			.put(`http://localhost:8070/stock/updatesupplier/${id}`, USupplier)
			.then((response) => {
				console.log(response.data);
				Swal.fire({
					icon: "success",
					title: "Supplier Details Updated",
					timer: 1500,
					showConfirmButton: false,
				});
				window.location.href = "/allsupplier";
				// show success message and redirect to another page
			})
			.catch((error) => {
				console.log(error);
				// show error message
			});
	};



	return (

		<div>
			<br /> <br /> <br /> <br /> <br /> <br />
			<div className="flex justify-center items-center h-screen bg-gray-100">
				<div className="w-96 bg-white rounded-lg shadow-md p-6">
					<h3 className="text-3xl text-center font-bold mb-6">Update Supplier Details</h3>
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
								Mobile Number
							</label>
							<input
								type="text"
								className="form-control w-full p-2 border border-gray-300 rounded-lg"
								defaultValue={data.Mobile_No}
								onChange={(e) => setMobile_No(e.target.value)}
							/>
						</div>

						<div className="mb-4">
							<label className="block text-lg mb-2" htmlFor="code">
								Email
							</label>
							<input
								type="text"
								className="form-control w-full p-2 border border-gray-300 rounded-lg"
								defaultValue={data.Email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>

						<div className="mb-4">
							<label className="block text-lg mb-2" htmlFor="code">
								Address
							</label>
							<input
								type="text"
								className="form-control w-full p-2 border border-gray-300 rounded-lg"
								defaultValue={data.Address}
								onChange={(e) => setAddress(e.target.value)}
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
