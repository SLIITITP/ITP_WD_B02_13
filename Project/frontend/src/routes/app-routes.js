import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import NavBar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";

import{
	AddPayments,
	PayCard,
	Pmethod,
	Pcard,
	Ucard,
	Umethod,
	PpaymentDetails

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
					<Route path="/card" element={<Pcard/>} />
					<Route path="/paymentDetails" element={<PpaymentDetails/>} />
					<Route path="/updateCard/:id" element={<Ucard/>} />
					<Route path="/updateMethod/:id" element={<Umethod/>} />
				</Routes>

				<Footer /> 

			</Router>
		</>
	);
}

export default App;
