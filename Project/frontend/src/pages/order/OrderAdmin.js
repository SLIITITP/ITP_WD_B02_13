import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';







const OrderAdmin = () => {
    const [order, setOrders] = useState([]);

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
        navigate(`/register/${id}`);
    };

    const MonthlyReport = () => {
        navigate('/monthlyReport');
    };

    return (
        <div>
            <br />
            <br />
            <br />
            <br />
            <h2>All Orders</h2>
            <button type="button" class="btn btn-info" onClick={MonthlyReport}>Generate Monthly report</button>

            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Order ID</th>
                        <th scope="col">Client ID</th>
                        <th scope="col">Placed Date</th>
                        <th scope="col">Due Date</th>
                        <th scope="col">Quantity</th>
                        <th scope="col"></th>
                        <th scope="col">Acceptance</th>
                        <th scope="col">Production</th>
                    </tr>
                </thead>
                <tbody>
                    {order.map(order => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.company_name}</td>
                            <td> {order.pdate}</td>
                            <td> {order.due_date}</td>
                            <td>{order.total}</td>
                            <td>
                                <button type="button" class="btn btn-outline-primary" onClick={() => handleview(order._id)}>view</button>
                            </td>

                            <td>
                                <button type="button" class="btn btn-outline-success" onClick={() => handleAcceptOrder(order._id)}>
                                    {order.accepted ? "Yes" : "No"}
                                </button>
                            </td>




                            <td>
                                <button type="button" class="btn btn-warning" onClick={() => handlePassOrder(order._id)}>{order.passed ? "Passed" : "Pass"}</button>
                            </td>
                            <td>
                                <button onClick={() => Delete(order._id)}>Delete</button>
                            </td>


                        </tr>
                    )
                    )}

                </tbody>
            </table>
        </div>
    );

}
export default OrderAdmin;
