import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function MakePayment(props) {

  const [employee, setEmployee] = useState({});
  const [salary_update, setSalaryUpdate] = useState({});
  const [allowance, setAllowance] = useState("");
  const [totalSalary,setTotalSalary] = useState("");
  const [empolyeeMonthlySalary,setEmpolyeeMonthlySalary] = useState("");

  
  const {id} = useParams();
  useEffect(() => {

    console.log(id) ;
    async function fetchEmployee() {
      await axios.get(`http://localhost:8070/employee/${id}`).then((res)=>{
          setEmployee(res.data);
          setEmpolyeeMonthlySalary(res.data.monthly_salary)
          console.log(res.data) ;
          console.log(res.data.salary_update);
          

      }).catch((err)=>{
        alert(err) ;
      })
    }
    fetchEmployee();
  }, [id]);

  
  

  const calculateTotal = (allowance,empolyeeMonthlySalary) => {
		const totalSalary = parseInt(empolyeeMonthlySalary) + parseInt(allowance);
		setTotalSalary(totalSalary);
	};

	//Calculate the total amount
	useEffect(() => {
		if (allowance && empolyeeMonthlySalary) {
			calculateTotal(allowance, empolyeeMonthlySalary);
		}
	}, [allowance, empolyeeMonthlySalary]);


  const handleSubmit = (e) => {
    e.preventDefault();
    
    const EditProfile = {
        salary_update
    }

    axios.put(`http://localhost:8070/employee/updateSalaryupdate/${id}`, EditProfile)
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


      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">Payment for Employee</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
              
              <form >
                  <label for="password" className="text-gray-600 text-sm">
                    Monthly salary
                  </label>&nbsp;
                  <input
                    type="text"
                    id="password"
                    name="password"
                    value={employee.monthly_salary}
                    className="peer placeholder-transparent border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder="Password"
                  />
                </form>
                <form>
                  <label for="password" className="text-gray-600 text-sm">
                    Allowance    
                  </label>&nbsp;
                  <input
                    type="Number"
                    id="Allowance"
                    name="Allowance"
                    className="peer placeholder-transparent border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    onChange={(e) => setAllowance(e.target.value)}
                    placeholder="Password"
                  />
                </form>
                <form>
                  <label for="password" className="text-gray-600 text-sm">
                    Month
                  </label>&nbsp;
                  <select
                    type="text"
                    defaultvalue={employee.salary_update}
                    onChange={(e) => setSalaryUpdate(e.target.value)}
                    className="peer placeholder-transparent border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder=""
                    
                  >
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>



                  </select>
              </form>  
                <form>
                  <label for="password" className="text-gray-600 text-sm">
                    Total    
                  </label>&nbsp;
                  <input
                    type="Number"
                    id=""
                    name="password"
                    value={totalSalary}
                    className="peer placeholder-transparent border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                  />
                </form>
                <div className="relative">
                  <button color="primary" onClick={handleSubmit}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      
      
    </div>
  );
}

export default MakePayment;
