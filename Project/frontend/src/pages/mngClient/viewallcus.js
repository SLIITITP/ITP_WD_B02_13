/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./managecus.css";

const RecordAllCus = (props) => (
    <div
        className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-400 dark:border-gray-400 cuscardlistall">
        <div className="newcusimage">
            <a href={`/viewcus/${props.record._id}`}>
                <img className="rounded-t-lg" src={props.record.imgurl} alt="" />
            </a>
        </div>
        <div className="p-5">
            <a href={`/viewcus/${props.record._id}`}>
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

export default function ViewAllCus() {

    const [records, setRecords] = useState([]);
    const [search , setSearch] = useState("");

    const navigate = useNavigate();
    // This method fetches the records from the database.
    useEffect(() => {
        async function getRecords() {
            const response = await fetch("http://localhost:8070/client/");

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

    // This method will delete a record
    // async function deleteRecord(id) {
    //     await fetch(`http://localhost:8070/${id}`, {
    //         method: "DELETE"
    //     });

    //     const newRecords = records.filter((el) => el._id !== id);
    //     setRecords(newRecords);
    // }

    // This method will map out the records on the table
    function recordList() {
        return records.map((record) => {
            return (
                <RecordAllCus
                    record={record}
                    // deleteRecord={() => deleteRecord(record._id)}
                    key={record._id}
                />
            );
        });
    }

    function searchRecord(e) {
        const key = search;
        console.log("Search Function");
        console.log(key);
        // alert(key);
        navigate(`/clientdash/searchcus/${key}`);
    }

    return (
        <div className="allCustomers">
            <div className="p-4 text-sm text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-700 dark:text-gray-300" role="alert">
                <span className="font-large text-2xl" >All Registered Clients </span>
            </div>
            <div className="row searchRow">
                <form onSubmit={searchRecord}>
                    <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
                    <div className="relative">
                        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                        <input type="search" 
                        id="default-search" 
                        className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="Enter Customer's First Name... " 
                        onChange={(e) => setSearch(e.target.value)}
                        required="" />
                        <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                    </div>
                </form>
            </div>
            <br />
            <div className="list">
                {recordList()}
            </div>
        </div>
    )
}