import React, { useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';


function ViewDetails() {
    /*const [getOrderD, setOrderD] = useState(null);
    //const [getClientID, setClientID] = useState("");
    //const [getDesignID, setDesignID] = useState("");

    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8070/order/getOdetails/${id}`)
            .then(res => setOrderD(res.data))
            .catch(err => console.log(err));
    }, [id]);*/

    return (
        <div>
            <div className="container1">
                <div className="container1a">
                    <h4>ORDER DETAILS</h4>
                </div>
            </div>
            <div>


                <Container>
                    <row>
                        <form class="row g-3">
                            <div class="col-sm">
                                <label class="form-label">Order ID</label>
                                <input type="text" class="form-control" id="getOrderID" readOnly></input>
                            </div>
                            <div class="col-sm">
                                <label class="form-label">Client ID</label>
                                <input type="text" class="form-control" id="getClientID" readOnly />
                            </div>
                            <div class="col-sm">
                                <label class="form-label" >Design ID</label>
                                <input type="text" class="form-control" id="getDesignID" readOnly />
                            </div>
                        </form>
                    </row>
                    <hr />
                    <row>
                        <p>Client Details</p>
                        <div class="mb-3 row">
                            <label class="col-sm-2 col-form-label">Name</label>
                            <div class="col-sm-10">
                                <input type="text" readonly class="form-control-plaintext" id="viewname" readOnly />
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label class="col-sm-2 col-form-label">Company Name</label>
                            <div class="col-sm-10">
                                <input type="text" readonly class="form-control-plaintext" id="viewCompanyname" readOnly />
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label class="col-sm-2 col-form-label">Email</label>
                            <div class="col-sm-10">
                                <input type="email" readonly class="form-control-plaintext" id="viewemail" readOnly />
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label class="col-sm-2 col-form-label">Contact Number</label>
                            <div class="col-sm-10">
                                <input type="tel" readonly class="form-control-plaintext" id="viewContactNo" readOnly />
                            </div>
                        </div>
                    </row>

                    <hr />
                    <row>
                        <p>Design Details</p>
                        <form class="row g-3">
                            <div class="col-sm">
                                <label class="form-label">Product Type </label>
                                <input type="text" class="form-control" id="productType" readOnly />
                            </div>
                            <div class="col-sm">
                                <label class="form-label">Product Material</label>
                                <input type="text" class="form-control" id="ProductMaterial" readOnly />
                            </div>
                            <div class="col-sm">
                                <label class="form-label">Print Type</label>
                                <input type="text" class="form-control" id="PrintType" readOnly />
                            </div>
                            <div class="col-sm">
                                <label class="form-label">Template</label>
                                <input type="text" class="form-control" id="template" readOnly />
                            </div>
                            <div class="col-sm">
                                <label class="form-label">Colour</label>
                                <input type="text" class="form-control" id="colour" readOnly />
                            </div>

                        </form>
                    </row>

                    <hr />
                    <row>
                        <p>T-shirt Quantities</p>
                        <form class="row g-3">
                            <div class="col-sm">
                                <label class="form-label">XS</label>
                                <input type="text" class="form-control" id="xs_size" readOnly />
                            </div>
                            <div class="col-sm">
                                <label class="form-label">S</label>
                                <input type="text" class="form-control" id="s_size" readOnly />
                            </div>
                            <div class="col-sm">
                                <label class="form-label">M</label>
                                <input type="text" class="form-control" id="m_size" readOnly />
                            </div>
                            <div class="col-sm">
                                <label class="form-label">L</label>
                                <input type="text" class="form-control" id="l_size" readOnly />
                            </div>
                            <div class="col-sm">
                                <label class="form-label">XL</label>
                                <input type="text" class="form-control" id="xl_size" readOnly />
                            </div>
                            <div class="col-sm">
                                <label class="form-label">XXL</label>
                                <input type="text" class="form-control" id="xxl_size" readOnly />
                            </div>

                        </form>
                        <div class="mb-3 row">
                            <label class="col-sm-2 col-form-label">Total Quantity</label>
                            <div class="col-sm-10">
                                <input type="text" readonly class="form-control-plaintext" id="total_quantity" readOnly />
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label class="col-sm-2 col-form-label">Unit Price</label>
                            <div class="col-sm-10">
                                <input type="text" readonly class="form-control-plaintext" id="unitPrice" readOnly />
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label class="col-sm-2 col-form-label">Payable Amount</label>
                            <div class="col-sm-10">
                                <input type="email" readonly class="form-control-plaintext" id="payable_Amount" readOnly />
                            </div>
                        </div>
                    </row>

                    <hr />
                    <row>
                        <p>
                            Delivery Details
                        </p>
                        <div class="mb-3 row">
                            <label class="col-sm-2 col-form-label">Name</label>
                            <div class="col-sm-10">
                                <input type="text" readonly class="form-control-plaintext" id="DelName" readOnly />
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label class="col-sm-2 col-form-label">Address</label>
                            <div class="col-sm-10">
                                <input type="text" readonly class="form-control-plaintext" id="DelAddress" readOnly />
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label class="col-sm-2 col-form-label">Contact Number</label>
                            <div class="col-sm-10">
                                <input type="email" readonly class="form-control-plaintext" id="DelTel" readOnly />
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label class="col-sm-2 col-form-label">Delivery Company</label>
                            <div class="col-sm-10">
                                <input type="text" readonly class="form-control-plaintext" id="delCompany" readOnly />
                            </div>
                        </div>

                        <div class="mb-3 row">
                            <label class="col-sm-2 col-form-label">Delivery Cost</label>
                            <div class="col-sm-10">
                                <input type="email" readonly class="form-control-plaintext" id="delCost" readOnly />
                            </div>
                        </div>
                    </row>
                    <hr />

                    <row>
                        <p>Payment Details</p>
                        <div class="mb-3 row">
                            <label class="col-sm-2 col-form-label">Card type</label>
                            <div class="col-sm-10">
                                <input type="text" readonly class="form-control-plaintext" id="cardtype" readOnly />
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label class="col-sm-2 col-form-label">Card Number</label>
                            <div class="col-sm-10">
                                <input type="text" readonly class="form-control-plaintext" id="CardNumber" readOnly />
                            </div>
                        </div>

                    </row>

                    <p>total amount</p>
                    <p>Order placed Date: </p>
                    <p>Due Completion date: </p>

                </Container>

            </div>
        </div>
    )
}

export default ViewDetails;