import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, row } from 'reactstrap';
import { useNavigate } from 'react-router-dom';


const OrderAdmin = () => {
    const [order, setOrders] = useState([]);

    //for the search
    const [query, setQuery] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8070/order/getOadmin/")
            .then(res => setOrders(res.data))
            .catch(err => console.log(err));
    }, []);

    const Delete = (id) => {
        try {
            axios.delete(`http://localhost:8070/order/delete/${id}`);
            console.log(`Record ${id} deleted successfully`);
            alert("Deleted the record Successfully");

        } catch (error) {
            console.error('Error deleting record:', error);
        }
    }

    const handleAcceptOrder = (id) => {
        console.log(`accepted record with ID: ${id}`);

        // Update the status of the clicked button's ID to "Yes"
        const updatedOrders = order.map((o) => {

            if (o._id === id) {
                o.accepted = true;
            }
            return o;
        });
        setOrders(updatedOrders);
    };

    const handlePassOrder = (id) => {
        console.log(`Passed record with ID: ${id}`);
        const updateStatus = order.map((x) => {
            if (x._id === id) {
                x.passed = true;
            }
            return x;
        });
        setOrders(updateStatus);

    };

    const handleview = (id) => {
        // Handle pass button click
        console.log(`view the record with ID: ${id}`);
        navigate(`/ViewDetails/${id}`);
    };

    const MonthlyReport = () => {
        navigate('/monthlyReport');
    };

    return (
        <div class="container mx-auto py-10">
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <h2 class="text-3xl font-bold mb-4 ">List Of Orders</h2>

            <div class="flex flex-wrap items-center justify-center w-full mb-4">
                <div class="relative w-full sm:w-auto">
                    <row>

                        <div class="container mx-auto py-10">
                            <button type="button" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={MonthlyReport}>Generate Monthly report</button>
                        </div>
                    </row>
                    <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
                        <div class="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
                            <div class="my-4 flex flex-row items-center justify-between">
                                <input aria-label="Search" className="appearance-none w-full sm:w-64 border border-gray-400 rounded-md py-2 px-3 pr-8 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Search" type="search" onChange={(e) => setQuery(e.target.value)}
                                    style={{ borderRadius: "8px", width: "600px", marginLeft: "350px", height: "40px", padding: "5px" }} />
                            </div>

                            <table class="min-w-full my-4">
                                <thead>
                                    <tr>
                                        <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Order ID</th>
                                        <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Placed Date</th>
                                        <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Due Date</th>
                                        <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Quantity</th>
                                        <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider"></th>
                                        <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Acceptance</th>
                                        <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Production</th>
                                        <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider"></th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white">
                                    {order.filter(
                                        (order) =>
                                            order.company_name
                                                ?.toLowerCase()
                                                .includes(query.toLowerCase())
                                            ||
                                            order.pdate
                                                ?.toLowerCase()
                                                .includes(query.toLowerCase())
                                    ).map((order) => (
                                        <tr key={order._id}>
                                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{order._id}</td>
                                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{order.pdate}</td>
                                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{order.due_date}</td>
                                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{order.total}</td>
                                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                                                <button class="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none"
                                                    onClick={() => handleview(order._id)}
                                                >
                                                    view
                                                </button>
                                            </td>
                                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                                                <button
                                                    type="button"
                                                    class={`${order.accepted
                                                        ? "bg-green-500 hover:bg-green-700"
                                                        : "bg-red-500 hover:bg-red-700"
                                                        } text-white font-bold py-2 px-4 rounded`}
                                                    onClick={() => handleAcceptOrder(order._id)}
                                                >
                                                    {order.accepted ? "Yes" : "No"}
                                                </button>
                                            </td>
                                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                                                <button
                                                    type="button"
                                                    class={`${order.passed
                                                        ? "bg-yellow-500 hover:bg-yellow-700"
                                                        : "bg-indigo-500 hover:bg-indigo-700"
                                                        } text-white font-bold py-2 px-4 rounded`}
                                                    onClick={() => handlePassOrder(order._id)}
                                                    disabled={!order.accepted}
                                                >
                                                    {order.passed ? "Passed" : "Pass"}
                                                </button>
                                            </td>
                                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                                                <button class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" onClick={() => Delete(order._id)}>Delete</button>
                                            </td>
                                        </tr>

                                    ))}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default OrderAdmin;
