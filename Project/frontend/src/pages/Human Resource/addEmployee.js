import React, { useState , Component ,useNavigate} from 'react';
import './Styles/Profile.css'
import axios from "axios";

export default function AddEmployee(){


    const [emp_id,setEmp_id] = useState("");
    const [name,setName] = useState(""); // initializing values for the form 
    const [gender,setGender] = useState("");
    const [profession,setProfession] = useState("");
    const [monthly_salary,setMonthly_salary] = useState("");
    const [address,setAddress] = useState("");
    const [gmail,setGmail] = useState("");
    const [password,setPassword] = useState("");
    const [allocation,setallocation] = useState("");
    const [mobile_no,setMobileno] = useState("");


    function sentData1(e){
        e.preventDefault();
       
        const newEmployee = {

            emp_id,
            name,
            gender,
            profession,
            monthly_salary,
            address,
            gmail,
            password,
            allocation,
            mobile_no

        }

        axios.post("http://localhost:8070/employee/add/", newEmployee).then(()=>{
            alert("employee Added")
            setEmp_id("");
            setName("");
            setGender("");
            setProfession("");
            setMonthly_salary("");
            setAddress("");
            setPassword("");
            setallocation("");
            setMobileno("");
            console.log("employee added")

        }).catch((err)=>{
            alert(err);
        })
      //  navigate("/AllEmployee")
    }
    return(
        <div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>


            <div className="container form">
            <form action="" className='form-body'>
               <div className='row'>
                    <label for="emp_id">E id</label>
                    <input type="text" className="form-control" id="name" placeholder="Enter Employee Name" onChange={(e)=>{   // onChange Function --- occuring this one continuously
                        setEmp_id(e.target.value)
                    }}
                    required/>
                </div>
                    
                <div className="row">
                    <label for="name" className='form__label'> Name </label>
                    <input type="text" className="form-control form__input" id="age" placeholder="Enter Employee Age"onChange={(e)=>{   
                        setName(e.target.value)
                    }} 
                    required/>
                    
                </div>
                <div className="row">
                    <label for="gender"className='form__label'> Gender</label>
                    <input type="text" className="form-control form__input" id="gender" placeholder="Enter Employee Gender"onChange={(e)=>{   
                        setGender(e.target.value)
                    }} 
                    required/>
                    
                </div>

                <div className="row">
                    <label for="profession" className='form_label'> profession</label>
                    <input type="text" className="form-control form__input" id="profession" placeholder="Enter Employee profession"onChange={(e)=>{   
                        setProfession(e.target.value)
                    }} 
                    required/>
                    
                </div>

                <div className="row">
                    <label for="monthly salary" className='form_label'> monthly_salary</label>
                    <input type="number" className="form-control form__input" id="monthly_salary" placeholder="Enter Employee monthly salary"onChange={(e)=>{   
                        setMonthly_salary(e.target.value)
                    }} 
                    required/>
                    
                </div>

                <div className="row">
                    <label for="address" className='form_label'> Address</label>
                    <input type="text" className="form-control form__input" id="address" placeholder="Enter Employee address"onChange={(e)=>{   
                        setAddress(e.target.value)
                    }} 
                    required/>
                    
                </div>

                <div className="row">
                    <label for="gmail" className='form_label'> gmail</label>
                    <input type="text" className="form-control form__input" id="gmail" placeholder="Enter Employee gmail"onChange={(e)=>{   
                        setGmail(e.target.value)
                    }} 
                    required/>
                    
                </div>

                <div className="row">
                    <label for="password" className='form_label'> password</label>
                    <input type="text" className="form-control form__input" id="password" placeholder="Enter Employee password"onChange={(e)=>{   
                        setPassword(e.target.value)
                    }} 
                    required/>
                    
                </div>

                <div className="row">
                    <label for="allocation" className='form_label'> allocation</label>
                    <input type="text" className="form-control form__input" id="allocation" placeholder="Enter Employee allocation"onChange={(e)=>{   
                        setallocation(e.target.value)
                    }} 
                    required/>
                    
                </div>
                <br/>

                <div className="row">
                    <label for="allocation" className='form_label'> Mobile Number</label>
                    <input type="text" className="form-control form__input" id="mobileno" placeholder="Enter Employee allocation"onChange={(e)=>{   
                        setMobileno(e.target.value)
                    }} 
                    required/>
                    
                </div>
                <br/>
            
                <button type="submit" className="btnsubmit" onClick={sentData1}>Submit</button>
            </form> 

            
        </div>
            
        </div>
    );

}