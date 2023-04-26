import { useState } from "react"
import { useTemplatesContext } from "../../hooks/useTemplatesContext"


const TemplateForm =()=>{
    const { dispatch } = useTemplatesContext()
    const [templatename, setTemplateName] = useState('')
    const [cost, setTemplateCost] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async(e)=>{
        e.preventDefault()

        const template = {templatename, cost}

        const response = await fetch('http://localhost:8070/template/add', {
            method: 'POST',
            body: JSON.stringify(template),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if(!response.ok){
            setError(json.error)
        }
        if(response.ok) {
            setTemplateName('')
            setTemplateCost('')
            setError(null)
            console.log('New Template Added',json)
            dispatch({type: 'CREATE_TEMPLATE', payload: json });
            window.location.reload() ;
        }
    }
    
    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3><strong>Add a new Template</strong></h3>

            <label> Template Name:</label>
            <input
                type="text"
                onChange={(e)=>setTemplateName(e.target.value)}
                value ={templatename}
                required
            />

            <label> Template Cost:</label>
            <input
                type="number"
                onChange={(e)=>setTemplateCost(e.target.value)}
                value ={cost}
                required
            />

            <button>Add Template</button>
            {error && <div className="error">{ error }</div>}
        </form>
    )


}

export default TemplateForm