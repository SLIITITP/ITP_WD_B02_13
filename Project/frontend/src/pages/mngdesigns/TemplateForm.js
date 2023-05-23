import { useState } from "react"
import { useTemplatesContext } from "../../hooks/useTemplatesContext"
import Swal from "sweetalert2";


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
        Swal.fire({
					icon: "success",
					title: "New Template Added",
					timer: 1500,
					showConfirmButton: false,
				});
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
    
    return (
			<div style={{ marginLeft: "300px" }}>
				<form className="create" onSubmit={handleSubmit}>
					<h3>
						<strong>Add a new Template</strong>
					</h3>

					<label> Template Name :</label>
					<input
						type="text"
						style={{ marginLeft: "10px", borderRadius: "8px" }}
						onChange={(e) => setTemplateName(e.target.value)}
						value={templatename}
						required
					/>

					<label style={{ marginLeft: "10px" }}> Template Cost :</label>
					<input
						type="number"
						style={{ marginLeft: "10px", borderRadius: "8px", height: "35px" }}
						onChange={(e) => setTemplateCost(e.target.value)}
						value={cost}
						required
					/>

					<button style={{ marginLeft: "10px" }}>Add Template</button>
					{error && <div className="error">{error}</div>}
				</form>
			</div>
		);


}

export default TemplateForm