import React, { useState } from 'react';
import axios from 'axios';

export default function AddEmployee() {
  const [emp_id, setEmp_id] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [profession, setProfession] = useState('');
  const [monthly_salary, setMonthly_salary] = useState('');
  const [address, setAddress] = useState('');
  const [gmail, setGmail] = useState('');
  const [password, setPassword] = useState('');
  const [allocation, setAllocation] = useState('');
  const [mobile_no, setMobileNo] = useState('');
  const [salary_update, setSalaryUpdate] = useState('');

  function sentData1(e) {
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
      mobile_no,
      salary_update,
    };

    axios
      .post('http://localhost:8070/employee/add/', newEmployee)
      .then(() => {
        alert('Employee Added');
        setEmp_id('');
        setName('');
        setGender('');
        setProfession('');
        setMonthly_salary('');
        setAddress('');
        setPassword('');
        setAllocation('');
        setMobileNo('');
        setSalaryUpdate('');
        console.log('Employee added');
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (

    <div>

    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <div className="container mx-auto my-8">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Add Employee</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="emp_id" className="block mb-1">
              Employee ID
            </label>
            <input
              type="text"
              id="emp_id"
              className="w-full rounded-lg border-gray-300 p-2"
              placeholder="Enter Employee ID"
              value={emp_id}
              onChange={(e) => setEmp_id(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="name" className="block mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full rounded-lg border-gray-300 p-2"
              placeholder="Enter Employee Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="gender" className="block mb-1">
              Gender
            </label>
            <select
              type="text"
              id="gender"
              className="w-full rounded-lg border-gray-300 p-2"
              placeholder="Enter Employee Gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                 <option value="female">Female</option>
            </select>
          </div>

          <div>
            <label htmlFor="profession" className="block mb-1">
              Profession
            </label>
            <input
              type="text"
              id="profession"
              className="w-full rounded-lg border-gray-300 p-2"
              placeholder="Enter Employee Profession"
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              required
              />
           </div>
  
           <div>
        <label htmlFor="monthly_salary" className="block mb-1">
          Monthly Salary
        </label>
        <input
          type="number"
          id="monthly_salary"
          className="w-full rounded-lg border-gray-300 p-2"
          placeholder="Enter Employee Monthly Salary"
          value={monthly_salary}
          onChange={(e) => setMonthly_salary(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="address" className="block mb-1">
          Address
        </label>
        <input
          type="text"
          id="address"
          className="w-full rounded-lg border-gray-300 p-2"
          placeholder="Enter Employee Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="gmail" className="block mb-1">
          Gmail
        </label>
        <input
          type="text"
          id="gmail"
          className="w-full rounded-lg border-gray-300 p-2"
          placeholder="Enter Employee Gmail"
          value={gmail}
          onChange={(e) => setGmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="block mb-1">
          Password
        </label>
        <input
          type="text"
          id="password"
          className="w-full rounded-lg border-gray-300 p-2"
          placeholder="Enter Employee Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="mobileno" className="block mb-1">
          Mobile Number
        </label>
        <input
          type="text"
          id="mobileno"
          className="w-full rounded-lg border-gray-300 p-2"
          placeholder="Enter Employee Mobile Number"
          value={mobile_no}
          onChange={(e) => setMobileNo(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        onClick={sentData1}
      >
        Submit
      </button>
    </form>
  </div>
</div></div>
);
}


