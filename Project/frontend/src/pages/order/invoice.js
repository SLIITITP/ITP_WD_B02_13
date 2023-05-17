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
                navigate(`/company/${id}`);
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
        <div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />

            {orderDetails && (
                <div >

                    <div ref={componentRef}>

                        <div className="flex justify-between">
                            <div className="header1">
                                <ul>
                                    <li>
                                        <h5 className="font-bold">BILLED TO:</h5>
                                    </li>
                                    <li>
                                        <span>{orderDetails.fname} </span>

                                    </li>

                                    <li>
                                        <span></span>
                                    </li>
                                    <li>
                                        <span></span>
                                    </li>
                                </ul>

                            </div>
                            <div className="header2 my-5 flex flex-col items-end justify-end">
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
                        <p className="mt-5">Estimated Completion date :{orderDetails.due_date}</p>
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">Size</th>
                                    <th className="px-4 py-2">Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border px-4 py-2">Extra Small</td>
                                    <td className="border px-4 py-2">{orderDetails.xs}</td>
                                </tr>
                                <tr>
                                    <td className="border px-4 py-2">Small</td>
                                    <td className="border px-4 py-2">{orderDetails.s}</td>
                                </tr>
                                <tr>
                                    <td className="border px-4 py-2">Medium</td>
                                    <td className="border px-4 py-2">{orderDetails.m}</td>
                                </tr>
                                <tr>
                                    <td className="border px-4 py-2">Large</td>
                                    <td className="border px-4 py-2">{orderDetails.l}</td>
                                </tr>
                                <tr>
                                    <td className="border px-4 py-2">Extra Large</td>
                                    <td className="border px-4 py-2">{orderDetails.xl}</td>
                                </tr>
                                <tr>
                                    <td className="border px-4 py-2">Double XL</td>
                                    <td className="border px-4 py-2">{orderDetails.xxl}</td>
                                </tr>
                                <tr>
                                    <td className="border px-4 py-2 font-bold">Total Quantity</td>
                                    <td className="border px-4 py-2">{orderDetails.total}</td>
                                </tr>
                                <tr>
                                    <td className="border px-4 py-2 font-bold">Tax (0%)</td>
                                    <td className="border px-4 py-2">$0.00</td>
                                </tr>
                                <tr>
                                    <td className="border px-4 py-2 font-bold">{orderDetails.payable}</td>
                                    <td className="border px-4 py-2"></td>
                                </tr>
                            </tbody>
                        </table>
                        <p className="mt-5">Thankyou</p>
                        <footer className="my-5 flex flex-col items-end justify-end">
                            <ul>
                                <li class="text-lg font-bold">Sansalu Clothing</li>
                                <li class="text-gray-600">sansaluclothing@gmail.com</li>
                                <li class="text-gray-600">071-1234567</li>
                            </ul>
                        </footer>
                        <br />
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


            )}


        </div>
    )

}

export default Invoice;