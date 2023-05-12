import React, { useEffect, useState } from "react"
import { usePrintTypesContext } from "../../hooks/usePrintTypesContext"
import axios from "axios";

import jsPDF from "jspdf";
import "jspdf-autotable";

//components
import "../mngdesigns/designAdmin.css"
import PrintTypeDetails from '../mngdesigns/PrintTypeDetails'
import PrintTypeForm from "./PrintTypeForm";

export default function Ptype(){

    const [query, setQuery] = useState("");

    const [allPrintTypes, setAllPrintTypes] = useState([]);

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

    useEffect(() => {
        const fetchPrintTypes = async () => {
          try {
            const response = await axios.get("http://localhost:8070/printType");
            setAllPrintTypes(response.data);
        
          } catch (err) {
            console.log(err)
          }
        };
        fetchPrintTypes();
      }, []);

    const generateReport = () => {
    
        const doc = new jsPDF();
        const columns = [
          "PrintType Name",
          "PrintType Cost",
        //   "Age",
        //   "Gender",
        //   "Contact Number",
        //   "Email",
        ];
        const rows = allPrintTypes.map(
          ({
            name,
            cost,
            // applicant_age,
            // applicant_gender,
            // applicant_contact,
            // applicant_email,
          }) => [
            name,
            cost,
            // applicant_age,
            // applicant_gender,
            // applicant_contact,
            // applicant_email,
          ]
        );
        doc.autoTable({
          head: [columns],
          body: rows,
        });

        doc.save("Print Types.pdf");
      
  }


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
           <input
                        aria-label="Search"
                        className="form-control-rounded form-control-prepended"
                        placeholder="Search By PrintType Name"
                        type="search"
                        onChange={(e) => setQuery(e.target.value)}
                        style={{borderRadius:"8px",width:"600px",marginLeft:"400px",height:"40px",padding:"5px"}}
                      />
                      {/* report generation button */}
                      <button
                      style={{marginLeft:"10px"}}
                      className="btn-icon btn-3"
                      color="success"
                      type="button"
                      onClick={generateReport}
                    >Generate Report</button>
                    <br/>
                    <br/>
 
           <div className="row">
                <div className="col-1"></div><br/><br/>
                <div className="col-3"><p><strong>Print Type ID</strong></p></div>
                <div className="col-2"><h4><strong>Print Type Name</strong></h4></div>
                <div className="col-3"><p><strong>Cost(in LKR)</strong></p></div><br/><br/>
            </div>
        {printtypes && printtypes
        .filter(
            (printType) =>
              printType.name
                ?.toLowerCase()
                 .includes(query.toLowerCase()) 
             // ||
              // vacancy.vacancy_type
              //   ?.toLowerCase()
              //   .includes(query.toLowerCase())
          ).map((printType)=>(
            <PrintTypeDetails key={printType._id} printType = {printType}/>
        ))}
            </div>
        </div>
    );
}
