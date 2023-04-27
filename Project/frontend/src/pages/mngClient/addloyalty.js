import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./managecus.css";
import Swal from 'sweetalert2'

export default function AddLoyalty() {

  const [form, setForm] = useState({
    type: "",
    discount: "",
    payments: "",
  });
  const navigate = useNavigate();

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newPerson = { ...form };

    await fetch(`${process.env.REACT_APP_BACKEND_URL}/loyalty/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newPerson),
    })
        .catch(error => {
            window.alert(error);
            return;
        });

    Swal.fire({
          icon: 'success',
          title: 'Successfull',
          text: 'New Loyalty Level Added',
    })

    setForm({ type: "", discount: "", payments: "" });
    navigate("/manageclient");
}

  return (
    <div>
      <div className="loyaltyrow">
        <h2 class="text-4xl font-extrabold dark:text-white">  Add Loyalty Levels</h2>
      </div>
      <div className="addloyalty">
        <form onSubmit={onSubmit}>
          <div class="mb-6">
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Loyalty Level Name</label>
            <input type="text" id="email"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Gold"
              onChange={(e) => updateForm({ type: e.target.value })}
              required/>
          </div>
          <div class="mb-6">
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Discount Level (In Percentage)</label>
            <input type="text" id="password"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="12.5"
              onChange={(e) => updateForm({ discount: e.target.value })}
              required/>
          </div>
          <div class="mb-6">
            <label for="repeat-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Minimum Payments (In Rupees)</label>
            <input type="text" id="repeat-password"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="125000"
              onChange={(e) => updateForm({ payments: e.target.value })}
              required/>
          </div>
          <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add New Loyalty Level</button>
        </form>

      </div>
    </div>
  )
}