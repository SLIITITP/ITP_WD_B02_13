import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function MakePayment(props) {

  

  

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
              <form>
                  <label for="password" className="text-gray-600 text-sm">
                    Monthly salary
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="peer placeholder-transparent border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder="Password"
                  />
                </form>
                <form>
                  <label for="password" className="text-gray-600 text-sm">
                    Allowance    
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="peer placeholder-transparent border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder="Password"
                  />
                </form>
                <form>
                  <label for="password" className="text-gray-600 text-sm">
                    Total    
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="peer placeholder-transparent border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder="Password"
                  />
                </form>
                <div className="relative">
                  <button color="primary">
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
