import React, { Component } from "react";
import { Accordion, Card } from "react-bootstrap";

export default class RoleDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeKey: 0,
        };
    }

    render() {
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box d-flex align-items-center justify-content-between">
                            <div className="page-header">
                                <div>
                                    <h2 className="main-content-title tx-24 mg-b-5">
                                        Role Details
                                    </h2>
                                    <ol className="breadcrumb">
                                        <li
                                            className="breadcrumb-item active"
                                            aria-current="page"
                                        >
                                            Role
                                        </li>
                                        <li className="breadcrumb-item">
                                            <a href="#">Role Details</a>
                                        </li>
                                    </ol>
                                </div>
                            </div>
                            {/* <div className="page-title-right">
                                <button
                                    type="button"
                                    className="btn btn-primary my-2 btn-icon-text role_bck_btn"
                                    data-toggle="modal"
                                    data-target="#addUserModal"
                                >
                                    <i className="bx bx-arrow-back mr-2"></i>{" "}
                                    Back
                                </button>
                            </div> */}
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <h4 className="mb-0 card-title">Role Details</h4>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-8">
                                        <h4 className="font-size-18 Privillage_head">
                                            Privillages
                                        </h4>
                                    </div>
                                    <div className="col-md-4">
                                        <form className="app-search d-lg-block pt-0">
                                            <div className="position-relative">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Search Role..."
                                                />
                                                <span className="fe fe-search"></span>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 role_detail">
                                        <Accordion defaultActiveKey="0">
                                            <Accordion.Toggle
                                                as={Card.Header}
                                                eventKey="0"
                                                className="d-flex align-items-center justify-content-between mb-2"
                                            >
                                                <h4 className="mb-0">
                                                    <i className="fa fa-chevron-down accordion_arrow"></i>
                                                    Report
                                                </h4>
                                                <div className="d-flex">
                                                    <div className="form-check pr-2">
                                                        <input
                                                            type="checkbox"
                                                            className="form-check-input mt-1"
                                                            id="exampleCheck1"
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            for="exampleCheck1"
                                                        >
                                                            Read Only
                                                        </label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input
                                                            type="checkbox"
                                                            className="form-check-input mt-1"
                                                            id="exampleCheck2"
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            for="exampleCheck2"
                                                        >
                                                            Read/Write
                                                        </label>
                                                    </div>
                                                </div>
                                            </Accordion.Toggle>
                                            <Accordion.Collapse eventKey="0">
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-md-6"></div>
                                                        <div className="col-md-2 text-center">
                                                            <label className="form-check-label">
                                                                Read Only
                                                            </label>
                                                        </div>
                                                        <div className="col-md-2 text-center">
                                                            <label className="form-check-label">
                                                                Read/Write
                                                            </label>
                                                        </div>
                                                        <div className="col-md-2 text-center">
                                                            <label className="form-check-label">
                                                                Download
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="row pt-2 pb-2">
                                                        <div className="col-md-6">
                                                            <h6>
                                                                Order Management
                                                            </h6>
                                                        </div>
                                                        <div className="col-md-2 text-center">
                                                            <input type="checkbox" />
                                                        </div>
                                                        <div className="col-md-2 text-center">
                                                            <input type="checkbox" />
                                                        </div>
                                                        <div className="col-md-2 text-center">
                                                            <input type="checkbox" />
                                                        </div>
                                                    </div>
                                                    <div className="row pt-2 pb-2">
                                                        <div className="col-md-6">
                                                            <h6>
                                                                User Management
                                                            </h6>
                                                        </div>
                                                        <div className="col-md-2 text-center">
                                                            <input type="checkbox" />
                                                        </div>
                                                        <div className="col-md-2 text-center">
                                                            <input type="checkbox" />
                                                        </div>
                                                        <div className="col-md-2 text-center">
                                                            <input type="checkbox" />
                                                        </div>
                                                    </div>
                                                    <div className="row pt-2 pb-2">
                                                        <div className="col-md-6">
                                                            <h6>
                                                                Department
                                                                Management
                                                            </h6>
                                                        </div>
                                                        <div className="col-md-2 text-center">
                                                            <input type="checkbox" />
                                                        </div>
                                                        <div className="col-md-2 text-center">
                                                            <input type="checkbox" />
                                                        </div>
                                                        <div className="col-md-2 text-center">
                                                            <input type="checkbox" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </Accordion.Collapse>
                                            <Accordion.Toggle
                                                as={Card.Header}
                                                eventKey="1"
                                                className="d-flex align-items-center justify-content-between mb-2"
                                            >
                                                <h4 className="mb-0">
                                                    <i className="fa fa-chevron-up accordion_arrow"></i>
                                                    Settings
                                                </h4>
                                                <div className="d-flex">
                                                    <div className="form-check pr-2">
                                                        <input
                                                            type="checkbox"
                                                            className="form-check-input mt-1"
                                                            id="exampleCheck1"
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            for="exampleCheck1"
                                                        >
                                                            Read Only
                                                        </label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input
                                                            type="checkbox"
                                                            className="form-check-input mt-1"
                                                            id="exampleCheck2"
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            for="exampleCheck2"
                                                        >
                                                            Read/Write
                                                        </label>
                                                    </div>
                                                </div>
                                            </Accordion.Toggle>
                                            <Accordion.Collapse eventKey="1">
                                                <div className="card-body">
                                                    hello
                                                </div>
                                            </Accordion.Collapse>
                                        </Accordion>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
