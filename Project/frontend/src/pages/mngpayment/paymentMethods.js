import React, { useEffect } from "react"
import { useMethodsContext } from "../../hooks/useMethodsContext"

//components
import "../mngpayment/paymentAdmin.css"
import MethodDetails from '../mngpayment/MethodDetails'
import MethodForm from "./MethodForm";

export default function Pmethod(){

    const {methods, dispatch}= useMethodsContext()

    useEffect(() => {
        const fetchMethods = async() => {
            const response = await fetch('http://localhost:8070/method')                   
            const json = await response.json()

            if (response.ok){
                dispatch({type: 'SET_METHODS', payload: json})
            }
        }
        fetchMethods()
    }, [dispatch]) 

    return(
        <div className="Home">
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
           <div className="methods">
            <h1 className="header">Payment Methods</h1>
            <br/>
           <MethodForm/>
           <br/>
           <br/>
           <hr/>
           <br/>
           <div className="row">
                <div className="col-3"><p><strong>Method ID</strong></p></div>
                <div className="col-3"><h4><strong>Method Name</strong></h4></div>
            </div>
        {methods && methods.map((method)=>(
            <MethodDetails key={method._id} method = {method}/>
        ))}
            </div>
        </div>
    );
}