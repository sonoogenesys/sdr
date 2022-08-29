import React from 'react'
import {Route} from 'react-router-dom'
import IndividualOrderContainer from '../IndividualOrder/IndividualOrderContainer'
import BulkOrderContainer from '../IndividualOrder/BulkOrderContainer'
import DepartmentContainer from '../Department/DepartmentContainer'
// import AddUsers from '../Users/AddUsers'
import PinCodeSearch from '../Search/PinCodeSearch'
import SearchCourierPartnerList from '../Search/CourierPartnerList'
import UsersContainer from '../Users/UsersContainer'
import RoleContainer from '../Role/RoleContainer'
import RoleDetails from '../Role/RoleDetails'
import CourierPartners from "../IndividualOrder/CourierPartners"
import IndividualInvoice from "../IndividualOrder/IndividualInvoice"
import BulkInvoice from "../IndividualOrder/BulkInvoice"
import TicketDashboard from '../Order/TicketDashboardContainer'
import OrderListContainer from '../Order/OrderListContainer'
import BulkOrderList from "../IndividualOrder/BulkOrderList"
import WalletDetails from "../Wallet/WalletDetails"
import MasterData from '../UploadData/MasterData'
import CourierPartnerData from '../UploadData/CourierPartnerData'
import OrderActivity from '../Order/OrderActivity';
import RemittanceProfile from "../Remittance/RemittanceProfile";
import RemittanceEntries from "../Remittance/RemittanceEntries"
import AccountCreation from '../Remittance/AccountCreation';
import AccountListing from '../Remittance/AccountListing';

import CodReports from '../Reports/CodReports';
import NoCsvReports from '../Reports/NoCsvReports';
import MonthlyReports from '../Reports/MonthlyReports';
import ReportDetails from '../Reports/ReportDetails';

import EditProfile from '../Profile/EditProfile.jsx'
import ShipmentPrintModal from '../Order/ShipmentPrintModal'
import Dashboard from '../Dashboard/Dashboard';
import ManifestDashboard from '../Manifest/ManifestDashboard'
import ManifestPickup from '../Manifest/ManifestPickup'
import Invoice from '../Order/Invoice'
// import ForgetPassword from '../Login/ForgetPassword';

import ReachUs from '../ReachUs/ReachUsContainer';
import EditRole from '../Role/EditRoleContainer';

import UserUsageContainer from '../Users/UserUsageContainer';
import UsageDetailsContainer from '../Users/UsageDetailsContainer';
import InvoiceDashboard from '../Wallet/InvoiceDashboard'

import { rolePermissions } from '../Config/RoleModulePermissions'

import PlanController from '../plan/PlanContainer';
import WeightDiscrepancy from '../Order/WeightDiscrepancy'
import WeightDisputeCSV from '../WeightDispute/WeightDisputeCSV';

const scrollToTop = () => {
	document.documentElement.scrollTop = 0
}

