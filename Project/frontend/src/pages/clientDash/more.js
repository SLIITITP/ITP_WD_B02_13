import React, { useState } from 'react'
import './clientdash.css'
import { useParams, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import moreimage from "./images/more.jpg"

export default function ClientMore() {

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  
  const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}`;

  const params = useParams();
  const navigate = useNavigate();

  async function updatePassword(e) {
    e.preventDefault();
    if (password !== password2) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Passwords do not match!',
      })
      return;
    }
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/client/updatepassword/${params.id.toString()}`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              password: password,
          }),
      });
      Swal.fire({
        icon: 'success',
        title: 'Password Updated!',
        text: 'Your password has been updated successfully!',
      })
      navigate("/clientdash");
  }

  async function promptDelete() {
    const swalWithBootstrapButtons = Swal.mixin({
      clientClass: {
        confirmButton: 'text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2',
        cancelButton: 'text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this! You will lose all your data!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/client/delete/${localStorage.getItem("clientID")}`, {
          method: "DELETE"
        });
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your profile has been deleted.',
          'success'
        )
        // localStorage.removeItem("session");
        // localStorage.removeItem("cusID");
        // localStorage.removeItem("cusFname");
        // localStorage.removeItem("cusLname");
        // localStorage.removeItem("cusAddress");
        // localStorage.removeItem("cusContactno");
        // localStorage.removeItem("cusEmail");
        // localStorage.removeItem("cusPassword");
        // localStorage.removeItem("cusTotalpurchases");
        // localStorage.removeItem("cusTotalpayments");
        // localStorage.removeItem("cusImgurl");
        // localStorage.removeItem("authToken");
        // localStorage.removeItem("user");
        // navigate("/");
        //window.location.reload(false);
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your Account is Safe :)',
          'info'
        )
      }
    })
  }

  return (
    <div>
      <br /> <br /> <br /> <br /> <br />
      <div class="cusdanger">
        <div class="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-4xl hover:bg-gray-400 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-900 cdanger">
          <img class="object-cover w-250 h-250 rounded-t-lg md:h-200 md:w-100 md:rounded-none md:rounded-l-lg" 
          src={moreimage}
          alt=" " />
          <div class="flex flex-col justify-between p-4 leading-normal w-150 passform">

            <form onSubmit={updatePassword}>
              <div class="mb-6">
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Enter New Password</label>
                <input
                  type="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  class="w-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required />
              </div>
              <div class="mb-6">
                <label for="repassword" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Re-Enter password</label>
                <input
                  type="password"
                  id="repassword"
                  onChange={(e) => setPassword2(e.target.value)}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required />
              </div>
              <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update Password</button>
            </form>

            <br />
            <div className="deletebtn">
              <button
                onClick={promptDelete}
                type="button"
                class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"> &nbsp; Delete Account &nbsp;  
              </button></div>

          </div>
        </div>
      </div>
    </div>
  )
}
