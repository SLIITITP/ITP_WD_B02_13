import React, { useState, useEffect } from 'react'
import axios from "axios";
//import { Col, Container, Row } from 'reactstrap';
import { useNavigate } from 'react-router-dom';


import sizeChart from "/Users/shashinihanshani/Desktop/ITP_WD_B02_T28/Project/frontend/src/assets/images/size-chart.png"

export default function Checkout() {

    //navigation
    const navigate = useNavigate();
    const [orderPlaced, setOrderPlaced] = useState(false);

    function handlePlaceOrder() {
        setOrderPlaced(true);

    }

    const handleConfirm = () => {
        axios.get('http://localhost:8070/order/getLastOrder/')
            .then(response => {
                // handle the response data here
                console.log(response.data[0]._id);
                const id = response.data[0]._id;
                navigate(`/invoice/${id}`);
            })
            .catch(error => {
                // handle the error here
                console.error(error);
            });
    };

    function handleClick(e) {
        e.preventDefault();

        const sizes = [xs, s, m, l, xl, xxl];

        //calculating the total shirt quantities
        const sum = sizes.reduce(function (acc, cur) {
            return acc + (cur ? parseFloat(cur) : 0);
        }, 0);
        setTotal(sum);

        //calculating the total payable amount
        const payable = sum * 700;
        setPayable(payable)
        console.log(payable);

        //checking whether total is > 0

        if (sum <= 0) {
            alert("Required no.of t-shirts cannot be ZERO");
            return;
        }

        //calculating the due completion date 

        switch (true) {
            case (sum >= 10 && sum < 30):
                setnoDates(8);
                break;
            case (sum >= 30 && sum < 75):
                setnoDates(15);
                break;
            case (sum >= 75 && sum < 200):
                setnoDates(20);
                break;
            case (sum >= 200 && sum < 400):
                setnoDates(25);
                break;
            default:
                setnoDates(30);
        }
        console.log(noDates);


        const newOrder = {
            company_name,
            firstName,
            lastName,
            contactNo,
            email,
            xs,
            s,
            m,
            l,
            xl,
            xxl,
            sum,
            dueDate,
            pdate,

            payable
        }



        //console.log(newOrder);
        axios.post("http://localhost:8070/order/add", newOrder)
            .then(() => {
                alert("T-shirt quantities are added");
            });

        /*useEffect(() => {
            axios.get("http://localhost:8070/order/getOadmin/")
                .then(res => setOrders(res.data))
                .catch(err => console.log(err));
        }, []);*/

        //to set the values to 0 after placing the order

    };

    const [company_name, setcompany_name] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [contactNo, setContactNo] = useState('');
    const [email, setEmail] = useState('');
    const [xs, setxs] = useState("");
    const [s, sets] = useState("");
    const [m, setm] = useState("");
    const [l, setl] = useState("");
    const [xl, setxl] = useState("");
    const [xxl, setxxl] = useState("");
    const [payable, setPayable] = useState(0);
    const [total, setTotal] = useState(0);


    //calculating the due completion date 
    const [dueDate, setDate] = useState(""); //no.of dates required
    const [noDates, setnoDates] = useState(0); //completion date
    const [pdate, setpdate] = useState(""); //placed date


    /*
        //retrieving client details 
        const [clientDetails, setclientDetails] = useState(null);
        useEffect(() => {
    
            //get all the client details function
            const getclientDetails = () => {
    
                //"http://localhost:8070/client/client/${clientid}")
                axios.get("http://localhost:8070/client/client/").then((res) => {
                    //console.log(res.data);
                    setclientDetails(res.data);
                }).catch((err) => {
                    alert(err.message);
                });
            }
        }, []);
    */

    return (
        <div>
            <div class="bg-gray-100">
                <div class="container1">
                    <div class="container1a">
                        <h4 class="text-center">CHECKOUT YOUR ORDER</h4>
                    </div>
                </div>
            </div>
            <div class="container5">
                <form class="grid grid-cols-2 gap-4">
                    <div class="col-span-1">
                        <label class="block mb-1 font-bold" for="getClientID">Client ID</label>
                        <input type="text" class="w-full py-2 px-3 border border-gray-400 rounded-md" id="getClientID" readOnly />
                    </div>
                    <div class="col-span-1">
                        <label class="block mb-1 font-bold" for="getDesignID">Design ID</label>
                        <input type="text" class="w-full py-2 px-3 border border-gray-400 rounded-md" id="getDesignID" readOnly />
                    </div>
                </form>
            </div>
            <div class="container">
                <div class="grid grid-cols-2 gap-4">
                    <div class="basicInfor col-span-1">
                        <div class="col1">
                            <div class="card">
                                <div class="card-header">
                                    <h6 class="font-bold">Client Information</h6>
                                </div>
                                <form action="#" class="Client-info">
                                    <div class="card-body">
                                        <div class="form-order">
                                            <label class="block mb-1 font-bold" for="company_name">Company Name</label>
                                            <input type="text" class="w-full py-2 px-3 border border-gray-400 rounded-md" name="company_name" id="company_name" onChange={(e) => { setcompany_name(e.target.value) }} />
                                        </div>
                                        <div class="form-order">
                                            <label class="block mb-1 font-bold" for="fname">First Name</label>
                                            <input type="text" class="w-full py-2 px-3 border border-gray-400 rounded-md" name="Firstname" id="fname" required onChange={(e) => setFirstName(e.target.value)} />
                                        </div>
                                        <div class="form-order">
                                            <label class="block mb-1 font-bold" for="lname">Last Name</label>
                                            <input type="text" class="w-full py-2 px-3 border border-gray-400 rounded-md" name="Lastname" id="lname" required onChange={(e) => setLastName(e.target.value)} />
                                        </div>
                                        <div class="form-order">
                                            <label class="block mb-1 font-bold" for="telNo">Contact Number</label>
                                            <input type="tel" class="w-full py-2 px-3 border border-gray-400 rounded-md" name="telNo" id="telNo" required onChange={(e) => setContactNo(e.target.value)} />
                                        </div>
                                        <div class="form-order">
                                            <label class="block mb-1 font-bold" for="email">Email</label>
                                            <input type="email" class="w-full py-2 px-3 border border-gray-400 rounded-md" name="email" id="email" required onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="size col-span-1">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="col">
                                <div class="bg-white shadow-md rounded-lg">
                                    <div class="px-4 py-3 border-b border-gray-200">
                                        <h6 class="text-gray-800 font-semibold">Select the sizes</h6>
                                    </div>
                                    <div class="px-4 py-3">
                                        <form action="" class="size-choose">
                                            <div class="grid grid-cols-2 gap-4">
                                                <div class="form-order-size">
                                                    <label for="xs" class="block text-gray-700 font-medium">XS</label>
                                                    <input type="number" id="xs" placeholder="0" class="form-input mt-1 block w-full border-gray-300 rounded-md" onChange={(e) => { setxs(e.target.value) }} />
                                                </div>
                                                <div class="form-order-size">
                                                    <label for="s" class="block text-gray-700 font-medium">S</label>
                                                    <input type="number" id="s" placeholder="0" class="form-input mt-1 block w-full border-gray-300 rounded-md" onChange={(e) => { sets(e.target.value) }} />
                                                </div>
                                                <div class="form-order-size">
                                                    <label for="m" class="block text-gray-700 font-medium">M</label>
                                                    <input type="number" id="m" placeholder="0" class="form-input mt-1 block w-full border-gray-300 rounded-md" onChange={(e) => { setm(e.target.value) }} />
                                                </div>
                                                <div class="form-order-size">
                                                    <label for="l" class="block text-gray-700 font-medium">L</label>
                                                    <input type="number" id="l" placeholder="0" class="form-input mt-1 block w-full border-gray-300 rounded-md" onChange={(e) => { setl(e.target.value) }} />
                                                </div>
                                                <div class="form-order-size">
                                                    <label for="xl" class="block text-gray-700 font-medium">XL</label>
                                                    <input type="number" id="xl" placeholder="0" class="form-input mt-1 block w-full border-gray-300 rounded-md" onChange={(e) => { setxl(e.target.value) }} />
                                                </div>
                                                <div class="form-order-size">
                                                    <label for="xxl" class="block text-gray-700 font-medium">XXL</label>
                                                    <input type="number" id="xxl" placeholder="0" class="form-input mt-1 block w-full border-gray-300 rounded-md" onChange={(e) => { setxxl(e.target.value) }} />
                                                </div>
                                            </div>
                                            <div class="mt-4">
                                                <button type="submit" id="save-details" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onclick={handleClick()}>Place Order</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div class="mt-4">
                                    <table class="table-auto w-full">
                                        <thead>
                                            <tr>
                                                <th class="px-4 py-2 text-gray-600 font-medium">Total quantity</th>
                                                <td class="px-4 py-2 text-gray-800 font-semibold">{{ total }}</td>
                                            </tr>
                                            <tr>
                                                <th class="px-4 py-2 text-gray-600 font-medium">Total Payable amount</th>
                                                <td class="px-4 py-2 text-gray-800 font-semibold">{{ payable }}</td>
                                            </tr>
                                        </thead>
                                    </table>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            id="confirm"
                            onClick={handlePlaceOrder}
                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Continue
                        </button>
                        {orderPlaced && (
                            <div class="confirmation-dialog">
                                <div class="confirmation-dialog-content">
                                    <p>Order placed successfully!</p>
                                    <button
                                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={handleConfirm}
                                    >
                                        OK
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <section class="container-sizechart">
                        <div class="heading">
                            <h3 class="text-lg font-medium">SIZE CHART</h3>
                        </div>
                        <div class="container2">
                            <div class="container3">
                                <div class="size-table">
                                    <img src={sizeChart} alt="size chart" />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
};

