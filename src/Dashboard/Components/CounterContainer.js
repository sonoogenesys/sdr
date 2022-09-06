import axios from 'axios';
import fileDownload from 'js-file-download';
import moment from 'moment';
import React, { useState } from 'react'
import { Dropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import appUrl from '../../Constants/AppUrl';
import { showNotification } from '../../Utils/CommonFunctions';
import {refreshRequest} from "../Duck/DashboardActions";

const CounterContainer = ({
    containerClassName = "dashboard_one common_grid_css bg-white p-3 br-5 mb-3",
    name = "Total Count",
    counter,
}) => {



    return (
        <div className="col-md-3 pr-0">
            <div className={`${containerClassName}`}>
                <div className="d-flex justify-content-between">
                    <p className="font-size-14">{name}</p>
                </div>

                <h4 className="text-primary font-size-24">
                    {
                        counter
                    }
                </h4>
            </div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    let { location } = ownProps;
    let pathname = location?.pathname;
    let filter = state.dashboard?.filters[pathname];

    let loggedInUser = state.loggedInUser?.data?.data;

    return {
        filter: filter,
        loggedInUser: loggedInUser,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onRefresh: (params) => dispatch(refreshRequest(params)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);