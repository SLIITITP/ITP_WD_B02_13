import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Swal from 'sweetalert2'

import { useParams } from "react-router-dom";

export default function Service() {

	const cid = localStorage.getItem("clientID") ;
	const [clDesigns, setClDesigns] = useState([]);

	const[orderDetails, setOrderDetails] = useState([]);
	const[invoice,setInvoice] = useState([]);

	const { id } = useParams();

    // const [allClientDesigns, setAllClientDesigns] = useState([]);

    function getClientDesigns(){
        axios
        .get(`http://localhost:8070/clientDesign/clientAll/${cid}`)
        .then((response) => {
            console.log(response.data);
            setClDesigns(response.data)
        })
        .catch((error) => {
            console.log(error);
		});
}
	
         useEffect(() => {
			getClientDesigns()
					}, [ ]);

                    const handleDelete = (id) => {
											axios.delete(`http://localhost:8070/clientDesign/delete/${id}`).then((res) => {
												console.log(res.data);
												setClDesigns((prevData) => prevData.filter((clientDesign) => clientDesign._id !== id));
											});
											Swal.fire({
												icon: 'success',
												title: 'Succesfully Deleted!',
												text: 'Your saved design deleted successfully!',
											  })
											  
										};

										useEffect(() => {
											async function fetchOrder() {
												console.log(id);
												try {
													const response = await axios.get('http://localhost:8070/order/getLastOrder/');
													// handle the response data here
													const Oid = response.data[0]._id;
													setInvoice(Oid);
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
										}, [ ]);

    
	
	return (
			<div>
				<div class="topCustomers nogap">
					<div class="row">
						<div
							class="p-4 mb-4 text-xl text-blue-100 bg-blue-700 rounded-lg dark:bg-blue-900 dark:text-blue-100"
							role="alert"
						>
							<span class="font-medium">
								<h1> My Designs </h1>
							</span>
						</div>
					</div>
					<div class="row">
						<div class="overflow-x-auto relative">
							<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
								<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
									<tr>
										<th scope="col" class="py-3 px-6">
											Template Name
										</th>
										<th scope="col" class="py-3 px-6">
											Print Type
										</th>
										<th scope="col" class="py-3 px-6">
											View
										</th>
										<th scope="col" class="py-3 px-6">
											Total Cost
										</th>
										<th scope="col" class="py-3 px-6">
											Date
										</th>
										<th scope="col" class="py-3 px-6">
											Delete
										</th>
									</tr>

								</thead>
								<tbody>
                                    {clDesigns.map((clientDesign, index)=>(
										<tr key={index}>
											<td class="py-3 px-6 line text-black">{clientDesign.templateName}</td>
											<td class="py-3 px-6 line text-black">{clientDesign.printType}</td>
											<td >
												<a href={clientDesign.designURL} style={{ textDecoration: "none" }}>
													{/* <button
														size="sm"
														style={{ backgroundColor: "blue", color: "white", borderRadius: "5px", width: "50px" }}
													>
														View
													</button> */}
													<button type="button" class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-10 py-2.5 text-center mr-2 mb-2">
													 view </button>
												</a>
											</td>

											<td class="py-3 px-6 line text-black">{clientDesign.totalCost}</td>
											<td class="py-3 px-6 line text-black">
												{new Date(clientDesign.createdAt).toLocaleString("en-US", {
													dateStyle: "short",
													timeStyle: "short",
												})}
											</td>
											<td>
												<span onClick={() => handleDelete(clientDesign._id)}>
													{/* <i class="fa fa-trash" aria-hidden="true"></i> */}
													<button type="button" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-10 py-2.5 text-center mr-2 mb-2"> 
													Delete </button>
												</span>
											</td>
										</tr>
									))} 
								</tbody>

								{/* <tbody>
                                {recordList()}
                            </tbody> */}
							</table>
						</div>
					</div>
				</div>

				<div class="topCustomers">
					<div class="row">
						<div
							class="p-4 mb-4 text-xl text-blue-100 bg-blue-700 rounded-lg dark:bg-blue-900 dark:text-blue-100"
							role="alert"
						>
							<span class="font-medium">
								<h1> My Orders </h1>
							</span>
						</div>
					</div>
					<div class="row">
						<div class="overflow-x-auto relative">
							<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
								<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
									<tr>
										<th scope="col" class="py-3 px-6">
											Order ID
										</th>
										<th scope="col" class="py-3 px-6">
											Placed Date
										</th>
										
										<th scope="col" class="py-3 px-6">
											Total Price
										</th>
									</tr>
								</thead>
								{/* <tbody>
                                {recordList2()}

                            </tbody> */}
							{orderDetails && (
									<tr>
									<th scope="col" class="py-3 px-6">
										{orderDetails._id}
									</th>
									<th scope="col" class="py-3 px-6">
										{orderDetails.pdate}
									</th>
									<th scope="col" class="py-3 px-6">
										{orderDetails.payable}
									</th>
									
								</tr>

								)}
							
								
							</table>
						</div>
					</div>
				</div>
				<br />
				<br />
				<div class="topCustomers">
					<div class="row">
						<div
							class="p-4 mb-4 text-xl text-blue-100 bg-blue-700 rounded-lg dark:bg-blue-900 dark:text-blue-100"
							role="alert"
						>
							<span class="font-medium">
								<h1> Production </h1>
							</span>
						</div>
					</div>
					<div class="row">
						<div class="overflow-x-auto relative">
							<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
								<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
									<tr>
										<th scope="col" class="py-3 px-6">
											Client Name
										</th>
										<th scope="col" class="py-3 px-6">
											Order Id
										</th>
										<th scope="col" class="py-3 px-6">
											Date
										</th>
										<th scope="col" class="py-3 px-6">
											Status
										</th>
									</tr>
								</thead>
								{/* <tbody>
                                {recordList3()}

                            </tbody> */}
                        </table>
                    </div>
                    <br />
                </div>
            </div>
            <br/>
            <div class="topCustomers">
                <div class="row">
                    <div class="p-4 mb-4 text-xl text-blue-100 bg-blue-700 rounded-lg dark:bg-blue-900 dark:text-blue-100"
                        role="alert">
                        <span class="font-medium">
                            <h1>Delivery</h1>
                        </span>
                    </div>
                </div>
                <div class="row">

                    <div class="overflow-x-auto relative">
                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="py-3 px-6">
                                        Client Name
                                    </th>
                                    <th scope="col" class="py-3 px-6">
                                        Placed Date
                                    </th>
                                    <th scope="col" class="py-3 px-6">
                                        View Order
                                    </th>
                                    <th scope="col" class="py-3 px-6">
                                        Total Price
                                    </th>
                                    <th scope="col" class="py-3 px-6">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            {/* <tbody>
                                {recordList4()}

                            </tbody> */}
							</table>
						</div>
						<br />
					</div>
				</div>
			</div>
		);

}