import { useTemplatesContext } from "../../hooks/useTemplatesContext"

const TemplateDetails = ({ template })=>{

const{ dispatch } = useTemplatesContext()    

const handleClick = async()=>{
    const response = await fetch('http://localhost:8070/template/delete/' + template._id, {
        method : 'DELETE' 
    })
    const json = await response.json()

    if(response.ok){
        dispatch({type: 'DELETE_TEMPLATE', payload: json});
        window.location.reload() ;
        console.log("Record Deleted")
    }
}    
    return(
        
        <div className = "template-details ">
            
            <div className="row">
                <div className="col-3"><p>{template._id}</p></div><br/><br/>
                <div className="col-3"><h4>{template.templatename}</h4></div><br/><br/>
                <div className="col-4"><p>{template.cost}</p></div><br/><br/>
                <div className="col-1"><p><span>Edit</span></p></div><br/><br/>
                <div className="col-1"><p><span onClick={handleClick}>Delete</span></p></div><br/><br/>
                
            </div>
            
        </div>
    )
}

export default TemplateDetails