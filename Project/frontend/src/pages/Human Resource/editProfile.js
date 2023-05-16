import React, {useState, useEffect} from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";


export default function EditProfile() {

   // const[template,setTemplate] = useState({});
   const { id } = useParams();

   const [emp_id, setEmployeeid] = useState("");
   const [name, setEmployeename] = useState("");
   const [gender, setEmployeegender] = useState("");
   const [allocation, setEmployeeallocation] = useState("");
   const [monthly_salary, setEmployeemonthly_salary] = useState("");
   const [address, setEmployeeaddress] = useState("");
   const [gmail, setEmployeegmail] = useState("");
   const [password, setEmployeepassword] = useState("");
   const [mobile_no, setEmployeemobileno] = useState("");
   const [profession, setEmployeeprofession] = useState("");

   

   useEffect(() => {
      axios.get(`http://localhost:8070/employee/${id}`)
        .then((response) => {
          const employee = response.data;
          setEmployeeid(employee.emp_id);
          setEmployeename(employee.name);
          setEmployeegender(employee.gender);
          setEmployeeallocation(employee.allocation);
          setEmployeemonthly_salary(employee.monthly_salary);
          setEmployeeaddress(employee.address);
          setEmployeegmail(employee.gmail);
          setEmployeepassword(employee.password);
          setEmployeemobileno(employee.mobile_no);
          setEmployeeprofession(employee.profession);

          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const EditProfile = {
        emp_id,
        name,
        gender,
        allocation,
        monthly_salary,
        address,
        gmail,
        password,
        profession,
        mobile_no


    
    }

    axios.put(`http://localhost:8070/employee/update/${id}`, EditProfile)
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
    <form onSubmit={handleSubmit}>
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
            <input type="text" class="form-control" value={emp_id} onChange={(e) => setEmployeeid(e.target.value)}/>
          </div>
          <div class="col-md-6">
            <label class="labels">Name<br/></label>
            <input type="text" class="form-control" value={name} onChange={(e) => setEmployeename(e.target.value)} />
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-md-12">
            <label class="labels">Mobile Number<br/></label>
            <input type="text" class="form-control"value={mobile_no} onChange={(e) => setEmployeemobileno(e.target.value)}/><br/>
          </div>
        </div> 
        <div class="row mt-3"> 
          <div class="col-md-12">
            <label class="labels">Address<br/></label>
            <input type="text" class="form-control"  value={address} onChange={(e) => setEmployeeaddress(e.target.value)}/>
          </div>
        </div>

        <div class="row mt-3"> 
          <div class="col-md-12">
            <label class="labels">Email<br/></label>
            <input type="text" class="form-control"  value={gmail} onChange={(e) => setEmployeegmail(e.target.value)}/>
          </div>
        </div>

        <div class="row mt-3"> 
          <div class="col-md-12">
            <label class="labels">Gender<br/></label>
            <input type="text" class="form-control"  value={gender} onChange={(e) => setEmployeegender(e.target.value)}/>
          </div>
        </div>

        <div class="row mt-3"> 
          <div class="col-md-12">
            <label class="labels">Password<br/></label>
            <input type="text" class="form-control"  value={password} onChange={(e) => setEmployeepassword(e.target.value)}/>
          </div>
        </div>
       
            
        <div className = "btns">
                <button type="submit" className = "btn btn-primary profile-button">Update</button>
                </div>

                <div class="mt-5 text-center"><button class="btn btn-primary profile-button" type="button">Delete</button></div>
            </div>
        </div>

        </div>
        </form>
        </div>
    </div>
  );
}