import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Emp_profile(props) {

  const navigate = useNavigate();

  const [employee, setEmployee] = useState({});
    const {id} = useParams();
  useEffect(() => {

    console.log(id) ;
    async function fetchEmployee() {
      await axios.get(`http://localhost:8070/employee/${id}`).then((res)=>{
          setEmployee(res.data);
          console.log(res.data) ;

      }).catch((err)=>{
        alert(err) ;
      })
    }
    fetchEmployee();
  }, [id]);

  const handledelete = (id) => {
    axios
      .delete(`http://localhost:8070/employee/delete/${id}`)
      .then((res) => {
        console.log(res.data);
        setEmployee((prevData) => prevData.filter((employee) => employee._id !== id));
        
});
navigate("/AllEmployee")
};

  return (
    
    <div>
  <br/>
  <br/>
  <br/>
  <br/>
  <br/>
  <br/>
  <br/>
  <div class="container rounded bg-white mt-5 mb-5">
    
      <div class="flex flex-col md:flex-row">
        <div class="md:w-1/4 border-r">
          <div class="flex flex-col items-center text-center p-3 py-5">
            <img class="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"/>
            <span class="font-weight-bold">Edogaru</span>
            <span class="text-black-50">edogaru@mail.com.my</span>
          </div>
        </div>
        <div class="md:w-1/2 border-r">
          <div class="p-3 py-5">
            <div class="flex justify-end mb-3">
              <h4 class="text-right">Profile Settings</h4>
            </div>
            <div class="grid grid-cols-2 gap-4 mt-2">
              <div>
                <label class="block">Employee ID</label>
                <input type="text" class="form-input" value={employee.emp_id}/>
              </div>
              <div>
                <label class="block">Name</label>
                <input type="text" class="form-input" value={employee.name} />
              </div>
            </div>
            <div class="mt-3">
              <label class="block">Mobile Number</label>
              <input type="text" class="form-input" value={employee.mobile_no}/>
            </div> 
            <div class="mt-3">
              <label class="block">Address</label>
              <input type="text" class="form-input" value={employee.address}/>
            </div>
            <div class="mt-3">
              <label class="block">Email</label>
              <input type="text" class="form-input" value={employee.gmail}/>
            </div>
            <div class="mt-3">
              <label class="block">Gender</label>
              <input type="text" class="form-input" value={employee.gender}/>
            </div>

            <div class="mt-3">
              <label class="block">Password</label>
              <input type="text" class="form-input" value={employee.password}/>
            </div>

            <div class="mt-3">
              <a href={'/EditProfile/'+employee._id}> 
                <button class="border rounded px-3 py-1">
                  <i className="far fa-edit"></i> Edit
                </button>
              </a>
            </div>
              
            <div class="mt-3 ">
            <button className="border rounded px-3 py-1 bg-red-500 text-white hover:bg-red-600" type="submit" onClick={() => handledelete(employee._id)}>
                Delete
            </button>
            </div>
          </div>
        </div>
        <div class="md:w-1/4">
          <div class="p-3 py-5">
            <div class="flex justify-between items-center mb-3">
              <span></span>
              <span class="border px-3 p-1 add-experience"><i class="fa fa-plus"></i>&nbsp;{employee.salary_update}</span>
            </div>
            <div>
              <label class="block">Monthly salary</label>
              <input type="text" class="form-input" value={employee.monthly_salary}/>
            </div>
            <div class="mt-3">
              <label class="block">Work allocation</label>
              <input type="text" class="form-input" value={employee.allocation}/>
            </div>
            <div class="mt-3">
              <label class="block">Profession</label>
              <input type="text" class="form-input" value={employee.profession}/>
            </div>
          </div>
        </div>
      </div>
    
  </div>
</div>

  );
}

export default Emp_profile;
