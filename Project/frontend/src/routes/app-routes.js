import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import NavBar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";

import{
	AddPayments,
	PayCard,
	Pmethod

} from "../pages"

function App() {
	return (
		<>
			<Router>
				<NavBar /> 

				<Routes>
					<Route path="/payment" element={<AddPayments/>} />
					<Route path="payment/card" element={<PayCard/>} />
					<Route path="/method" element={<Pmethod/>} />
				</Routes>

				<Footer /> 

			</Router>
		</>
	);
}

export default App;
