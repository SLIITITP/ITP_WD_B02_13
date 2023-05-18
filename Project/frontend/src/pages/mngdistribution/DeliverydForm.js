import { useState } from "react"
import { useDeliverydsContext } from "../../hooks/useDeliverydContext"


const DeliverydForm =()=>{
    const { dispatch } = useDeliverydsContext()
    const [fname, setfname] = useState('')
    const [lname, setlname] = useState('')
    const [telephone, settelephone] = useState('')
    const [address,setaddress]=useState('')
    const [city,setcity]=useState('')
    const [postalcode,setpostalcode]=useState('')
    const [deliverycompany,setdeliverycompany]=useState('')
    const [deliveryoption,setdeliveryoption]=useState('')
    const [error, setError] = useState('')

    const handleSubmit = async(e)=>{
        e.preventDefault()

        const delidetails = {fname,lname,telephone,address,city,postalcode,deliverycompany,deliveryoption}

        const response = await fetch('http://localhost:8070/delidetails/add', {
            method: 'POST',
            body: JSON.stringify(delidetails),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if(!response.ok){
            setError(json.error)
        }
        if(response.ok) {
            setfname('')
            setlname('')
            settelephone('')
            setaddress('')
            setcity('')
            setpostalcode('')
            setdeliverycompany('')
            setdeliveryoption('')
            setError(null)
            console.log('New Delivery Added',json)
            dispatch({type: 'CREATE_DELIVERY', payload: json });
            window.location.reload() ;
        }
    }
    
    return(
        <form className="create" onSubmit={handleSubmit}>

            <label> First Name:</label>
            <input
                type="text"
                onChange={(e)=>setfname(e.target.value)}
                value ={fname}
                required
            />
            <label> Last Name:</label>
            <input
                type="text"
                onChange={(e)=>setlname(e.target.value)}
                value ={lname}
                required
            />

            <label> Telephone Number:</label>
            <input
                type="text"
                onChange={(e)=>settelephone(e.target.value)}
                value ={telephone}
                required
            />
            <br/>
            <label> Address:</label>
            <input
                type="text"
                onChange={(e)=>setaddress(e.target.value)}
                value ={address}
                required
            />
              
            <label> City:</label>
            <input
                type="text"
                onChange={(e)=>setcity(e.target.value)}
                value ={city}
                required
            />
              
            <label> postalcode:</label>
            <input
                type="text"
                onChange={(e)=>setpostalcode(e.target.value)}
                value ={postalcode}
                required
            />

            <label> Delivery Company:</label>
            <input
                type="text"
                onChange={(e)=>setdeliverycompany(e.target.value)}
                value ={deliverycompany}
                required
            />

            <label> Delivery Option:</label>
            <input
                type="text"
                onChange={(e)=>setdeliveryoption(e.target.value)}
                value ={deliveryoption}
                required
            />

           
            <button>Add Delivery</button>
            {error && <div className="error">{ error }</div>}
        </form>
    )


}

export default DeliverydForm