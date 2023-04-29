
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import axios from 'axios';
import '../Styles/invoice.css';

function invoice() {
    const componentRef = useRef();
    const navigate = useNavigate();

    const { id } = useParams();
    const [details, setDetails] = useState(null);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Order List',
        onAfterPrint: () => {
            alert('Download Successful');
        },
    });



    const Navnext = () => {
        navigate('/');
    };
  
    useEffect(() => {
        axios.get(`http://localhost:3000/orders/${id}`)
          .then(response => {
            setDetails(response.data);
          })
          .catch(error => {
            console.log(error);
          });
      }, [id]);

    return (
        <>

{details && (
    <div>
        <div>
            <row>
                <div className="header1">
                    <ul>
                        <li>
                            <h5>BILLED TO:</h5>
                        </li>
                        <li>
                            <span>{details.name}</span>
                        </li>
                        <li>
                            <span>{details.email}</span>
                        </li>
                        <li>
                            <span>{details.telno}</span>
                        </li>
                    </ul>
                </div>
                <div
                    className="header2 my-5 flex flex-col items-end justify-end"
                    style={{ display: "flex", justifyContent: "flex-end" }}
                >
                    <ul>
                        <li>
                            <span className="font-bold">Order ID:</span>
                            <span className="font-bold">{details._id}</span>
                        </li>
                        <li>
                            <span className="font-bold">Order Date:</span>
                            <span className="font-bold">{details.date}</span>
                        </li>
                    </ul>
                </div>
                <p>Estimated Completion date :</p>
            </row>

            <table className="table">
                <thead>
                    <tr>
                        <th>Size</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Extra Small</td>
                        <td>{details.xs}</td>
                    </tr>
                    <tr>
                        <td>Small</td>
                        <td>{details.s}</td>
                    </tr>
                    <tr>
                        <td>Medium</td>
                        <td>{details.m}</td>
                    </tr>
                    <tr>
                        <td>Large</td>
                        <td>{details.l}</td>
                    </tr>
                    <tr>
                        <td>Extra Large</td>
                        <td>{details.xl}</td>
                    </tr>
                    <tr>
                        <td>Double XL</td>
                        <td>{details.xxl}</td>
                    </tr>
                    <tr>
                        <td className="Total Quantity">Total Quantity</td>
                        <td>{details.total}</td>
                    </tr>
                    <tr>
                        <td className="tax">Tax (0%)</td>
                        <td>$0.00</td>
                    </tr>
                    <tr>
                        <td className="total">Total</td>
                        <td>{details.payable}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
)}

                    <p>Thankyou</p>
                    <footer className="my- 5 flex flex-col items-end justify-end">
                        <ul>
                            <li>Sansalu Clothing</li>
                            <li>email address</li>
                            <li>telphone number</li>
                        </ul>
                    </footer>
            
            <div style={{ width: '100%', height: '30vh', position: 'relative' }}>
                <div style={{ position: 'absolute', bottom: 0, width: '100%', display: 'flex', justifyContent: 'space-around' }}>
                    <button className="btn btn-danger" onClick={handlePrint}>Download Invoice</button>
                    <button onClick={Navnext} className="btn btn-primary">Continue</button>
                </div>
            </div>


        </>
    );
}

export default invoice;