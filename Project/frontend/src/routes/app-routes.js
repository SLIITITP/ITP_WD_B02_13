import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import NavBar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";


import {
	Login,
	ClientLogin,
	AdminLogin,
	EmpLogin,
	Register,
	RegClient,
	ClientDash,
	ClientUpdate,
	ClientMore,
	UpdateLoyalty,
	AddEmployee,
	AllEmployee,
	EmployeeAllocation,
	EditProfile,
	Emp_profile,
	MakePayment,
	AdminDash,
	DesignManagement,
	DeliveryManagement,
	PaymentManagement,
	EmployeeManagement,
	StockManagement,
	ProductionManagement,
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
	Umaterial,
	ClientDesign,
	Checkout,
	ViewDetails,
	OrderAdmin,
	Invoice,
	AdminReport,
	AddCompany,
	AddDelivery,
	Updatecompany,
	ViewStatus,
	AddPayments,
	PayCard,
	Pmethod,
	Pcard,
	Ucard,
	Umethod,
	PpaymentDetails,
	Addcategory,
	Addmaterial,
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
	UMaterial,
	Uorder,
	Upurchase,
	Usupplier,
  	Addproduction,
	Allproduction,
	Uproduction,
	Addrequest,
	Addemprequest,
	Sendmail,
	Home,
	Requstnavi,




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
					<Route path="/login/adminlogin" element={<AdminLogin />} />
					<Route path="/login/emplogin" element={<EmpLogin />} />

					{/* Register Selection */}
					<Route path="/register" element={<Register />} />
					<Route path="/register/clientregister" element={<RegClient />} />

					{/* Client Dashboard */}
					<Route path="/clientdash" element={<ClientDash />} />
					<Route path="/clientdash/clientupdate/:id" element={<ClientUpdate />} />
					<Route path="/clientdash/clientmore/:id" element={<ClientMore />} />
					<Route path="/clientdash/addloyalty" element={<AddLoyalty />} />
					<Route path="/clientdash/searchcus/:key" element={<CusSearch />} />

					{/*  Admin Dashboard*/}
					<Route path="/admindash" element={<AdminDash />} />

					<Route path="/managedesign" element={<DesignManagement />} />
					<Route path="/managedelivery" element={<DeliveryManagement />} />
					<Route path="/managepayment" element={<PaymentManagement />} />
					<Route path="/manageemployee" element={<EmployeeManagement />} />
					<Route path="/managestock" element={<StockManagement />} />
					<Route path="/manageproduction" element={<ProductionManagement />} />


					{/* Client Management */}
					<Route path="/manageclient" element={<ClientManagement />} />
					<Route path="/viewallcus" element={<ViewAllCus />} />
					<Route path="/viewcus/:id" element={<ViewCus />} />
					<Route path="/updateLoyalty/:id" element={<UpdateLoyalty/>}/>

					{/* Human Resource Function */}
					<Route path="/addEmployee" element={<AddEmployee />} />
					<Route path="/AllEmployee" element={<AllEmployee />} />
					<Route path="/EmployeeAllocation" element={<EmployeeAllocation />} />
					<Route path="/EditProfile/:id" element={<EditProfile />} />
					<Route path="/Emp_profile/:id" element={<Emp_profile />} />
					<Route path="/MakePayment" element={<MakePayment />} />

					<Route path="/portal" element={<DesignPortal />} />
					<Route path="/template" element={<Dtemplate />} />
					<Route path="/print" element={<Ptype />} />
					<Route path="/material" element={<Material />} />
					<Route path="/updateTemplate/:id" element={<Utemplate />} />
					<Route path="/updatePrintType/:id" element={<UprintType />} />
					<Route path="/updateMaterial/:id" element={<Umaterial />} />


					<Route path="/checkout" element={<Checkout />} />

					<Route path="/cdesign" element={<ClientDesign />} />

					<Route path="/checkout/:id" element={<Checkout />} />

					<Route path="/ViewDetails/:id" element={<ViewDetails />} />
					<Route path="/OrderAdmin" element={<OrderAdmin />} />
					<Route path="/invoice/:id" element={<Invoice />} />
					<Route path="/AdminReport" element={<AdminReport />} />

					<Route path="/payment" element={<AddPayments />} />
					<Route path="/paymentpayment" element={<PayCard />} />
					<Route path="/method" element={<Pmethod />} />
					<Route path="/card" element={<Pcard />} />
					<Route path="/paymentDetails" element={<PpaymentDetails />} />
					<Route path="/updateCard/:id" element={<Ucard />} />
					<Route path="/updateMethod/:id" element={<Umethod />} />

					<Route path="/stock" element={<Addmaterial />} />
					<Route path="/addcategory" element={<Addcategory />} />
					<Route path="/allcategory" element={<Allcategory />} />
					<Route path="/updatecategory/:id" element={<Ucategory />} />
					<Route path="/onecategory/:id" element={<Onecategory />} />
					<Route path="/addmaterial" element={<Addmaterial />} />
					<Route path="/allmaterial" element={<Allmaterial />} />
					<Route path="/onematerial/:id" element={<Onematerial />} />
					<Route path="/Umaterial/:id" element={<UMaterial />} />
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

					<Route path="/stockorderhome" element={<StockOrderHome />} />
					<Route path="/sendmail" element={<Sendmail />} />

					<Route path="/home" element={<StockOrderHome />} />


					<Route path="/companyadd" element={<AddCompany />} />
					<Route path="/delivery" element={<AddDelivery />} />
					<Route path="/updatecompany/:id" element={<Updatecompany />} />
					<Route path="/viewstatus" element={<ViewStatus />} />

					<Route path="/addproduct" element={<Addproduction />} />
					<Route path="/allproduct" element={<Allproduction />} />
					<Route path="/updateproduct/:id" element={<Uproduction />} />
					<Route path="/addrequest" element={<Addrequest />} />
					<Route path="/addemprequest" element={<Addemprequest />} />
					<Route path="/reqnavi" element={<Requstnavi />} />


					<Route path="/" element={<Home />} />



				</Routes>

				<Footer />
			</Router>
		</>
	);
}

export default App;