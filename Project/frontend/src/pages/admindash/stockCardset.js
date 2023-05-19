import React from "react";
import backimage from "../stockimg/tshirt.jpg";

export default function StockCardset() {
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
        <h1 style={{ fontSize: "35px", marginLeft: "620px", marginBottom: "20px" }}> Stock Dashboard </h1>
        <div style={{ display: "flex", flexWrap: "wrap" ,marginLeft: "200px"}}>
          <div className="container" style={{ width: "500px", height: "300px", margin: "30px", ...containerStyle }}>
            <div style={buttonContainerStyle}>
              <a href="/allorder">
                <button style={buttonStyle}> Order </button>
              </a>
            </div>
          </div>
          <div className="container" style={{ width: "500px", height: "300px", margin: "30px", ...containerStyle }}>
            <div style={buttonContainerStyle}>
              <a href="/dashmat">
                <button style={buttonStyle}> Material </button>
              </a>
            </div>
          </div>
          <div className="container" style={{ width: "500px", height: "300px", margin: "30px", ...containerStyle }}>
            <div style={buttonContainerStyle}>
              <a href="/allpurchase">
                <button style={buttonStyle}> Purchase </button>
              </a>
            </div>
          </div>
          <div className="container" style={{ width: "500px", height: "300px", margin: "30px", ...containerStyle }}>
            <div style={buttonContainerStyle}>
              <a href="/dashcat">
                <button style={buttonStyle}> Category </button>
              </a>
            </div>
          </div>
          <div className="container" style={{ width: "500px", height: "300px", margin: "30px", marginLeft:"270px", ...containerStyle }}>
            <div style={buttonContainerStyle}>
              <a href="/dashsup">
                <button style={buttonStyle}> Supplier </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

