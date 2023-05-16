import React,{ useState, useEffect , useParams} from 'react';
import axios from "axios";
import SingleEmployee from './SingleEmployee';

export default function AllEmployee(){

    // const { id } = useParams;
    const [employee, setEmployees] = useState([]); // using functional component
    const [allocation, setAllocation] = useState([]);
    const [query, setQuery] = useState("");
    useEffect(()=>{
      
        getEmployees();
        getAllocation();

    }, [])

    function getEmployees() {
        axios.get("http://localhost:8070/employee/").then((res)=> {
            console.log(res.data);
            setEmployees(res.data);
        }).catch((err) => {
            alert(err.message);
        })
    }

    function getAllocation() {
        axios.get("http://localhost:8070/allocation/").then((res)=> {
            console.log(res.data);
            setAllocation(res.data);
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
            <br/>
            <br/>
      
            
            {/* search bar */}
            <input
                        aria-label="Search"
                        className="form-control-rounded form-control-prepended"
                        placeholder="Search By Employee Name"
                        type="search"
                        onChange={(e) => setQuery(e.target.value)}
                        style={{borderRadius:"8px",width:"600px",marginLeft:"350px",height:"40px",padding:"5px"}}
        />

            <div>
                    <h1 className='header'>All Employees</h1><br/>
                    <div className='row'>
                        <div className='col-2'><strong>Name</strong></div>
                        <div className='col-2'><strong>Gender</strong></div>
                        <div className='col-2'><strong>profession</strong></div>
                        <div className='col-2'></div>
                        <div className='col-2'></div>
                        <div className='col-2'></div>
                    </div>
                    <hr className='line'/>
                    <br/>
                    {employee.filter(
                      (item) =>
                        item.name
                          ?.toLowerCase()
                           .includes(query.toLowerCase())  
                         // ||
                        // vacancy.vacancy_type
                        //   ?.toLowerCase()
                        //   .includes(query.toLowerCase()) */}
                        ).map((employee,ind)=> (
                        
                            <SingleEmployee employee={employee} />
                       
))}
                     

</div>

            
        </div>
    );
};