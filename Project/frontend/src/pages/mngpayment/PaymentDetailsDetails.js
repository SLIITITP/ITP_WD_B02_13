import { usePaymentDetailssContext } from "../../hooks/usePaymentDetailssContext"

const PaymentDetailsDetails = ({ paymentDetails })=>{

const{ dispatch } = usePaymentDetailssContext()    

const handleClick = async()=>{
    const response = await fetch('http://localhost:8070/paymentdetails/delete/' + paymentDetails._id, {
        method : 'DELETE' 
    })
    const json = await response.json()

    if(response.ok){
        dispatch({type: 'DELETE_PAYMENTDETAILS', payload: json});
        window.location.reload() ;
        console.log("Record Deleted")
    }
}    
    return(
        
        <div className = "paymentDetails-details ">
            
            <div className="row">
                <div className="col-1"><p></p></div>
                <div className="col-3"><p>{paymentDetails._id}</p></div><br/><br/>
                <div className="col-3"><h4>{paymentDetails.RecipientName}</h4></div><br/><br/>
                <div className="col-3"><p>{paymentDetails.TotalAmount}</p></div><br/><br/>
                <div className="col-1"><p><span onClick={handleClick}><i class="fa fa-trash" aria-hidden="true"></i>Delete</span></p></div><br/><br/>
                
                
            </div>
            
        </div>
    )
}

export default PaymentDetailsDetails