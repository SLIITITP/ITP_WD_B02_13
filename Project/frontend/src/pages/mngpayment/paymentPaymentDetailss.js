import React, { useEffect } from "react"
import { usePaymentDetailssContext } from "../../hooks/usePaymentDetailssContext"

//components
import "../mngpayment/paymentAdmin.css"
import PaymentDetailsDetails from './PaymentDetailsDetails'
import PaymentDetailsForm from "./PaymentDetailsForm";

export default function PpaymentDetails(){

    const {paymentDetailss, dispatch}= usePaymentDetailssContext()

    useEffect(() => {
        const fetchPaymentDetailss = async() => {
            const response = await fetch('http://localhost:8070/paymentDetails')                   
            const json = await response.json()

            if (response.ok){
                dispatch({type: 'SET_PAYMENTDETAILSS', payload: json})
            }
        }
        fetchPaymentDetailss()
    }, [dispatch]) 

    return(
        <div className="Home">
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
           <div className="paymentDetailss">
            <h1 className="header">All Payment Details</h1>
            <br/>
           <PaymentDetailsForm/>
           <br/>
           <br/>
           <hr/>
           <br/>
           <div className="row">
                <div className="col-1"><p></p></div>
                <div className="col-3"><p><strong>Payment ID</strong></p></div>
                <div className="col-3"><h4><strong>Recipient Name </strong></h4></div>
                <div className="col-3"><p><strong>Total Amount(In LKR)</strong></p></div><br/><br/><br></br>
            </div>
        {paymentDetailss && paymentDetailss.map((paymentDetails)=>(
            <PaymentDetailsDetails key={paymentDetails._id} paymentDetails = {paymentDetails}/>
        ))}
            </div>
        </div>
    );
}