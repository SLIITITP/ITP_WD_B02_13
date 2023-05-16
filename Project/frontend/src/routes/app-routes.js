import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import NavBar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";

import { Addcategory, 
	Addmaterial,
	 Addorder,
	 Addpurchase,
	 Addsupplier,
	 Allcategory,
	  Allmaterial,
	  Allorder,
	  Allpurchase,
	  Allsupplier,
	  StockOrderHome,
	  Onecategory,
	   Onematerial,
	    Oneorder,
	    Onepurchase,
	    Onesupplier,
	    Ucategory, 
		Umaterial,
		Uorder,
		Upurchase,
		Usupplier} from "../pages";

function App() {
	return (
		<>
			<Router>
				<NavBar />
				<Routes>
					<Route path="/stock" element={<Addmaterial />} />
					<Route path="/addcategory" element={<Addcategory />} />
					<Route path="/allcategory" element={<Allcategory />} />
					<Route path="/updatecategory/:id" element={<Ucategory />} />
					<Route path="/onecategory/:id" element={<Onecategory />} />
					<Route path="/addmaterial" element={<Addmaterial />} />
					<Route path="/allmaterial" element={<Allmaterial />} />
					<Route path="/onematerial/:id" element={<Onematerial />} />
					<Route path="/updatematerial/:id" element={<Umaterial />} />
					<Route path="/addorder" element={<Addorder />} />
					<Route path="/addsupplier" element={<Addsupplier />} />
					<Route path="/addpurchase" element={<Addpurchase />} />
					<Route path="/allsupplier" element={<Allsupplier />} />
					<Route path="/allpurchase" element={<Allpurchase />} />
					<Route path="/onesupplier/:id" element={<Onesupplier />} />
					<Route path="/updatesupplier/:id" element={<Usupplier />} />
					<Route path="/onepurchase/:id" element={<Onepurchase />} />
					<Route path="/updatepurchase/:id" element={<Upurchase />} />
					<Route path="/allorder" element={<Allorder />} />
					<Route path="/oneorder/:id" element={<Oneorder />} />
					<Route path="/updateorder/:id" element={<Uorder />} />
					<Route path="/home" element={<StockOrderHome/>} />
				</Routes>
				<Footer />
			</Router>
		</>
	);
}

export default App;
