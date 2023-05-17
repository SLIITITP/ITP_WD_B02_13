import { useState } from "react"
import { usePaymentDetailssContext } from "../../hooks/usePaymentDetailssContext"

const PaymentDetailsForm =()=>{
    const { dispatch } = usePaymentDetailssContext()
    const [Date, setDate] = useState('')
    const [RecipientName, setRecipientName] = useState('')
    const [TotalAmount, setTotalAmount] = useState('')
    const [RecipientEmail, setRecipientEmail] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async(e)=>{
        e.preventDefault()

        const paymentDetails = {Date, RecipientName, TotalAmount, RecipientEmail}

        const response = await fetch('http://localhost:8070/paymentDetails/add', {
            method: 'POST',
            body: JSON.stringify(paymentDetails),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if(!response.ok){
            setError(json.error)
        }
        if(response.ok) {
            setDate('')
            setRecipientName('')
            setTotalAmount('')
            setRecipientEmail('')
            setError(null)
            console.log('New Template Added',json)
            dispatch({type: 'CREATE_TEMPLATE', payload: json });
            window.location.reload() ;
        }
    }
    
    // return(
    //     <form className="create" onSubmit={handleSubmit}>
    //         <h3><strong>Add a new Template</strong></h3>

    //         <label> Template Name:</label>
    //         <input
    //             type="text"
    //             onChange={(e)=>setTemplateName(e.target.value)}
    //             value ={templatename}
    //             required
    //         />

    //         <label> Template Cost:</label>
    //         <input
    //             type="number"
    //             onChange={(e)=>setTemplateCost(e.target.value)}
    //             value ={cost}
    //             required
    //         />

    //         <button>Add Template</button>
    //         {error && <div className="error">{ error }</div>}
    //     </form>
    // )


}

export default PaymentDetailsForm