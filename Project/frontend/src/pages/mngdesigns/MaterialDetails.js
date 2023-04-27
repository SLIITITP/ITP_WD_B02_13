import { useState } from "react";
import { useMaterialsContext } from "../../hooks/useMaterialsContext"

const MaterialDetails = ({ material })=>{


const{ dispatch } = useMaterialsContext()    

const handleClick = async()=>{
    const response = await fetch('http://localhost:8070/material/delete/' + material._id, {
        method : 'DELETE' 
    })
    const json = await response.json()

    if(response.ok){
        dispatch({type: 'DELETE_MATERIAL', payload: json});
        window.location.reload() ;
        console.log("Record Deleted")
    }
}    
    return(
        
        <div className = "material-details ">
            
            <div className="row">
                <div className="col-1"></div><br/><br/>
                <div className="col-3"><p>{material._id}</p></div><br/><br/>
                <div className="col-2"><h4>{material.name}</h4></div><br/><br/>
                <div className="col-3"><p>{material.cost}</p></div><br/><br/>
                <div className="col-1"><a href={'/updateMaterial/'+material._id}> <button ><i className="far fa-edit"></i>&nbsp;</button></a></div><br/><br/>
                <div className="col-1"><p><span onClick={handleClick}><i class="fa fa-trash" aria-hidden="true"></i></span></p></div><br/><br/>
                
            </div>
            
        </div>
    )
}

export default MaterialDetails