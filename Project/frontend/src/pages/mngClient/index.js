/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useRef } from "react";
import ReactToPrint from 'react-to-print';
import Swal from 'sweetalert2'

import { Link } from "react-router-dom";
import "./managecus.css";

import { TopCusPrint } from "./topcusprint";

const RecordNewCus = (props) => (
    <div
        className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-400 dark:border-gray-400 cuscard">
        <div className="newcusimage">
            <a href={`/viewcus/${props.record._id}`}>
                <img className="rounded-t-lg" src={props.record.imgurl} alt="" />
            </a>
        </div>
        <div className="p-5">
            <a href="#">
                <h5 className="mb-2 text-m font-bold tracking-tight text-gray-900 dark:text-gray-700">{props.record.fname} {props.record.lname}
                </h5>
            </a>
            <p className="mb-3 font-normal text-gray-400 dark:text-gray-700">
                {props.record.email}<br />
                {props.record.contactno}<br />
            </p>
            <a href={`/viewcus/${props.record._id}`} target="_blank" rel="noreferrer"
                className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                View Profile
                <svg aria-hidden="true" className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"></path>
                </svg>
            </a>
        </div>
    </div>
);

const RecordLoyaltyLevels = (props) => (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th scope="row"
            className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {props.record.type}
        </th>
        <td className="py-4 px-6">
            {props.record.discount}
        </td>
        <td className="py-4 px-6">
            {props.record.payments}
        </td>
        <td class="py-4 px-6">
            <Link className="btn btn-link" to={`/updateLoyalty/${props.record._id}`}>
                <button type="button" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Edit</button>
            </Link>
            <button onClick={() => {
                props.deleteRecord(props.record._id);
            }}
                class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                Delete
            </button>
        </td>
    </tr>
);

export default function ClientManagement() {

    const componentRef = useRef();

    const [records, setRecords] = useState([]);
    const [records2, setRecords2] = useState([]);
    const [records3, setRecords3] = useState([]);
    

    // This method fetches the records from the database.
    useEffect(() => {
        async function getRecords() {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/client/new5`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const records = await response.json();
            setRecords(records);
        }

        getRecords();

        return;
    }, [records.length]);

    useEffect(() => {
        async function getRecords2() {
            const response2 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/client/top5`);

            if (!response2.ok) {
                const message = `An error occurred: ${response2.statusText}`;
                window.alert(message);
                return;
            }

            const records2 = await response2.json();
            setRecords2(records2);
        }

        getRecords2();

        return;
    }, [records2.length]);

    useEffect(() => {
        async function getRecords3() {
            const response3 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/loyalty`);

            if (!response3.ok) {
                const message = `An error occurred: ${response3.statusText}`;
                window.alert(message);
                return;
            }

            const records3 = await response3.json();
            setRecords3(records3);
        }

        getRecords3();

        return;
    }, [records3.length]);

    // This method will delete a record
    async function deleteRecord(id) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2',
                cancelButton: 'text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this! You will the Delete the This Customer Loyalty Level Details!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${process.env.REACT_APP_BACKEND_URL}/loyalty/delete/${id}`, {
                    method: "DELETE"
                });

                const newRecords = records.filter((el) => el._id !== id);
                setRecords3(newRecords);

                swalWithBootstrapButtons.fire(
                    'Deleted!',
                    'This Customer Loyalty Level has been deleted.',
                    'success'
                )
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'This Customer Loyalty Level is Not Deleted:)',
                    'info'
                )
            }
        })
    }

    // This method will map out the records on the table
    function recordList() {
        return records.map((record) => {
            return (
                <RecordNewCus
                    record={record}
                    // deleteRecord={() => deleteRecord(record._id)}
                    key={record._id}
                />
            );
        });
    }

    // function recordList2() {
    //     return records2.map((record) => {
    //         return (
    //             <RecordTopCus
    //                 record={record}
    //                 // deleteRecord={() => deleteRecord(record._id)}
    //                 key={record._id}
    //             />
    //         );
    //     });
    // }

    function recordList3() {
        return records3.map((record) => {
            return (
                <RecordLoyaltyLevels
                    record={record}
                    deleteRecord={() => deleteRecord(record._id)}
                    key={record._id}
                />
            );
        });
    }

    const [count , setCount] = useState(0) ;


//client Count 
useEffect(() => {
   
    async function getCount() {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/client/count`);
        response.json().then(data => {
            console.log(data.count)
            setCount(data.count)
        })
        console.log(JSON.stringify(response))
    }
    
    getCount();

   
},[]);
// async function getCount() {
//     const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/client/count`);
//     response.json().then(data => {
//         console.log(data.count)
//         setCount(data.count)
//     })
//     console.log(JSON.stringify(response))
// }

    

    return (
        <div>

            <div className="newCustomers">
                <div className="row btnrow">
                    <div className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-bold rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                        role="alert">
                        <span className="font-bold">
                            <h1 style = {{ fontSize: "28px"}}> Total Clients </h1> <br/>
                            <h1 style = {{ fontSize: "38px"}}> {count} </h1>
                        </span>
                    </div>
                </div>
                <br/>
                <br/>
                <div className="row">
                    <div className="p-4 mb-4 text-xl text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
                        role="alert">
                        <span className="font-medium">
                            <h1>New Clients!!</h1>
                        </span>
                    </div>
                </div>

                <div className="row" style={{marginLeft:"50px"}}>
                    {recordList()}
                </div >

                <div className="ribbon"></div>
                <div className="row btnrow">
                    <a href="/viewallcus"><button type="button"
                        className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                            View All Clients </button></a>
                </div>
            </div>
            <br />

            <div className="topCustomers">
                <div className="row">
                    <div className="p-4 mb-4 text-xl text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
                        role="alert">
                        <span className="font-medium">
                            <h1>Top Clients!!</h1>
                        </span>
                    </div>
                </div>
                <div className="row">
                    <TopCusPrint ref={componentRef} />
                </div>
                <br />
                <div className="row btnrow">
                    {/* <a href="#"><button type="button"
                        className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                        Generate Customer Activity Record</button></a> */}
                    {/* <ReactToPrint
                        trigger={() => <button>Print this out!</button>}
                        content={() => componentRef.current}
                    /> */}

                    <ReactToPrint
                        trigger={() => <button
                            className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                        >Get Report Of The Top Clients!</button>}
                        content={() => componentRef.current}
                    />

                </div>

            </div>

            <br />
            <div className="topCustomers">
                <div className="row">
                    <div className="p-4 mb-4 text-xl text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
                        role="alert">
                        <span className="font-medium">
                            <h1>Client Loyalty Levels</h1>
                        </span>
                    </div>
                </div>
                <div className="row">

                    <div className="overflow-x-auto relative">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="py-3 px-6">
                                        Type
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Discount
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Minimum Payments
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {recordList3()}
                            </tbody>
                        </table>
                    </div>

                </div>
                <br />
                <div className="row btnrow">
                    <a href="/clientdash/addloyalty"><button type="button"
                        className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                        Add New Client Loyalty Level</button></a>
                </div>

            </div>

        </div>
    )
}
