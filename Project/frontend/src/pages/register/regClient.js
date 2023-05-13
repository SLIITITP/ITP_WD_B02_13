/* eslint-disable object-shorthand */
import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import Swal from 'sweetalert2'

export default function RegClient() {

	const [fname, setFname] = useState("");
	const [lname, setLname] = useState("");
	const [address, setAddress] = useState("");
	const [contactno, setContactno] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [imgurl, setImgurl] = useState("");
	const [isErr, setIsErr] = useState("");

	// navigate("/login/clientlogin");
	const checkValidation = (e) => {
		setConfirmPassword(e.target.value);
		if (password.password == confirmPassword) {
			// alert("Password matched");
			setIsErr("Password Matches")
		} else {	
			
			setIsErr("Password are not matched");
			console.log(isErr);
			console.log(password.password);
			console.log(confirmPassword);
		}
    }

    // function handleContactNumberChange(e) {
    //     const contactno = e.target.value;
    
    //     // Use regex to match any valid contact number format
    //     const regex = /^\d{10}$/;
    
    //     if (!regex.test(contactno)) {
    //         setContactnoerr('Invalid contact number');
    //     } else {
    //         setContactnoerr('');
    //     }
    
    //     setContactno(contactno);
    //   }

    
	return (
		<div className="cusreg">
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<section className="bg-gray-50 dark: cusregsec">
				<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 cusregcard">
					<a href="/register" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white regtext">
						<h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
							<span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
								Register As A Client
							</span>
						</h1>
					</a>
					<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-l xl:p-0 dark:bg-gray-800 dark:border-gray-700 cusregform">
						<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
							<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
								Create An Account
							</h1>
							<form
								className="space-y-4 md:space-y-6"
								autocomplete="off"
								onSubmit={async (e) => {
									e.preventDefault();

									const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}`;

									const storageRef = ref(storage, `client/${Image.name + v4()}`);

									await uploadBytes(storageRef, imgurl)
										.then(() => {
											console.log("uploaded");
										})
										.catch((err) => {
											console.log(err);
										});

									await getDownloadURL(storageRef)
										.then(async (url) => {
											setImgurl(url);

											console.log(url);

											const newClient = {
												fname,
												lname,
												address,
												contactno,
												email,
												password,
												imgurl: url,
											};

											const response = await fetch(`${BASE_URL}/client/add`, {
												method: "POST",
												headers: {
													"Content-Type": "application/json",
												},
												body: JSON.stringify(newClient),
											}).catch((err) => {
												window.alert(err);
												// return;
											});
											const content = await response.json();
											console.log(content);

                                            
											if(content.success === true){
												alert("Client Registered Successfully");
												Swal.fire({
													icon: 'success',
													title: 'Successful...',
													text: 'Client Registered Successfully!',
													footer: '<a href="/login">Go to Login</a>'
												})	
												window.location.href = "/login/clientlogin";
											}
											else if (content.found === "email") {
												alert("Email already exist");
											}
											else if (content.found === "contactNo") {
												alert("Contact Number already exist");
											}
										}).catch((err) => {
										console.log(err);
										});	
                                        
                                        
								}}
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
											className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											placeholder="John"
											onChange={(e) => setFname({ fname: e.target.value })}
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
											onChange={(e) => setLname({ lname: e.target.value })}
											required
										/>
									</div>
								</div>

								{/* address name */}
								<div>
									<label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
										Address
									</label>
									<input
										type="text"
										name="adddress"
										id="address"
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										placeholder="No. 134, Main Road, Colombo"
										onChange={(e) => setAddress({ address: e.target.value })}
										required
									/>
								</div>

								{/* contactno */}
								<div>
									<label htmlFor="contactno" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
										Contact No
									</label>
									<input
										type=""
										name="contactno"
										id="contactno"
                                        maxLength='10'
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										placeholder="011-2364567"
										onChange={(e) => setContactno({ contactno: e.target.value })}
										required
									/>
								</div>

								{/* email */}
								<div>
									<label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
										Email Address
									</label>
									<input
										type="email"
										name="email"
										id="email"
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										placeholder="name@mail.com"
										onChange={(e) => setEmail({ email: e.target.value })}
										required
									/>
								</div>

                                {/* password */}
								<div className="grid gap-6 mb-6 md:grid-cols-2">
									<div>
										<label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
											Password
										</label>
										<input
											type="password"
											name="password"
											id="password"
											placeholder="••••••••"
											minLength='8'
											className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											onChange={(e) => setPassword({ password: e.target.value })}
										// value = {password}
											required
										/>
									</div>

								{/* confirm password */}
									<div>
										<label
											htmlFor="confirm-password"
											className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
										>
											Confirm password
										</label>
										<input
											type="password"
											name="confirm-password"
											id="confirm-password"
											placeholder="••••••••"
											minLength='8'
											className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											value={confirmPassword}
											onChange={(e) => checkValidation(e)}
											required
										/>
									</div>
								</div>
                                
								<div className="grid gap-6 mb-6 md:grid-cols-2">
									<div>
										<label
											htmlFor="confirm-password"
											className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
										>
											Upload Profile Picture
										</label>
									</div>
									<div>
										<label
											htmlFor="confirm-password"
											className="block mb-2 text-sm font-medium text-gray-900 dark:text-red-600"
										>
											{isErr}
										</label>
									</div>
								</div>
								{/* image */}
								<div>
									<div>
										<input
											className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											id="default_size"
											type="file"
											name="image"
											onChange={(e) => {
												setImgurl(e.target.files[0]);
											}}
											required
										/>
									</div>
								</div>
								<div className="flex items-start">
									<div className="flex items-center h-5">
										<input
											id="terms"
											aria-describedby="terms"
											type="checkbox"
											className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
											required
										/>
									</div>
									<div className="ml-3 text-sm">
										<label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">
											I accept the{" "}
											<a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="/">
												Terms and Conditions
											</a>
										</label>
									</div>
								</div>
								<button
									type="submit"
									className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"

								>
                                    
									Register Your Account
								</button>
								<p className="text-sm font-light text-gray-500 dark:text-gray-400">
									Already have an account?{" "}
									<a href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
										Login here
									</a>
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
