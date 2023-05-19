import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


function ViewDetails(props) {


    const { id } = useParams();
    //console.log("Order ID:", id);
    const [details, setDetails] = useState({});

    const navigate = useNavigate();
    const backToOrderAdmin = () => {
        navigate(`/orderAdmin`);
    }


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



            <div class="flex flex-col h-screen bg-gradient-to-b from-[#063970] to-blue-200">
                <div class="min-h-screen flex items-center justify-center px-4">
                    <div class="max-w-4xl  bg-white w-full rounded-lg shadow-xl">
                        <div class="p-4 border-b flex items-center">
                            <h2 class="font-bold  text-2xl mr-4">Order Details</h2>
                            <p class="font-bold text-blue-500"> #{details._id}</p>
                        </div>


                        <div>


                            <div>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7">
                                    <div class="col-sm d-flex align-items-left">
                                        <label class="form-label">Client ID:</label>
                                        <label type="text" class="form-control" id="getClientID">{details.clientID}</label>
                                    </div>
                                    <div class="col-sm d-flex align-items-right">
                                        <label class="form-label">Design ID:</label>
                                        <label type="text" class="form-control" id="getDesignID">{details.designID}</label>
                                    </div>
                                </div>
                                <br />
                                <hr />
                                <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
                                    <form>

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


                                    <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                        Total No.of T-shirts : {details.total}
                                    </h6>
                                    <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                        Payable amount : Rs. {details.payable}
                                    </h6>

                                    <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                        Order placed Date: {details.pdate}
                                    </h6>

                                    <div class="border-2 border-red-600 rounded-lg px-2 py-2 text-red-400 cursor-pointer w-1/2 ">
                                        Due Completion date: {details.due_date}
                                    </div>

                                </div>
                            </div>

                        </div>
                        <button
                            className="border-2 border-blue-600 rounded-lg px-3 py-2 text-blue-400 cursor-pointer bg-blue-600 text-blue-200 w-full"
                            onClick={backToOrderAdmin}
                        >
                            Back
                        </button>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default ViewDetails;