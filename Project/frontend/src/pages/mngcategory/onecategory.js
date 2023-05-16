import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Onecategory() {
	const [category, setcategory] = useState({});
	const { id } = useParams();
	useEffect(() => {
		console.log(id);
		async function handleSubmit() {
			await axios
				.get(`http://localhost:8070/stock/getcategory/${id}`)
				.then((res) => {
					setcategory(res.data);
					console.log(res.data);
				})
				.catch((err) => {
					alert(err);
				});
		}
		handleSubmit();
	}, [id]);

	return (
		<div>
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<div className="container">
				<div className="title">Category Details</div>
				<div className="content">
					<form>
						<div className="user-details">
							<div className="input-box">
								<span className="details">Category Name</span>
								<input type="text" placeholder="Enter category name " value={category.Category_Name} />
							</div>

							<div className="input-box">
								<span className="details">Category Code</span>
								<input type="text" placeholder="Enter category code " value={category.Category_Code} />
							</div>
						</div>

						<div>
							<br/>
							<div className="detailstxt">
								<div className="input-box">
									<span className="details">Description</span>
									<textarea className="form-control" value={category.Description}></textarea>
								</div>
							</div>
						</div>
						<br />
					</form>
				</div>
			</div>
		</div>
	);
}
