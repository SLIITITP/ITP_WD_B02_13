import React,{ useState, useEffect ,useParams } from 'react';
import axios from "axios";
import SingleRow from './singleRow';

export default function EmployeeAllocation(){   

    const [allocation, setAllocation] = useState([]);
    const [query, setQuery] = useState("");  // using functional component
    
 
    useEffect(()=>{
     getAllocation();
 
   }, [])
 
 
    function getAllocation() {
         axios.get("http://localhost:8070/allocation/").then((res)=> {
             console.log(res.data);
             setAllocation(res.data);
         }).catch((err) => {
         alert(err.message);
         })
     }

     function getCount(id) {
        axios.get(`http://localhost:8070/employee/count/${id}`).then((res)=> {
            return <p>res</p> ;
        }).catch((err) => {
        alert(err.message);
        })
     }   
    return(
        <div className ="container">
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
      

            <div>
            <h1 className='header'>Employee Allocation</h1><br/>

            <div style={{ display: "flex", justifyContent: "center"}}>

            <table style={{width: "1000px",fontFamily: "Arial, sans-serif",fontSize: "14px",color: "#333",borderCollapse: "collapse",}}>

                

                    <thead>
                        <tr>
                            <th style={{ width: '150px', textAlign: 'center' }}>order_id ID</th>
                            <th style={{ width: '150px', textAlign: 'center' }}>Requested employees</th>
                            <th style={{ width: '150px', textAlign: 'center' }}>Alloted Employees</th>
                            <th style={{ width: '150px', textAlign: 'center' }}>Allocate</th>
                            <th style={{ width: '150px', textAlign: 'center' }}>update</th>
                            <th style={{ width: '150px', textAlign: 'center' }}>delete</th>
                        </tr>
                    </thead>

                    <tbody>

                        <tr>

    
                        {allocation.map(item => (
                        // <div className="row">
                        // <div className="col-2">{item.order_id}</div>
                        // <div className="col-2">{item.requested_employee}</div>
                        
                        // <div className="col-2">{item.allocated_employee}</div>
                        // <div className="col-2"><button type="submit" className="button-4">
                        //     {item.requested_employee === item.allocated_employee? (
                        //         <span className="text-pending">Complete</span>
                        //     ) : (
                        //         <span className="text-complete">pending</span>
                        //     )}
               
                        // </button></div>
                        // <div className="col-2"><button type="submit" className="button-3">Delete</button></div>
                        // <br/><br/>
                        // </div>
                        <>
                            <SingleRow  item={item}/>
                        </>
                    ))}
                        </tr> 
                        
                </tbody>
            </table>     

        </div>
        </div>   
        </div>         
         )       
}