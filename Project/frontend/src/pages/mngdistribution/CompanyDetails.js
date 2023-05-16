import React, { useEffect } from "react";
import { useCompaniesContext } from "../../hooks/useCompaniesContext"

const CompanyDetails = ({ company })=>{

const{ dispatch } = useCompaniesContext()    

const handleClick = async()=>{
    const response = await fetch('http://localhost:8070/company/delete/' + company._id, {
        method : 'DELETE' 
    })
    const json = await response.json()

    if(response.ok){
        dispatch({type: 'DELETE_COMPANY', payload: json});
        window.location.reload() ;
        console.log("Record Deleted")
    }
}    
    return(
        
        <div className = "company-details ">
            
            <div className="row">
  {/* <div className="col-3"><p>{company._id}</p></div><br/><br/> */}
  <div className="col-3">{company.companyname}</div><br/><br/>
  <div className="col-3"><p>{company.companyno}</p></div><br/><br/>
  <div className="col-3"><p>{company.deliverycharge}</p></div>
  <div className="col-1">
    <a href={'/updatecompany/'+company._id}>
      <button><i className="far fa-edit"></i>&nbsp;Edit</button>
    </a>
    <button onClick={handleClick}><i className="far fa-trash-alt"></i>&nbsp;Delete</button>
  </div>
</div>

            
        </div>
    )
}

export default CompanyDetails