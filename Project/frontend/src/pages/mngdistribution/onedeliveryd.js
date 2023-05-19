import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";

export default function DeliveryDetails() {
  const [delivery, setDelivery] = useState({});
  const { id } = useParams();

  useEffect(() => {
    async function fetchDelivery() {
      try {
        const res = await axios.get(`http://localhost:8070/delidetails/${id}`);
        setDelivery(res.data);
      } catch (err) {
        alert(err);
      }
    }
    fetchDelivery();
  }, [id]);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setDelivery((prevDelivery) => ({
      ...prevDelivery,
      [name]: value,
    }));
  }

  function generateReport() {
    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Generate the report content
    const report = `Delivery Details:
    Delivery Id: ${delivery._id}
    First Name: ${delivery.fname}
    Last Name: ${delivery.lname}
    Telephone: ${delivery.telephone}
    Address: ${delivery.address}
    City: ${delivery.city}
    Postal Code: ${delivery.postalCode}
    Delivery Company: ${delivery.deliveryCompany}`;

    // Set the font and text size for the report
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(12);

    // Add the report content to the PDF document
    doc.text(report, 10, 10);

    // Save the PDF document as deliverydetails.pdf
    doc.save("deliveryid.pdf");
  }

  return (
    <div
      className="container"
      style={{
        margin: "auto",
        marginTop: "100px",
        maxWidth: "700px",
        textAlign: "center",
      }}
    >
      <br />
      <br /> <br />
      <br />
      <h1
        style={{
          fontSize: "40px",
          fontWeight: "bold",
          marginBottom: "40px",
          color: "#3333",
        }}
      >
        Delivery Details
      </h1>
      <form
        style={{
          maxWidth: "400px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ marginBottom: "20px", width: "100%" }}>
          <label
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              color: "#555",
              marginBottom: "10px",
            }}
          >
            First Name:
          </label>
          <input
            type="text"
            placeholder="Enter first name"
            name="fname"
            value={delivery.fname || ""}
            style={inputStyle}
            onChange={handleInputChange}
          />
        </div>

        <div style={{ marginBottom: "20px", width: "100%" }}>
          <label
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              color: "#555",
              marginBottom: "10px",
            }}
          >
            Last Name:
          </label>
          <input
            type="text"
            placeholder="Enter last name"
            name="lname"
            value={delivery.lname || ""}
            style={inputStyle}
            onChange={handleInputChange}
          />
        </div>

        <div style={{ marginBottom: "20px", width: "100%" }}>
          <label
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            color: "#555",
            marginBottom: "10px",
          }}
        >
          Telephone:
        </label>
        <input
          type="number"
          placeholder="Enter telephone"
          name="telephone"
          value={delivery.telephone || ""}
          style={inputStyle}
          onChange={handleInputChange}
        />
      </div>

      <div style={{ marginBottom: "20px", width: "100%" }}>
        <label
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            color: "#555",
            marginBottom: "10px",
          }}
        >
          Address:
        </label>
        <input
          type="text"
          placeholder="Enter address"
          name="address"
          value={delivery.address || ""}
          style={inputStyle}
          onChange={handleInputChange}
        />
      </div>

      <div style={{ marginBottom: "20px", width: "100%" }}>
        <label
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            color: "#555",
            marginBottom: "10px",
          }}
        >
          City:
        </label>
        <input
          type="text"
          placeholder="Enter city"
          name="city"
          value={delivery.city || ""}
          style={inputStyle}
          onChange={handleInputChange}
        />
      </div>

      <div style={{ marginBottom: "20px", width: "100%" }}>
        <label
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            color: "#555",
            marginBottom: "10px",
          }}
        >
          Postal Code:
        </label>
        <input
          type="text"
          name="postalCode"
          value={delivery.postalCode || ""}
          style={inputStyle}
          onChange={handleInputChange}
        />
      </div>

      <button
        type="button"
        onClick={generateReport}
        style={{
          fontSize: "18px",
          fontWeight: "bold",
          color: "#555",
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          width: "200px",
          alignSelf: "center",
          marginTop: "20px",
        }}
      >
        Generate Report
      </button>
    </form>
  </div>
);
}

// CSS styles
const inputStyle = {
padding: "10px",
borderRadius: "5px",
border: "1px solid #ccc",
width: "100%",
fontSize: "16px",
};
