import React,{useEffect, useState} from "react";
import "./card.css";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router";
import jwt_decode from 'jwt-decode';
import { v4 } from "uuid";
import axios from "axios";



export default function PayCard() {
    const[cardTypes,setCardTypes] = useState([]);

    const [cardno, setCardno] = React.useState("");
    const [cardcvc, setCvc] = React.useState("");

    useEffect(() => {
        const fetchCardTypes = async () => {
            const response = await fetch("http://localhost:8070/cardType")
            const json = await response.json();
            
            if(response.ok){
                setCardTypes(json);
            }
        }
        fetchCardTypes();
    },[]);




    async function handleSubmit() {
        localStorage.setItem("clientCartID" , (jwt_decode(localStorage.getItem("authToken")).fname + v4()));
        if (cardno.length === 16 && cardcvc.length === 3 && cardno.match(/^[0-9]+$/) && cardcvc.match(/^[0-9]+$/)) {
            Swal.fire({
                icon: 'success',
                title: 'Payment Successful',
                text: 'Your Payment is Done Succesfully Now!!',
                footer: '<a href="/">Keep Exploring</a>'
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.post("http://localhost:8070/cardDetails/add" , )
                    .then((res) => {
                        console.log(res);
                        alert("Card Details Added Successfully");})
                        .catch((err) => {console.log(err);})
                    window.location.href = "/clientdash";
                
                
                }
            })
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Card Details',
                text: 'Please check the card details!',
            })
        }
    }

    return (
        <div>
            <br/>
            <br/>
            <br/>
            <div className="cardaddhead">
                <center>
                    <h1 className="text-5xl font-extrabold text-grey-400"> Add Card Details </h1>
                </center>
                <br />
                <div className="frame">
                    <div className="mb-6">

                    <div>
                            <label for="Card Type" class="block mb-2 text-sm font-medium text-white ">Card Type</label>
                            {/* <input type="text" id="name"
                                className="border-gray-900 from-gray-900 text-blue-600 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="4614 1234 5678 9012"
                                required    
                            /> */}
                            <select id="cardType" name="cardType" className="border-gray-900 from-gray-900 text-blue-600 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                {cardTypes && cardTypes.map((cardType) =>(
                                    <option value= "" key = {cardType._id}>{cardType.CardType}</option>
                                ))}  
                            
                            </select>
                        </div>
                        <br />

                        <div>
                            <label for="Card Number" class="block mb-2 text-sm font-medium text-white ">Card Number</label>
                            <input type="text" id="inumber"
                                className="border-gray-900 from-gray-900 text-blue-600 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="4614 1234 5678 9012"
                                required
                                onChange={(e) => setCardno(e.target.value)}
                                
                            />
                        </div>
                        <br />

                        <div>
                            <label for="Cvc" class="block mb-2 text-sm font-medium text-white ">CVC</label>
                            <input type="text" id="cvc"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="123"
                                required
                                onChange={(e) => setCvc(e.target.value)}
                                
                            />
                        </div>
                        <br />
                        <div class="grid md:grid-cols-2 md:gap-6">
                            <div class="relative z-0 mb-6 w-full group">
                                <label for="Cvc" class="block mb-2 text-sm font-medium text-white ">Expiration Year</label>
                                <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option selected>2023</option>
                                    <option value="US">2024</option>
                                    <option value="CA">2025</option>
                                    <option value="FR">2026</option>
                                    <option value="DE">2027</option>
                                    <option value="DE">2028</option>
                                </select>
                            </div>
                            <div class="relative z-0 mb-6 w-full group">
                                <label for="Cvc" class="block mb-2 text-sm font-medium text-white ">Expiration Month</label>
                                <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option selected>01</option>
                                    <option value="US">02</option>
                                    <option value="CA">03</option>
                                    <option value="FR">04</option>
                                    <option value="DE">05</option>
                                    <option value="DE">06</option>
                                    <option value="FR">07</option>
                                    <option value="DE">08</option>
                                    <option value="DE">09</option>
                                    <option value="FR">10</option>
                                    <option value="DE">11</option>
                                    <option value="DE">12</option>
                                </select>
                            </div>
                        </div>

                        {/* <button
                            
                            type="submit"
                            className="text-white bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"> Back </button> */}
                        <button
                            onClick={handleSubmit}
                            type="submit"
                            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"> Pay Now </button>    
                    
                    </div>
                </div>
            </div>
        </div>
    )
}