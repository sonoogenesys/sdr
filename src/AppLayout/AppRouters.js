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

const scrollToTop = () => {
	document.documentElement.scrollTop = 0
}

const AppRouters = (props) => {
	scrollToTop()

	return  (
		<React.Fragment>
			<Route path='/app/Dashboard' exact component={Dashboard} />
			<Route path='/app/about' exact component={AboutContainer} />
			<Route path='/app/product' exact component={ProductContainer} />
			<Route path='/app/client' exact component={ClientContainer} />
			<Route path='/app/invoice' exact component={Invoice} />
			<Route path='/app/purchase' exact component={Purchase} />
			<Route path='/app/gallery' exact component={GalleryContainer} />
			<Route path='/app/editProfile' exact component={EditProfile} />
			<Route path='/app/tally' exact component={TallyContainer} />
			<Route path='/app/query' exact component={QueryContainer} />

		</React.Fragment>
	)
}

export default (AppRouters);
