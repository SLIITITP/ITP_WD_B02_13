import { useState } from "react"
import { usePrintTypesContext } from "../../hooks/usePrintTypesContext"


const PrintTypeForm =()=>{
    const { dispatch } = usePrintTypesContext()
    const [name, setPrintTypeName] = useState('')
    const [cost, setPrintTypeCost] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async(e)=>{
        e.preventDefault()

        const printType = {name, cost}

        const response = await fetch('http://localhost:8070/printType/add', {
            method: 'POST',
            body: JSON.stringify(printType),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if(!response.ok){
            setError(json.error)
        }
        if(response.ok) {
            setPrintTypeName('')
            setPrintTypeCost('')
            setError(null)
            console.log('New Print Type Added',json)
            dispatch({type: 'CREATE_PRINTTYPE', payload: json });
            window.location.reload() ;
        }
    }
    
    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3><strong>Add a new print type</strong></h3>

            <label> Print Type Name:</label>
            <input
                type="text"
                onChange={(e)=>setPrintTypeName(e.target.value)}
                value ={name}
                required
            />

            <label> Print Type Cost:</label>
            <input
                type="number"
                onChange={(e)=>setPrintTypeCost(e.target.value)}
                value ={cost}
                required
            />

            <button>Add Print Type</button>
            {error && <div className="error">{ error }</div>}
        </form>
    )


}

export default PrintTypeForm