import React, { useEffect ,useState} from "react";
import { useCompaniesContext } from "../../hooks/useCompaniesContext";


//components
import "../mngdistribution/deliveryAdmin.css";
import CompanyDetails from '../mngdistribution/CompanyDetails';
import CompanyForm from "./CompanyForm";

// import './CSS/addCompany.css';



export default function AddCompany() {

  const { companies, dispatch } = useCompaniesContext();

  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchCompanies = async() => {
      const response = await fetch('http://localhost:8070/company');
      const json = await response.json();

      if (response.ok){
        dispatch({ type: 'SET_COMPANIES', payload: json });
      }
    };
    fetchCompanies();
  }, [dispatch]);

  return (
    
    <div className="home-container">

      <br/>
      <br/>
      <br/>
      <br/>
      <div className="companies-container">

        <br/>
        <br/>
        <br/>
        
        <h3 className="header">Delivery Companies</h3>
        <hr />

        <div className="form-container">
          <h3 className="form-header">Add New Company</h3>
          <CompanyForm />
        </div>
{/* search bar */}
<input
                        aria-label="Search"
                        className="form-control-rounded form-control-prepended"
                        placeholder="Search By Company Name"
                        type="search"
                        onChange={(e) => setQuery(e.target.value)}
                        style={{borderRadius:"8px",width:"600px",marginLeft:"350px",height:"40px",padding:"5px"}}
                      />
        <div className="details-container">
          <div className="details-header">
            {/* <div className="col-3"><p><strong>Company ID</strong></p></div> */}
            <div className="col-2"><strong>Company Name</strong></div>
            <div className="col-2"><strong>Company Number</strong></div>
            <div className="col-2"><strong>Delivery Charge</strong></div>
            
          </div>


          {companies && companies.filter(
                      (company) =>
                        company.companyname
                          ?.toLowerCase()
                           .includes(query.toLowerCase()) 
                       // ||
                        // vacancy.vacancy_type
                        //   ?.toLowerCase()
                        //   .includes(query.toLowerCase())
                    ).map((company)=>(
            <CompanyDetails key={company._id} company={company} />
          ))}
        </div>
      </div>
    </div>
  );
}
