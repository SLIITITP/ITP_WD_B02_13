import React, { useState, useEffect } from "react";


export default function AddDelivery(){

    return(

        <div className="cusreg">
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<section className="bg-gray-50 dark: cusregsec">
				<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 cusregcard">
					
					<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-l xl:p-0 dark:bg-gray-800 dark:border-gray-700 cusregform">
						<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
							<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
								Delivery Details
							</h1>
							<form
						
							>
								{/* name  */}
								<div className="grid gap-6 mb-6 md:grid-cols-2">
									<div>
										<label htmlFor="fname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
											First name
										</label>
										<input
											type="text"
											id="fname"
											className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											placeholder="John"
											
											required
										/>
									</div>
									<div>
										<label htmlFor="lname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
											Last name
										</label>
										<input
											type="text"
											id="lname"
											className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											placeholder="Doe"
											
											required
										/>
									</div>
								</div>

								
                                
                                <div className="grid gap-6 mb-6 md:grid-cols-2">
									<div>
										<label htmlFor="fname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
											City
										</label>
										<input
											type="text"
											id="fname"
											className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											placeholder="city"
											
											required
										/>
									</div>
									<div>
										<label htmlFor="lname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
											Province
										</label>
										<input
											type="text"
											id="lname"
											className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											placeholder="province"
											
											required
										/>
									</div>
								</div>
                                <div className="grid gap-6 mb-6 md:grid-cols-2">
									<div>
										<label htmlFor="fname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
											First name
										</label>
										<input
											type="text"
											id="fname"
											className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											placeholder="John"
											
											required
										/>
									</div>
									<div>
										<label htmlFor="lname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
											Last name
										</label>
										<input
											type="text"
											id="lname"
											className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											placeholder="Doe"
											
											required
										/>
									</div>
								</div>

								
                                <div className="grid gap-6 mb-6 md:grid-cols-2">
									<div>
										<label htmlFor="fname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
											City
										</label>
										<select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                <option selected="selected">Delivery Method</option>
                                                <option>Pick Up</option>
                                                <option>Delivery</option>
                                        </select>
									</div>
									<div>
										<label htmlFor="lname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
											Province
										</label>
										
                                        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                <option selected="selected">Delivery Method</option>
                                                <option>Pick Up</option>
                                                <option>Delivery</option>
                                        </select>
									</div>
                                    
								</div>
						
								<button
									type="submit"
									className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"

								>
                                    
									Calculate
								</button>
                                
								<p className="text-sm font-light text-gray-500 dark:text-gray-400">
									lorem lorem <br/>
                                    lorem lorem <br/>
                                    lorem lorem <br/>
                                    lorem lorem <br/>

									<button
									type="submit"
									className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"

								>
                                    
									Proceed to pay
								</button>
								</p>
							</form>
						</div>
					</div>
				</div>
			</section>
			<br />
			<br />
		</div>
    );
}
