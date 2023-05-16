import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Design/designPortal.css";
import "../Design/js/portal";

export default function DesignPortal() {
	const [templates, setTemplates] = useState([]);
	const [materials, setMaterials] = useState([]);
	const [printtypes, setPrintTypes] = useState([]);

	const [totalAmount, setTotalAmount] = useState([]);
	const [selectedTemplate, setSelectedTemplate] = useState([]);
	const [selectedPrintType, setSelectedPrintType] = useState([]);
	const [selectedMaterial, setSelectedMaterial] = useState([]);

	//T-shirt designs
	const greenimageUrl =
		"https://firebasestorage.googleapis.com/v0/b/project1-62588.appspot.com/o/client%2FImageefb74d45-8f88-4b11-9ac9-c3ad575b1895?alt=media&token=e276e0d6-e504-4fc5-afc8-7663403fc185";
	const meroonimageUrl =
		"https://firebasestorage.googleapis.com/v0/b/project1-62588.appspot.com/o/client%2FImagedf693a96-f889-4454-a11f-86bede99a18b?alt=media&token=ceb8ab6a-7ed6-4d56-a155-83f2aba4936e";
	const navyBlueimageUrl =
		"https://firebasestorage.googleapis.com/v0/b/project1-62588.appspot.com/o/client%2FImage4cad7da0-0af9-4c86-ab70-2da509e508b5?alt=media&token=57d355da-b0e4-4f97-8a55-979b1734ee2b";
	const redimageUrl =
		"https://firebasestorage.googleapis.com/v0/b/project1-62588.appspot.com/o/client%2FImage13b15ee9-4267-4451-b1e1-29754111329a?alt=media&token=db0ee1f2-073c-4a07-8cae-c43056b18ae1";
	const yellowimageUrl =
		"https://firebasestorage.googleapis.com/v0/b/project1-62588.appspot.com/o/client%2FImage9794f591-4bd1-4680-ad10-b9a07c813c1a?alt=media&token=e0de130c-a1a4-4a7b-8a86-31cdac493fe2";
	const whiteimageUrl =
		"https://firebasestorage.googleapis.com/v0/b/project1-62588.appspot.com/o/client%2FImagef929f945-707d-4e15-b329-988f6c6244a1?alt=media&token=c43d7aea-843b-4ed6-8354-4ebe7fd42ea9";

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

	// Get the selected template, print type and material
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

	function swapImage(color) {
		const previewImg = document.getElementById("preview-img");
		previewImg.src = color;
	}

	return (
		<div>
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<div className="popup" id="popup">
				<div id="modal">
					<div className="finalBoard" id="finalBoard">
						<img id="final-img" src="" alt="" />
						<p id="finaltext"></p>
						<div id="finalimage"></div>
					</div>
					<div className="information">
						<h1>Design Details</h1>
						<h4>This is your final product</h4>
						<div className="row">
							<span>Size</span>
							<p id="finalsizepreview"></p>
						</div>
						<div className="row">
							<span>Quantity</span>
							<p id="finalquantity"></p>
						</div>
						<div className="row">
							<span>Text</span>
							<p id="finaltextpreview"></p>
						</div>
						<div className="row">
							<span>Text Color</span>
							<p id="textcolorpreview"></p>
						</div>
						<div className="row">
							<span>Text Size</span>
							<p id="textsizepreview"></p>
						</div>
						<div className="row">
							<span>Text Weigth</span>
							<p id="textweightpreview"></p>
						</div>
						<div className="row">
							<span>Text Style</span>
							<p id="textstylepreview"></p>
						</div>
						<div className="row">
							<span>Text Decoration</span>
							<p id="textdecorationpreview"></p>
						</div>
						<button className="btn-light" id="close">
							Close
						</button>
					</div>
				</div>
			</div>

			<div className="main-content">
				<div className="header">
					<h1>Design Portal</h1>
				</div>
				<div id="tshirtBoard" className="tshirtBoard">
					<img id="preview-img" src={whiteimageUrl} alt="" />
					<p id="text"></p>
					<div id="image" className="image"></div>
				</div>
				<div className="collection-row">
					<img id="green-tshirt" onClick={() => swapImage(greenimageUrl)} src={greenimageUrl} alt="" />
					<img id="mehroon-tshirt" onClick={() => swapImage(meroonimageUrl)} src={meroonimageUrl} alt="" />
					<img id="navyblue-tshirt" onClick={() => swapImage(navyBlueimageUrl)} src={navyBlueimageUrl} alt="" />
					<img id="red-tshirt" onClick={() => swapImage(redimageUrl)} src={redimageUrl} alt="" />
					<img id="yellow-thsirt" onClick={() => swapImage(yellowimageUrl)} src={yellowimageUrl} alt="" />
					<img id="white-thsirt" onClick={() => swapImage(whiteimageUrl)} src={whiteimageUrl} alt="" />
				</div>
			</div>

			<div className="container">
				<div className="sidebar">
					<div className="heading">
						<h1>Add Your Text Here</h1>
					</div>
					<div className="row">
						<input type="text" class="fullWidth-input" id="tshirt_text" />
					</div>
					<div className="row">
						<label for="text-size">Font Size</label>
						<input class="small-input" type="text" id="text-size" maxlength="2" />
					</div>
					<div className="row">
						<label for="bold">Font Bold</label>
						<input type="checkbox" className="check" id="bold" />
					</div>

					<div className="row">
						<label for="size">Italic</label>
						<input type="checkbox" className="check" id="italic" />
					</div>

					<div className="row">
						<label for="size">Underline</label>
						<input type="checkbox" className="check" id="underline" />
					</div>
					<div className="row">
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

				<div className="sidebar">
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

						<div className="heading row">
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

						<div className="heading row">
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

					<div className="row">
						<div className="col-md-3">
							<label for="quantity">Your Total Amount per T-shirt </label>
						</div>
						<div className="col-md-9">
							<input
								className="small-input"
								type="text"
								id="totalAmount"
								maxlength="3"
								defaultValue={totalAmount}
								readOnly
							/>
							<label for="quantity">LKR</label>
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
