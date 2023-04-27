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
                <div className="col-3"><p>{company._id}</p></div><br/><br/>
                <div className="col-1"><h4>{company.companyname}</h4></div><br/><br/>
                <div className="col-2"><p>{company.companyno}</p></div><br/><br/>
                <div className="col-2"><p>{company.deliverycharge}</p></div><br/><br/>
                <div className="col-1"><p><span>Edit</span></p></div><br/><br/>
                <div className="col-1"><p><span onClick={handleClick}>Delete</span></p></div><br/><br/>
                
            </div>
            
        </div>
    )
}

export default CompanyDetails