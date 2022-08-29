

import React, { Component } from 'react'
import moment from 'moment';
import 'tippy.js/dist/tippy.css';

import AppHeader from './AppHeader'
import AppSidebar from './AppSidebar'
import AppContent from './AppContent'
import AppFooter from './AppFooter'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import jwtDecode from 'jwt-decode'
import { getLoggedInUser } from '../Profile/Duck/ProfileActions'
import { logOut } from '../Login/Duck/LoginActions'
import {Redirect} from 'react-router-dom'
import { fetchAllUsersRequest } from "../Users/Duck/UsersActions"
import { fetchPlanRequest } from "../plan/Duck/PlanActions"
import { fetchDepartmentRequest } from "../Department/Duck/DepartmentActions"
import { fetchAllBulkOrderRequest, fetchAllOrderRequest, searchAllOrderRequest } from "../Order/Duck/OrderActions"
import {fetchLogistics} from '../UploadData/Duck/UploadDataActions'
import {fetchAllRemittanceRequest} from '../Remittance/Duck/RemittanceActions'
import ScrollToTop from '../ScrollToTop'
import ChangePassword from './Components/ChangePassword'
import { fetchWalletRequest } from '../Wallet/Duck/WalletActions'

class ApplayoutContainer extends Component {

    state = {
        redirectToLogin: false,
        showSideBar: true,
        showChangePassword : false,
    }

    componentDidMount(){
        let { getLoggedInUser, fetchLogistics, fetchPlans, fetchWallet, loggedInUser } = this.props;
        getLoggedInUser(jwtDecode(localStorage.getItem('jwt')).user.id)
        // typeof fetchRoles === "function" && fetchRoles();
        if (loggedInUser && !loggedInUser?.user_type?._id) {
            fetchLogistics?.();
        }
        fetchWallet && fetchWallet();

        fetchPlans && fetchPlans()

        // fetchAllOrders && fetchAllOrders();
        // fetchAllBulkOrders && fetchAllBulkOrders();
        this.loadMoreOrders();
    }

    loadMoreOrders = () => {
        let { fetchAllOrders } = this.props;

        let params = {
            payment_status: "complete",
            weight_dispute: true,
            weight_dispute_created_from: moment().subtract(7, "days").startOf("days").utc().format(),
        };

        fetchAllOrders && fetchAllOrders(params);
    }

    componentDidUpdate(prevProps){
        const { fetchLogistics, loggedInUser } = this.props
        if(!prevProps?.loggedInUser){
            if (loggedInUser && !loggedInUser?.user_type?._id) {
                fetchLogistics?.();
            }
        }
    }

    logOut = () => {
        this.setState({redirectToLogin: true})
        localStorage.clear();
        this.props.logOut();
    }

    toggleSideBar = () => {
        this.setState({showSideBar: !this.state.showSideBar})
    }



    closeSideBar = () => {
        let  windowWidth = window.innerWidth
        if(windowWidth <= 991){
            this.setState({showSideBar: false})
        }
    }

    handleChangePasswordModal = (show = false) => {
        show = typeof show === "boolean"  && show;
        this.setState({
            showChangePassword: show,
        });
    }


    render() {
        const {loggedInUser, orderMeta} = this.props
        const {redirectToLogin, showSideBar, showChangePassword} = this.state

        if (redirectToLogin) {
            return <Redirect to='/login' />
        }

        return (
            <div id='layout-wrapper'>
                 <ScrollToTop>
                <AppHeader
                    loggedInUser={loggedInUser}
                    logOut={this.logOut}
                    handleChangePasswordModal={this.handleChangePasswordModal}
                    toggleSideBar={this.toggleSideBar}
                    showSideBar={showSideBar}
                    history={this.props.history}
                />

                <AppSidebar
                    logOut={this.logOut}
                    showSideBar={showSideBar}
                    loggedInUser={loggedInUser}
                    closeSideBar = {this.closeSideBar}
                    totalWeightDisputeCount={orderMeta?.total_count}
                />
                <AppContent showSideBar={showSideBar} loggedInUser={loggedInUser}/>
                <AppFooter showSideBar={showSideBar} />
                </ScrollToTop>

                <ChangePassword
                    show={showChangePassword}
                    handleClose={this.handleChangePasswordModal}
                />

                <Helmet>
                    <script src="/js/metisMenu.min.js"></script>
                    <script src="/js/simplebar.min.js"></script>
                    <script src="/js/app.js"></script>
                </Helmet>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const pathname = {
        payment_status: "complete",
        weight_dispute: true,
        weight_dispute_created_from: moment().subtract(7, "days").startOf("days").utc().format()
    };
    let filter = JSON.stringify(pathname);
    let boards = state.order?.boards;

    let mBoard = boards[filter];
    let orderMeta = mBoard?.meta;

    return {
        loggedInUser: state?.loggedInUser?.data?.data,
        orderMeta: orderMeta,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getLoggedInUser: (id) => dispatch(getLoggedInUser(id)),
        fetchAllUsers: (params) => dispatch(fetchAllUsersRequest(params)),
        fetchDepartments: (params) => dispatch(fetchDepartmentRequest(params)),
        // fetchRoles: (params) => dispatch(fetchRoleRequest(params)),
        fetchPlans: (params) => dispatch(fetchPlanRequest(params)),
        fetchAllOrders: (prams) => dispatch(fetchAllOrderRequest(prams)),
        fetchAllBulkOrders: (prams) => dispatch(fetchAllBulkOrderRequest(prams)),
        fetchLogistics: (params) => dispatch(fetchLogistics(params)),
        fetchAllRemittance: (params) => dispatch(fetchAllRemittanceRequest(params)),
        fetchWallet: () => dispatch(fetchWalletRequest()),
        logOut: () => dispatch(logOut()),
        fetchAllOrders: (prams) => dispatch(searchAllOrderRequest(prams)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplayoutContainer)
