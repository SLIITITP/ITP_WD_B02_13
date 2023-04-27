import React, { useEffect } from "react"
import { useCompaniesContext } from "../../hooks/useCompaniesContext"

//components
import "../mngdistribution/deliveryAdmin.css"
import CompanyDetails from '../mngdistribution/CompanyDetails'
import CompanyForm from "./CompanyForm";

export default function AddCompany(){

    const {companies, dispatch}= useCompaniesContext()

    useEffect(() => {
        const fetchCompanies = async() => {
            const response = await fetch('http://localhost:8070/company')                   
            const json = await response.json()

            if (response.ok){
                dispatch({type: 'SET_COMPANIES', payload: json})
            }
        }
        fetchCompanies()
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
            <h1 className="header">Delivery Companies</h1>
            <br/>
           <CompanyForm/>
           <br/>
           <br/>
           <hr/>
           <br/>
           <div className="row">
                <div className="col-3"><p><strong>Company ID</strong></p></div>
                <div className="col-1"><h4><strong>Company Name</strong></h4></div>
                <div className="col-2"><h4><strong>Company Number</strong></h4></div>
                <div className="col-2"><p><strong>Delivery Charge</strong></p></div><br/><br/>
            </div>
        {companies && companies.map((company)=>(
            <CompanyDetails key={company._id} company = {company}/>
        ))}
            </div>
        </div>
    );
}