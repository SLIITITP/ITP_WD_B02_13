import { useState } from "react"
import { useCardsContext } from "../../hooks/useCardsContext"


const CardForm =()=>{
    const { dispatch } = useCardsContext()
    const [CardType, setCardType] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async(e)=>{
        e.preventDefault()

        const cardtype = {CardType}

        const response = await fetch('http://localhost:8070/cardType/add', {
            method: 'POST',
            body: JSON.stringify(cardtype),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if(!response.ok){
            setError(json.error)
        }
        if(response.ok) {
            setCardType('')
            setError(null)
            console.log('New Card Added',json)
            dispatch({type: 'CREATE_CARD', payload: json });
            window.location.reload() ;
        }
    }
    
    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3><strong>Add a new Card</strong></h3>

            <label> Card Type:</label>
            <input
                type="text"
                onChange={(e)=>setCardType(e.target.value)}
                value ={CardType}
                required
            />

            <button>Add Card</button>
            {error && <div className="error">{ error }</div>}
        </form>
    )


}

export default CardForm