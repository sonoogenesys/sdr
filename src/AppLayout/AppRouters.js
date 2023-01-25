import React from 'react'
import {Route} from 'react-router-dom'
import ClientContainer from '../Client/ClientsContainer'
import GalleryContainer from '../Gallery/GalleryContainer'
import Invoice from "../Invoice/InvoiceContainer"
import Purchase from "../Purchase/PurchaseContainer"
import Dashboard from '../Dashboard/Dashboard';
import EditProfile from '../Profile/EditProfile.jsx'
import AboutContainer from '../About/AboutContainer'
import TallyContainer from '../Tally/TallyContainer'
import ProductContainer from '../Product/ProductsContainer'
import QueryContainer from "../Query/QueryContainer";
import QuotationContainer from "../Quotation/QuotationContainer";
import Restriction from "../Restriction/restriction";
import GstContainer from "../Gst/GstContainer";

const scrollToTop = () => {
	document.documentElement.scrollTop = 0
}

const AppRouters = (props) => {
	let {loggedInUser} = props
	scrollToTop()
	let isAdmin = loggedInUser?.role_id === "admin"
	return  (
		<React.Fragment>
			<Route path='/app/about' exact component={AboutContainer} />
			<Route path='/app/product' exact component={ProductContainer} />
			{isAdmin && <Route path='/app/client' exact component={ClientContainer} />}
			{!isAdmin && <Route path='/app/client' exact component={Restriction} />}
			<Route path='/app/invoice' exact component={Invoice} />
			<Route path='/app/purchase' exact component={Purchase} />
			{isAdmin && <Route path='/app/Dashboard' exact component={Dashboard} />}
			{!isAdmin && <Route path='/app/Dashboard' exact component={Restriction} />}
			<Route path='/app/gallery' exact component={GalleryContainer} />
			<Route path='/app/editProfile' exact component={EditProfile} />
			<Route path='/app/tally' exact component={TallyContainer} />
			<Route path='/app/query' exact component={QueryContainer} />
			<Route path='/app/gst' exact component={GstContainer} />
			{isAdmin && <Route path='/app/quotation' exact component={QuotationContainer} />}
			{!isAdmin && <Route path='/app/quotation' exact component={Restriction} />}

		</React.Fragment>
	)
}

export default (AppRouters);
