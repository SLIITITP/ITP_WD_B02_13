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
    
    <div className="container">
      <br/>
      <br/>
      <br/>
      <br/>
  <div className="rounded bg-white mt-5 mb-5 p-5">
    <div className="flex flex-col md:flex-row">
      <div className="md:w-1/4 border-r">
        <div className="flex flex-col items-center text-center p-3 py-5">
          <img className="rounded-circle mt-5" width="150px" src={employee.imgurl} alt="Employee Profile" />
          <span className="font-weight-bold">{employee.name}</span>
          <span className="text-black-50">{employee.gmail}</span>
        </div>
      </div>
      <div className="md:w-1/2 border-r">
        <div className="p-3 py-5">
          <div className="flex justify-end mb-3">
            <h4 className="text-right">Profile Settings</h4>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <label className="block">Employee ID</label>
              <input type="text" className="form-input border border-gray-300 rounded py-2 px-4" value={employee.emp_id} readOnly />
            </div>
            <div>
              <label className="block">Name</label>
              <input type="text" className="form-input border border-gray-300 rounded py-2 px-4" value={employee.name} readOnly />
            </div>
          </div>
          <div className="mt-3">
            <label className="block">Mobile Number</label>
            <input type="text" className="form-input border border-gray-300 rounded py-2 px-4" value={employee.mobile_no} readOnly />
          </div>
          <div className="mt-3">
            <label className="block">Address</label>
            <input type="text" className="form-input border border-gray-300 rounded py-2 px-4" value={employee.address} readOnly />
          </div>
          <div className="mt-3">
            <label className="block">Email</label>
            <input type="text" className="form-input border border-gray-300 rounded py-2 px-4" value={employee.gmail} readOnly />
          </div>
          <div className="mt-3">
            <label className="block">Gender</label>
            <input type="text" className="form-input border border-gray-300 rounded py-2 px-4" value={employee.gender} readOnly />
          </div>
          <div className="mt-3">
            <label className="block">Password</label>
            <input type="text" className="form-input border border-gray-300 rounded py-2 px-4" value={employee.password} readOnly />
          </div>
          <div className="mt-3">
            <a href={'/EditProfile/' + employee._id}>
              <button className="border rounded px-3 py-1">
                <i className="far fa-edit"></i> Edit
              </button>
            </a>
          </div>
          <div className="mt-3">
            <button className="border rounded px-3 py-1 bg-red-500 text-white hover:bg-red-600" type="submit" onClick={() => handledelete(employee._id)}>
              Delete
            </button>
          </div>
        </div>
      </div>
      <div className="md:w-1/4">
        <div className="p-3 py-5">
          <div className="flex justify-between items-center mb-3">
            <span></span>
            <span className="border px-3 p-1 add-experience">
              <i className="fa fa-plus"></i>&nbsp;{employee.salary_update}
            </span>
          </div>
          <div>
            <label className="block">Monthly salary</label>
            <input type="text" className="form-input border border-gray-300 rounded py-2 px-4" value={employee.monthly_salary} readOnly />
          </div>
          <div className="mt-3">
            <label className="block">Work allocation</label>
            <input type="text" className="form-input border border-gray-300 rounded py-2 px-4" value={employee.allocation} readOnly />
          </div>
          <div className="mt-3">
            <label className="block">Profession</label>
            <input type="text" className="form-input border border-gray-300 rounded py-2 px-4" value={employee.profession} readOnly />
          </div>
          <div className="mt-3">
            <label className="block">Last Salary update</label>
            <input type="text" className="form-input border border-gray-300 rounded py-2 px-4" value={employee.salary_update} readOnly />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
)

}

export default Emp_profile;
