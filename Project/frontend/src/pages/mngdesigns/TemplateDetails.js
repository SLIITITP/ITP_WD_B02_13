import { useTemplatesContext } from "../../hooks/useTemplatesContext"

const TemplateDetails = ({ template })=>{

const{ dispatch } = useTemplatesContext()    

const editClick = async()=>{
    const response = await fetch('http://localhost:8070/template/update/'+ template._id,{
        method : 'POST'
    })
    const json = await response.json()
    if(response.ok){
        dispatch({type: 'UPDATE_TEMPLATE', payload: json});
        // window.location.reload() ;
        console.log("Record Updated")
    }
}

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
                <div className="col-1"></div><br/><br/>
                <div className="col-3"><p>{template._id}</p></div><br/><br/>
                <div className="col-2"><h4>{template.templatename}</h4></div><br/><br/>
                <div className="col-3"><p>{template.cost}</p></div><br/><br/>
                <div className="col-1"><a href={'/updateTemplate/'+template._id}> <button ><i className="far fa-edit"></i>&nbsp;</button></a></div><br/><br/>
                <div className="col-1"><p><span onClick={handleClick}><i class="fa fa-trash" aria-hidden="true"></i></span></p></div><br/><br/>
                
            </div>
            
        </div>
    )
}

export default TemplateDetails