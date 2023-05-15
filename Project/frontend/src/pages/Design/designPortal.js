import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Design/designPortal.css";
import "../Design/js/portal";

import green from "./images/green.jpg";
import mehroon from "./images/mehroon.jpg";
import navyblue from "./images/navyblue.jpg";
import red from "./images/red.jpg";
import white from "./images/white.jpg";
import yellow from "./images/yellow.jpg";

export default function DesignPortal() {
	const [templates, setTemplates] = useState([]);
	const [materials, setMaterials] = useState([]);
	const [printtypes, setPrintTypes] = useState([]);
	const [totalAmount, setTotalAmount] = useState([]);
	const [selectedTemplate, setSelectedTemplate] = useState([]);
	const [selectedPrintType, setSelectedPrintType] = useState([]);
	const [selectedMaterial, setSelectedMaterial] = useState([]);

	useEffect(() => {
		const fetchTemplates = async () => {
			const response = await fetch("http://localhost:8070/template");
			const json = await response.json();

			if (response.ok) {
				setTemplates(json);
			}
		};
		fetchTemplates();

		const fetchPrintTypes = async () => {
			const response = await fetch("http://localhost:8070/printType");
			const json = await response.json();

			if (response.ok) {
				setPrintTypes(json);
			}
		};
		fetchPrintTypes();

		const fetchMaterials = async () => {
			const response = await fetch("http://localhost:8070/material");
			const json = await response.json();

			if (response.ok) {
				setMaterials(json);
			}
		};
		fetchMaterials();
	}, []);

	// function calculateTotal() {

	//     // Get the selected values
	//     const templateId = document.querySelector("#templateSelect").value;
	//     const printTypeId = document.querySelector("#printTypeSelect").value;
	//     const materialId = document.querySelector("#materialSelect").value;

	//     // Find the selected template, print type, and material in the arrays
	//    // const selectedTemplate = templates.find(template => template._id.cost === templateId);
	//     //const selectedPrintType = printtypes.find(printType => printType._id.cost === printTypeId);
	//     //const selectedMaterial = materials.find(material => material._id.cost === materialId);
	//     //console.log(selectedTemplate);

	//     // Calculate the total amount
	//     setTotalAmount(selectedTemplate + selectedPrintType + selectedMaterial);

	//     // Update the UI with the total amount
	//     document.querySelector("#totalAmount").textContent = totalAmount;
	//   }

	const getTemplateCost = async (id) => {
		const response = await axios.get("http://localhost:8070/template/" + id);
		setSelectedTemplate(response.data.cost);
		//console.log(selectedTemplate)
	};
	const getPrintTypeCost = async (id) => {
		const response = await axios.get("http://localhost:8070/printType/" + id);
		setSelectedPrintType(response.data.cost);
		//console.log(selectedPrintType)
	};
	const getMaterialCost = async (id) => {
		const response = await axios.get("http://localhost:8070/material/" + id);
		setSelectedMaterial(response.data.cost);
		//console.log(selectedMaterial)
	};

	const calculateTotal = (selectedTemplate, selectedPrintType, selectedMaterial) => {
		const totalAmount = 1500 + selectedTemplate + selectedPrintType + selectedMaterial;
		setTotalAmount(totalAmount);
	};

	//Calculate the total amount
	useEffect(() => {
		if (selectedTemplate && selectedPrintType && selectedMaterial) {
			calculateTotal(selectedTemplate, selectedPrintType, selectedMaterial);
		}
	}, [selectedTemplate, selectedPrintType, selectedMaterial]);

	// Update the UI with the total amount
	//document.querySelector("#totalAmount").textContent = totalAmount;

	return (
		<div>
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<div class="popup" id="popup">
				<div id="modal">
					<div class="finalBoard" id="finalBoard">
						<img id="final-img" src="" alt="" />
						<p id="finaltext"></p>
						<div id="finalimage"></div>
					</div>
					<div class="information">
						<h1>Design Details</h1>
						<h4>This is your final product</h4>
						<div class="row">
							<span>Size</span>
							<p id="finalsizepreview"></p>
						</div>
						<div class="row">
							<span>Quantity</span>
							<p id="finalquantity"></p>
						</div>
						<div class="row">
							<span>Text</span>
							<p id="finaltextpreview"></p>
						</div>
						<div class="row">
							<span>Text Color</span>
							<p id="textcolorpreview"></p>
						</div>
						<div class="row">
							<span>Text Size</span>
							<p id="textsizepreview"></p>
						</div>
						<div class="row">
							<span>Text Weigth</span>
							<p id="textweightpreview"></p>
						</div>
						<div class="row">
							<span>Text Style</span>
							<p id="textstylepreview"></p>
						</div>
						<div class="row">
							<span>Text Decoration</span>
							<p id="textdecorationpreview"></p>
						</div>
						<button class="btn-light" id="close">
							Close
						</button>
					</div>
				</div>
			</div>

			<div class="main-content">
				<div class="header">
					<h1>Design Portal</h1>
				</div>
				<div id="tshirtBoard" class="tshirtBoard">
					<img id="preview-img" src={white} />
					<p id="text"></p>
					<div id="image" class="image"></div>
				</div>
				<div class="collection-row">
					<img
						id="green-tshirt"
						onclick="swap(document.getElementById('preview-img').src , this.src , this.id)"
						src={green}
						alt=""
					/>
					<img
						id="mehroon-tshirt"
						onclick="swap(document.getElementById('preview-img').src , this.src , this.id)"
						src={mehroon}
						alt=""
					/>
					<img
						id="navyblue-tshirt"
						onclick="swap(document.getElementById('preview-img').src , this.src , this.id)"
						src={navyblue}
						alt=""
					/>
					<img
						id="red-tshirt"
						onclick="swap(document.getElementById('preview-img').src , this.src , this.id)"
						src={red}
						alt=""
					/>
					<img
						id="yellow-thsirt"
						onclick="swap(document.getElementById('preview-img').src , this.src , this.id)"
						src={yellow}
						alt=""
					/>
				</div>
			</div>

			<div class="container">
				<div class="sidebar">
					<div class="heading">
						<h1>Add Your Text Here</h1>
					</div>
					<div class="row">
						<input type="text" class="fullWidth-input" id="tshirt_text" />
					</div>
					<div class="row">
						<label for="text-size">Font Size</label>
						<input class="small-input" type="text" id="text-size" maxlength="2" />
					</div>
					<div class="row">
						<label for="bold">Font Bold</label>
						<input type="checkbox" class="check" id="bold" />
					</div>

					<div class="row">
						<label for="size">Italic</label>
						<input type="checkbox" class="check" id="italic" />
					</div>

					<div class="row">
						<label for="size">Underline</label>
						<input type="checkbox" class="check" id="underline" />
					</div>
					<div class="row">
						<label for="text-color">Text Color</label>
						<input
							id="text-color"
							type="color"
							value="#000000"
							onchange="updateColor(this)"
							onkeyup="updateColor(this)"
						/>
					</div>
				</div>

				<div class="sidebar">
					<div className="dropdowns">
						<div className="heading row">
							<h4>Select Template</h4>
							<div className="templates">
								<select onChange={(event) => getTemplateCost(event.target.value)}>
									<option value=""></option>
									{templates &&
										templates.map((template) => (
											<option key={template._id} value={template._id}>
												{template.templatename}
											</option>
										))}
								</select>
							</div>
						</div>

						<div class="heading row">
							<h4>Select Print Type</h4>
							<div className="templates">
								<select onChange={(event) => getPrintTypeCost(event.target.value)}>
									<option value=""></option>
									{printtypes &&
										printtypes.map((printType) => (
											<option key={printType._id} value={printType._id}>
												{printType.name}
											</option>
										))}
								</select>
							</div>
						</div>

						<div class="heading row">
							<h4>Select Product Material</h4>
							<div className="templates">
								<select onChange={(event) => getMaterialCost(event.target.value)}>
									<option value=""></option>
									{materials &&
										materials.map((material) => (
											<option key={material._id} value={material._id}>
												{material.name}
											</option>
										))}
								</select>
							</div>
						</div>
					</div>

					<div class="row">
						<div class="col-md-3">
							<label for="quantity">Your Total Amount per T-shirt (LKR)</label>
						</div>
						<div class="col-md-9">
							<input
								className="small-input"
								type="text"
								id="totalAmount"
								maxlength="3"
								defaultValue={totalAmount}
								readOnly
							/>
						</div>
					</div>

					<div className="row">
						<button id="purchase" class="fluid blue-light">
							Proceed To Checkout
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
