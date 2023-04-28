import { useCardsContext } from "../../hooks/useCardsContext"

const CardDetails = ({ cardType })=>{

const{ dispatch } = useCardsContext()    

const handleClick = async()=>{
    const response = await fetch('http://localhost:8070/cardType/delete/' + cardType._id, {
        method : 'DELETE' 
    })
    const json = await response.json()

    if(response.ok){
        dispatch({type: 'DELETE_CARD', payload: json});
        window.location.reload() ;
        console.log("Record Deleted")
    }
}    
    return(
        
        <div className = "card-details ">
            
            <div className="row">
                <div className="col-1"><p></p></div>
                <div className="col-3"><p>{cardType._id}</p></div><br/><br/>
                <div className="col-3"><h4>{cardType.CardType}</h4></div><br/><br/>
                <div className="col-1"><a href={'/updateCard/'+cardType._id}> <button ><i className="far fa-edit"></i>&nbsp;Edit</button></a></div><br/><br/>
                <div className="col-1"><p><span onClick={handleClick}>Delete</span></p></div><br/><br/>
                
            </div>
            
        </div>
    )
}

export default CardDetails