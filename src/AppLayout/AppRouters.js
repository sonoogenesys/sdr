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

	return  (
		<React.Fragment>
			{/** dashboard section start */}
			{
				<Route path='/app/Dashboard' exact component={Dashboard} />
			}
			{/*<Route path='/app/AccountCreation' exact component={AccountCreation} />*/}

			<Route path='/app/editProfile' exact component={EditProfile} />

			{/* <Route path='/app/roledetails' exact component={RoleDetails} /> */}


		</React.Fragment>
	)
}

export default (AppRouters);
