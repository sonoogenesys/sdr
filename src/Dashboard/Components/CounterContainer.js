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
    counter_key,
    filter,
    ...props
}) => {

    const [state, setState] = useState({
        isLoading: false,
    });

    let { isLoading } = state;

    let permissions = props.loggedInUser?.role?._id?.permissions || {};
    const {
        dashboard = {},
    } = permissions;

    const onDownload = (e) => {
        if (counter_key && !isLoading) {
            setState({ isLoading: true });
            axios({
                method: "GET",
                url: appUrl.DASHBOARD_DOWNLOAD,
                params: { [counter_key]: true, ...(filter || {}) },
                contentType: 'application/doc; charset=utf-8',
                responseType: 'arraybuffer',
            })
            .then(res => {
                console.log("res.data", res);
                fileDownload(res.data, `${name}-${moment().format("DD-MM-YYYY")}.xlsx`);
                setState({ isLoading: false });
            })
            .catch(err => {
                let resData = String.fromCharCode.apply(null, new Uint8Array(err.response.data));
                showNotification("error", resData?.meta?.message || resData?.message || "Error in Download file");
                console.log("onDownloadOrder ", resData);
                setState({ isLoading: false });
            });
        }
    }

    const onRefresh = (e) => props?.onRefresh?.({ counter_key });

    return (
        <div className="col-md-3 pr-0">
            <div className={`${containerClassName}`}>
                <div className="d-flex justify-content-between">
                    <p className="font-size-14">{name}</p>

                    {
                        !props?.loading && counter_key && (Object.keys(filter || {}).length <= 0 || (!!counter?.count && dashboard?.download)) &&
                        <>
                            {
                                isLoading || counter?.loading
                                ? (
                                    <samp className={`font-size-18 "theme_text_color pointer`}>
                                        <span className="spinner-border spinner-border-sm"></span>
                                    </samp>
                                ) : (
                                    <Dropdown alignRight>
                                        <Dropdown.Toggle
                                            style={{ backgroundColor: "#0000", borderColor: "#0000", boxShadow: "0 0 0 0rem" }}
                                            size="sm"
                                        >
                                            <samp
                                                className={`font-size-18 ${"theme_text_color pointer"}`}
                                            >
                                                <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                                            </samp>
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            {
                                                Object.keys(filter || {}).length <= 0 &&
                                                <Dropdown.Item onClick={onRefresh}>Refresh</Dropdown.Item>
                                            }
                                            {
                                                !!counter?.count && dashboard?.download &&
                                                <Dropdown.Item onClick={onDownload}>Download</Dropdown.Item>
                                            }
                                        </Dropdown.Menu>
                                    </Dropdown>
                                )
                            }
                        </>
                    }
                </div>

                <h4 className="text-primary font-size-24">
                    {
                        props?.loading
                        ? <span className="spinner-border spinner-sm"></span>
                        : (counter?.count || 0)
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