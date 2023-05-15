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
                        <div class="flex flex-row items-center justify-between">
                            <input aria-label="Search" className="appearance-none w-full sm:w-64 border border-gray-400 rounded-md py-2 px-3 pr-8 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Search " type="search" onChange={(e) => setQuery(e.target.value)}
                                style={{ borderRadius: "8px", width: "600px", marginLeft: "350px", height: "40px", padding: "5px" }} />
                        </div>
                        <div class="container mx-auto py-10">
                            <button type="button" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={MonthlyReport}>Generate Monthly report</button>
                        </div>
                    </row>

                    <table class="table-auto border-collapse border border-gray-800">
                        <thead>
                            <tr>
                                <th class="px-4 py-2 border border-gray-800">Order ID</th>
                                <th class="px-4 py-2 border border-gray-800">Client ID</th>
                                <th class="px-4 py-2 border border-gray-800">Placed Date</th>
                                <th class="px-4 py-2 border border-gray-800">Due Date</th>
                                <th class="px-4 py-2 border border-gray-800">Quantity</th>
                                <th class="px-4 py-2 border border-gray-800"></th>
                                <th class="px-4 py-2 border border-gray-800">Acceptance</th>
                                <th class="px-4 py-2 border border-gray-800">Production</th>
                                <th class="px-4 py-2 border border-gray-800"></th>
                            </tr>
                        </thead>
                        <tbody>
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
                                    <td class="px-4 py-2 border border-gray-800">{order._id}</td>
                                    <td class="px-4 py-2 border border-gray-800">{order.company_name}</td>
                                    <td class="px-4 py-2 border border-gray-800">{order.pdate}</td>
                                    <td class="px-4 py-2 border border-gray-800">{order.due_date}</td>
                                    <td class="px-4 py-2 border border-gray-800">{order.total}</td>
                                    <td class="px-4 py-2 border border-gray-800">
                                        <button
                                            type="button"
                                            class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                                            onClick={() => handleview(order._id)}
                                        >
                                            view
                                        </button>
                                    </td>
                                    <td class="px-4 py-2 border border-gray-800">
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
                                    <td class="px-4 py-2 border border-gray-800">
                                        <button
                                            type="button"
                                            class={`${order.passed
                                                ? "bg-yellow-500 hover:bg-yellow-700"
                                                : "bg-indigo-500 hover:bg-indigo-700"
                                                } text-white font-bold py-2 px-4 rounded`}
                                            onClick={() => handlePassOrder(order._id)}
                                        >
                                            {order.passed ? "Passed" : "Pass"}
                                        </button>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                                        <button class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" onClick={() => Delete(order._id)}>Delete</button>
                                    </td>
                                </tr>

                            ))}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

}
export default OrderAdmin;
