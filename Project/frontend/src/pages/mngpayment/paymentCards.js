import React, { useEffect } from "react"
import { useCardsContext } from "../../hooks/useCardsContext"

//components
import "../mngpayment/paymentAdmin.css"
import CardDetails from '../mngpayment/CardDetails'
import CardForm from "./CardForm";

export default function Pcard(){

    const {cards, dispatch}= useCardsContext()

    useEffect(() => {
        const fetchCards = async() => {
            const response = await fetch('http://localhost:8070/cardType')                   
            const json = await response.json()

            if (response.ok){
                dispatch({type: 'SET_CARDS', payload: json})
            }
        }
        fetchCards()
    }, [dispatch]) 

    return(
        <div className="Home">
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
           <div className="cards">
            <h1 className="header">New Card Type</h1>
            <br/>
           <CardForm/>
           <br/>
           <br/>
           <hr/>
           <br/>
           <div className="row">
                <div className="col-3"><p><strong>Card ID</strong></p></div>
                <div className="col-3"><p><strong>Card Type</strong></p></div>
            </div>
        {cards && cards.map((cardType)=>(
            <CardDetails key={cardType._id} cardType = {cardType}/>
        ))}
            </div>
        </div>
    );
}