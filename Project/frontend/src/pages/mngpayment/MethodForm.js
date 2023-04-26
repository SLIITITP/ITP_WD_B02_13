import { useState } from "react"
import { useMethodsContext } from "../../hooks/useMethodsContext"


const MethodForm =()=>{
    const { dispatch } = useMethodsContext()
    const [name, setName] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async(e)=>{
        e.preventDefault()

        const method = {name}

        const response = await fetch('http://localhost:8070/method/add', {
            method: 'POST',
            body: JSON.stringify(method),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if(!response.ok){
            setError(json.error)
        }
        if(response.ok) {
            setName('')
            setError(null)
            console.log('New Method Added',json)
            dispatch({type: 'CREATE_METHOD', payload: json });
            window.location.reload() ;
        }
    }
    
    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3><strong>Add a new Method</strong></h3>

            <label> Method Name:</label>
            <input
                type="text"
                onChange={(e)=>setName(e.target.value)}
                value ={name}
                required
            />

            <button>Add Method</button>
            {error && <div className="error">{ error }</div>}
        </form>
    )


}

export default MethodForm