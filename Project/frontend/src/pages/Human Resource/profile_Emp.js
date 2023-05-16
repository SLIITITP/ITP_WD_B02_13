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
      <form >
  <div class="row">
    <div class="col-md-3 border-right">
      <div class="d-flex flex-column align-items-center text-center p-3 py-5">
        <img class="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"/>
        <span class="font-weight-bold">Edogaru</span>
        <span class="text-black-50">edogaru@mail.com.my</span>
      </div>
    </div>
    <div class="col-md-5 border-right">
      <div class="p-3 py-5">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h4 class="text-right">Profile Settings</h4>
        </div>
        <div class="row mt-2">
          <div class="col-md-6">
            <label class="labels">Employee ID<br/></label>
            <input type="text" class="form-control" value={employee.emp_id}/>
          </div>
          <div class="col-md-6">
            <label class="labels">Name<br/></label>
            <input type="text" class="form-control" value={employee.name} />
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-md-12">
            <label class="labels">Mobile Number<br/></label>
            <input type="text" class="form-control" value={employee.mobile_no}/><br/>
          </div>
        </div> 
        <div class="row mt-3"> 
          <div class="col-md-12">
            <label class="labels">Address<br/></label>
            <input type="text" class="form-control"  value={employee.address}/>
          </div>
        </div>

        <div class="row mt-3"> 
          <div class="col-md-12">
            <label class="labels">Email<br/></label>
            <input type="text" class="form-control"  value={employee.gmail}/>
          </div>
        </div>

        <div class="row mt-3"> 
          <div class="col-md-12">
            <label class="labels">Gender<br/></label>
            <input type="text" class="form-control"  value={employee.gender}/>
          </div>
        </div>

        <div class="row mt-3"> 
          <div class="col-md-12">
            <label class="labels">Password<br/></label>
            <input type="text" class="form-control"  value={employee.password}/>
          </div>
        </div>


        <div class="row mt-3"> 
          <div class="col-md-12">
          <a href={"/EditProfile/"+employee._id}> <button> <i className="far fa-edit"></i> Edit</button></a>
          </div>
        </div>  
        
        <div class="row mt-3">
          <div>
              <button type="submit" onClick={() => handledelete(employee._id)} className="button-24"> Delete </button>
          </div>
        </div>


            </div>
        </div>
        <div class="col-md-4">
            <div class="p-3 py-5">
                <div class="d-flex justify-content-between align-items-center experience"><span>Edit Experience</span><span class="border px-3 p-1 add-experience"><i class="fa fa-plus"></i>&nbsp;Experience</span></div>
                <div class="col-md-12"><label class="labels">Monthly salary<br/></label><input type="Number" class="form-control" value={employee.monthly_salary}/></div> <br/>
                <div class="col-md-12"><label class="labels">Work allocation<br/></label><input type="text" class="form-control" value={employee.allocation}/></div>
                <div class="col-md-12"><label class="labels">Profession<br/></label><input type="text" class="form-control" value={employee.profession}/></div>
            </div>
        </div>
        </div>
        </form>
        </div>
    </div>
  );
}

export default Emp_profile;
