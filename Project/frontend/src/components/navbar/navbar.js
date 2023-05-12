import React from 'react';
import "./navbar.css";


export default function NavBar(){


    return (
        <nav className="bg-white px-2 sm:px-4 py-2.5 dark:bg-gray-700 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
            <div className="container flex flex-wrap justify-between items-center mx-auto">
            <>
						<a href="/" className="flex items-center">
							<img src="LOGO" className="navimg" alt="LOGO" />
							<span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Sansalu Clothing</span>
						</a>
			</>
            <>
							<ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-700 dark:border-gray-700">
								<li>
									<a
										href="/"
										className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
									
									>
										Home
									</a>
								</li>
								<li>
									<a
										href="/"
										className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
									>
										Our Services
									</a>
								</li>
								<li>
									<a
										href="/"
										className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
									>
										About
									</a>
								</li>
								<li>
									<a
										href="/"
										className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
									>
										Contact Us
									</a>
								</li>
                                <li>
                                <a href="/register">
								<button
									type="button"
									className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-10">
									Register
								</button>
							    </a>
                                <a href="/login">
								<button
									type="button"
									className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-10">
									Log in
								</button>
							    </a>
                                </li>
							</ul>
						</>
                       
            </div>
        </nav>
    )
}
