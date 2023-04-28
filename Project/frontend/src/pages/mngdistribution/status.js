import React, { useEffect } from "react"
import { useStatusesContext } from "../../hooks/useStatusesContext"

//components
import "../mngdistribution/deliveryAdmin.css"
import StatusDetails from '../mngdistribution/StatusDetails'
import StatusForm from "./StatusForm";


export default function AddStatus(){

    const {statuses, dispatch}= useStatusesContext()

    useEffect(() => {
        const fetchStatuses = async() => {
            const response = await fetch('http://localhost:8070/distribution')                   
            const json = await response.json()

            if (response.ok){
                dispatch({type: 'SET_STATUSES', payload: json})
            }
        }
        fetchStatuses()
    }, [dispatch]) 

    return(
        <div className="Home">
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
           <div className="statuses">
            <h1 className="header">Delivery Status</h1>
            <br/>
           <StatusForm/>
           <br/>
           <br/>
           <hr/>
           <br/>
           <div className="row">
                <div className="col-3"><p><strong>Name</strong></p></div>
                <div className="col-1"><h4><strong>Date</strong></h4></div>
                <div className="col-2"><h4><strong>Method</strong></h4></div>
                <div className="col-2"><p><strong>Status</strong></p></div><br/><br/>


            </div>
        {statuses && statuses.map((status)=>(
            <StatusDetails key={status._id} status = {status}/>
        ))}
            </div>
        </div>
    );
}