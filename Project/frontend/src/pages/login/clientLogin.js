import React from "react";
// import jwt_decode from 'jwt-decode';
// import Swal from 'sweetalert2'
// import { v4 } from "uuid";

export default function ClientLogin() {
	// const [email, setEmail] = React.useState("");
	// const [password, setPassword] = React.useState("");

	async function clientLogin(event) {
		// event.preventDefault();
		// const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/client/login`, {
		// 	method: "POST",
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 	},
		// 	body: JSON.stringify({
		// 		email,
		// 		password,
		// 	}),
		// });
		// const content = await response.json();
		// console.log(content);

		// if (content.user === true) {
		// 	localStorage.setItem("session", "yes");
		// 	localStorage.setItem("cusID", jwt_decode(content.token).id);
		// 	localStorage.setItem("cusFname", jwt_decode(content.token).fname);
		// 	localStorage.setItem("cusLname", jwt_decode(content.token).lname);
		// 	localStorage.setItem("cusAddress", jwt_decode(content.token).address);
		// 	localStorage.setItem("cusContactno", jwt_decode(content.token).contactno);
		// 	localStorage.setItem("cusEmail", jwt_decode(content.token).email);
		// 	localStorage.setItem("cusPassword", jwt_decode(content.token).password);
		// 	localStorage.setItem("cusTotalpurchases", jwt_decode(content.token).totalpurchases);
		// 	localStorage.setItem("cusTotalpayments", jwt_decode(content.token).totalpayments);
		// 	localStorage.setItem("cusImgurl", jwt_decode(content.token).imgurl);
		// 	localStorage.setItem("cusLoyaltylevel", jwt_decode(content.token).loyaltylevel);
		// 	localStorage.setItem("authToken", content.token);
		// 	localStorage.setItem("cusCartID" , (jwt_decode(content.token).fname + v4()));
		// 	localStorage.setItem("user", "CUSTOMER");
		// 	console.log(localStorage.getItem("session"));
		// 	console.log(localStorage.getItem("user"));
			
		// 	Swal.fire({
		// 		icon: 'success',
		// 		title: 'Successful...',
		// 		text: 'Login Successful as a Customer!',
		// 		footer: '<a href="/cusdash">Go to Dashboard</a>'
		// 	}).then((result) => {
		// 		if (result.isConfirmed) {
		// 			window.location.href = "/cusdash";
		// 		}
		// 	})
		// } else {
		// 	Swal.fire({
		// 		icon: 'error',
		// 		title: 'Oops...',
		// 		text: 'Check Your Email & Passoword Again!!!',
		// 	  })
		// }

		
			
	}

	return (
		<div>
			<br />
			<br />
			<br />
			<br />
			<div className="logincredcard">
				<section className="bg-gray-50 dark:bg-gray-900 glass glasscus">
					<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
						<a href="/clientlogin" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-black">
							<b>Login As A Client</b>
						</a>
						<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 card">
							<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
								<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
									Sign in to your account
								</h1>
								<form className="space-y-4 md:space-y-6" 
									  onSubmit={clientLogin}
									  autocomplete="off">
									<div>
										<label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
											Your email
										</label>
										<input
											type="email"
											name="email"
											id="email"
											className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											placeholder="someone@mail.com"
											// onChange={(event) => setEmail(event.target.value)}
											required
										/>
									</div>
									<div>
										<label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
											Password
										</label>
										<input
											type="password"
											name="password"
											id="password"
											placeholder="••••••••"
											className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											// onChange={(event) => setPassword(event.target.value)}
											required
										/>
									</div>
									<button
										type="submit"
										className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
									>
										Sign in
									</button>
									<p className="text-sm font-light text-gray-500 dark:text-gray-400 dark:text-black">
										Don’t have an account yet?{" "}
										<a href="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
											Sign up
										</a>
									</p>
								</form>
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}