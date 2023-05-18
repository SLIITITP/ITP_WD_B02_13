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

               
            {/* search bar */}
            <div >

              <input aria-label="Search" className="form-control-rounded form-control-prepended"  placeholder="Search By Employee Name" type="search"
                  onChange={(e) => setQuery(e.target.value)}
                  style={{borderRadius:"8px",width:"600px",marginLeft:"350px",height:"40px",padding:"5px"}}
              /><br/><br/>
           </div>

            <table style={{marginLeft:"260px"}}><thead>
                <tr>
                   <th style={{ width: '150px', textAlign: 'center' }} >Employee Name</th>
                   <th style={{ width: '150px', textAlign: 'center' }}>Gender</th>
                   <th style={{ width: '150px', textAlign: 'center' }}>Profession</th>
                   <th style={{ width: '150px', textAlign: 'center' }}>Allocate</th>
                   <th style={{ width: '150px', textAlign: 'center' }}>Update</th>
                   <th style={{ width: '150px', textAlign: 'center' }}>Delete</th>
                </tr>
            </thead></table>
 
          <div style={{ display: "flex", justifyContent: "center" }}>
             <table style={{width: "1000px",  fontFamily: "Arial, sans-serif", fontSize: "14px", color: "#333", borderCollapse: "collapse",}}
          >
          <thead>
          </thead>
          <tbody>
                {employee.filter((item) =>
                  item.name?.toLowerCase().includes(query.toLowerCase())
                ).map((employee, ind) => (
                      <tr key={ind}>
                         <SingleEmployee
                         employee={employee}
                         allocation={allocation}
                         //   handleSubmit={handleSubmit}
          />
          </tr>
           ))}
    </tbody>
  </table>
</div>
        
        </div>
    );
};