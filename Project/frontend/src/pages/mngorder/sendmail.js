import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function SendMail() {

	const [subject, setSubject] = useState("");
	const [text, setText] = useState("");
	const [message, setMessage] = useState("");

	// Function to handle the form submission
	const handleSubmit = (e) => {
		e.preventDefault();

		axios
		//send email
			.post("http://localhost:8070/stock/addmail", {  subject, text })
			.then((res) => {
								Swal.fire({
									icon: "success",
									title: "Stock Relesed",
									timer: 1500,
									showConfirmButton: false,
								});
				setMessage(res.data.message);
			})
			.catch((err) => {
				console.error(err);
				setMessage("Failed to send email");
			});
	};

	return (
		<div>
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<div className="container" style={{ backgroundColor: "#99e3e8", width: "600px", marginLeft: "450px" }}>
				<div className="container mx-auto py-8">
					<h1 className="text-3xl font-bold mb-4 text-center">Release Stock</h1>
					<form onSubmit={handleSubmit} className="max-w-lg mx-auto">
						<div className="mb-4">
							<label className="block mb-2 font-semibold text-gray-700">Order Id:</label>
							<input
								type="text"
								value={subject}
								onChange={(e) => setSubject(e.target.value)}
								className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
							/>
						</div>
						<div className="mb-4">
							<label className="block mb-2 font-semibold text-gray-700">Description:</label>
							<textarea
								value={text}
								onChange={(e) => setText(e.target.value)}
								className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
							></textarea>
						</div>
						<button
							type="submit"
							className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
						>
							Submit
						</button>
					</form>
					<p className="text-red-500 mt-4 text-center">{message}</p>
				</div>
			</div>
		</div>
	);
}
