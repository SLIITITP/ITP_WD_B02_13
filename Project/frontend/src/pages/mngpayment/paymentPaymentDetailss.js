import React, { useEffect, useState } from "react"
import { usePaymentDetailssContext } from "../../hooks/usePaymentDetailssContext"



//components
import "../mngpayment/paymentAdmin.css"
import PaymentDetailsDetails from './PaymentDetailsDetails'
import PaymentDetailsForm from "./PaymentDetailsForm";

export default function PpaymentDetails() {

    //search
    const [query, setQuery] = useState("");

    const { paymentDetailss, dispatch } = usePaymentDetailssContext()

    useEffect(() => {
        const fetchPaymentDetailss = async () => {
            const response = await fetch('http://localhost:8070/paymentDetails')
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: 'SET_PAYMENTDETAILSS', payload: json })
            }
        }
        fetchPaymentDetailss()
    }, [dispatch])

    return (
        <div className="Home">
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className="paymentDetailss">
                <h1 className="header">All Payment Details</h1>
                <br />
                <PaymentDetailsForm />
                <br />
                <br />
                <hr />
                <br />
                {/* search bar */}
                <input
                    aria-label="Search"
                    className="form-control-rounded form-control-prepended"
                    placeholder="Search By  name"
                    type="search"
                    onChange={(e) => setQuery(e.target.value)}
                    style={{ borderRadius: "8px", width: "600px", marginLeft: "350px", height: "40px", padding: "5px" }}
                /><br/>
                <br/>
                <br/>
                <div className="row">
                    <div className="col-1"><p></p></div>
                    <div className="col-2"><p><strong>Payment ID</strong></p></div>
                    <div className="col-1"><h4><strong>Date </strong></h4></div>
                    <div className="col-2"><h4><strong>Recipient Name </strong></h4></div>
                    <div className="col-2"><p><strong>Total Amount(In LKR)</strong></p></div><br /><br /><br></br>
                    <div className="col-2"><h4><strong>Recipient Email </strong></h4></div>
                </div>
                {paymentDetailss && paymentDetailss
                    .filter(
                        (paymentDetails) =>
                            paymentDetails.RecipientName
                                ?.toLowerCase()
                                .includes(query.toLowerCase())
                                ||
                            paymentDetails._id
                                ?.toLowerCase()
                                .includes(query.toLowerCase())
                        // ||
                        // vacancy.vacancy_type
                        //   ?.toLowerCase()
                        //   .includes(query.toLowerCase())
                    ).map((paymentDetails) => (
                        <PaymentDetailsDetails key={paymentDetails._id} paymentDetails={paymentDetails} />
                    ))}
            </div>
        </div>
    );
}