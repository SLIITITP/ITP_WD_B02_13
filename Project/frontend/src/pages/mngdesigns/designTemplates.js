import React, { useEffect } from "react"
import { useTemplatesContext } from "../../hooks/useTemplatesContext"

//components
import "../mngdesigns/designAdmin.css"
import TemplateDetails from '../mngdesigns/TemplateDetails'
import TemplateForm from "./TemplateForm";

export default function Dtemplate(){

    const {templates, dispatch}= useTemplatesContext()

    useEffect(() => {
        const fetchTemplates = async() => {
            const response = await fetch('http://localhost:8070/template')                   
            const json = await response.json()

            if (response.ok){
                dispatch({type: 'SET_TEMPLATES', payload: json})
            }
        }
        fetchTemplates()
    }, [dispatch]) 

    return(
        <div className="Home">
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
           <div className="templates">
            <h1 className="header">Design Templates</h1>
            <br/>
           <TemplateForm/>
           <br/>
           <br/>
           <hr/>
           <br/>
           <div className="row">
                <div className="col-3"><p><strong>Template ID</strong></p></div>
                <div className="col-3"><h4><strong>Template Name</strong></h4></div>
                <div className="col-3"><p><strong>Cost</strong></p></div><br/><br/>
            </div>
        {templates && templates.map((template)=>(
            <TemplateDetails key={template._id} template = {template}/>
        ))}
            </div>
        </div>
    );
}
