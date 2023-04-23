import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import NavBar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";

function App() {
	return (
		<>
			<Router>
				<NavBar /> 

				<Routes>

				</Routes>

				<Footer /> 

			</Router>
		</>
	);
}

export default App;
