import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import NavBar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";

import{
	Login,
	ClientLogin,
	Register,
	RegClient,
	ClientDash,
	ClientUpdate,
	ClientMore,

	AdminDash,

	AddLoyalty,
	ClientManagement,
	ViewAllCus,
	ViewCus,
	CusSearch
	
	

} from "../pages"

import{
	DesignPortal,
	Dtemplate,
	Ptype,
	Material,
	Utemplate,
	UprintType,
	Umaterial
} from "../pages"

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
