import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import NavBar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";


import {
	Checkout,
	ViewDetails,
	OrderAdmin,
	Invoice,
	AdminReport,
	Addcompany
} from "../pages"

function App() {
	return (
		<>
			<Router>
				<NavBar />

				<Routes>
					<Route path="/checkout" element={<Checkout />} />
					<Route path="/ViewDetails/:id" element={<ViewDetails />} />
					<Route path="/OrderAdmin" element={<OrderAdmin />} />
					<Route path="/invoice/:id" element={<Invoice />} />
					<Route path="/AdminReport" element={<AdminReport />} />

					<Route path="/company/:id" element={<Addcompany />} />
				</Routes>

				<Footer />

			</Router>
		</>
	);
}

export default App;
