import React,{ useState, useEffect ,useParams } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';


export default function SingleRow({item}){   

    let id = item.order_id ;
    const [count , setCount] = useState(0); 
    const [allocation,setAllocation] = useState({});
    
    const navigate = useNavigate();
 
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
     
     const handledelete = (id) => {
        axios
          .delete(`http://localhost:8070/allocation/delete/${id}`)
          .then((res) => {
            console.log(res.data);
            setAllocation((prevData) => prevData.filter((allocation) => allocation._id !== id));
            
    });
    navigate("/EmployeeAllocation")
    };


    return(
        <div className="row">
                    

                <tr >
                    <td style={{ width: '200px', textAlign: 'center' }}>{item.order_id}</td>
                    <td style={{ width: '200px', textAlign: 'center' }} >{item.requested_employee}</td>
                    <td style={{ width: '200px', textAlign: 'center' }}>{count}</td>
                    <td style={{ width: '200px', textAlign: 'center' }}>
                            {item.requested_employee === count? (
                                <span className="text-pending">Complete</span>
                            ) : (
                                <span className="text-complete">pending</span>
                            )}    
                    </td>
                   <td style={{ width: '200px', textAlign: 'center' }}>
                    
                    <button type="submit" onClick={() => handledelete(item._id)}>
                    <i className="far fa-trash"></i>&nbsp;
                    </button>
                 
                   </td>
               </tr>                
       </div>
         )       
}