/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
// import { Link } from "react-router-dom";
import "./managecus.css";

const RecordTopCus = (props) => (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th scope="row"
            className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {props.record.fname} {props.record.lname}
        </th>
        <td className="py-4 px-6">
            {props.record.email}
        </td>
        <td className="py-4 px-6">
            {props.record.contactno}
        </td>
        <td className="py-4 px-6">
            {props.record.totalpurchases}
        </td>
        <td className="py-4 px-6">
            {props.record.totalpayments}
        </td>
    </tr>
);


export class TopCusPrint extends React.PureComponent {

    // const [records2, setRecords2] = useState([]);

    // useEffect(() => {
    //     async function getRecords2() {
    //         const response2 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/customer/top5`);

    //         if (!response2.ok) {
    //             const message = `An error occurred: ${response2.statusText}`;
    //             window.alert(message);
    //             return;
    //         }

    //         const records2 = await response2.json();
    //         setRecords2(records2);
    //     }

    //     getRecords2();

    //     return;
    // }, [records2.length]);

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

    state = {
        records2: []
    }

    componentDidMount() {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/client/top5`)
            .then(response => response.json())
            .then(records2 => this.setState({ records2 }));
    }

    render() {
        return (
            <div>
                <div className="row">

                    <div className="overflow-x-auto relative">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="py-3 px-6">
                                        Client Name
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Client Email
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Client Contact No
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Number of Purchases
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Total Amount Spent
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.records2.map((record) => {
                                    return (
                                        <RecordTopCus
                                            record={record}
                                            // deleteRecord={() => deleteRecord(record._id)}
                                            key={record._id}
                                        />
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                </div>
                <br />
            </div>
        );
    }
}

