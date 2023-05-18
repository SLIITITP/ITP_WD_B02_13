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
                    

                <tr>
                    <td style={{ width: '150px', textAlign: 'center' }}>{item.order_id}</td>
                    <td style={{ width: '150px', textAlign: 'center' }} >{item.requested_employee}</td>
                    <td style={{ width: '150px', textAlign: 'center' }}>{count}</td>
                    <td style={{ width: '150px', textAlign: 'center' }}>
                            {item.requested_employee === count? (
                                <span className="text-pending">Complete</span>
                            ) : (
                                <span className="text-complete">pending</span>
                            )}    
                    </td>
                   <td style={{ width: '150px', textAlign: 'center' }}>
                    
                    <button>
                    <i className="far fa-edit"></i>&nbsp;
                    </button>
                 
                   </td>
               </tr>                
       </div>
         )       
}