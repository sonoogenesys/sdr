import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { selectCourierPartner } from "../../Order/Duck/OrderActions";
import { getCourierPartnerIcon } from "../../Utils/CommonFunctions";

const BulkOrderListItem = ({
    order,
    selectedPartners = {},
    selectCourierPartner,
    goToSelectCourierPartner,
}) => {

    const [state, setState] = useState({
        recommendation: null,
        best_price: null,
        best_tat: null,
    });
    let {
        recommendation,
        best_price,
        best_tat,
    } = state;

    let {
        _id,
        customer_details,
        available_logistic,
    } = order;
    let selectedPartner = selectedPartners[_id] || {};
    let {
        partner,
        choosePartner = {},
        isBestPrice = false,
        isBestTat = false,
    } = selectedPartner;
    let isChoosePartner = !isBestPrice && !isBestTat;
    let pickup_address = customer_details?.pickup_address;
    let shipping_address = customer_details?.shipping_address;

    // const getLogo = (name = "") => {
    //     let logo = "/img/logo.svg";
    //     name = name.toLowerCase();
    //     if (name === "wow express") {
    //         logo = "/images/wow.png";
    //     } else if (name === "delhivery air") {
    //         logo = "/images/delhivery_air.png";
    //     } else if (name === "delhivery surface") {
    //         logo = "/images/delhiverysurface.jpg";
    //     } else if (name === "xpressbees") {
    //         logo = "/images/xpressbees_air.jpg";
    //     } else if (name === "xpressbees air") {
    //         logo = "/images/xpressbees_air.jpg";
    //     } else if (name === "xpressbees surface") {
    //         logo = "/images/xpressbees_air.jpg";
    //     }

    //     return logo;
    // }

    const preload = () => {
        let recommendation;
        let best_price;
        let best_tat;

        if(Array.isArray(available_logistic) && available_logistic.length > 0) {
            recommendation = available_logistic.find(logistic => logistic?.recommendation) || {};
            best_price = available_logistic.find(logistic => logistic?.best_price) || {};
            best_tat = available_logistic.find(logistic => logistic?.best_tat) || {};

            // recommendation.logo = getLogo(recommendation?.name);
            // best_price.logo = getLogo(best_price?.name);
            // best_tat.logo = getLogo(best_tat?.name);
            recommendation.logo = getCourierPartnerIcon(recommendation?.name);
            best_price.logo = getCourierPartnerIcon(best_price?.name);
            best_tat.logo = getCourierPartnerIcon(best_tat?.name);
        }

        setState({
            recommendation: recommendation,
            best_price: best_price,
            best_tat: best_tat,
        });

        if (_id && !selectedPartners[_id]) {
            selectCourierPartner({
                orderId: _id,
                partner: recommendation,
                choosePartner: recommendation,
            });
        }
    }

    useEffect(() => {
        preload();
    }, []);

    const handleChange = (name) => (e) => {
        let mPartner;

        if (name === "isChoosePartner") {
            mPartner = choosePartner;
        } else {
            let logisticId = e?.target?.value;
            mPartner = available_logistic?.find(cp => cp?._id === logisticId);
        }

        selectCourierPartner({
            orderId: _id,
            partner: mPartner,
            [name]: true,
        });
    }

    choosePartner.logo = getCourierPartnerIcon(choosePartner.name);

    return order && (
        <div className="row mb-3">
            <div className="col-md-12 pt-3 pb-3 bg-white rounded-lg">
                <div className="row">
                    <div className="col-md-1 text-center" >
                        <h6>{pickup_address?.postcode}</h6>
                        <p className="mb-0">Postcode</p>
                    </div>
                    <div className="col-md-1 text-center" >
                        <h6>{shipping_address?.postcode}</h6>
                        <p className="mb-0">Postcode</p>
                    </div>

                    <div className="col-md-3 text-center">
                        {
                            choosePartner &&
                            <div className="d-flex" style={{ justifyContent: "center" }}>
                                <div className="form-check" >
                                    <input
                                        type="radio"
                                        className="form-check-input"
                                        value={choosePartner?._id}
                                        checked={isChoosePartner}
                                        onChange={handleChange("isChoosePartner")}
                                    />
                                </div>
                                <div className="pr-2">
                                    <img src={choosePartner?.logo} alt="" style={{width: 100, height: 38}}/>
                                </div>
                                <div>
                                    <p className="mb-0">{choosePartner?.price?.day} Days</p>
                                    <h5>INR {parseFloat(
                                        (choosePartner?.price?.total_value || 0) +
                                        (choosePartner?.price?.cod_charges || 0)
                                    ).toFixed(2)}/-</h5>
                                </div>
                            </div>
                        }
                    </div>

                    <div className="col-md-3 text-center">
                        <div className="d-flex" style={{ justifyContent: "center" }}>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    value={best_price?._id}
                                    checked={isBestPrice}
                                    onChange={handleChange("isBestPrice")}
                                />
                            </div>
                            <div className="pr-2">
                                <img src={best_price?.logo} alt="" style={{width: 100, height: 38}}/>
                            </div>
                            <div>
                                <p className="mb-0">{best_price?.price?.day} Days</p>
                                <h5>INR {parseFloat(
                                    (best_price?.price?.total_value || 0) +
                                    (best_price?.price?.cod_charges || 0)
                                ).toFixed(2)}/-</h5>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 text-center">
                        <div className="d-flex ">
                            <div className="d-flex justify-content-center flex-grow-1">
                                <div className="form-check">
                                    <input
                                        type="radio"
                                        className="form-check-input"
                                        checked={isBestTat}
                                        value={best_tat?._id}
                                        onChange={handleChange("isBestTat")}
                                    />
                                </div>
                                <div className="pr-2">
                                    <img src={best_tat?.logo} alt="" style={{width: 100, height: 38}}/>
                                </div>
                                <div>
                                    <h5 className="mb-0">{best_tat?.price?.day} Days</h5>
                                    <p>INR {parseFloat(
                                        (best_tat?.price?.total_value || 0) +
                                        (best_tat?.price?.cod_charges || 0)
                                    ).toFixed(2)}/-</p>
                                </div>
                            </div>

                        <div data-title = 'View courier partner'
                                className="d-flex align-items-center bulk_dots pointer"
                                onClick={() => goToSelectCourierPartner(_id)}
                            >
                                <span>...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        selectedPartners: state?.order?.selectedPartners,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        selectCourierPartner: (params) => dispatch(selectCourierPartner(params)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BulkOrderListItem);
