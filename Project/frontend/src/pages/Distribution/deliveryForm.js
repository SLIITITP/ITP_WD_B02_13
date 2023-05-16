import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';

export default function AddDelivery(){

	const[deliveryid,setDeliveryid] = useState("");
	const[fname,setFname] = useState("");
	const[lname,setLname] = useState("");
	const[telephone,setTelephone] = useState("");
	const[address,setAddress] = useState("");
	const[city,setCity] = useState("");
	const[postalCode,setPostalcode] = useState("");
	const[deliveryCompany,setDeliverycompany] = useState([]);
	const[deliveryOption,setDeliveryoption] = useState("");

	const [details, setDetails] = useState(null);
	const { id } = useParams();

	const[DelAmount , SetDelAmount ] = useState("");

	const [selectedDeliveryCompany, setSelectedDeliveryCompany] = useState(null);
	const [deliveryCharge, setDeliveryCharge] = useState(null);
	

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


	function sentData1(e){
        e.preventDefault();
        console.log("Delivery added")
        const newDelivery = {

            deliveryid,
            fname,
            lname,
            telephone,
            address,
            city,
            postalCode,
            deliveryCompany,
            deliveryOption

        }

        axios.post("http://localhost:8070/delidetails/add", newDelivery).then(()=>{
            alert("Delivery added")
            setDeliveryid("");
            setFname("");
            setLname("");
            setTelephone("");
            setCity("");
            setAddress("");
            setPostalcode("");
            setDeliverycompany("");
            setDeliveryoption("");

        }).catch((err)=>{
            alert(err);
		})
	}

	useEffect(()=>{
		axios.get('http://localhost:8070/order/getLastOrder/')

		 .then(response => {

		 // handle the response data here

			 console.log(response.data[0]._id);

			 const id = response.data[0]._id;

			setDetails(response.data);

	 })
	 .catch(error => {

				 // handle the error here
		
				 console.error(error);
		
				 });
		
			 }, [id])

			
		   
			 useEffect(() => {
			   // Fetch the list of delivery companies from the backend
			   axios.get('http://localhost:8070/company/${companyname}')
				 .then(res => setDeliverycompany(res.data))
				 .catch(err => console.error(err));
			 }, []);
		   
			 const handleDeliveryCompanyChange = (event) => {
			   // Update the selected delivery company and delivery charge when the user selects a delivery company from the dropdown list
			   const selectedDeliveryCompany = deliveryCompany.find(company => company.companyname === event.target.value);
			   setSelectedDeliveryCompany(selectedDeliveryCompany);
			   setDeliveryCharge(selectedDeliveryCompany.deliverycharge);
			 }
					 

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
											
											required
										/>
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
											
											required
										/>
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

											
											required
										/>
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
											
											required
										/>
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
											
											required
										/>
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
											
											required
										/>
									</div>
								</div>

								
                                <div className="grid gap-6 mb-6 md:grid-cols-2">
									<div>
										<label htmlFor="fname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
											Delivery Company
										</label>

										<select id="companyName" name="cardType" className="border-gray-900 from-gray-900 text-blue-600 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                {deliveryCompany && deliveryCompany.map((company) =>(
                                    <option value= "" key = {company._id}>{company.companyname}</option>
                   			))}
				   						</select>  
									</div>

									<div>
										<label htmlFor="lname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
										Delivery Method
										</label>
										
                                        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                <option selected="selected"> - </option>
                                                <option>Pick Up</option>
                                                <option>Delivery</option>

												onChange={(e)=>{   // onChange Function --- occuring this one continuously
                        						setDeliveryoption(e.target.value)}}
                 	                </select>
									</div>
               
								</div>
						
								<button
									type="submit"
									className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">

									Calculate
								</button>
                           
								<p className="text-sm font-light text-gray-500 dark:text-gray-400">
									Order Id     xxx<br/>
									Estimated Delivery Date  xx/xx/20xx <br/><br/>
                                    Delivery Charges <br/>
                                    <br/>
                                    Total Amount  Rs.XXXXXX <br/><br/>

									<button type="submit" className="btnsubmit" onClick={sentData1}>Submit</button>
								</p>
							</form>
						</div>
					</div>
				</div>
			</section>
			<br />
			<br />
		</div>
    );
}
