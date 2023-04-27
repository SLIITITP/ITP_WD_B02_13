import React, { useEffect } from "react"
import { useMaterialsContext } from "../../hooks/useMaterialsContext"

//components
import "../mngdesigns/designAdmin.css"
import MaterialDetails from './MaterialDetails'
import MaterialForm from "./MaterialForm";

export default function Material(){

    const {materials, dispatch}= useMaterialsContext()

    useEffect(() => {
        const fetchMaterials = async() => {
            const response = await fetch('http://localhost:8070/material')                   
            const json = await response.json()

            if (response.ok){
                dispatch({type: 'SET_MATERIALS', payload: json})
            }
        }
        fetchMaterials()
    }, [dispatch]) 

    return(
        <div className="Home">
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
           <div className="materials">
            <h1 className="header">Product Materials</h1>
            <br/>
           <MaterialForm/>
           <br/>
           <br/>
           <hr/>
           <br/>
           <div className="row">
                <div className="col-3"><p><strong>Material ID</strong></p></div>
                <div className="col-3"><h4><strong>Material Name</strong></h4></div>
                <div className="col-3"><p><strong>Cost</strong></p></div><br/><br/>
            </div>
        {materials && materials.map((material)=>(
            <MaterialDetails key={material._id} material = {material}/>
        ))}
            </div>
        </div>
    );
}
