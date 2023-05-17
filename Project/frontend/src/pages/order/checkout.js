import React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import sizeChart from "./images/size-chart.png"


const Checkout = () => {

    //navigation
    const navigate = useNavigate();
    const [OrderPlaced, SetOrderPlaced] = useState(false);

    const id = useParams();
    const [getDesign, setgetDesign] = useState({});
    const [Design, setDesignDetails] = useState(null);
    const [ClientDetails, setClientDetails] = useState(null);

    function handlePlaceOrder() {
        SetOrderPlaced(true);

    }


    /*const handleConfirm = (id) => {
        // Handle pass button click
        //console.log(`id: ${id}, type: ${typeof id}`);
        navigate(`/invoice/${id}`);
    };*/


    useEffect(() => {
        async function fetchOrder() {
            console.log(id);
            try {
                const response = await axios.get('http://localhost:8070/clientDesign/getLastDesign/');
                // handle the response data here
                const Designid = response.data[0]._id;
                setgetDesign(Designid);
                console.log(Designid);

                // Fetch order details using the orderId
                const DesignDetailsResponse = await axios.get(`http://localhost:8070/clientDesign/${Designid}`);
                // handle the order details response data here
                const DesignDetails = DesignDetailsResponse.data;
                console.log("Fetching order details...");
                console.log(DesignDetails);

                setDesignDetails(DesignDetails);

                const clientId = DesignDetails.clientID;

                // Fetch client details using the clientId
                const clientResponse = await axios.get(`http://localhost:8070/client/client/${clientId}`);
                const clientDetails = clientResponse.data;

                setfname(ClientDetails.fname);
                setlname(ClientDetails.lname);
                setemail(ClientDetails.email);
                setcontactNo(ClientDetails.contactno);
                setClientDetails(ClientDetails);


            } catch (error) {
                alert(error);
            }
        }
        fetchOrder();
    }, []);


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
        if (e && e.preventDefault) {
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
            //getting the placed date
            const currentDate = new Date();
            setpdate(currentDate.toISOString());

            //calculating the due completion date 
            const due_date = new Date(pdate);
            due_date.setTime(due_date.getTime() + (noDates * 24 * 60 * 60 * 1000));
            setDate(due_date.toISOString());

            const newOrder = {
                clientID,
                designID,
                fname,
                lname,
                email,
                contactNo,
                company_name,
                xs,
                s,
                m,
                l,
                xl,
                xxl,
                sum,
                due_date,
                pdate,
                fname,
                lname,
                email,
                payable,
                contactNo
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
    }

    const [clientID, setClientID] = useState('');
    const [designID, setDesignID] = useState('');
    const [fname, setfname] = useState("");
    const [lname, setlname] = useState("");
    const [contactNo, setcontactNo] = useState('');
    const [email, setemail] = useState('');
    const [company_name, setcompany_name] = useState("");
    const [xs, setxs] = useState("");
    const [s, sets] = useState("");
    const [m, setm] = useState("");
    const [l, setl] = useState("");
    const [xl, setxl] = useState("");
    const [xxl, setxxl] = useState("");
    const [total, setTotal] = useState(0);
    const [payable, setPayable] = useState("");

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

            <br />
            <br />
            <br />
            <br />
            <br />
            <br />

            <div className="h-screen overflow-hidden flex flex-col items-center justify-center" style={{ background: '#edf2f7' }}>
                <div className="w-screen h-full overflow-scroll bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-4">
                    <div className="flex flex-col items-center justify-center">


                        <div class="sm:text-3xl text-2xl font-semibold text-center text-sky-600  mb-12">
                            CHECKOUT YOUR ORDER
                        </div>


                        <div className="flex w-2/3">
                            <div className="w-1/2 pr-2">
                                <div className="w-full">
                                    <label htmlFor="payment" className="block text-sm mb-2">CLient ID</label>
                                    <div className="flex">
                                        <input
                                            type="text"
                                            id="payment"
                                            className="w-full text-sm bg-gray-lightest text-gray-darkest rounded-l p-3 focus:outline-none"
                                            placeholder="Card Number 1"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="w-1/2 pl-2">
                                <div className="w-full">
                                    <label htmlFor="payment" className="block text-sm mb-2">Design ID</label>
                                    <div className="flex">
                                        <input
                                            type="text"

                                            className="w-full text-sm bg-gray-lightest text-gray-darkest rounded-l p-3 focus:outline-none"
                                            placeholder="Card Number 2"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>



                        <div className="container mx-auto py-8">
                            {Design && (
                                <form className="grid grid-cols-2 gap-4">

                                    <div className="col-span-1">
                                        <label className="block mb-1 font-bold" htmlFor="getDesignID">
                                            Design ID
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full py-2 px-3 border border-gray-400 rounded-md"
                                            id="getDesignID"
                                            value={Design.designID}
                                            readOnly
                                        />
                                    </div>
                                </form>
                            )}
                        </div>
                        <div class="bg-white my-4 shadow p-8 rounded-lg w-2/3">
                            <div class="flex items-center mb-4">
                                <div class="border-2 border-blue px-3 py-2 rounded-full font-bold text-blue mr-2">1</div>
                                <h2 class="text-lg">User Information</h2>
                            </div>

                            <div class="flex">
                                <div class="w-1/2 pr-2">
                                    <div class="w-full">
                                        <label for="companyName" class="block text-sm mb-2">Company Name</label>
                                        <div class="flex">
                                            <input type="text" class="w-full text-sm bg-grey-light text-grey-darkest rounded-l p-3 focus:outline-none" name="company_name" id="company_name" onChange={(e) => { setcompany_name(e.target.value); }} />
                                        </div>
                                    </div>
                                </div>
                                <div class="w-1/2 pl-2">
                                    <div class="w-full">
                                        <label for="ClientName" class="block text-sm mb-2">Client Name</label>
                                        <div class="flex">
                                            <input type="text" class="w-full text-sm bg-grey-light text-grey-darkest rounded-l p-3 focus:outline-none" name="fullname" id="fullname" required onChange={(e) => {
                                                const [fname, lname] = e.target.value.split(' ');
                                                setfname(fname);
                                                setlname(lname);
                                            }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex">
                                <div class="w-1/2 pr-2">
                                    <div class="w-full">
                                        <label for="Email" class="block text-sm mb-2">Email Address</label>
                                        <div class="flex">
                                            <input type="text" class="w-full text-sm bg-grey-light text-grey-darkest rounded-l p-3 focus:outline-none" name="email" id="email" required onChange={(e) => { setemail(e.target.value); }} />
                                        </div>
                                    </div>
                                </div>
                                <div class="w-1/2 pl-2">
                                    <div class="w-full">
                                        <label for="contactNo" class="block text-sm mb-2">Contact No</label>
                                        <div class="flex">
                                            <input type="text" class="w-full text-sm bg-grey-light text-grey-darkest rounded-l p-3 focus:outline-none" name="company_name" id="company_name" onChange={(e) => { setcontactNo(e.target.value); }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <br />

                            <div class="flex items-center mb-4">
                                <div class="border-2 border-blue px-3 py-2 rounded-full font-bold text-blue mr-2">2</div>
                                <h2 class="text-lg">Measurements - Select the Sizes</h2>
                            </div>
                            <div class="flex items-center mb-4">
                                <div class="container2">
                                    <div class="container3">
                                        <div class="size-table">
                                            <img src={sizeChart} alt="size chart" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <br />
                            <br />

                            <div class="flex items-center mb-4">
                                <div class="border-2 border-blue px-3 py-2 rounded-full font-bold text-blue mr-2">3</div>
                                <h2 class="text-lg">Add The Required No.of T-shirts</h2>
                            </div>

                            <br />
                            <div class="flex justify-center">
                                <div class="px-4 py-3">
                                    <form action="" class="size-choose">
                                        <div class="grid grid-cols-2 gap-4">
                                            <div class="form-order-size">
                                                <label htmlFor="xs" class="block text-gray-700 font-medium">XS</label>
                                                <input type="number" id="xs" placeholder="0" class="form-input mt-1 block w-full border border-gray-300 rounded-md py-1 pr-2" onChange={(e) => { setxs(e.target.value); }} />
                                            </div>
                                            <div class="form-order-size">
                                                <label htmlFor="s" class="block text-gray-700 font-medium">S</label>
                                                <input type="number" id="s" placeholder="0" class="form-input mt-1 block w-full border border-gray-300 rounded-md py-1 pr-2" onChange={(e) => { sets(e.target.value); }} />
                                            </div>
                                            <div class="form-order-size">
                                                <label htmlFor="m" class="block text-gray-700 font-medium">M</label>
                                                <input type="number" id="m" placeholder="0" class="form-input mt-1 block w-full border border-gray-300 rounded-md py-1 pr-2" onChange={(e) => { setm(e.target.value); }} />
                                            </div>
                                            <div class="form-order-size">
                                                <label htmlFor="l" class="block text-gray-700 font-medium">L</label>
                                                <input type="number" id="l" placeholder="0" class="form-input mt-1 block w-full border border-gray-300 rounded-md py-1 pr-2" onChange={(e) => { setl(e.target.value); }} />
                                            </div>
                                            <div class="form-order-size">
                                                <label htmlFor="xl" class="block text-gray-700 font-medium">XL</label>
                                                <input type="number" id="xl" placeholder="0" class="form-input mt-1 block w-full border border-gray-300 rounded-md py-1 pr-2" onChange={(e) => { setxl(e.target.value); }} />
                                            </div>
                                            <div class="form-order-size">
                                                <label htmlFor="xxl" class="block text-gray-700 font-medium">XXL</label>
                                                <input type="number" id="xxl" placeholder="0" class="form-input mt-1 block w-full border border-gray-300 rounded-md py-1 pr-2" onChange={(e) => { setxxl(e.target.value); }} />
                                            </div>
                                        </div>
                                        <br />

                                        <div class="mt-4 flex justify-center">
                                            <button type="submit" id="save-details" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" value="Place Order" onClick={handleClick}>Calculate Total</button>
                                        </div>
                                        <br />
                                    </form>
                                </div>
                            </div>


                            <div class="flex flex-col">
                                <div class="overflow-x-auto">
                                    <div class="py-2 inline-block min-w-full">
                                        <div class="overflow-hidden">
                                            <table class="min-w-full text-center">

                                                <tr class="border-b bg-blue-100 border-blue-200">
                                                    <td class="px-2 py-2 text-left text-gray-600 font-medium">Total quantity</td>
                                                    <td class="px-6 py-2 text-gray-800 font-semibold w-1/2">{total}</td>
                                                </tr>
                                                <tr class="border-b border-purple-200">
                                                    <td class="px-2 py-2 text-left text-gray-600 font-medium">Total Payable amount</td>
                                                    <td class="px-6 py-2 text-gray-800 font-semibold w-1/2">{payable}</td>
                                                </tr>
                                                <tr class="border-b bg-indigo-100 border-indigo-200">
                                                    <td class="px-2 py-2 text-left text-gray-600 font-medium">Completion Date</td>
                                                    <td class="px-6 py-2 text-gray-800 font-semibold w-1/2">{dueDate}</td>
                                                </tr>


                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div >

                                <div>
                                    <button
                                        type="submit"
                                        id="confirm"
                                        onClick={handlePlaceOrder}
                                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Place Order
                                    </button>
                                    {OrderPlaced && (
                                        <div class="confirmation-dialog">
                                            <div class="confirmation-dialog-content">
                                                <p>Order placed successfully! <br /> Download the Invoice </p>
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


                            </div>

                        </div>
                    </div>
                </div >
            </div>
        </div>
    )
};


export default Checkout;
