import { useState } from "react"
import { useCompaniesContext } from "../../hooks/useCompaniesContext"


const CompanyForm =()=>{
    const { dispatch } = useCompaniesContext()
    const [companyname, setCompanyName] = useState('')
    const [companyno, setcompanyno] = useState('')
    const [deliverycharge, setDeliveryCharge] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async(e)=>{
        e.preventDefault()

        const company = {companyname, companyno, deliverycharge}

        const response = await fetch('http://localhost:8070/company/add', {
            method: 'POST',
            body: JSON.stringify(company),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if(!response.ok){
            setError(json.error)
        }
        if(response.ok) {
            setCompanyName('')
            setcompanyno('')
            setDeliveryCharge('')
            setError(null)
            console.log('New Company Added',json)
            dispatch({type: 'CREATE_COMPANY', payload: json });
            window.location.reload() ;
        }
    }
    
    return(
        <form className="create" onSubmit={handleSubmit}>

            <label> Company Name:</label>
            <input
                type="text"
                onChange={(e)=>setCompanyName(e.target.value)}
                value ={companyname}
                required
            />

            <label> Company Number:</label>
            <input
                type="text"
                onChange={(e)=>setcompanyno(e.target.value)}
                value ={companyno}
                required
            />

            <label> Delivery Charge:</label>
            <input
                type="number"
                onChange={(e)=>setDeliveryCharge(e.target.value)}
                value ={deliverycharge}
                required
            />

            <button>Add Company</button>
            {error && <div className="error">{ error }</div>}
        </form>
    )


}

export default CompanyForm