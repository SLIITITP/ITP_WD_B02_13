// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import jsPDF from "jspdf";

// export default function DeliveryDetails() {
// const [delivery, setDelivery] = useState({});
// const { id } = useParams();

// useEffect(() => {
// async function fetchDelivery() {
//   try {
//     const res = await axios.get(`http://localhost:8070/delidetails/${id}`);
//     setDelivery(res.data);
//   } catch (err) {
//     alert(err);
//   }
// }
// fetchDelivery();
// }, [id]);

// return (
    
// <div className="advertiser">
//     <br/>
//     <br/>
//     <br/>
//     <br/>
//     <br/>
//     <br/>
//     <br/>
//     <br/>
//     <br/>
//     <br/>
//     <p>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>

//             <div className="Adfield">
//                 <span className="Adlabel">Advertiser ID:</span>
//                 <span className="Advalue">{delivery._id}</span>
//             </div>

//             <div className="Adfield">
//                 <span className="Adlabel">Company:</span>
//                 <span className="Advalue">{delivery.fname}</span>
//             </div>
//             <div className="Adfield">
//                 <span className="Adlabel">Email:</span>
//                 <span className="Advalue">{delivery.lname}</span>
//             </div>
//             <div className="Adfield">
//                 <span className="Adlabel">Address:</span>
//                 <span className="Advalue">{delivery.telephone}</span>
//             </div>
            
            
// </div>
// );
// }

// // CSS styles
// const inputStyle = {
// padding: "10px",
// borderRadius: "5px",
// border: "1px solid #ccc",
// width: "100%",
// fontSize: "16px",
// };
