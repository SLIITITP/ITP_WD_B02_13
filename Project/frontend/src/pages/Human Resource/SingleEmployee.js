import React,{ useState, useEffect , useParams} from 'react';
import axios from 'axios';

export default function SingleEmployee({employee}) {

     // using functional component
     const [allocation, setAllocation] = useState([]);
     const [query, setQuery] = useState("");
     const [employee_allocation, setemployee_allocation] = useState([]);
     useEffect(()=>{
       
         getAllocation();
         fetchEmployee();
 
     }, [])

    function getAllocation() {
        axios.get("http://localhost:8070/allocation/").then((res)=> {
            console.log(res.data);
            setAllocation(res.data);
        }).catch((err) => {
            alert(err.message);
        })
    }

    function fetchEmployee() {
         axios.get(`http://localhost:8070/employee/${employee._id}`).then((res)=>{
            setemployee_allocation(res.data);
            console.log(res.data) ;
  
        }).catch((err)=>{
          alert(err) ;
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let allc = e.target.value
        console.log(allc)
        const EditAllocation = {
        
            allc
    
        }
    
        axios.put(`http://localhost:8070/employee/updateAllocation/${employee._id}`, EditAllocation)
          .then((response) => {
            console.log(response.data);
            alert("Successfully updated")
                // show success message or redirect to another page
              })
              .catch((error) => {
                console.log(error);
                // show error message
              });
          };


    return(
        <div className="row">
            

							<tr >
								<td style={{ width: '175px', textAlign: 'center' }}>{employee.name}</td>
								<td style={{ width: '175px', textAlign: 'center' }} >{employee.gender}</td>
								<td style={{ width: '175px', textAlign: 'center' }}>{employee.profession}</td>
								<td style={{ width: '175px', textAlign: 'center' }}>
                                    <select className=""  onChange={(e) => handleSubmit(e)}>

                                        {allocation.map(option => (
                                            employee.allocation == option.order_id ? 
                                            <option selected value={option.order_id}>{option.order_id} </option>
                                            : 
                                            <option value={option.order_id}>{option.order_id} </option>
                                         ))}    
                                    </select>   
								</td>
								<td style={{ width: '115px', textAlign: 'center' }}>
                                     <a href={'Emp_profile/'+ employee._id}>
                                        <button>
											<i className="far fa-eye" ></i>&nbsp;
										</button>
									</a>
								</td>
								<td style={{ width: '115px', textAlign: 'center' }}>
                                    <a href={'MakePayment/'+ employee._id}>
                                    <button type="submit" className="fab fa-cc-amazon-pay"></button> </a> 
								</td>
                                </tr>
            

            
        </div>
        
    )
        

            
        
    
}

