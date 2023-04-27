import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import NavBar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";

import{
	DesignPortal,
	Dtemplate,
	Ptype,
	Material
} from "../pages"

function App() {
	return (
		<>
			<Router>
				<NavBar /> 

				<Routes>
					<Route path="/portal" element = {<DesignPortal/>}/>
					<Route path="/template" element = {<Dtemplate/>}/>
					<Route path="/print" element = {<Ptype/>}/>
					<Route path="/material" element = {<Material/>}/>
				</Routes>

				<Footer /> 

			</Router>
		</>
	);
}

export default App;
