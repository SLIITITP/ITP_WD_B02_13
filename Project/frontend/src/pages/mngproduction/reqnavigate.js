import React from "react";
import backimage from "../stockimg/tshirt.jpg";

export default function Requstnavi() {
  const containerStyle = {
    display: "flex",
    backgroundImage: `url(${backimage})`,
    backgroundPosition: "center",
  };

  const buttonContainerStyle = {
    textAlign: "center",
    margin: "auto",
    marginTop: "120px",
  };

  const buttonStyle = {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "12px 24px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div>
        <h1 style={{ fontSize: "35px", marginLeft: "620px", marginBottom: "20px" }}> Production Dashboard </h1>
        <div style={{ display: "flex", flexWrap: "wrap" ,marginLeft: "200px"}}>
          <div className="container" style={{ width: "500px", height: "300px", margin: "30px", ...containerStyle }}>
            <div style={buttonContainerStyle}>
              <a href="/addrequest">
                <button style={buttonStyle}> Stock Material Request </button>
              </a>
            </div>
          </div>
          <div className="container" style={{ width: "500px", height: "300px", margin: "30px", ...containerStyle }}>
            <div style={buttonContainerStyle}>
              <a href="addemprequest">
                <button style={buttonStyle}> Employee Request </button>
              </a>
            </div>
          </div>

            <div className="container" style={{ width: "500px", height: "300px", margin: "30px", marginLeft:"270px", ...containerStyle }}>
            <div style={buttonContainerStyle}>
              <a href="/allproduct">
                <button style={buttonStyle}> Product Details </button>
              </a>
            </div>
            </div>
          
        </div>

        </div>
      </div>
     );
}