/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import "./navbar.css";

// import { useNavigate } from "react-router-dom";

export default function NavBar() {
	//const navigate = useNavigate();

	const [search, setSearch] = useState("");

	const logout = () => {
		localStorage.removeItem("session");
		localStorage.removeItem("clientID");
		localStorage.removeItem("clientFname");
		localStorage.removeItem("clientLname");
		localStorage.removeItem("clientAddress");
		localStorage.removeItem("clientContactno");
		localStorage.removeItem("clientEmail");
		localStorage.removeItem("clientPassword");
		localStorage.removeItem("clientTotalpurchases");
		localStorage.removeItem("clientTotalpayments");
		localStorage.removeItem("clientImgurl");
		localStorage.removeItem("authToken");
		localStorage.removeItem("user");
		// localStorage.removeItem("clientCartID");
		window.location.href = "/";
	};

	async function searchItems(e) {
		e.preventDefault();
		const key = search;
		console.log(key);
		window.location.href = `/searchresults/${key}`;
	}

	return (
		<nav className="bg-white px-2 sm:px-4 py-2.5 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
			<div className="container flex flex-wrap justify-between items-center mx-auto">
				{/* login menu */}
				{!localStorage.getItem("authToken") || localStorage.getItem("user") === "CLIENT" ? (
					<>
						<a href="/" className="flex items-center">
							<img src=" " className="navimg" alt=" " />
							<span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Sansalu Clothing</span>
						</a>
					</>
				) : (
					<>
						<a href="#" className="flex items-center">
							<img src=" " className="navimg" alt=" " />
							<span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Sansalu Clothing</span>
						</a>
					</>
				)}
				<div className="flex md:order-2">
					{/* admin menu */}
					{localStorage.getItem("user") === "ADMIN" ? (
						<>
							<a href="/admindash">
								<button
									type="button"
									className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-10"
								>
									Dashboard
								</button>
							</a>
						</>
					) : (
						<></>
					)}

					{/* employee menu */}
					{localStorage.getItem("user") === "EMPLOYEE" ? (
						<>
							<a href="/empdash">
								<button
									type="button"
									className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-10"
								>
									Dashboard
								</button>
							</a>
						</>
					) : (
						<></>
					)}

					{/* client menu */}
					{localStorage.getItem("user") === "CLIENT" ? (
						<>
							<a href="/portal">
								<button
									type="button"
									className="text-white bg-blue-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 mx-10"
								>
									Go to Design
								</button>
							</a>

							<a href="/cusdash">
								<button
									type="button"
									className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-10"
								>
									Dashboard
								</button>
							</a>
						</>
					) : (
						<></>
					)}

					{/* login menu */}
					{localStorage.getItem("authToken") ? (
						<>
							<button
								type="button"
								onClick={logout}
								className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-10"
							>
								Log Out
							</button>
						</>
					) : (
						<>
							<a href="/register">
								<button
									type="button"
									className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-10"
								>
									Register
								</button>
							</a>
							<a href="/login">
								<button
									type="button"
									className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-10"
								>
									Log in
								</button>
							</a>
						</>
					)}

					<button
						data-collapse-toggle="navbar-sticky"
						type="button"
						className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
						aria-controls="navbar-sticky"
						aria-expanded="false"
					>
						<span className="sr-only">Open main menu</span>
						<svg
							className="w-6 h-6"
							aria-hidden="true"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
								clipRule="evenodd"
							></path>
						</svg>
					</button>
				</div>
				<div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
					{/* login menu */}
					{!localStorage.getItem("authToken") || localStorage.getItem("user") === "CLIENT" ? (
						<>
							<ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
								<li>
									<a
										href="/"
										className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
									// aria-current="page"
									>
										Home
									</a>
								</li>
								<li>
									<a
										href="/service"
										className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
									>
										Our Services
									</a>
								</li>
								<li>
									<a
										href="/about"
										className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
									>
										About
									</a>
								</li>
								<li>
									<a
										href="/contact"
										className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
									>
										Contact Us
									</a>
								</li>
								
							</ul>
						</>
					) : (
						<>
							<ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
								<li>
									<a
										href="#"
										className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
									// aria-current="page"
									>
										Home
									</a>
								</li>
								<li>
									<a
										href="#"
										className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
									>
										Products
									</a>
								</li>
								<li>
									<a
										href="#"
										className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
									>
										Brands
									</a>
								</li>
								<li>
									<a
										href="#"
										className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
									>
										Services
									</a>
								</li>
								<li>
									<a
										href="#"
										className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
									>
										About
									</a>
								</li>
								<li>
									<a
										href="#"
										className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
									>
										Contact
									</a>
								</li>
							</ul>
						</>
					)}

					<form onSubmit={searchItems}>
						<label
							htmlFor="default-search"
							className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
						>
							Search
						</label>
						<div className="relative mx-10 searchbar">
							<input
								type="search"
								id="default-search"
								className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder="Search Here"
								onChange={(e) => setSearch(e.target.value)}
								required=""
							/>
							<button
								type="submit"
								className=" button text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
							>
								<svg
									aria-hidden="true"
									className="w-5 h-5 text-gray-500 dark:text-gray-400"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
									></path>
								</svg>
							</button>
						</div>
					</form>
				</div>
			</div>
		</nav>
	);
}
