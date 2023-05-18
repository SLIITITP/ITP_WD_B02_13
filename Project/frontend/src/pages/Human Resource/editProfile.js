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
   const [salary_update, setsalary_update] = useState("");

   

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
          setsalary_update(employee.salary_update);


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
        mobile_no,
        salary_update


    
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
    
<div className="mt-24">
  <div className="container rounded bg-white mt-5 mb-5">
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="border-r">
          <div className="flex flex-col items-center text-center p-3 py-5">
            <img className="rounded-full mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" alt="Profile" />
            <span className="font-bold">Edogaru</span>
            <span className="text-gray-500">edogaru@mail.com.my</span>
          </div>
        </div>
        <div className="border-r">
          <div className="p-3 py-5">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-right">Profile Settings</h4>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <label className="block text-gray-700">Employee ID</label>
                <input type="text" className="form-input" value={emp_id} onChange={(e) => setEmployeeid(e.target.value)} />
              </div>
              <div>
                <label className="block text-gray-700">Name</label>
                <input type="text" className="form-input" value={name} onChange={(e) => setEmployeename(e.target.value)} />
              </div>
            </div>
            <div className="mt-3">
              <label className="block text-gray-700">Mobile Number</label>
              <input type="text" className="form-input" value={mobile_no} onChange={(e) => setEmployeemobileno(e.target.value)} /><br/>
            </div>
            <div className="mt-3">
              <label className="block text-gray-700">Address</label>
              <input type="text" className="form-input" value={address} onChange={(e) => setEmployeeaddress(e.target.value)} />
            </div>
            <div className="mt-3">
              <label className="block text-gray-700">Email</label>
              <input type="text" className="form-input" value={gmail} onChange={(e) => setEmployeegmail(e.target.value)} />
            </div>
            <div className="mt-3">
              <label className="block text-gray-700">Gender</label>
              <input type="text" className="form-input" value={gender} onChange={(e) => setEmployeegender(e.target.value)} />
            </div>
            <div className="mt-3">
              <label className="block text-gray-700">Password</label>
              <input type="text" className="form-input" value={password} onChange={(e) => setEmployeepassword(e.target.value)} />
            </div>
            <div className="flex justify-center mt-5">
              <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                Update
              </button>
            </div>

            <div className="mt-5 text-center">
              <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</div>


  );
}