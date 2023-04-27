import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "tw-elements";
import { TemplatesContextProvider } from "./context/TemplateContext";
import { PrintTypesContextProvider } from "./context/PrintTypeContext";
import { MaterialsContextProvider } from "./context/MaterialContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<TemplatesContextProvider>
			<PrintTypesContextProvider>
				<MaterialsContextProvider>
					<App />
				</MaterialsContextProvider>	
			</PrintTypesContextProvider>
		</TemplatesContextProvider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
