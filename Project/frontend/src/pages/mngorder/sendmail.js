import React, { useState } from "react";
import axios from "axios";

export default function SendMail() {
	const [toEmail, setToEmail] = useState("");
	const [subject, setSubject] = useState("");
	const [text, setText] = useState("");
	const [message, setMessage] = useState("");

	// Function to handle the form submission
	const handleSubmit = (e) => {
		e.preventDefault();

		axios
			.post("http://localhost:8070/stock//send-email", { toEmail, subject, text })
			.then((res) => {
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
			<div className="container" style={{backgroundColor:"white", width:"500px"}}>
				<div className="container mx-auto py-8">
					<h1 className="text-3xl font-bold mb-4 text-center">Send Email</h1>
					<form onSubmit={handleSubmit} className="max-w-lg mx-auto">
						<div className="mb-4">
							<label className="block mb-2 font-semibold text-gray-700">To:</label>
							<input
								type="email"
								value={toEmail}
								onChange={(e) => setToEmail(e.target.value)}
								className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
							/>
						</div>
						<div className="mb-4">
							<label className="block mb-2 font-semibold text-gray-700">Subject:</label>
							<input
								type="text"
								value={subject}
								onChange={(e) => setSubject(e.target.value)}
								className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
							/>
						</div>
						<div className="mb-4">
							<label className="block mb-2 font-semibold text-gray-700">Text:</label>
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
							Send Email
						</button>
					</form>
					<p className="text-red-500 mt-4 text-center">{message}</p>
				</div>
			</div>
		</div>
	);
}
