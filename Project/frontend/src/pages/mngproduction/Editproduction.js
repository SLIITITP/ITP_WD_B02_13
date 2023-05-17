import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import Swal from "sweetalert2";

export default function Uproduction() {
	
	const { id } = useParams();

	const [data, setData] = useState([]);
	const [name, setname] = useState("");
	const [date, setdate] = useState("");
	const [material, setmaterial] = useState("");
	const [machine, setmachine] = useState("");
    const [employee, setemployee] = useState("");
	const [description, setdescription] = useState("");


	useEffect(() => {
		const getProduction = async () => {
			const res = await axios.get(`http://localhost:8070/production/get/${id}`);
			console.log(res.data);
			setData(res.data);

			setname(res.data.name);
			setdate(res.data.date);
			setmaterial(res.data.material);
			setmachine(res.data.machine);
            setemployee(res.data.employee);
			setdescription(res.data.description);
		};
		getProduction();
	}, [id]);

	const handleSubmit = (e) => {
		e.preventDefault();

		const UProduction = {
			name,
			date,
			material,
			machine,
            employee,
			description,
		};

		axios
			.put(`http://localhost:8070/production/update/${id}`, UProduction)
			.then((response) => {
				console.log(response.data);
				Swal.fire({
					icon: "success",
					title: "Production Details Updated",
					timer: 1500,
					showConfirmButton: false
				});
                window.location.href = "/allproduct";
				// show success message or redirect to another page
			})
			.catch((error) => {
				console.log(error);
				// show error message
			});
	};

	return (
		<div>
			<br />
			<br />
			<br />
			<br />
			<div className="container" style={{ width: "1000px", margin: "auto", backgroundColor: "#438FC1" }}>
				<div
					style={{
						marginTop: "50px",
						backgroundColor: "#438FC1",
						padding: "20px",
						boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
						borderRadius: "5px",
					}}
				>
					<div
						style={{
							marginBottom: "30px",
							textAlign: "center",
						}}
					>
						<h3
							style={{
								color: "Black",
								fontSize: "30px",
								marginTop: "0px",
								fontWeight: "bold",
							}}
						>
							Update Production Details
						</h3>
					</div>
					<form onSubmit={handleSubmit}>
						<div style={{ marginBottom: "20px" }}>
							<label
								htmlFor="name"
								style={{
									display: "block",
									fontSize: "18px",
									marginBottom: "10px",
								}}
							>
								Production Name
							</label>
							<input
								type="text"
								className="form-control"
								defaultValue={data.name}
								onChange={(e) => setname(e.target.value)}
								style={{
									width: "100%",
									padding: "10px",
									borderRadius: "5px",
									border: "1px solid #CCC",
									fontSize: "16px",
								}}
							/>
						</div>
						<div style={{ marginBottom: "20px" }}>
							<label
								htmlFor="code"
								style={{
									display: "block",
									fontSize: "18px",
									marginBottom: "10px",
								}}
							>
								Date
							</label>
							<input
								type="text"
								className="form-control"
								defaultValue={data.date}
								onChange={(e) => setdate(e.target.value)}
								style={{
									width: "100%",
									padding: "10px",
									borderRadius: "5px",
									border: "1px solid #CCC",
									fontSize: "16px",
								}}
							/>
						</div>

						<div style={{ marginBottom: "20px" }}>
							<label
								htmlFor="code"
								style={{
									display: "block",
									fontSize: "18px",
									marginBottom: "10px",
								}}
							>
								Material
							</label>
							<input
								type="text"
								className="form-control"
								defaultValue={data.material}
								onChange={(e) => setmaterial(e.target.value)}
								style={{
									width: "100%",
									padding: "10px",
									borderRadius: "5px",
									border: "1px solid #CCC",
									fontSize: "16px",
								}}
							/>
						</div>

						<div style={{ marginBottom: "20px" }}>
							<label
								htmlFor="code"
								style={{
									display: "block",
									fontSize: "18px",
									marginBottom: "10px",
								}}
							>
								Machine Quantity
							</label>
							<input
								type="text"
								className="form-control"
								defaultValue={data.machine}
								onChange={(e) => setmachine(e.target.value)}
								style={{
									width: "100%",
									padding: "10px",
									borderRadius: "5px",
									border: "1px solid #CCC",
									fontSize: "16px",
								}}
							/>
						</div>
                        
                        						<div style={{ marginBottom: "20px" }}>
							<label
								htmlFor="code"
								style={{
									display: "block",
									fontSize: "18px",
									marginBottom: "10px",
								}}
							>
								Employee Quantity
							</label>
							<input
								type="number"
								className="form-control"
								defaultValue={data.employee}
								onChange={(e) => setemployee(e.target.value)}
								style={{
									width: "100%",
									padding: "10px",
									borderRadius: "5px",
									border: "1px solid #CCC",
									fontSize: "16px",
								}}
							/>
						</div>


						<div style={{ marginBottom: "20px" }}>
							<label
								htmlFor="description"
								style={{
									display: "block",
									fontSize: "18px",
									marginBottom: "10px",
								}}
							>
								Description
							</label>
							<input
								type="text"
								className="form-control"
								value={data.description}
								onChange={(e) => setdescription(e.target.value)}
								style={{
									width: "100%",
									padding: "10px",
									borderRadius: "5px",
									border: "1px solid #CCC",
									fontSize: "16px",
								}}
							/>
						</div>
                        
						<button
							type="submit"
							className="register"
							style={{
								background: "#f0c967",
								color: "white",
								border: "none",
								padding: "0.5rem",
								borderRadius: "0.5rem",
								cursor: "pointer",
								width: "100px",
							}}
                            
						>
							Update
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}