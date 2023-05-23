/* eslint-disable object-shorthand */
import React, { useState, useEffect } from "react";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useParams, useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import Swal from 'sweetalert2'

export default function ClientUpdate() {
	
	const [fname, setFname] = useState("");
	const [lname, setLname] = useState("");
	const [address, setAddress] = useState("");
	const [contactno, setContactno] = useState("");
	const [email, setEmail] = useState("");
	const [imgurl, setImgurl] = useState("");
	// const navigate = useNavigate();

	const [form , setForm] = useState({
		fname: "",
		lname: "",
		address: "",
		contactno: "",
		email: "",
		imgurl: "",
	});

	const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {

			const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}`;
            const id = params.id.toString();
            const response = await fetch(`${BASE_URL}/client/client/${params.id.toString()}`);

            if (!response.ok) {
                const message = `An error has occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const record = await response.json();
            if (!record) {
                window.alert(`Record with id ${id} not found`);
                navigate("/");
                return;
            }

            setFname(record.fname);
			setLname(record.lname);
			setAddress(record.address);
			setContactno(record.contactno);
			setEmail(record.email);

			setForm(record);
        }
        fetchData();

        return;
    }, [params.id, navigate]);

	return (
		<div className="cusupdate">
			<br />
            <br />
            <br />
            <br />
			<section className="bg-gray-50 dark: ">
				<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 cusregcard">
					<a href="/register" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white regtext">
						<h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
							<span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
								Update My Profile
							</span>
						</h1>
					</a>
					<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-l xl:p-0 dark:bg-gray-800 dark:border-gray-700 cusregform">
						<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
							<form
								
								className="space-y-4 md:space-y-6"
								autoComplete="off"
								onSubmit={async (e) => {
									e.preventDefault();

									const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}`;

									console.log(imgurl.name == null);

									if(address === ""){console.log("address is empty");}

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

											console.log("url " +url);

											console.log("imgurl " +imgurl + " end");

											if(Image.name == null){
												setImgurl(localStorage.getItem("imgurl"));
											}


											if (imgurl === " ") {
												console.log("imgurl is null");
												setImgurl(localStorage.getItem("imgurl"));
											}

											const editedClient = {
												fname,
												lname,
												address,
												contactno,
												email,
												// password: localStorage.getItem("clientPassword"),
												// totalpurchases:localStorage.getItem("clientTotalpurchases"),
												// totalpayments:localStorage.getItem("clientTotalpayments"),
												imgurl: url,
											};

											console.log("Image : " + imgurl);

											const response = await fetch(`${BASE_URL}/client/update/${params.id}`, {
												method: "POST",
												headers: {
													"Content-Type": "application/json",
												},
												body: JSON.stringify(editedClient),
											}).catch((err) => {
												window.alert(err);
												// return;
											});
											const content = await response.json();
											console.log(content);

											localStorage.setItem("clientFname", fname);
											localStorage.setItem("clientLname", lname);
											localStorage.setItem("clientAddress", address);
											localStorage.setItem("clientContactno", contactno);
											localStorage.setItem("clientEmail", email);
											localStorage.setItem("clientImgurl", url);
											
											if(content.success === true){
												alert("Profile Updates Successfully");
												window.location.href = "/clientdash";
											}
											else if (content.found === "email") {
												// alert("Email already exist");
												Swal.fire('Email already exist')
												window.location.href = "/clientdash";
											}
											else if (content.found === "contact") {
												// alert("Contact Number already exist");
												Swal.fire('Contact No already exist')
												window.location.href = "/clientdash";
											}
											Swal.fire({
												icon: 'success',
												title: 'Successful...',
												text: 'Profile Updated Successfully!',
												footer: '<a href="/cusdash">Go to Dashboard</a>'
											}).then((result) => {
												if (result.isConfirmed) {
													window.location.href = "/clientdash";
												}
											})
										})
										.catch((err) => {
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
											className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											placeholder="john"
											onChange={(e) => setFname(e.target.value )}
											defaultValue={form.fname}
											// required
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
											onChange={(e) => setLname(e.target.value)}
											defaultValue={form.lname}
											// required
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
										onChange={(e) => setAddress(e.target.value )}
										defaultValue={form.address}
										// required
									/>
								</div>
								{/* contactno */}
								<div>
									<label htmlFor="contactno" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
										Contact No
									</label>
									<input
										type="text"
										name="contactno"
										id="contactno"
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										placeholder="011-2364567"
										onChange={(e) => setContactno( e.target.value )}
										defaultValue={form.contactno}
										pattern="[0-9]{10}"
    									title="Please enter a valid 10-digit mobile number"
										// required
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
										onChange={(e) => setEmail(e.target.value )}
										defaultValue={form.email}
										// required
									/>
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

								</div>
								{/* image */}
								<div>
									<div>
										<input
											className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											id="file"
											type="file"
											name="image"
											onChange={(e) => {
												setImgurl(e.target.files[0]);
											}}
											
										/>
									</div>
								</div>
								<button
									type="submit"
									className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
									// onClick={(e) => {
									// 	if(document.getElementById("file").value === ""){
											
									// 	}
									// }}
								>
									Update My Profile
								</button>
							</form>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
