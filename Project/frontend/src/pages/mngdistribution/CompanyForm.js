import { useState } from "react"
import { useCompaniesContext } from "../../hooks/useCompaniesContext"
import Swal from 'sweetalert2'


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
    Swal.fire({
        icon: "success",
        title: "Company Added",
        timer: 1500,
        showConfirmButton: false,
    });
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
    <form className="create" onSubmit={handleSubmit} style={{ maxWidth: "500px", margin: "0 auto" }}>
    <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
      <label htmlFor="companyName" style={{ marginRight: "10px" }}>Company Name :     </label>
      <input
        type="text"
        id="companyName"
        onChange={(e) => setCompanyName(e.target.value)}
        value={companyname}
        required
        style={{ flex: 1, padding: "10px", fontSize: "16px", borderRadius: "5px", border: "1px solid #ccc" }}
      />
    </div>
  
    <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
      <label htmlFor="companyNumber" style={{ marginRight: "10px" }}>Company Number :     </label>
      <input
        type="text"
        id="companyNumber"
        onChange={(e) => setcompanyno(e.target.value)}
        value={companyno}
        required
        style={{ flex: 1, padding: "10px", fontSize: "16px", borderRadius: "5px", border: "1px solid #ccc" }}
      />
    </div>
  
    <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
      <label htmlFor="deliveryCharge" style={{ marginRight: "10px" }}>Delivery Charge     :     </label>
      <input
        type="text"
        id="deliveryCharge"
        onChange={(e) => setDeliveryCharge(e.target.value)}
        value={deliverycharge}
        required
        style={{ flex: 1, padding: "10px", fontSize: "16px", borderRadius: "5px", border: "1px solid #ccc" }}
      />
    </div>
    
    <br />
    <center>
      <button
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "5px",
          border: "none",
          backgroundColor: "black",
          color: "white",
          cursor: "pointer",
        }}
      >
        Add Company
      </button>
    </center>
    <br />
    {error && <div className="error">{error}</div>}
  </form>
  
)


}

export default CompanyForm