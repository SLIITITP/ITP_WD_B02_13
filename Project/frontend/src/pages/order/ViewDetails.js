import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


function ViewDetails(props) {


    const { id } = useParams();
    //console.log("Order ID:", id);
    const [details, setDetails] = useState({});




    //order details
    useEffect(() => {
        console.log(id);
        async function fetchViewDetails() {
            await axios.get(`http://localhost:8070/order/ViewDetails/${id}`).then((res) => {
                setDetails(res.data);
                console.log(res.data);

            }).catch((err) => {
                alert(err);
            })
        }
        fetchViewDetails();
    }, [id]);

    if (!details) {
        return <div>Loading...</div>;
    }

    return (
        <div>

            <br />
            <br />
            <br />
            <br />
            <br />
            <div class="flex flex-col h-screen bg-gradient-to-b from-[#063970] to-blue-200">
                <div class="min-h-screen flex items-center justify-center px-4">

                    <div class="max-w-4xl  bg-white w-full rounded-lg shadow-xl">
                        <div class="p-4 border-b">
                            <h2 class="text-2xl ">
                                Order Information
                            </h2>
                            <p class="text-sm text-gray-500">
                                order ID : 1234
                            </p>
                        </div>

                        <div>


                            <div>
                                <div>
                                    <form class="row g-3">
                                        <div class="col-sm">
                                            <label class="form-label">Order ID</label>
                                            <label type="text" class="form-control" id="getOrderID" >{details._id}</label>
                                        </div>
                                        <div class="col-sm">
                                            <label class="form-label">Client ID</label>
                                            <label type="text" class="form-control" id="getClientID" >{details.clientID}</label>
                                        </div>
                                        <div class="col-sm">
                                            <label class="form-label" >Design ID</label>
                                            <label type="text" class="form-control" id="getDesignID" >{details.designID}</label>
                                        </div>
                                    </form>
                                </div>
                                <hr />
                                <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
                                    <form>
                                        <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                            Client Information
                                        </h6>
                                        <div class="flex flex-wrap">
                                            <div class="w-full lg:w-6/12 px-4">
                                                <div class="relative w-full mb-3">
                                                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="viewname">Company Name</label><br />
                                                    <label type="text" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 width: 100%;" id="viewname">{details.company_name}</label>
                                                </div>
                                            </div>
                                            <div class="w-full lg:w-6/12 px-4">
                                                <div class="relative w-full mb-3">
                                                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="viewCompanyname">Full Name</label><br />
                                                    <div class="col-sm-10">
                                                        <label type="text" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 width: 100%;" id="viewname">{details.fname + ' ' + details.lname}</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="w-full lg:w-6/12 px-4">
                                                <div class="relative w-full mb-3">
                                                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="viewemail">Email</label><br />
                                                    <label type="text" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 width: 100%;" id="viewname">{details.email}</label>
                                                </div>
                                            </div>
                                            <div class="w-full lg:w-6/12 px-4">
                                                <div class="relative w-full mb-3">
                                                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="viewContactNo">Contact Number</label><br />
                                                    <label type="text" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 width: 100%;" id="viewname">{details.contactNo}</label>
                                                </div>
                                            </div>

                                        </div>
                                        <hr class="mt-6 border-b-1 border-blueGray-300" />
                                        <div>
                                            <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                                T-shirt Quantities
                                            </h6>
                                            <div class="flex flex-wrap">
                                                <div class="grid grid-cols-2 lg:grid-cols-6 gap-4">
                                                    <div class="col-span-1 lg:col-span-1">
                                                        <div class="relative w-full mb-3">
                                                            <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="xs_size">XS</label><br />
                                                            <label type="text" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration">{details.xs}</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-span-1 lg:col-span-1">
                                                        <div class="relative w-full mb-3">
                                                            <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="xs_size">S</label><br />
                                                            <label type="text" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration">{details.s}</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-span-1 lg:col-span-1">
                                                        <div class="relative w-full mb-3">
                                                            <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="xs_size">M</label><br />
                                                            <label type="text" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration">{details.m}</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-span-1 lg:col-span-1">
                                                        <div class="relative w-full mb-3">
                                                            <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="xs_size">L</label><br />
                                                            <label type="text" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration">{details.l}</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-span-1 lg:col-span-1">
                                                        <div class="relative w-full mb-3">
                                                            <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="xs_size">XL</label><br />
                                                            <label type="text" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration">{details.xl}</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-span-1 lg:col-span-1">
                                                        <div class="relative w-full mb-3">
                                                            <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="xs_size">XXL</label><br />
                                                            <label type="text" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration">{details.xxl}</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>

                                    <div class="mb-3 row">
                                        <label class="col-sm-2 col-form-label">Total Quantity</label>
                                        <div class="col-sm-10">
                                            <label type="text" class="form-control-plaintext" id="total_quantity" >{details.total}</label>
                                        </div>
                                    </div>


                                    <p>Payable amount : {details.payable}</p>
                                    <p>Order placed Date: {details.pdate}</p>
                                    <p>Due Completion date: {details.due_date}</p>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewDetails;