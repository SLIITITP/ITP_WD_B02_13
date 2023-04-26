/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import './clientdash.css'
import Swal from 'sweetalert2'

export default function Card() {

    const [records, setRecords] = useState([]);

    async function setClientLoyalty() {
        
        const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}`;
        let payments = localStorage.getItem("clientTotalpayments");
        let ployalty = localStorage.getItem("clientLoyaltylevel");

        //const response = await fetch(`${BASE_URL}/loyalty/getLoyaltyType/${payments}`);
        const response = await fetch(`${BASE_URL}/loyalty/getLoyaltyType/${payments}`);
        if (!response.ok) {
            const message = `An error has occurred: ${response.statusText}`;
            window.alert(message);
            return;
        }

        const record = await response.json();

        if (!record) {
            const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
        }
        if(ployalty === record[0].type){
            Swal.fire(
                'You are in the Eligible Loyalty Card Level',
                'Keep Doing Payments to Upgrade Your Loyalty Card Level',
                'info'
            )
        }
        else {
            let loyalty = record[0].type;
            localStorage.setItem("loyalty", loyalty);
            
            const newRecord = {
                loyaltylevel: loyalty,
            }

            localStorage.setItem("clientLoyaltylevel", loyalty);

            await fetch(`${process.env.REACT_APP_BACKEND_URL}/client/updatelevel/${localStorage.getItem("clientID")}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newRecord),
            });

            Swal.fire({
                icon: 'success',
                title: 'Your Loyalty Card Level is Updated',
                text: 'Keep Doing Payments to Upgrade Your Loyalty Card Level',
            }).then((result) => {
                // Reload the Page
                window.location.reload();
            });

        }
    }


    return (
        <div>
            <div className='cusdashcard'>
                <a href="#" className="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700 cuscardx">
                    <img className="rounded-lg object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={localStorage.getItem("clientImgurl")} alt="" />
                    <div className="flex flex-col justify-between p-4 leading-normal">
                        <h5 className="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-300">{localStorage.getItem("clientFname")} {localStorage.getItem("clientLname")}</h5>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-300">{localStorage.getItem("clientAddress")}</p>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-300">{localStorage.getItem("clientContactno")}</p>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-300">{localStorage.getItem("clientEmail")}</p>
                    </div>
                </a>
                <a href="#" className="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700 cuscardx">
                    <div className="color">
                        <div class="p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800" role="alert">
                            <span class="font-medium">Your Loyalty Card Level - {localStorage.getItem("clientLoyaltylevel")}</span>
                        </div>
                        <div class="cardbutton btn1">
                            <button
                                onClick={setClientLoyalty}
                                type="button"
                                class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">My Loyalty Level</button>
                        </div>
                        <div class="cardbutton mt-0.5">
                            <a href={`/clientdash/clientupdate/${localStorage.getItem("clientID")}`}><button type="button" class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-10 py-2.5 text-center mr-2 mb-2"> Update Profile </button></a> 
                            <a href={`/clientdash/clientmore/${localStorage.getItem("clientID")}`}><button type="button" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-10 py-2.5 text-center mr-2 mb-2"> &nbsp; More &nbsp; </button></a>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    )
}