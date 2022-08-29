



import React from 'react';
import BreadCrumb from "./Utils/BreadCrumb";
import {Tab,Tabs} from 'react-bootstrap';

const Dashboard = () => {
    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="page-title-box d-flex align-items-center justify-content-between pb-1">
                        <div className="page-header">
                            <div>
                                <h2 className="main-content-title tx-24 mg-b-5">
                                    Dashboard
                                </h2>
                                <BreadCrumb
                                    title={[
                                        "Dashboard",
                                        "Dashboard",
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row align-items-start">
                <div className="col-md-3 pr-0">
                    <div className="dashboard_one common_grid_css bg-white p-3 br-5 mb-3">
                        <p className="font-size-14">Total Order Received</p>
                        <h4 className="text-primary font-size-24">12,562</h4>
                    </div>
                </div>
                <div className="col-md-3 pr-0">
                    <div className="dashboard_two common_grid_css bg-white p-3 br-5 mb-3">
                        <p className="font-size-14">Total Order Shipped</p>
                        <h4 className="text-primary font-size-24">16,865</h4>
                    </div>
                </div>
                <div className="col-md-3 pr-0">
                    <div className="dashboard_three common_grid_css bg-white p-3 br-5 mb-3">
                        <p className="font-size-14">Total Order Received</p>
                        <h4 className="text-primary font-size-24">12,562</h4>
                    </div>
                </div>
                <div className="col-md-3 pr-0">
                    <div className="dashboard_four common_grid_css bg-white p-3 br-5 mb-3">
                        <p className="font-size-14">Total COD Remitted</p>
                        <h4 className="text-primary font-size-24">12,562</h4>
                    </div>
                </div>
                <div className="col-md-3 pr-0">
                    <div className="dashboard_five common_grid_css bg-white p-3 br-5 mb-3">
                        <p className="font-size-14">Total Order in transit</p>
                        <h4 className="text-primary font-size-24">12,562</h4>
                    </div>
                </div>
                <div className="col-md-3 pr-0">
                    <div className="dashboard_six common_grid_css bg-white p-3 br-5 mb-3">
                        <p className="font-size-14">Total Order in Undelivered</p>
                        <h4 className="text-primary font-size-24">562</h4>
                    </div>
                </div>
                <div className="col-md-3 pr-0">
                    <div className="dashboard_seven common_grid_css bg-white p-3 br-5 mb-3">
                        <p className="font-size-14">Total Order in re-attempted</p>
                        <h4 className="text-primary font-size-24">162</h4>
                    </div>
                </div>
                <div className="col-md-3 pr-0">
                    <div className="dashboard_eight common_grid_css bg-white p-3 br-5 mb-3">
                        <p className="font-size-14">Total Order in delivered in TAT</p>
                        <h4 className="text-primary font-size-24">162</h4>
                    </div>
                </div>
                <div className="col-md-3 pr-0">
                    <div className="dashboard_nine common_grid_css bg-white p-3 br-5 mb-3">
                        <p className="font-size-14">Total Order in delivered outside</p>
                        <h4 className="text-primary font-size-24">162</h4>
                    </div>
                </div>
                <div className="col-md-3 pr-0">
                    <div className="dashboard_ten common_grid_css bg-white p-3 br-5 mb-3">
                        <p className="font-size-14">Total order in NDR</p>
                        <h4 className="text-primary font-size-24">162</h4>
                    </div>
                </div>
                <div className="col-md-3 pr-0">
                    <div className="dashboard_eleven common_grid_css bg-white p-3 br-5 mb-3">
                        <p className="font-size-14">Total Order in re-attempted</p>
                        <h4 className="text-primary font-size-24">70%</h4>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12 mb-4">
                    <div className="card">
                            <div className="d-flex card-title">
                                <h4 className="">
                                    Daily Consignment Report
                                </h4>
                            </div>
                            <Tabs className="border-0 mt-2 ml-2 mr-2 justify-content-end">
                                <Tab eventKey="home" title="Weekly" tabClassName="tab_link">
                                    <div className="p-3  ml-2 mr-2">
                                    <h5>Weekly</h5>
                                    <img src="/images/dummygraph.png" alt=""/>
                                    </div>
                                </Tab>
                                <Tab eventKey="profile" title="Monthly" tabClassName="tab_link">
                                    <div className="p-3  ml-2 mr-2">
                                        <h5>Monthly</h5>
                                    <img src="/images/dummygraph.png" alt=""/>
                                    </div>
                                </Tab>
                                <Tab eventKey="contact" title="Year" tabClassName="tab_link">
                                    <div className="p-3  ml-2 mr-2">
                                        <h5>Year</h5>
                                    <img src="/images/dummygraph.png" alt=""/>
                                    </div>
                                </Tab>
                            </Tabs>

                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 mb-4">
                    <div className="card">
                        <h4 className="card-title">
                            Daily Consignment Report
                        </h4>
                        <div className="card-body">
                            <table className="table table-striped table-bordered dt-responsive nowrap action_icons">
                                <thead>
                                    <th>
                                    Products
                                    </th>
                                    <th>
                                    Distance
                                    </th>
                                    <th>
                                    Weight
                                    </th>
                                    <th>
                                    Delivery Days
                                    </th>
                                    <th>
                                    Details
                                    </th>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                        HP Laptop 24 inch
                                        </td>
                                        <td>
                                        110023 - 110038 (45km)
                                        </td>
                                        <td>
                                        12400 gram
                                        </td>
                                        <td>
                                        2 Working Days
                                        </td>
                                       <td>
                                           <button className="btn btn-primary view_btn">View Details</button>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
