import React from 'react';
import { useState, useEffect } from 'react';
import { Container, Row } from 'reactstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';


function ViewDetails(props) {


    const { id } = useParams();
    //console.log("Order ID:", id);
    const [details, setDetails] = useState({});

    useEffect(() => {
        console.log(id);
        async function fetchViewDetails() {
            await axios.get(`http://localhost:8070/order/ViewDetails/${id}`).then((res) => {
                setDetails(res.data);
                console.log(res.data);

            }).catch((err) => {
                alert(err);
            })
        }
        fetchViewDetails();
    }, [id]);

    if (!details) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className="container1">
                <div className="container1a">
                    <h4>ORDER DETAILS</h4>
                </div>
            </div>
            <div>


                <Container>
                    <Row>
                        <form class="row g-3">
                            <div class="col-sm">
                                <label class="form-label">Order ID</label>
                                <label type="text" class="form-control" id="getOrderID" >{details._id}</label>
                            </div>
                            <div class="col-sm">
                                <label class="form-label">Client ID</label>
                                <label type="text" class="form-control" id="getClientID" >{details.clientID}</label>
                            </div>
                            <div class="col-sm">
                                <label class="form-label" >Design ID</label>
                                <label type="text" class="form-control" id="getDesignID" >{details.designID}</label>
                            </div>
                        </form>
                    </Row>
                    <hr />
                    <Row>
                        <p>Client Details</p>
                        <div class="mb-3 row">
                            <label class="col-sm-2 col-form-label">Name</label>
                            <div class="col-sm-10">
                                <label type="text" class="form-control-plaintext" id="viewname" >{details.fname + ' ' + details.lname}</label>
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label class="col-sm-2 col-form-label">Company Name</label>
                            <div class="col-sm-10">
                                <label type="text" class="form-control-plaintext" id="viewCompanyname" >{details.company_name}</label>
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label class="col-sm-2 col-form-label">Email</label>
                            <div class="col-sm-10">
                                <label type="email" class="form-control-plaintext" id="viewemail" >{details.email}</label>
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label class="col-sm-2 col-form-label">Contact Number</label>
                            <div class="col-sm-10">
                                <label type="tel" class="form-control-plaintext" id="viewContactNo"  >{details.contactNo}</label>
                            </div>
                        </div>
                    </Row>

                    <hr />
                    <Row>
                        <p>Design Details</p>
                        <form class="row g-3">
                            <div class="col-sm">
                                <label class="form-label">Product Type </label>
                                <label type="text" class="form-control" id="productType" />
                            </div>
                            <div class="col-sm">
                                <label class="form-label">Product Material</label>
                                <label type="text" class="form-control" id="ProductMaterial" />
                            </div>
                            <div class="col-sm">
                                <label class="form-label">Print Type</label>
                                <label type="text" class="form-control" id="PrintType" />
                            </div>
                            <div class="col-sm">
                                <label class="form-label">Template</label>
                                <label type="text" class="form-control" id="template" />
                            </div>
                            <div class="col-sm">
                                <label class="form-label">Colour</label>
                                <label type="text" class="form-control" id="colour" />
                            </div>

                        </form>
                    </Row>

                    <hr />
                    <Row>
                        <p>T-shirt Quantities</p>
                        <form class="row g-3">
                            <div class="col-sm">
                                <label class="form-label">XS</label>
                                <label type="text" class="form-control" id="xs_size" >{details.xs}</label>
                            </div>
                            <div class="col-sm">
                                <label class="form-label">S</label>
                                <label type="text" class="form-control" id="s_size" >{details.s}</label>
                            </div>
                            <div class="col-sm">
                                <label class="form-label">M</label>
                                <label type="text" class="form-control" id="m_size" >{details.m}</label>
                            </div>
                            <div class="col-sm">
                                <label class="form-label">L</label>
                                <label type="text" class="form-control" id="l_size" >{details.l}</label>
                            </div>
                            <div class="col-sm">
                                <label class="form-label">XL</label>
                                <label type="text" class="form-control" id="xl_size" >{details.xl}</label>
                            </div>
                            <div class="col-sm">
                                <label class="form-label">XXL</label>
                                <label type="text" class="form-control" id="xxl_size" >{details.xxl}</label>
                            </div>

                        </form>
                        <div class="mb-3 row">
                            <label class="col-sm-2 col-form-label">Total Quantity</label>
                            <div class="col-sm-10">
                                <label type="text" class="form-control-plaintext" id="total_quantity" >{details.total}</label>
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label class="col-sm-2 col-form-label">Unit Price</label>
                            <div class="col-sm-10">
                                <label type="text" class="form-control-plaintext" id="unitPrice" />
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label class="col-sm-2 col-form-label">Payable Amount</label>
                            <div class="col-sm-10">
                                <label type="email" class="form-control-plaintext" id="payable_Amount" />
                            </div>
                        </div>
                    </Row>

                    <hr />
                    <Row>
                        <p>
                            Delivery Details
                        </p>
                        <div class="mb-3 row">
                            <label class="col-sm-2 col-form-label">Name</label>
                            <div class="col-sm-10">
                                <label type="text" class="form-control-plaintext" id="DelName" />
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label class="col-sm-2 col-form-label">Address</label>
                            <div class="col-sm-10">
                                <label type="text" class="form-control-plaintext" id="DelAddress" />
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label class="col-sm-2 col-form-label">Contact Number</label>
                            <div class="col-sm-10">
                                <label type="email" class="form-control-plaintext" id="DelTel" />
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label class="col-sm-2 col-form-label">Delivery Company</label>
                            <div class="col-sm-10">
                                <label type="text" class="form-control-plaintext" id="delCompany" />
                            </div>
                        </div>

                        <div class="mb-3 row">
                            <label class="col-sm-2 col-form-label">Delivery Cost</label>
                            <div class="col-sm-10">
                                <label type="email" class="form-control-plaintext" id="delCost" />
                            </div>
                        </div>
                    </Row>
                    <hr />

                    <Row>
                        <p>Payment Details</p>
                        <div class="mb-3 row">
                            <label class="col-sm-2 col-form-label">Card type</label>
                            <div class="col-sm-10">
                                <label type="text" class="form-control-plaintext" id="cardtype" />
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label class="col-sm-2 col-form-label">Card Number</label>
                            <div class="col-sm-10">
                                <label type="text" class="form-control-plaintext" id="CardNumber" />
                            </div>
                        </div>

                    </Row>

                    <p>total amount : {details.payable}</p>
                    <p>Order placed Date: {details.pdate}</p>
                    <p>Due Completion date: {details.due_date}</p>

                </Container>

            </div>
        </div>
    )
}

export default ViewDetails;