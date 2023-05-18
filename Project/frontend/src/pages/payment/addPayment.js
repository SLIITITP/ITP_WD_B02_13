import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import "./payments.css";

export default function AddPayments() {
    const navigate = useNavigate();

    const [TotalAmount, setTotalAmount] = useState("");
    const [RecipientName, setRecipientName] = useState("");
    const [RecipientEmail, setRecipientEmail] = useState("");
    const [ContactNumber, setContactNumber] = useState("");
    const [Date, setDate] = useState("");
    const [Purpose, setPurpose] = useState("");

    function sentData1(e){
        e.preventDefault();
        console.log("Details added")
        navigate(`/paymentpayment`)
        const newPaymentdetails = {

            TotalAmount,
            RecipientName,
            RecipientEmail,
            ContactNumber,
            Date,
            Purpose,

        }

        axios.post("http://localhost:8070/paymentDetails/add", newPaymentdetails).then(()=>{
            alert("Details added")
            setTotalAmount("");
            setRecipientName("");
            setRecipientEmail("");
            setContactNumber("");
            setPurpose("");
            
        }).catch((err)=>{
            alert(err);
        })
       navigate("/paymentpayment") 
    }



    return (
        <div>
            <br/>
            <br/>
            <div className='paycont'>
                <div class="flex p-4 text-sm text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-700 dark:text-gray-300 payalert" role="alert">
                    <div>
                        <span class="font-large epd"><b> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Enter New Payment Details</b></span>
                    </div>
                </div>

                <div className="payform">
                    <form >
                        <div class="mb-6">
                            <label
                                for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Total Amount<required/></label>
                            <input
                                type="text" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="500000"
                                onChange={(e)=>{   // onChange Function --- occuring this one continuously
                                    setTotalAmount(e.target.value)
                            }}
                                required />
                        </div>

                        <div class="mb-6">
                            <label
                                for="" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Recipient Name</label>
                            <input
                                type="text" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="John Doe"
                                onChange={(e)=>{   // onChange Function --- occuring this one continuously
                                    setRecipientName(e.target.value)
                            }}
                                required />
                        </div>

                        <div class="mb-6">
                            <label
                                for="" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Recipient Email</label>
                                <input
    type="email"
    name="email"
    id="email"
    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    placeholder="JohnDoe@gmail.com"
    onChange={(e) => {
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value);
        if (isValidEmail) {
            setRecipientEmail(e.target.value);
            // The email is valid, you can proceed with further actions
        } else {
            // The email is not valid, you can show an error message or take appropriate action
        }
    }}
    required
/>

                        </div>

                        <div class="mb-6">
                            <label
                                for="" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Recipient Contact Number</label>
                            <input
                                type=" " name="phone" id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="011-5533621" maxLength='10'
                                onChange={(e)=>{   // onChange Function --- occuring this one continuously
                                    setContactNumber(e.target.value)
                            }}
                                required />

                        <div class="mb-6">
                            <label
                                for="" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Date</label>
                            <input
                                type="date" name="date" id="date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="2021-09-20"
                                onChange={(e)=>{   // onChange Function --- occuring this one continuously
                                    setDate(e.target.value)
                                }}
                                required />
                        </div>

                        </div>
                        <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                            Payment Purpose</label>
                        <textarea
                            id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Purpose"
                            onChange={(e)=>{   // onChange Function --- occuring this one continuously
                                setPurpose(e.target.value)
                            }}
                            required></textarea>

                        <br />
                       
                            <button type="submit" className="btnsubmit" style={{ backgroundColor: "#4C9A2A", color: "#FFFFFF", border: "none", padding: "10px 20px", borderRadius: "5px", cursor: "pointer", textDecoration: "none" }} onClick={sentData1}>
                                Submit
                            </button>
                       

                    </form>
                </div>
                <br />
            </div>
        </div>
    )
}