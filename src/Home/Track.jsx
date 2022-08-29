import React, { Component } from "react";
import WebBase from "./WebLayout/WebBase";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import TextInput from "../Utils/TextInput";
import axios from "axios";
import { showNotification } from "../Utils/CommonFunctions";
import appUrl from "../Constants/AppUrl";
import TrackHistoryContainer from "./Components/TrackHistoryContainer";

class Track extends Component {
    state = {
        airwaybilno: "",
        airwaybilnoErr: "",
        isLoading: false,
        data: null,
    };

    onPressEnter = (e) => {
        if (
            e.keyCode === 13 ||
            e.which === 13
        ) {
            this.onTrackOrder();
        }
    };

    hasError = () => {
        let { airwaybilno } = this.state;
        airwaybilno = airwaybilno.trim();

        let airwaybilnoErr = "";

        let isErrorHit = false;

        if (!airwaybilno) {
            isErrorHit = true;
            airwaybilnoErr = "Please enter AWB Number";
        }

        this.setState({
            airwaybilnoErr,
        });

        return isErrorHit;
    };

    onTrackOrder = () => {
        let { airwaybilno, isLoading } = this.state;

        if (!this.hasError() && !isLoading) {
            this.setState({ isLoading: true, data: null });
            axios({
                method: "GET",
                url: appUrl.TRACK_MY_URL,
                params: { airwaybilno },
            })
            .then(res => {
                let resData = res.data;

                if (resData?.meta?.success !== true || resData?.meta?.status !== 200) {
                    showNotification("error", resData?.meta?.message || resData?.message);
                    this.setState({ isLoading: false });
                } else {
                    this.setState({
                        data: resData?.data,
                        isLoading: false,
                    });
                }
            })
            .catch(err => {
                showNotification("error", "Error in tracking order");
                console.log("tracking ", err);
                this.setState({
                    isLoading: false,
                });
            })
        }
    };

    handelChange = (name) => (event) => {
        let value = event?.target?.value || "";
        value = value?.trim();

        this.setState({
            [name]: value,
            airwaybilnoErr: "",
        });
    };

    render() {
        let { airwaybilno, airwaybilnoErr, isLoading, data } = this.state;

        return (
            <WebBase>
                <section>
                    <div className="container">
                        <div className="row justify-content-center pt-5 mt-5 mb-5">
                            <div className="col-lg-6">
                                <div className="tracking-form">
                                    <h4 className="text-white pl-2 pr-2 pt-3 pb-3 text-center mb-3">
                                        Track your order
                                    </h4>

                                    <div className="pr-3 pl-3">
                                        <div className="row">
                                            {/* <div className="col-lg-10 mb-5">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                />
                                            </div> */}
                                            <TextInput
                                                containerClassName="col-lg-9 mb-5"
                                                placeholder="AWB Number"
                                                value={airwaybilno}
                                                onChange={this.handelChange("airwaybilno")}
                                                errorText={airwaybilnoErr}
                                                disabled={isLoading}
                                                onKeyUp={this.onPressEnter}
                                            />

                                            <div className="col-3">
                                                <button
                                                    type="button"
                                                    className="btn btn-primary"
                                                    disabled={isLoading}
                                                    onClick={this.onTrackOrder}
                                                >
                                                    {
                                                        isLoading
                                                        ? (
                                                            <>
                                                                <span className="spinner-border spinner-border-sm"></span>
                                                                <span className="visually-hidden"> Tacking..</span>
                                                            </>
                                                        )
                                                        : "Track"
                                                    }
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mb-5  pb-5">
                            {
                                data && data.order_status &&
                                <TrackHistoryContainer
                                    logistic={data?.logistic}
                                    history={data?.order_status}
                                    default_status={data.latest_order_status && {
                                        status_description: data.latest_order_status,
                                        updated_date: data.delivery_date,
                                    }}
                                />
                            }
                        </div>


                        {/* <div className="row">
                            <div className="col-lg-6 mb-5 pb-5">
                                <h1 className="pb-4 font-size-22">
                                    Tracking Details
                                </h1>
                                <div className="tracking_track">
                                    <p className="pb-5 position-relative">
                                        <span className="theme_text_color">
                                            <i
                                                class="fa fa-circle"
                                                aria-hidden="true"
                                            ></i>
                                        </span>
                                        &nbsp; &nbsp; Picked Up
                                    </p>
                                    <p className="pb-5 position-relative">
                                        <span className="theme_text_color">
                                            <i
                                                class="fa fa-circle"
                                                aria-hidden="true"
                                            ></i>
                                        </span>
                                        &nbsp; &nbsp; In Transit
                                        <Accordion className="tracking_accordion">
                                            <Accordion.Toggle
                                                as={Card.Header}
                                                eventKey="1"
                                            >
                                                4 Updates are available
                                            </Accordion.Toggle>
                                            <Accordion.Collapse eventKey="1">
                                                <ul>
                                                    <li>
                                                        4 Updates are available
                                                    </li>
                                                    <li>
                                                        4 Updates are available
                                                    </li>
                                                    <li>
                                                        4 Updates are available
                                                    </li>
                                                </ul>
                                            </Accordion.Collapse>
                                        </Accordion>
                                    </p>
                                    <p className="pb-5 position-relative">
                                        <span className="theme_text_color">
                                            <i
                                                class="fa fa-circle"
                                                aria-hidden="true"
                                            ></i>
                                        </span>
                                        &nbsp; &nbsp; Out for Delivery
                                    </p>
                                    <p className="pb-5 position-relative">
                                        <span className="theme_text_color">
                                            <i
                                                class="fa fa-circle"
                                                aria-hidden="true"
                                            ></i>
                                        </span>
                                        &nbsp; &nbsp; Delivered
                                    </p>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </section>
            </WebBase>
        );
    }
}

export default Track;
