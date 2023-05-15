import React, { useEffect, useState } from "react"
import { useTemplatesContext } from "../../hooks/useTemplatesContext"

//report gen
import axios from "axios";

import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from 'moment';

//components
import "../mngdesigns/designAdmin.css"
import TemplateDetails from '../mngdesigns/TemplateDetails'
import TemplateForm from "./TemplateForm";

export default function Dtemplate(){

    //search
    const [query, setQuery] = useState("");
    //report gen
    const [allTemplates, setAllTemplates] = useState([]);

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

    //report
    useEffect(() => {
        const fetchTemplates = async () => {
          try {
            const response = await axios.get("http://localhost:8070/template");
            setAllTemplates(response.data);
        
          } catch (err) {
            console.log(err)
          }
        };
        fetchTemplates();
      }, []);
    //report
    const generateReport = () => {
      const doc = new jsPDF();

      // Add the report title to the PDF
        doc.setFontSize(18);
        doc.text('Design Template Report', 14, 22);

        // Add the current date to the PDF
        const date = moment().format('MMMM Do YYYY, h:mm:ss a');
        doc.setFontSize(12);
        doc.text(`Report generated on ${date}`, 14, 32);
        
        // Create the table structure with headings for each column       
        const columns = [
          "Template Name",
          "Template Cost",
        //   "Age",
        //   "Gender",
        //   "Contact Number",
        //   "Email",
        ];
        const rows = allTemplates.map(
          ({
            templatename,
            cost,
            // applicant_age,
            // applicant_gender,
            // applicant_contact,
            // applicant_email,
          }) => [
            templatename,
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
          startY: 40,
          styles: {
            
            fontSize: 12, // Set font size for table content
            cellPadding: 3 // Set cell padding for table cells
          }
        });

        doc.save("Templates.pdf");
      
  }

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
                        {/* search bar */}
                      <input
                        aria-label="Search"
                        className="form-control-rounded form-control-prepended"
                        placeholder="Search By Template Name"
                        type="search"
                        onChange={(e) => setQuery(e.target.value)}
                        style={{borderRadius:"8px",width:"600px",marginLeft:"350px",height:"40px",padding:"5px"}}
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
           <br/>
           <div className="row">
                <div className="col-1"></div><br/><br/>
                <div className="col-3"><p><strong>Template ID</strong></p></div>
                <div className="col-2"><h4><strong>Template Name</strong></h4></div>
                <div className="col-3"><p><strong>Cost(in LKR)</strong></p></div><br/><br/>
            </div>              
                                {/* search */}
        {templates && templates.filter(
                      (template) =>
                        template.templatename
                          ?.toLowerCase()
                           .includes(query.toLowerCase()) 
                       // ||
                        // vacancy.vacancy_type
                        //   ?.toLowerCase()
                        //   .includes(query.toLowerCase())
                    ).map((template)=>(
            <TemplateDetails key={template._id} template = {template}/>
        ))}
            </div>
        </div>
    );
}
