import { usePrintTypesContext } from "../../hooks/usePrintTypesContext"

const PrintTypeDetails = ({ printType })=>{

const{ dispatch } = usePrintTypesContext()    

const handleClick = async()=>{
    const response = await fetch('http://localhost:8070/printType/delete/' + printType._id, {
        method : 'DELETE' 
    })
    const json = await response.json()

    if(response.ok){
        dispatch({type: 'DELETE_PRINTTYPE', payload: json});
        window.location.reload() ;
        console.log("Record Deleted")
    }
}    
    return(
        
        <div className = "printtype-details ">
            
            <div className="row">
                <div className="col-1"></div><br/><br/>
                <div className="col-3"><p>{printType._id}</p></div><br/><br/>
                <div className="col-2"><h4>{printType.name}</h4></div><br/><br/>
                <div className="col-3"><p>{printType.cost}</p></div><br/><br/>
                <div className="col-1"><a href={'/updatePrintType/'+printType._id}> <button ><i className="far fa-edit"></i>&nbsp;</button></a></div><br/><br/>
                <div className="col-1"><p><span onClick={handleClick}><i class="fa fa-trash" aria-hidden="true"></i></span></p></div><br/><br/>
                
            </div>
            
        </div>
    )
}

export default PrintTypeDetails