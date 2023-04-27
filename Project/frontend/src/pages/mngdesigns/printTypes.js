import React, { useEffect } from "react"
import { usePrintTypesContext } from "../../hooks/usePrintTypesContext"

//components
import "../mngdesigns/designAdmin.css"
import PrintTypeDetails from '../mngdesigns/PrintTypeDetails'
import PrintTypeForm from "./PrintTypeForm";

export default function Ptype(){

    const {printtypes, dispatch}= usePrintTypesContext()

    useEffect(() => {
        const fetchPrintTypes = async() => {
            const response = await fetch('http://localhost:8070/printType')                   
            const json = await response.json()

            if (response.ok){
                dispatch({type: 'SET_PRINTTYPES', payload: json})
            }
        }
        fetchPrintTypes()
    }, [dispatch]) 

    return(
        <div className="Home">
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
           <div className="printtypes">
            <h1 className="header">Print Types</h1>
            <br/>
           <PrintTypeForm/>
           <br/>
           <br/>
           <hr/>
           <br/>
           <div className="row">
                <div className="col-3"><p><strong>Print Type ID</strong></p></div>
                <div className="col-3"><h4><strong>Print Type Name</strong></h4></div>
                <div className="col-3"><p><strong>Cost</strong></p></div><br/><br/>
            </div>
        {printtypes && printtypes.map((printType)=>(
            <PrintTypeDetails key={printType._id} printType = {printType}/>
        ))}
            </div>
        </div>
    );
}
