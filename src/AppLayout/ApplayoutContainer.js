

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
import ScrollToTop from '../ScrollToTop'
import ChangePassword from './Components/ChangePassword'

class ApplayoutContainer extends Component {

    state = {
        redirectToLogin: false,
        showSideBar: true,
        showChangePassword : false,
    }

    componentDidMount(){
        let { getLoggedInUser } = this.props;
        getLoggedInUser(jwtDecode(localStorage.getItem('jwt')).user._id)
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
    return {
        loggedInUser: state?.loggedInUser?.data?.data,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getLoggedInUser: (id) => dispatch(getLoggedInUser(id)),
        logOut: () => dispatch(logOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplayoutContainer)
