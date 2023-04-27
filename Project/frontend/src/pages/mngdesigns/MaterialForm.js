import { useState } from "react"
import { useMaterialsContext } from "../../hooks/useMaterialsContext"


const MaterialForm =()=>{
    const { dispatch } = useMaterialsContext()
    const [name, setMaterialName] = useState('')
    const [cost, setMaterialCost] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async(e)=>{
        e.preventDefault()

        const material = {name, cost}

        const response = await fetch('http://localhost:8070/material/add', {
            method: 'POST',
            body: JSON.stringify(material),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if(!response.ok){
            setError(json.error)
        }
        if(response.ok) {
            setMaterialName('')
            setMaterialCost('')
            setError(null)
            console.log('New Material Added',json)
            dispatch({type: 'CREATE_MATERIAL', payload: json });
            window.location.reload() ;
        }
    }
    
    return(
        <div style={{marginLeft:"300px"}}>
        <form className="create" onSubmit={handleSubmit}>
            <h3><strong>Add a new material</strong></h3>

            <label> material Name:</label>
            <input
                type="text"
                style={{marginLeft:"10px",borderRadius:"8px"}}
                onChange={(e)=>setMaterialName(e.target.value)}
                value ={name}
                required
            />

            <label> material Cost:</label>
            <input
                type="number"
                style={{marginLeft:"10px",borderRadius:"8px",height:"35px"}}
                onChange={(e)=>setMaterialCost(e.target.value)}
                value ={cost}
                required
            />

            <button style={{marginLeft:"10px"}}>Add Material</button>
            {error && <div className="error">{ error }</div>}
        </form>
        </div>
    )


}

export default MaterialForm