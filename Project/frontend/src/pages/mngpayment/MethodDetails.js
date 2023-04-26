import { useMethodsContext } from "../../hooks/useMethodsContext"

const MethodDetails = ({ method })=>{

const{ dispatch } = useMethodsContext()    

const handleClick = async()=>{
    const response = await fetch('http://localhost:8070/method/delete/' + method._id, {
        method : 'DELETE' 
    })
    const json = await response.json()

    if(response.ok){
        dispatch({type: 'DELETE_METHOD', payload: json});
        window.location.reload() ;
        console.log("Record Deleted")
    }
}    
    return(
        
        <div className = "method-details ">
            
            <div className="row">
                <div className="col-3"><p>{method._id}</p></div><br/><br/>
                <div className="col-3"><h4>{method.name}</h4></div><br/><br/>
                <div className="col-1"><p><span>Edit</span></p></div><br/><br/>
                <div className="col-1"><p><span onClick={handleClick}>Delete</span></p></div><br/><br/>
                
            </div>
            
        </div>
    )
}

export default MethodDetails