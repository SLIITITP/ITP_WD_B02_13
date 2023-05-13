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
	CusSearch,

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
    
				 {/* Login Selection */}
				 <Route path="/login" element={<Login />} />
				 <Route path="/login/clientlogin" element={<ClientLogin />} />
				 
				 {/* Register Selection */}
				 <Route path="/register" element={<Register/>} />
				 <Route path="/register/clientregister" element={<RegClient/>} />

				 {/* Client Dashboard */}
				 <Route path="/clientdash" element={<ClientDash />} />
				 <Route path="/clientdash/clientupdate/:id" element={<ClientUpdate/>}/>
				 <Route path="/clientdash/clientmore/:id" element={<ClientMore/>}/>
				 <Route path="/clientdash/addloyalty" element={<AddLoyalty />} />
				 <Route path="/clientdash/searchcus/:key" element={<CusSearch/>}/>
				 
				 {/*  Admin Dashboard*/}
				 <Route path="/admindash" element={<AdminDash />} />	


				 {/* Client Management */}
				 <Route path="/manageclient" element={<ClientManagement />} />
				 <Route path="/viewallcus" element={<ViewAllCus />} />
			 	 <Route path="/viewcus/:id" element={<ViewCus />} />
				 
         <Route path="/portal" element = {<DesignPortal/>}/>
				 <Route path="/template" element = {<Dtemplate/>}/>
				 <Route path="/print" element = {<Ptype/>}/>
				 <Route path="/material" element = {<Material/>}/>
				 <Route path="/updateTemplate/:id" element = {<Utemplate/>}/>
				 <Route path="/updatePrintType/:id" element = {<UprintType/>}/>
				 <Route path="/updateMaterial/:id" element = {<Umaterial/>}/>


				</Routes>

				<Footer /> 

			</Router>
		</>
	);
}

export default App;
