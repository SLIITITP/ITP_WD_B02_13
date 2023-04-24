import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import NavBar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";

import{
	AddCompany,DeliveryForm
}from "../pages"

function App() {
	return (
		<>
			<Router>
				<NavBar /> 

				<Routes>

					<Route path="/mngdistribution" element={<AddCompany/>}/>
					<Route path="/dform" element={<DeliveryForm/>}/>

				</Routes>

				<Footer /> 

			</Router>
		</>
	);
}

export default App;
