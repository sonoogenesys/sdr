import React, { Component } from "react";
import { connect } from "react-redux";
import CourierPartnerItem from "../IndividualOrder/Components/CourierPartnerItem";
import { Redirect } from "react-router-dom";

class CourierPartners extends Component {

    componentDidMount() {
        let { availableLogistic, history } = this.props;
        if (!availableLogistic) {
            history.replace("/app/pincodeSearch");
        }
    }

    onGoBack = () => {
        this.props.history.goBack();
    }

    render() {
        let { availableLogistic } = this.props;
        availableLogistic = [...(availableLogistic?.filter(cp => cp.recommendation) || []), ...(availableLogistic?.filter(cp => !cp.recommendation) || [])];

        return (
            <>
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box d-flex align-items-center justify-content-between">
                            <div className="page-header">
                                <div>
                                    <h2 className="main-content-title tx-24 mg-b-5">
                                        Courier Partner
                                    </h2>
                                </div>
                            </div>

                            <div className="page-title-right">
                                <button
                                    type="button"
                                    className="btn btn-primary my-2 btn-icon-text"
                                    onClick={this.onGoBack}
                                >
                                    <i className="fa fa-arrow-circle-left mr-1"></i>
                                    Back
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="row">
                            <div className="col-md-6">
                                    <h4 className="card-title border-0">Companies</h4>
                                </div>
                                <div className="col-m-3">
                                    <h4 className="card-title border-0">*Price Excluding GST Amount</h4>
                                </div>
                                <div className="col-md-2 ml-1">
                                    <h4 className="card-title border-0">Time </h4>

                                </div>
                            </div>
                        </div>

                        {
                            Array.isArray(availableLogistic) &&
                            availableLogistic.map((courierPartner, index) => (
                                <CourierPartnerItem
                                    key={index}
                                    logo={"/images/wow.png"}
                                    name={courierPartner?.name}
                                    price={courierPartner?.price?.total_value}
                                    cod_charges={courierPartner?.price?.cod_charges}
                                    workingDays={courierPartner?.price?.day}
                                    isRecommendation={courierPartner?.recommendation}
                                    isBestPrice={courierPartner?.best_price}
                                    isBestTat={courierPartner?.best_tat}
                                />
                            ))
                        }
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    let data = state.search?.data;

    return {
        availableLogistic: data?.available_logistic,
    };
};

export default connect(mapStateToProps)(CourierPartners);