const AppRouters = (props) => {
	scrollToTop()
	// const role = props?.loggedInUser?.role?._id?.name?.trim()?.toLowerCase();
	const role = props.loggedInUser?.role?._id
	let permissions = role?.active && role?.permissions || {};
	permissions = {...rolePermissions, ...permissions};

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
        pin_code_search = {},
        role_management = {},
        billing_and_wallet = {},
        remittance = {},
		weight_discrepancy = {},
    } = permissions;

	// console.log("permissions", permissions);

	return  (
		<React.Fragment>
			{/** dashboard section start */}
			{
				dashboard.show &&
				<Route path='/app/Dashboard' exact component={Dashboard} />
			}
			{/** dashboard section end */}

			{/** upload section start */}

			{
				upload_data?.master?.show &&
				<Route path='/app/masterData' exact component={MasterData} />
			}

			{
				upload_data?.courier_partner?.show &&
				<Route path='/app/courierPartnerData' exact component={CourierPartnerData} />
			}

			{/** upload section end */}

			{/* <Route path='/app/Invoice' exact component={Invoice} /> */}
			{/* <Route path='/app/EditRole' exact component={EditRole} /> */}

			{/*
			<Route path='/app/ManifestPickup' exact component={ManifestPickup} />
			<Route path='/app/ShipmentPrintModal' exact component={ShipmentPrintModal} /> */}

			{/** order section start */}

			{
				order?.order_dashboard?.show &&
				<Route path='/app/shipmentList' exact component={OrderListContainer} />
			}

			{
				order?.ticket_dashboard?.show &&
				<Route path='/app/ticketDashboard' exact component={TicketDashboard} />
			}
			{
				order?.individual_order?.show &&
				<>
					<Route path='/app/individualShipment' exact component={IndividualOrderContainer} />
					<Route path='/app/OrderActivity/:orderId' exact component={OrderActivity} />
					<Route path='/app/ShipmentPrintModal/' exact component={ShipmentPrintModal} />
				</>
			}
			{
				(order?.ticket_dashboard?.show || order?.order_dashboard?.show) &&
				<>
					<Route path='/app/individualinvoice/:id' exact component={IndividualInvoice} />
					<Route path='/app/individualShipment/:orderId' exact component={IndividualOrderContainer} />
				</>
			}

			{
				order?.bulk_order?.show &&
				<>
					<Route path='/app/bulkShipmentUpload' exact component={BulkOrderContainer} />
					<Route path='/app/bulkShipmentList/:orderId' exact component={BulkOrderList} />
					<Route path='/app/bulkinvoice/:orderId' exact component={BulkInvoice} />
				</>
			}

			{
				(
					order?.individual_order?.show ||
					order?.bulk_order?.show
				) &&
				<Route path='/app/courierpartner/:id' exact component={CourierPartners} />
			}

			{/** order section end */}

			{/** reports section start */}

			{
				report?.cod?.show &&
				<>
					<Route path='/app/codReports' exact component={CodReports} />
					<Route path='/app/reportDetails/:id' exact component={ReportDetails} />
				</>
			}

			{
				report?.no_csv?.show &&
				<Route path='/app/noCsvReports' exact component={NoCsvReports} />
			}

			{
				report?.monthly?.show &&
				<Route path='/app/monthlyReports' exact component={MonthlyReports} />
			}

			{
				report?.user_usage?.show &&
				<>
					<Route path='/app/userusage/' exact component={UserUsageContainer} />
					{/* <Route path='/app/usagedetails/:id' exact component={UsageDetailsContainer} /> */}
				</>
			}

			{/** reports section end */}

			{/** user management section start */}

			{
				user_management?.show &&
				<>
					<Route path='/app/users' exact component={UsersContainer} />
					<Route path='/app/walletdetails/:id' exact component={WalletDetails} />
				</>
			}

			{/** user management section end */}

			{/** reach us section start */}

			{
				reach_us?.show &&
				<Route path='/app/reachus/' exact component={ReachUs} />
			}

			{/** reach us section end */}

			{/** department manage section start */}

			{
				department?.show &&
				<Route path='/app/department' exact component={DepartmentContainer} />
			}

			{/** department manage section end */}

			{/* plan manage section start */}

			{
				plan?.show &&
				<Route path='/app/plan' exact component={PlanController} />
			}

			{/** plan manage section end */}

			{/** manifest section start */}

			{
				manifest?.show &&
				<>
					<Route path='/app/Manifest' exact component={ManifestDashboard} />
					<Route path='/app/ManifestPickup' exact component={ManifestPickup} />
				</>
			}

			{/** manifest section end */}

			{/** WeightDiscrepancy section start */}

			{
				weight_discrepancy?.weight_dispute?.show &&
				<Route path='/app/WeightDiscrepancy' exact component={WeightDiscrepancy} />
			}
			{
				weight_discrepancy?.weight_dispute_upload?.show &&
				<Route path='/app/WeightDiscrepancyUpload' exact component={WeightDisputeCSV} />
			}
			{/** WeightDiscrepancy section end */}

			{/** pincode search section start */}

			{
				pin_code_search?.show &&
				<>
					<Route path='/app/pinCodeSearch' exact component={PinCodeSearch} />
					<Route path='/app/searchCourierPartnerList' exact component={SearchCourierPartnerList} />
				</>
			}

			{/** pincode search section end */}

			{/** role management section start */}

			{
				role_management?.show &&
				<>
					<Route path='/app/role' exact component={RoleContainer} />
					<Route path='/app/create-role/' exact component={EditRole} />
					<Route path='/app/role/:id' exact component={EditRole} />
				</>
			}

			{/** role management section end */}

			{/** billing and wallet section start */}

			{
				billing_and_wallet?.wallet.show &&
				<Route path='/app/walletdetails' exact component={WalletDetails} />
			}

			{
				billing_and_wallet?.invoice.show &&
				<Route path='/app/invoicedetails/' exact component={InvoiceDashboard} />
			}

			{/** billing and wallet section end */}

			{/** remittance section start */}

			{
				remittance?.account_listing?.show &&
				<Route path='/app/AccountListing' exact component={AccountListing} />
			}

			{
				remittance?.confirmation_csv?.show &&
				<>
					<Route path='/app/RemittanceProfile' exact component={RemittanceProfile} />
					<Route path='/app/RemittanceEntries/:id' exact component={RemittanceEntries} />
				</>
			}

			{/** remittance section end */}

			<Route path='/app/AccountCreation' exact component={AccountCreation} />

			<Route path='/app/editProfile' exact component={EditProfile} />

			{/* <Route path='/app/roledetails' exact component={RoleDetails} /> */}


		</React.Fragment>
	)
}

export default (AppRouters);
