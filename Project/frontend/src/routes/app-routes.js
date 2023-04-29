import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import NavBar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";


import {
	Checkout,
	ViewDetails,
	OrderAdmin
} from "../pages"

function App() {
	return (
		<>
			<Router>
				<NavBar />

				<Routes>
					<Route path="/checkout" element={<Checkout />} />
					<Route path="/ViewDetails" element={<ViewDetails />} />
					<Route path="/OrderAdmin" element={<OrderAdmin />} />
				</Routes>

				<Footer />

			</Router>
		</>
	);
}

export default App;
