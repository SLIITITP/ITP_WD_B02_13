import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';

export default function AddDelivery(){

	// const[deliveryid,setDeliveryid] = useState("");
	const[fname,setFname] = useState("");
	const[lname,setLname] = useState("");
	const[telephone,setTelephone] = useState("");
	const[address,setAddress] = useState("");
	const[city,setCity] = useState("");
	const[postalCode,setPostalcode] = useState("");
	const[totalAmount,setTotalAmount] = useState("");

	const[deliveryCompany,setDeliverycompany] = useState([]);

	const[selectedDeliveryCompany,setSelectedCompany] = useState("");
	const[deliveryOption,setDeliveryoption] = useState("");
	const[selectedDeliveryCompanyCost,setSelectedDeliveryCompanyCost] = useState("");

	const[orderDetails,setOrderDetails] = useState([]);
	const[setInvoice] = useState("");
	const{id} = useParams();


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

	const calculateTotal = (selectedDeliveryCompanyCost) => {
		const totalAmount =  selectedDeliveryCompanyCost;
		console.log(totalAmount);
		setTotalAmount(totalAmount);
	};



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
        		deliveryOption: deliveryOption,
		});

		console.log("Added", response.data);

		
		
		//reset the form fields
		setFname("");
		setLname("");
		setTelephone("");
		setAddress("");
		setCity("");
		setPostalcode("");
		// setSelectedCompany("");
		// setDeliveryoption("");

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
											type=" "
											name="phone"
											id="phone"
											className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											placeholder="07xxxxxxxx" maxLength='10'
											onChange={(e)=>{   // onChange Function --- occuring this one continuously
												setTelephone(e.target.value)
							  				}}

											required/>
									</div>
									<div>
										<label htmlFor="lname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
											Address
										</label>
										<input
											type="text"
											id="address"
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

										{/* <select value={companyname} 
										onChange={(e)=>{   // onChange Function --- occuring this one continuously
											setDeliverycompany(e.target.value)}}
										id="companyName" name="companyName" className="border-gray-900 from-gray-900 text-blue-600 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                {deliveryCompany && deliveryCompany.map((company) =>(
                                    <option key= {company.companyname} value={company.companyname}> {company.companyname} </option>
                   			))}
				   						</select>   */}

										<select  onChange={(event)=>getDeleiveryCompanyCharge(event.target.value)}>
											<option value=""></option>
											{deliveryCompany && deliveryCompany.map((company) =>(
											<option key={company._id} value={company._id}> {company.companyname} </option>	
											))}
											</select>
									</div>

									<div>
										<label htmlFor="lname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
										Delivery Method
										</label>
										
                                        <select  onChange={(e)=>{   // onChange Function --- occuring this one continuously
                        						setDeliveryoption(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                <option selected="selected"> - </option>
                                                <option value={"Pick Up"}>Pick Up</option>
                                                <option value={"Delivery"}>Delivery</option>


                 	                </select>
									</div>
               
								</div>
						
								<label
									type="submit"
									className=" focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
									Your Order Amount : 
								</label>
		
			
								{orderDetails.payable} LKR<br/>
                                    <br/>
									<label
									type="submit"
									className=" focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
									Total Amount after adding the delivery charges :
								</label>
                                      {} LKR<br/><br/>
									<button type="submit" className="btnsubmit" onClick={sentData1}>Submit</button>
							
							</form>
						</div>
					</div>
				</div>
			</section>
			<br /><br />
		</div>
    );
}
