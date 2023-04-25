import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import NavBar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";

import{
	Login,
	ClientLogin,
	Register

} from "../pages"

function App() {
	return (
		<>
			<Router>
				<NavBar /> 

				<Routes>

				 <Route path="/login" element={<Login />} />
				 <Route path="/login/clientlogin" element={<ClientLogin />} />

				 <Route path="/register" element={<Register/>} />
				</Routes>

				<Footer /> 

			</Router>
		</>
	);
}

export default App;
