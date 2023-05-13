import React, { useEffect, useState } from "react"
import { useMaterialsContext } from "../../hooks/useMaterialsContext"
import axios from "axios";

import jsPDF from "jspdf";
import "jspdf-autotable";

//components
import "../mngdesigns/designAdmin.css"
import MaterialDetails from './MaterialDetails'
import MaterialForm from "./MaterialForm";

export default function Material(){

    const [query, setQuery] = useState("");

    const [allMaterials, setAllMaterials] = useState([]);

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

    useEffect(() => {
        const fetchMaterials = async () => {
          try {
            const response = await axios.get("http://localhost:8070/material");
            setAllMaterials(response.data);
        
          } catch (err) {
            console.log(err)
          }
        };
        fetchMaterials();
      }, []);

    const generateReport = () => {
    
        const doc = new jsPDF();
        const columns = [
          "Material Name",
          "Material Cost",
        //   "Age",
        //   "Gender",
        //   "Contact Number",
        //   "Email",
        ];
        const rows = allMaterials.map(
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

        doc.save("Materials.pdf");
      
  }


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
           
           <input
                        aria-label="Search"
                        className="form-control-rounded form-control-prepended"
                        placeholder="Search By Material Name"
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
           <br/>
           <div className="row">
                <div className="col-1"></div><br/><br/>
                <div className="col-3"><p><strong>Material ID</strong></p></div>
                <div className="col-2"><h4><strong>Material Name</strong></h4></div>
                <div className="col-3"><p><strong>Cost(in LKR)</strong></p></div><br/><br/>
            </div>
        {materials && materials
        .filter(
            (material) =>
              material.name
                ?.toLowerCase()
                 .includes(query.toLowerCase()) 
             // ||
              // vacancy.vacancy_type
              //   ?.toLowerCase()
              //   .includes(query.toLowerCase())
          ).map((material)=>(
            <MaterialDetails key={material._id} material = {material}/>
        ))}
            </div>
        </div>
    );
}
