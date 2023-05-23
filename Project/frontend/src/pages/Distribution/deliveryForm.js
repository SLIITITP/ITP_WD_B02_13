import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

export default function AddDelivery(){
const navigate = useNavigate();
const[fname,setFname] = useState("");
const[lname,setLname] = useState("");
const[telephone,setTelephone] = useState("");
const[address,setAddress] = useState("");
const[city,setCity] = useState("");
const[postalCode,setPostalcode] = useState("");
const[totalAmount,setTotalAmount] = useState("");

const[deliveryCompany,setDeliverycompany] = useState([]);

const[selectedDeliveryCompany,setSelectedCompany] = useState("");
const[selectedDeliveryCompanyCost,setSelectedDeliveryCompanyCost] = useState("");

const[orderDetails,setOrderDetails] = useState([]);
const[setInvoice] = useState("");
const{id} = useParams();

const[orderTotal,setOrderTotal] = useState("");

useEffect(() => {
async function fetchOrder() {
console.log(id);
try {
	const response = await axios.get('http://localhost:8070/order/getLastOrder/');
	// handle the response data here
	const Oid = response.data[0]._id;
	// setInvoice(Oid);
	console.log(Oid);

	// Fetch order details using the orderId
	const orderDetailsResponse = await axios.get(`http://localhost:8070/order/invoice/${Oid}`);

	// handle the order details response data here
	const orderDetails = orderDetailsResponse.data;
	console.log("Fetching order details...");
	console.log(orderDetails);

	setOrderDetails(orderDetails);
	setOrderTotal(orderDetailsResponse.data.payable)
	console.log(orderTotal);

} catch (error) {
	alert(error);
}
}
fetchOrder();
}, []);

useEffect(() => {
const fetchCompanyNames = async () => {
const response = await fetch("http://localhost:8070/company")
const json = await response.json();

if(response.ok){
	setDeliverycompany(json);
}
}
fetchCompanyNames();

},[]);

const getDeleiveryCompanyCharge = async (id) => {
const response = await axios.get("http://localhost:8070/company/" +id);
// console.log(response);
setSelectedCompany(response.data.companyname);
setSelectedDeliveryCompanyCost(response.data.deliverycharge);
console.log(selectedDeliveryCompany);
};

const calculateTotal = (selectedDeliveryCompanyCost, orderTotal) => {
const totalAmount =  selectedDeliveryCompanyCost + orderTotal;
console.log(totalAmount);
setTotalAmount(totalAmount);
};

//Calculate the total amount
useEffect(() => {
if (selectedDeliveryCompanyCost && orderTotal) {
calculateTotal(selectedDeliveryCompanyCost, orderTotal);
}
}, [selectedDeliveryCompanyCost, orderTotal]);

const sentData1 = async(e)=> {
e.preventDefault();
console.log("Delivery added");

try{
const response = await axios.post("http://localhost:8070/delidetails/add",{	
	fname: fname,
	lname: lname,
	telephone: telephone,
	address: address,
	city: city,
	postalCode: postalCode,
	deliveryCompany: selectedDeliveryCompany,
	totalAmount: totalAmount,
});
Swal.fire({
	icon: "success",
	title: "Delivery Details Added",
	timer: 1500,
	showConfirmButton: false,
});
navigate("/payment");
console.log("Added", response.data);

//reset the form fields
setFname("");
setLname("");
setTelephone("");
setAddress("");
setCity("");
setPostalcode("");

}catch(err){
console.log(err);
}
};
return(
<div className="cusreg">
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<section className="bg-gray-50 dark: cusregsec">
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 cusregcard">
			<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-l xl:p-0 dark:bg-gray-800 dark:border-gray-700 cusregform">
			<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
			<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
				Delivery Details
			</h1>	
				<form>
					{/* name  */}
					<div className="grid gap-6 mb-6 md:grid-cols-2">
						<div>
							<label htmlFor="fname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
								First name
							</label>
							<input
								type="text"
								id="fname"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder="John" onChange={(e)=>{   // onChange Function --- occuring this one continuously
									setFname(e.target.value)
							}}
								required/>
						</div>
						<div>
							<label htmlFor="lname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
								Last name
							</label>
							<input
								type="text"
								id="lname"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder="Doe"
								onChange={(e)=>{   // onChange Function --- occuring this one continuously
									setLname(e.target.value)
							}}
								required/>
						</div>
					</div>
					<div className="grid gap-6 mb-6 md:grid-cols-2">
						<div>
							<label htmlFor="fname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
								Telephone Number
							</label>
							<input
								type="tel"
								name="phone"
								id="phone"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder="07xxxxxxxx"
								maxLength="10"
								pattern="[0-9]{10}" // Pattern for 10-digit phone number
								onChange={(e) => {
									setTelephone(e.target.value);
								}}
								required
								/>
								{telephone.length !== 10 && (
								<p className="text-red-500 text-xs mt-1">Please enter a valid phone number.</p>
								)}
						</div>
						<div>
							<label htmlFor="lname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
								Address
							</label>
							<input
								type="text"
								id="address"
								color="white"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder="Colombo Road,Negombo"
								onChange={(e)=>{   // onChange Function --- occuring this one continuously
									setAddress(e.target.value)
							}}
								required/>
						</div>
					</div>
					<div className="grid gap-6 mb-6 md:grid-cols-2">
						<div>
							<label htmlFor="fname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
								City
							</label>
							<input
								type="text"
								id="city"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder="Colombo"
								onChange={(e)=>{   // onChange Function --- occuring this one continuously
									setCity(e.target.value)
							}}
								required/>
						</div>
						<div>
							<label htmlFor="lname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
								Postal Code
							</label>
							<input
								type="text"
								id="postalCode"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder="265456"
								onChange={(e)=>{   // onChange Function --- occuring this one continuously
									setPostalcode(e.target.value)
								}}
								required/>
						</div>
					</div>
					<div className="grid gap-6 mb-6 md:grid-cols-2">
						<div>
							<label htmlFor="fname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
								Delivery Company
							</label>

							<select  onChange={(event)=>getDeleiveryCompanyCharge(event.target.value)}>
								<option value=""></option>
								{deliveryCompany && deliveryCompany.map((company) =>(
								<option key={company._id} value={company._id}> {company.companyname} </option>	
								))}
								</select>
						</div>
					</div>
					<div style={{ border: "1px solid black", padding: "10px" }}>
							<label
								type="submit"
								className="focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
							>
								Your Order Amount:
							<span>   {orderDetails.payable}  LKR</span>
							</label>
							<br />
							<br />
							<label
								type="submit"
								className="focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
							>
								Total Amount after adding the delivery charges : {totalAmount} LKR<br/><br/>
							</label><br/>
							</div>
							<br/>
							<button
							type="submit"
							className="btnsubmit"
							onClick={sentData1}
							style={{ marginLeft: "auto", color: "white", backgroundColor: "black", border: "1px solid black" }}>
							Proceed To Pay
							</button>
				</form>
			</div>
		</div>
	</div>
</section>
<br /><br />
</div>
);
}
