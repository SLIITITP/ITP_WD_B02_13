import React,{ useState, useEffect ,useParams } from 'react';
import axios from "axios";

export default function SingleRow({item}){   

    let id = item.order_id ;
    const [count , setCount] = useState(0); 
    
 
    useEffect(()=>{
        getCount() ;
   }, [])
 
 
    

     function getCount() {
        axios.get(`http://localhost:8070/employee/count/${id}`).then((res)=> {
            console.log(res)
            setCount(res.data)
        }).catch((err) => {
        alert(err.message);
        })
     }   
    return(
        <div className="row">
                        <div className="col-2">{item.order_id}</div>
                        <div className="col-2">{item.requested_employee}</div>
                        
                        {/* <div className="col-2">{item.allocated_employee}</div> */}
                        <div className="col-2">{count}</div>
                        <div className="col-2"><button type="submit" className="button-4">
                            {item.requested_employee === count? (
                                <span className="text-pending">Complete</span>
                            ) : (
                                <span className="text-complete">pending</span>
                            )}
               
                        </button></div>
                        <div className="col-2"><button type="submit" className="button-3">Delete</button></div>
                        <br/><br/>
                        </div>
       
         )       
}