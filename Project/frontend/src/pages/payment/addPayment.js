import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./payments.css";
import Swal from 'sweetalert2'

export default function AddPayments() {

    const [form, setForm] = useState({
        date: "",
        amount: "",
        name: "",
        email: "",
        contactno: "",
        purpose: "",
    });

    const navigate = useNavigate();

    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newPayment = { ...form };

    async function onSubmit(e){
        e.preventDefault();

        await fetch(`${process.env.REACT_APP_BACKEND_URL}/payment/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPayment),
        })
            .catch(error => {
                window.alert(error);
                return;
            });
    
        Swal.fire({
              icon: 'success',
              title: 'Successfull',
              text: 'New Payment Added',
        })
    
        setForm({ date: "",  amount: "", name: "", email: "", contactno: "",  purpose: "" });
        navigate("/card");
    }

    return (
        <div>
            <div className='paycont'>
                <div class="flex p-4 text-sm text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-700 dark:text-gray-300 payalert" role="alert">
                    <div>
                        <span class="font-large epd"><b> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Enter New Payment Details</b></span>
                    </div>
                </div>

                <div className="payform">
                    <form autoComplete='off' onSubmit={onSubmit}>
                        <div class="mb-6">
                            <label
                                for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Total Amount</label>
                            <input
                                type="text" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="500000"
                                onChange={(e) => updateForm({ amount: e.target.value })}
                                required />
                        </div>

                        <div class="mb-6">
                            <label
                                for="" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Recipient Name</label>
                            <input
                                type="text" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="John Doe"
                                onChange={(e) => updateForm({ name: e.target.value })}
                                required />
                        </div>

                        <div class="mb-6">
                            <label
                                for="" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Recipient Email</label>
                            <input
                                type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="JohnDoe@gmail.com"
                                onChange={(e) => updateForm({ email: e.target.value })}
                                required />
                        </div>

                        <div class="mb-6">
                            <label
                                for="" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Recipient Contact Number</label>
                            <input
                                type="text" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="011-5533621"
                                onChange={(e) => updateForm({ contactno: e.target.value })}
                                required />
                        </div>
                        <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                            Payment Purpose</label>
                        <textarea
                            id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Purpose"
                            onChange={(e) => updateForm({ purpose: e.target.value })}
                            required></textarea>

                        <br />
                        <button type="submit" class="text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"> Next </button>
                    </form>
                </div>
                <br />
            </div>
        </div>
    )
}