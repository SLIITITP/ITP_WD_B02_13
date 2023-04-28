import { useState } from "react"
import { useStatusesContext } from "../../hooks/useStatusesContext"


const StatusForm =()=>{
    const { dispatch } = useStatusesContext()
    const [name, setStatusname] = useState('')
    const [date, setstatusdate] = useState('')
    const [method, setStatusmethod] = useState('')
    const [status, setStatusstaus] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async(e)=>{
        e.preventDefault()

        const distribution = {name,date,method,status}

        const response = await fetch('http://localhost:8070/distribution/add', {
            method: 'POST',
            body: JSON.stringify(distribution),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if(!response.ok){
            setError(json.error)
        }
        if(response.ok) {
            setStatusname('')
            setstatusdate('')
            setStatusmethod('')
            setStatusstaus('')
            setError(null)
            console.log('New Status Added',json)
            dispatch({type: 'CREATE_STATUS', payload: json });
            window.location.reload() ;
        }
    }
    
    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3><strong>Add a new Status</strong></h3>

            <label>  Name:</label>
            <input
                type="text"
                onChange={(e)=>setStatusname(e.target.value)}
                value ={name}
                required
            />

            <label> Date:</label>
            <input
                type="text"
                onChange={(e)=>setstatusdate(e.target.value)}
                value ={date}
                required
            />

            <label> Delivery Method:</label>
            <input
                type="text"
                onChange={(e)=>setStatusmethod(e.target.value)}
                value ={method}
                required
            />

            <label> Delivery Status:</label>
            <input
                type="text"
                onChange={(e)=>setStatusstaus(e.target.value)}
                value ={method}
                required
            />

            <button>Add </button>
            {error && <div className="error">{ error }</div>}
        </form>
    )


}

export default StatusForm