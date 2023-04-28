import React, { useEffect } from "react";

import { useStatusesContext } from "../../hooks/useStatusesContext"

const StatusDetails = ({ status })=>{

const{ dispatch } = useStatusesContext()    

const handleClick = async()=>{
    const response = await fetch('http://localhost:8070/distribution/delete/' + status._id, {
        method : 'DELETE' 
    })
    const json = await response.json()

    if(response.ok){
        dispatch({type: 'DELETE_STATUS', payload: json});
        window.location.reload() ;
        console.log("Record Deleted")
    }
}    
    return(
        
        <div className = "status-details ">
            
            <div className="row">
                <div className="col-3"><p>{status._id}</p></div><br/><br/>
                <div className="col-1"><h4>{status.name}</h4></div><br/><br/>
                <div className="col-2"><p>{status.date}</p></div><br/><br/>
                <div className="col-2"><p>{status.method}</p></div><br/><br/>
                
                <a href={'/updatestatus/'+status._id}> <button ><i className="far fa-edit"></i>&nbsp;Edit</button></a>
                <div className="col-1"><p><span onClick={handleClick}>Delete</span></p></div><br/><br/>
                
            </div>
            
        </div>
    )
}

export default StatusDetails