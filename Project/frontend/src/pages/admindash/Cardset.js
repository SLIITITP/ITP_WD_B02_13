/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import "./index.css";
import image from "./images/admin_dashboard.jpg";

export default function Cardset() {

  const goto = "See more";
  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <div className="containerr">
        <div className="row">
          <div
            className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 cards">
            <a href="/manageclient">
              <img className="rounded-t-lg"
                src={image}
                alt="" />
            </a>
            <div className="p-5">
              <a href="/managecus">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Client
                  Management</h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"> description goes here </p>
              <a href="/manageclient"
                className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                {goto}
                <svg aria-hidden="true" className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"></path>
                </svg>
              </a>
            </div>
          </div>

          <div
            className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 cards">
            <a href="/managehr">
              <img className="rounded-t-lg"
                src={image}
                alt="" />
            </a>
            <div className="p-5">
              <a href="/managehr">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">HR Management
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"> description goes here </p>
              <a href="/managehr"
                className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                {goto}
                <svg aria-hidden="true" className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"></path>
                </svg>
              </a>
            </div>
          </div>

          <div
            className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 cards">
            <a href="/managedesign">
              <img className="rounded-t-lg"
                src={image}
                alt="" />
            </a>
            <div className="p-5">
              <a href="/managedesign">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Design
                  Management</h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"> description goes here </p>
              <a href="/managedesign"
                className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                {goto}
                <svg aria-hidden="true" className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"></path>
                </svg>
              </a>
            </div>
          </div>

        </div>
        <br />

        <div className="row">
          <div
            className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 cards">
            <a href=" ">
              <img className="rounded-t-lg"
                src={image}
                alt="" />
            </a>
            <div className="p-5">
              <a href="/manageorder">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Order
                  Management</h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"> description goes here </p>
              <a href="/manageorder"
                className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                {goto}
                <svg aria-hidden="true" className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"></path>
                </svg>
              </a>
            </div>
          </div>

          <div
            className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 cards">
            <a href=" ">
              <img className="rounded-t-lg"
                src={image}
                alt="" />
            </a>
            <div className="p-5">
              <a href="/manangeproduction">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Distribution
                  Management</h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">description goes here </p>
              <a href="/manageproduction"
                className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                {goto}
                <svg aria-hidden="true" className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"></path>
                </svg>
              </a>
            </div>
          </div>

          <div
            className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 cards">
            <a href=" ">
              <img className="rounded-t-lg"
                src={image}
                alt="" />
            </a>
            <div className="p-5">
              <a href="/managestock">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Stock
                  Management</h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"> description goes here </p>
              <a href="/managestock"
                className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                {goto}
                <svg aria-hidden="true" className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      <br />

      <div className="cont">
        <div className="row">
          <div
            className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 cards">
            <a href="/managedistribution">
              <img className="rounded-t-lg"
                src={image}
                alt="" />
            </a>
            <div className="p-5">
              <a href="/managedistribution">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Distribution
                  Management
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"> description goes here </p>
              <a href="/managedistribution"
                className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                {goto}
                <svg aria-hidden="true" className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"></path>
                </svg>
              </a>
            </div>
          </div>
          
          <div
            className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 cards">
            <a href="/managepayment">
              <img className="rounded-t-lg"
                src={image}
                alt="" />
            </a>
            <div className="p-5">
              <a href="/managepayment">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Payment
                  Management
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"> description goes here </p>

              <a href="/managesup"
                className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                {goto}
                <svg aria-hidden="true" className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}