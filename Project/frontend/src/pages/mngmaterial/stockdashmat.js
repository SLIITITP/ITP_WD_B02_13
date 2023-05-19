import React from "react";
import backimage from "../stockimg/tshirt.jpg";

export default function Dashmat() {
	const containerStyle = {
		display: "flex",
		backgroundImage: `url(${backimage})`,
		backgroundPosition: "center",
	};

	const buttonContainerStyle = {
		textAlign: "center",
		margin: "auto",
		marginTop: "120px",
	};

	const buttonStyle = {
		backgroundColor: "#4CAF50",
		color: "white",
		padding: "12px 24px",
		border: "none",
		borderRadius: "4px",
		cursor: "pointer",
	};

	return (
		<div>
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<div>
				<h1 style={{ fontSize: "35px", marginLeft: "620px", marginBottom: "20px" }}> Stock Dashboard </h1>
				<div style={{ display: "flex", flexWrap: "wrap", marginLeft: "200px" }}>
					<div className="container" style={{ width: "500px", height: "300px", margin: "30px", ...containerStyle }}>
						<div style={buttonContainerStyle}>
							<a href="/addmaterial">
								<button style={buttonStyle}> Add Material </button>
							</a>
						</div>
					</div>
					<div className="container" style={{ width: "500px", height: "300px", margin: "30px", ...containerStyle }}>
						<div style={buttonContainerStyle}>
							<a href="allmaterial">
								<button style={buttonStyle}> All Material </button>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
