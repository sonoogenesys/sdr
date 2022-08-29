import { Link } from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

const AppSidebar = (props) => {
    const pathname = window?.location?.pathname;
    // const role = props?.loggedInUser?.role?._id?.name?.trim()?.toLowerCase();
    const role = props.loggedInUser?.role?._id
	const permissions = role?.active && role?.permissions || {};
    const {
        dashboard = {},
        upload_data = {},
        order = {},
        report = {},
        user_management = {},
        reach_us = {},
        department = {},
        plan = {},
        manifest = {},
        weight_discrepancy = {},
        pin_code_search = {},
        role_management = {},
        billing_and_wallet = {},
        remittance = {},
    } = permissions;

    return (
        <div className={props.showSideBar ? "vertical-menu side_menu open" : " vertical-menu side_menu"}>
            <div data-simplebar className="h-100">
                <div id="sidebar-menu">
                    <ul className="metismenu list-unstyled" id="side-menu">

                        {
                            dashboard?.show &&
                            <li className={pathname === '/app/dashboard' ? 'mm-active' : undefined} onClick={props.closeSideBar}>
                                <Link to="/app/dashboard" className="waves-effect">
                                    <i className="ti ti-home"></i>
                                    <span key="t-dashboards"> Dashboard</span>
                                </Link>
                            </li>
                        }
                        {/* <li className={pathname === '/app/EditRole' ? 'mm-active' : undefined}>
                            <Link to="/app/EditRole" className="waves-effect">
                                <i className="bx bx-pencil"></i>
                                <span key="t-role"> Edit Role</span>
                            </Link>
                        </li> */}

                        <Accordion>
                            {
                                // (role === 'admin' || role === 'administrator' || role === 'vendor') && <>
                                (upload_data?.show || upload_data?.master?.show || upload_data?.courier_partner?.show) &&
                                <>
                                    <Accordion.Toggle as={Card.Header} eventKey="11">
                                        <li className={`${
                                                (
                                                    pathname === '/app/masterData' ||
                                                    pathname === '/app/courierPartnerData'
                                                )
                                                ? 'mm-active' : undefined
                                            }`}>
                                            <a
                                                href="javascript: void(0);"
                                                className={`has-arrow `}
                                            >
                                                <i className="dripicons dripicons-upload"></i>
                                                <span key="t-layouts"> Upload Data</span>
                                            </a>
                                        </li>
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="11">
                                        <ul className="sub-menu" aria-expanded="false">
                                            {
                                                // (role === 'admin' || role === 'administrator') &&
                                                upload_data?.master?.show &&
                                                <li className={pathname === '/app/masterData' ? 'mm-active' : undefined} onClick={props.closeSideBar}>
                                                    <Link to="/app/masterData">
                                                        Master Data
                                                    </Link>
                                                </li>
                                            }

                                            {
                                                upload_data?.courier_partner?.show &&
                                                <li className={pathname === '/app/courierPartnerData' ? 'mm-active' : undefined} onClick={props.closeSideBar}>
                                                    <Link to="/app/courierPartnerData">
                                                        Courier Partner Data
                                                    </Link>
                                                </li>
                                            }
                                        </ul>
                                    </Accordion.Collapse>
                                </>
                            }

                            {
                                (
                                    order?.show ||
                                    order?.ticket_dashboard?.show ||
                                    order?.order_dashboard?.show ||
                                    order?.individual_order?.show ||
                                    order?.bulk_order?.show
                                ) &&
                                <>
                                    <Accordion.Toggle as={Card.Header} eventKey="0">
                                        <li className={`${
                                                (
                                                    pathname === '/app/shipmentList' ||
                                                    pathname === '/app/ticketDashboard' ||
                                                    pathname === '/app/individualShipment' ||
                                                    pathname === '/app/courierpartner' ||
                                                    pathname === '/app/bulkinvoice' ||
                                                    pathname === '/app/bulkShipmentUpload' ||
                                                    pathname === '/app/individualinvoice' ||
                                                    pathname === '/app/bulkShipmentList' ||
                                                    pathname === '/app/OrderActivity'
                                                )
                                                ? 'mm-active' : undefined
                                            }`}
                                        >
                                            <Link
                                                className={`has-arrow `}
                                            >
                                            <i className="fa fa-truck"></i>
                                                <span key="t-layouts"> Shipment</span>
                                            </Link>
                                        </li>
                                    </Accordion.Toggle>

                                    <Accordion.Collapse eventKey="0">
                                        <ul className="sub-menu" aria-expanded="false">
                                            {
                                                order?.ticket_dashboard?.show &&
                                                <li className={pathname === '/app/ticketDashboard' ? 'mm-active' : undefined} onClick={props.closeSideBar}>
                                                    <Link to="/app/ticketDashboard">Ticket List</Link>
                                                </li>
                                            }

                                            {
                                                order?.order_dashboard?.show &&
                                                <li className={pathname === '/app/shipmentList' ? 'mm-active' : undefined} onClick={props.closeSideBar}>
                                                    <Link to="/app/shipmentList">Shipment List</Link>
                                                </li>
                                            }

                                            {
                                                order?.individual_order?.show &&
                                                <li className={pathname === '/app/individualShipment'  ? 'mm-active' : undefined} onClick={props.closeSideBar}>
                                                    <Link to="/app/individualShipment">
                                                        Individual Shipment
                                                    </Link>
                                                </li>
                                            }

                                            {
                                                order?.bulk_order?.show &&
                                                <li className={pathname === '/app/bulkShipmentUpload' ? 'mm-active' : undefined} onClick={props.closeSideBar}>
                                                    <Link to="/app/bulkShipmentUpload">
                                                        Bulk Shipment Upload
                                                    </Link>
                                                </li>
                                            }
                                        </ul>
                                    </Accordion.Collapse>
                                </>
                            }

                            {
                                (
                                    report?.show ||
                                    report?.cod?.show ||
                                    report?.no_csv?.show ||
                                    report?.monthly?.show ||
                                    report?.user_usage?.show
                                ) &&
                                <>
                                    <Accordion.Toggle as={Card.Header} eventKey="01">
                                        <li className={
                                            (
                                                pathname === '/app/codReports' ||
                                                pathname === '/app/noCsvReports' ||
                                                pathname === '/app/monthlyReports' ||
                                                pathname === '/app/userusage'
                                            ) ? 'mm-active' : undefined
                                        }>
                                            <Link
                                                className={`has-arrow `}
                                            >
                                                <i className="ti ti-receipt"></i>
                                                <span key="t-layouts"> Reports</span>
                                            </Link>
                                        </li>
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="01">
                                        <ul className="sub-menu" aria-expanded="false">
                                            {
                                                report?.cod?.show &&
                                                <li className={pathname === '/app/codReports' ? 'mm-active' : undefined} onClick={props.closeSideBar}>
                                                    <Link to="/app/codReports">
                                                        COD Reports
                                                    </Link>
                                                </li>
                                            }

                                            {
                                                report?.no_csv?.show &&
                                                <li className={pathname === '/app/noCsvReports' ? 'mm-active' : undefined} onClick={props.closeSideBar}>
                                                    <Link to="/app/noCsvReports">
                                                        No CSV Report
                                                    </Link>
                                                </li>
                                            }

                                            {
                                                report?.monthly?.show &&
                                                <li className={pathname === '/app/monthlyReports' ? 'mm-active' : undefined} onClick={props.closeSideBar}>
                                                    <Link to="/app/monthlyReports">
                                                        Monthly Report
                                                    </Link>
                                                </li>
                                            }

                                            {
                                                report?.user_usage?.show &&
                                                <li className={pathname === '/app/userusage' ? 'mm-active' : undefined} onClick={props.closeSideBar}>
                                                    <Link to="/app/userusage">
                                                        User Usage
                                                    </Link>
                                                </li>
                                            }

                                        </ul>
                                    </Accordion.Collapse>
                                </>
                            }

                            {
                                // (role === 'admin' || role === 'administrator') && <>
                                //     <Accordion.Toggle as={Card.Header} eventKey="1">
                                //         <li className={pathname === '/app/users' ? 'mm-active' : undefined}>
                                //             <Link to="/app/users">
                                //                 <i className="dripicons dripicons-user"></i>
                                //                 <span key="t-layouts">User Management</span>
                                //             </Link>
                                //         </li>
                                //     </Accordion.Toggle>
                                //     {/* <Accordion.Toggle as={Card.Header} eventKey="3">
                                //         <li className={pathname === '/app/userusage' ? 'mm-active' : undefined}>
                                //             <Link to="/app/userusage">
                                //                 <i class="fas fa-users-cog"></i>
                                //                 <span key="t-crypto">User Usage</span>
                                //             </Link>
                                //         </li>
                                //     </Accordion.Toggle> */}
                                //     <Accordion.Toggle as={Card.Header}>
                                //         <li className={pathname === '/app/reachus' ? 'mm-active' : undefined}>
                                //             <Link to="/app/reachus">
                                //                 <i class="bx bx-mail-send"></i>
                                //                 <span key="t-layouts">Reach Us</span>
                                //             </Link>
                                //         </li>
                                //     </Accordion.Toggle>
                                //     <Accordion.Toggle as={Card.Header} eventKey="3">
                                //         <li className={pathname === '/app/department' ? 'mm-active' : undefined}>
                                //             <Link to="/app/department">
                                //                 <i className="mdi mdi-store"></i>
                                //                 <span key="t-crypto">Manage Department</span>
                                //             </Link>
                                //         </li>
                                //     </Accordion.Toggle>
                                // </>
                            }

                            {
                                user_management?.show &&
                                <Accordion.Toggle as={Card.Header} eventKey="1">
                                    <li className={pathname === '/app/users' ? 'mm-active' : undefined} onClick={props.closeSideBar}>
                                        <Link to="/app/users">
                                            <i className="dripicons dripicons-user"></i>
                                            <span key="t-layouts">User Management</span>
                                        </Link>
                                    </li>
                                </Accordion.Toggle>
                            }

                            {
                                reach_us.show &&
                                <Accordion.Toggle as={Card.Header}>
                                    <li className={pathname === '/app/reachus' ? 'mm-active' : undefined} onClick={props.closeSideBar}>
                                        <Link to="/app/reachus">
                                            <i className="bx bx-mail-send"></i>
                                            <span key="t-layouts">Reach Us</span>
                                        </Link>
                                    </li>
                                </Accordion.Toggle>
                            }

                            {
                                department?.show &&
                                <Accordion.Toggle as={Card.Header} eventKey="3">
                                    <li className={pathname === '/app/department' ? 'mm-active' : undefined} onClick={props.closeSideBar}>
                                        <Link to="/app/department">
                                            <i className="mdi mdi-store"></i>
                                            <span key="t-crypto">Manage Department</span>
                                        </Link>
                                    </li>
                                </Accordion.Toggle>
                            }

                            {
                                plan?.show &&
                                <Accordion.Toggle as={Card.Header} eventKey="3">
                                    <li className={pathname === '/app/plan' ? 'mm-active' : undefined} onClick={props.closeSideBar}>
                                        <Link to="/app/plan">
                                            <i className="mdi mdi-tag-faces"></i>
                                            <span key="t-crypto">Manage Plan</span>
                                        </Link>
                                    </li>
                                </Accordion.Toggle>
                            }


                            {
                                // role !== 'vendor' && <>
                                //     <Accordion.Toggle as={Card.Header} eventKey="21">
                                //         <li className={pathname === '/app/Manifest' ? 'mm-active' : undefined}>
                                //             <Link to="/app/Manifest" className="waves-effect">
                                //                 <i className="mdi mdi-account-settings"></i>
                                //                 <span key="t-dashboards"> Manifest</span>
                                //             </Link>
                                //         </li>
                                //     </Accordion.Toggle>
                                //     <Accordion.Toggle as={Card.Header} eventKey="21">
                                //         <li className={pathname === '/app/pincodeSearch' ? 'mm-active' : undefined}>
                                //             <Link to="/app/pincodeSearch">
                                //                 <i className="fas fa-search"></i>
                                //                 <span key="t-layouts">Pin Code Search</span>
                                //             </Link>
                                //         </li>
                                //     </Accordion.Toggle>
                                // </>
                            }

                            {
                                manifest?.show &&
                                <Accordion.Toggle as={Card.Header} eventKey="21">
                                    <li className={pathname === '/app/Manifest' ? 'mm-active' : undefined} onClick={props.closeSideBar}>
                                        <Link to="/app/Manifest" className="waves-effect">
                                            <i className="mdi mdi-account-settings"></i>
                                            <span key="t-dashboards"> Manifest</span>
                                        </Link>
                                    </li>
                                </Accordion.Toggle>
                            }
                            {
                                (
                                    weight_discrepancy?.weight_dispute?.show ||
                                    weight_discrepancy?.weight_dispute_upload?.show
                                ) &&
                                <>
                                    <Accordion.Toggle as={Card.Header} eventKey="101">
                                        <li className={`${
                                                (
                                                    pathname === '/app/WeightDispute' ||
                                                    pathname === '/app/WeightDisputeUpload'
                                                )
                                                ? 'mm-active' : undefined
                                            }`}
                                        >
                                            <Link
                                                className={`has-arrow `}
                                            >
                                                <i className="fas fa-weight-hanging" />
                                                <span key="t-layouts">  Weight Discrepancy</span>
                                            </Link>
                                        </li>
                                    </Accordion.Toggle>

                                    <Accordion.Collapse eventKey="101">
                                        <ul className="sub-menu" aria-expanded="false">
                                            {
                                                weight_discrepancy?.weight_dispute?.show &&
                                                <li className={pathname === '/app/WeightDiscrepancy' ? 'mm-active' : undefined} onClick={props.closeSideBar}>
                                                    <Link to="/app/WeightDiscrepancy" className="waves-effect">
                                                        Weight Dispute ({(props?.totalWeightDisputeCount || 0) > 999 ? "999+" : (props?.totalWeightDisputeCount || 0)})
                                                    </Link>
                                                </li>
                                            }

                                            {
                                                weight_discrepancy?.weight_dispute_upload?.show &&
                                                <li className={pathname === '/app/WeightDiscrepancyUpload' ? 'mm-active' : undefined} onClick={props.closeSideBar}>
                                                    <Link to="/app/WeightDiscrepancyUpload">
                                                        Weight Dispute Upload
                                                    </Link>
                                                </li>
                                            }
                                        </ul>
                                    </Accordion.Collapse>
                                </>
                            }

                            {
                                pin_code_search?.show &&
                                <Accordion.Toggle as={Card.Header} eventKey="21">
                                    <li className={pathname === '/app/pincodeSearch' ? 'mm-active' : undefined} onClick={props.closeSideBar}>
                                        <Link to="/app/pincodeSearch">
                                            <i className="fas fa-search"></i>
                                            <span key="t-layouts">Pin Code Search</span>
                                        </Link>
                                    </li>
                                </Accordion.Toggle>
                            }

                            {/* <Accordion.Toggle as={Card.Header} eventKey="1">
                                <li>
                                    <a
                                        href="javascript: void(0);"
                                        className="has-arrow"
                                    >
                                        <i className="dripicons dripicons-user"></i>
                                        <span key="t-layouts">User Management</span>
                                    </a>
                                </li>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="1">
                                <ul className="sub-menu" aria-expanded="false">
                                    <li>
                                        <Link to="/app/addUsers">Add Users</Link>
                                    </li>
                                    <li>
                                        <Link to="/app/users">Manage Users</Link>
                                    </li>
                                </ul>
                            </Accordion.Collapse> */}

                            {
                                role_management?.show &&
                                <Accordion.Toggle as={Card.Header} eventKey="2">
                                    <li className={pathname === '/app/role' ? 'mm-active' : undefined} onClick={props.closeSideBar}>
                                        <Link to="/app/role">
                                            <i className="fa fa-users-cog"></i>
                                            <span key="t-crypto">Role Management</span>
                                        </Link>
                                    </li>
                                </Accordion.Toggle>
                            }
                            {/* <Accordion.Collapse eventKey="2">
                                <ul className="sub-menu" aria-expanded="false">
                                    <li>
                                        <Link to="/app/roledetails">
                                            Role Details
                                        </Link>
                                    </li>
                                </ul>
                            </Accordion.Collapse> */}

                            {/* <Accordion.Toggle as={Card.Header} eventKey="4">
                                <li>
                                    <a
                                        href="javascript: void(0);"
                                        className="has-arrow"
                                    >
                                        <i className="ti ti-agenda"></i>
                                        <span key="t-ecommerce"> Reports</span>
                                    </a>
                                </li>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="4">
                                <ul className="sub-menu" aria-expanded="false">
                                    <li>
                                        <a href="#">Reports one</a>
                                    </li>
                                    <li>
                                        <a href="#">Reports two</a>
                                    </li>
                                    <li>
                                        <a href="#">Reports three</a>
                                    </li>
                                    <li>
                                        <a href="#">Reports four</a>
                                    </li>
                                </ul>
                            </Accordion.Collapse> */}
                            {/* <Accordion.Toggle as={Card.Header} eventKey="5">
                                <li>
                                    <a
                                        href="javascript: void(0);"
                                        className="has-arrow"
                                    >
                                        <i className="ti ti-map-alt"></i>
                                        <span key="t-crypto">Pincode Search</span>
                                    </a>
                                </li>
                            </Accordion.Toggle> */}
                            {
                                // role !== 'vendor' && <>
                                //     <Accordion.Toggle as={Card.Header} eventKey="6">
                                //         <li className={`${
                                //                 (
                                //                     pathname === '/app/walletdetails' ||
                                //                     pathname === '/app/invoicedetails'
                                //                 )
                                //                 ? 'mm-active' : undefined
                                //             }`}>
                                //             <a
                                //                 href="javascript: void(0);"
                                //                 className="has-arrow"
                                //             >
                                //                 <i className="ti ti-wallet"></i>
                                //                 <span key="t-email"> Billing & Wallet</span>
                                //             </a>
                                //         </li>
                                //     </Accordion.Toggle>
                                //     <Accordion.Collapse eventKey="6">
                                //         <ul className="sub-menu" aria-expanded="false">
                                //             <li className={pathname === '/app/walletdetails' ? 'mm-active' : undefined}>
                                //                 <Link to="/app/walletdetails">
                                //                     Wallet Details
                                //                 </Link>
                                //             </li>
                                //             <li className={pathname === '/app/invoicedetails' ? 'mm-active' : undefined}>
                                //                 <Link to="/app/invoicedetails">
                                //                     Invoice Details
                                //                 </Link>
                                //             </li>
                                //         </ul>
                                //     </Accordion.Collapse>
                                // </>
                            }

                            {
                                (
                                    billing_and_wallet?.show ||
                                    billing_and_wallet?.wallet?.show ||
                                    billing_and_wallet?.invoice?.show
                                ) &&
                                <>
                                    <Accordion.Toggle as={Card.Header} eventKey="6">
                                        <li className={`${
                                                (
                                                    pathname === '/app/walletdetails' ||
                                                    pathname === '/app/invoicedetails'
                                                )
                                                ? 'mm-active' : undefined
                                            }`}>
                                            <a
                                                href="javascript: void(0);"
                                                className="has-arrow"
                                            >
                                                <i className="ti ti-wallet"></i>
                                                <span key="t-email"> Billing & Wallet</span>
                                            </a>
                                        </li>
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="6">
                                        <ul className="sub-menu" aria-expanded="false">
                                            {
                                                billing_and_wallet?.wallet?.show &&
                                                <li className={pathname === '/app/walletdetails' ? 'mm-active' : undefined} onClick={props.closeSideBar}>
                                                    <Link to="/app/walletdetails">
                                                        Wallet Details
                                                    </Link>
                                                </li>
                                            }

                                            {
                                                billing_and_wallet?.invoice?.show &&
                                                <li className={pathname === '/app/invoicedetails' ? 'mm-active' : undefined} onClick={props.closeSideBar}>
                                                    <Link to="/app/invoicedetails">
                                                        Invoice Details
                                                    </Link>
                                                </li>
                                            }

                                        </ul>
                                    </Accordion.Collapse>
                                </>
                            }

                            {
                                // (role === 'admin' || role === 'administrator') && <>
                                //     <Accordion.Toggle as={Card.Header} eventKey="15">
                                //         <li className={`${
                                //                 (
                                //                     pathname === '/app/AccountListing' ||
                                //                     pathname === '/app/RemittanceProfile' ||
                                //                     pathname === '/app/RemittanceEntries'
                                //                 )
                                //                 ? 'mm-active' : undefined
                                //             }`}>
                                //             <a
                                //                 href="javascript: void(0);"
                                //                 className="has-arrow"
                                //             >
                                //                 <i className="mdi mdi-currency-inr"></i>
                                //                 <span key="t-email"> Remittance</span>
                                //             </a>
                                //         </li>
                                //     </Accordion.Toggle>
                                //     <Accordion.Collapse eventKey="15">
                                //         <ul className="sub-menu" aria-expanded="false">
                                //             {/* <li className={pathname === '/app/AccountCreation' ? 'mm-active' : undefined}>
                                //                 <Link to="/app/AccountCreation">
                                //                     Account Creation
                                //                 </Link>
                                //             </li> */}
                                //             <li className={pathname === '/app/AccountListing' ? 'mm-active' : undefined}>
                                //                 <Link to="/app/AccountListing">
                                //                     Account Listing
                                //                 </Link>
                                //             </li>
                                //             <li className={pathname === '/app/RemittanceProfile' ? 'mm-active' : undefined}>
                                //                 <Link to="/app/RemittanceProfile">
                                //                     Confirmation CSV
                                //                 </Link>
                                //             </li>
                                //         </ul>
                                //     </Accordion.Collapse>
                                // </>
                            }

                            {
                                (
                                    remittance?.show ||
                                    remittance?.account_listing?.show ||
                                    remittance?.confirmation_csv?.show
                                ) &&
                                <>
                                    <Accordion.Toggle as={Card.Header} eventKey="15">
                                        <li className={
                                            (
                                                pathname === '/app/AccountListing' ||
                                                pathname === '/app/RemittanceProfile' ||
                                                pathname === '/app/RemittanceEntries'
                                            )
                                            ? 'mm-active' : undefined
                                        }>
                                            <a
                                                href="javascript: void(0);"
                                                className="has-arrow"
                                            >
                                                <i className="mdi mdi-currency-inr"></i>
                                                <span key="t-email"> Remittance</span>
                                            </a>
                                        </li>
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="15">
                                        <ul className="sub-menu" aria-expanded="false">
                                            {
                                                remittance?.account_listing?.show &&
                                                <li className={pathname === '/app/AccountListing' ? 'mm-active' : undefined} onClick={props.closeSideBar}>
                                                    <Link to="/app/AccountListing">
                                                        Account Listing
                                                    </Link>
                                                </li>
                                            }

                                            {
                                                remittance?.confirmation_csv?.show &&
                                                <li className={pathname === '/app/RemittanceProfile' ? 'mm-active' : undefined} onClick={props.closeSideBar}>
                                                    <Link to="/app/RemittanceProfile">
                                                        Confirmation CSV
                                                    </Link>
                                                </li>
                                            }
                                        </ul>
                                    </Accordion.Collapse>
                                </>
                            }

                            {/* <Accordion.Toggle as={Card.Header} eventKey="7">
                                <li>
                                    <a href="javascript: void(0);">
                                        <i className="ti ti-user"></i>
                                        <span key="t-invoices"> Customer</span>
                                    </a>
                                </li>
                            </Accordion.Toggle> */}
                            {/* <Accordion.Toggle as={Card.Header} eventKey="8">
                                <li>
                                    <a href="javascript: void(0);"
                                       className="has-arrow">
                                        <i className="mdi mdi-history"></i>
                                        <span key="t-projects"> History</span>
                                    </a>
                                </li>
                            </Accordion.Toggle> */}
                            {/* <Accordion.Collapse eventKey="8">
                                <ul className="sub-menu" aria-expanded="false">
                                    <li>
                                        <a href="#">Projects Grid</a>
                                    </li>
                                    <li>
                                        <a href="#">Projects List</a>
                                    </li>
                                    <li>
                                        <a href="#">Project Overview</a>
                                    </li>
                                    <li>
                                        <a href="#">Create New</a>
                                    </li>
                                </ul>
                            </Accordion.Collapse> */}
                            {/* <Accordion.Toggle as={Card.Header} eventKey="9">
                                <li>
                                    <a href="javascript: void(0);">
                                        <i className="fe fe-help-circle"></i>
                                        <span key="t-tasks"> Help</span>
                                    </a>
                                </li>
                            </Accordion.Toggle> */}
                            {/* <Accordion.Toggle as={Card.Header} eventKey="10">
                                <li>
                                    <a
                                        href="javascript: void(0);"
                                        className="has-arrow"
                                    >
                                        <i className="fe fe-settings"></i>
                                        <span key="t-contacts"> Settings</span>
                                    </a>
                                </li>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="10">
                                <ul className="sub-menu" aria-expanded="false">
                                    <li>
                                        <a href="/app/EditProfile">Edit Profile</a>
                                    </li>
                                    <li onClick={props.logOut}>
                                        <a className='pointer'>Log Out</a>
                                    </li>
                                </ul>
                            </Accordion.Collapse> */}
                        </Accordion>
                    </ul>
                </div>
            </div>
        </div>
    );
};
export default AppSidebar;
