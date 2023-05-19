import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "tw-elements";

import { MethodsContextProvider } from "./context/MethodContext";
import { CardsContextProvider } from "./context/CardContext";
import { PaymentDetailssContextProvider } from "./context/PaymentDetailsContext";

import { TemplatesContextProvider } from "./context/TemplateContext";
import { PrintTypesContextProvider } from "./context/PrintTypeContext";
import { MaterialsContextProvider } from "./context/MaterialContext";

import { CompaniesContextProvider } from "./context/CompanyContext";
import { StatusesContextProvider } from "./context/StatusContext";
import { DeliverydsContextProvider } from "./context/DeliverydContext";	

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
    <MethodsContextProvider>
		<CardsContextProvider>
		<PaymentDetailssContextProvider>
		<TemplatesContextProvider>
		<PrintTypesContextProvider>
		<MaterialsContextProvider>
		<CompaniesContextProvider>
		<StatusesContextProvider>
		<DeliverydsContextProvider>
		<App />
		</DeliverydsContextProvider>
		</StatusesContextProvider>
		</CompaniesContextProvider>
		</MaterialsContextProvider>	
		</PrintTypesContextProvider>
		</TemplatesContextProvider>
    </PaymentDetailssContextProvider>
		</CardsContextProvider>
		</MethodsContextProvider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
