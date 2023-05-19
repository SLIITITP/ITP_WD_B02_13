import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import axios from 'axios';

function Invoice() {
    const componentRef = useRef();
    const navigate = useNavigate();

    const id = useParams();
    const [invoice, setInvoice] = useState({});


    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Order List',
        onAfterPrint: () => {
        },
    });


    const Navnext = () => {
        axios.get('http://localhost:8070/order/getLastOrder/')
            .then(response => {
                // handle the response data here
                console.log(response.data[0]._id);
                const id = response.data[0]._id;
                navigate(`/delivery/${id}`);
            })
    };

    /*useEffect(() => {
        axios.get(`http://localhost:8070/order/invoice/${props.id}`)

            .then(response => {
                setDetails(response.data);
                console.log("Fetching order details...");
                //console.log("Order ID:", id);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [props.id]);*/

    //get(`http://localhost:8070/order/${id}`)

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
    }, []);


    const [orderDetails, setOrderDetails] = useState(null);

    if (!invoice) {
        return <div>Loading...</div>;
    }

    return (
        <div >
            <br />
            <br />
            <br />


            {orderDetails && (
                <div className="h-screen overflow-hidden flex items-center justify-center" style={{ background: '#edf2f7' }}>
                    <div className="w-screen h-screen overflow-scroll bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-4 flex items-center justify-center">
                        <div class="mx-auto max-w-md px-6 py-12 bg-white border-0 shadow-lg sm:rounded-3xl">
                            <div class="flex justify-center items-center h-screen bg-gray-200 text-gray-900">
                                <div class="rounded-md relative w-200 shadow-3xl p-3 bg-white">

                                    <div ref={componentRef} className="py-2">

                                        <div class="py-2">

                                            <div class="text-center text-xl font-bold">ORDER INVOICE</div>
                                            <br />
                                            <div class="text-center text-xs font-bold">
                                                <ul>
                                                    <li>
                                                        <span className="font-bold">Order ID:{orderDetails._id}</span>
                                                        <span className="font-bold">
                                                        </span>
                                                    </li>
                                                    <li>
                                                        <span className="font-bold">Order Date:{orderDetails.pdate}</span>
                                                        <span className="font-bold"></span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <br />
                                        <div class="text-xs pl-2">

                                            <h5 className="font-bold">BILLED TO:</h5>
                                            <div class="text-xs mb-1">{`${orderDetails.fname} ${orderDetails.lname}`}</div>
                                            <div class="text-xs mb-1">{orderDetails.email}</div>
                                            <div class="text-xs mb-1">{orderDetails.contactNo}</div>


                                        </div>
                                        <br />
                                        <div class="text-center text-xs font-bold mb-1">Estimated Completion date :{orderDetails.due_date}</div>

                                        <div class="border-double border-t-4 border-b-4 border-l-0 border-r-0 border-gray-900 my-3">
                                            <div class="flex text-sm pt-1 px-1">
                                                <span class="w-2/6">Size</span>
                                                <span class="w-2/6 text-right">Quantity</span>
                                            </div>
                                            <div class="border-dashed border-t border-b border-l-0 border-r-0 border-gray-900 mt-1 my-2 py-2 px-1">
                                                <div class="flex text-sm pt-1 px-1">
                                                    <span class="w-2/6 truncate">Extra Small</span>
                                                    <span class="w-2/6 text-right">{orderDetails.xs}</span>
                                                </div>
                                                <div class="flex text-sm pt-1 px-1">
                                                    <span class="w-2/6 truncate">Small</span>
                                                    <span class="w-2/6 text-right">{orderDetails.s}</span>
                                                </div>
                                                <div class="flex text-sm pt-1 px-1">
                                                    <span class="w-2/6 truncate">Medium</span>
                                                    <span class="w-2/6 text-right">{orderDetails.m}</span>
                                                </div>
                                                <div class="flex text-sm pt-1 px-1">
                                                    <span class="w-2/6 truncate">Large</span>
                                                    <span class="w-2/6 text-right">{orderDetails.l}</span>
                                                </div>
                                                <div class="flex text-sm pt-1 px-1">
                                                    <span class="w-2/6 truncate">Extra Large</span>
                                                    <span class="w-2/6 text-right">{orderDetails.xl}</span>
                                                </div>
                                                <div class="flex text-sm pt-1 px-1">
                                                    <span class="w-2/6 truncate">Double XL</span>
                                                    <span class="w-2/6 text-right">{orderDetails.xxl}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <br />

                                        <div class="text-xs">
                                            <div class="mb-1">No.of shirts : {orderDetails.total}</div>
                                            <div class="mb-1">Discount : 0</div>
                                            <div class="mb-8">Total Cost : Rs.{orderDetails.payable}.00</div>
                                        </div>

                                        <div>Thankyou</div>
                                        <div class="text-xs pl-2">
                                            <div class="text-right">
                                                <span class="text-xs mb-1">Sansalu Clothing</span><br />
                                                <span class="text-xs mb-1">sansaluclothing@gmail.com</span><br />
                                                <span class="text-xs mb-1">071-1234567</span><br />
                                            </div>
                                        </div>
                                        <br />
                                        <br />
                                        <br />

                                    </div>

                                    <div class="w-full h-30vh relative">
                                        <div class="absolute bottom-0 w-full flex justify-around">
                                            <button class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onClick={handlePrint}>Download Invoice</button>
                                            <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={Navnext}>Continue</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )
            }
        </div >
    )
}

export default Invoice;