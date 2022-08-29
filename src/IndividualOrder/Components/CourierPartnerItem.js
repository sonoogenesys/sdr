import React from "react";
import { Badge } from "react-bootstrap";
import { getCourierPartnerIcon } from "../../Utils/CommonFunctions";

const CourierPartnerItem = ({
    // logo = "/images/amazon.png",
    name = "",
    price = 0,
    cod_charges = 0,
    workingDays = 2,
    isSelected = false,
    isRecommendation = false,
    isBestPrice = false,
    isBestTat = false,
    onClick,
}) => {
    let logo = getCourierPartnerIcon(name);
    // name = name.toLowerCase();
    // if (name === "wow express") {
    //     logo = "/images/wow.png";
    // } else if (name === "delhivery air") {
    //     logo = "/images/delhivery_air.png";
    // } else if (name === "delhivery surface") {
    //     logo = "/images/delhiverysurface.jpg";
    // } else if (name === "xpressbees") {
    //     logo = "/images/xpressbees_air.jpg";
    // } else if (name === "xpressbees air") {
    //     logo = "/images/xpressbees_air.jpg";
    // } else if (name === "xpressbees surface") {
    //     logo = "/images/xpressbees_air.jpg";
    // }

    return (
        <div
            className={`card courier_cardhover ${onClick && "pointer"} ${isSelected && "active"}`}
            onClick={onClick}
        >
            <div className="row align-items-center pt-2 pb-2">
                <div className="col-md-7">
                    <div className="d-flex align-items-center">
                        <div className="col-md-2" style={{ height: 40, width: 100 }}>
                            <img src={logo} alt="" style={{ height: "100%", width: "100%" }} />
                        </div>
                        <div className="col-md-8" >
                            <span className="font-weight-bold mb-1 mr-1">{name}</span>
                            {
                                isRecommendation &&
                                <Badge className='ml-1' style={{color:'#fff', fontSize:12}} variant={'primary'}>Recommended</Badge>
                            }
                            {
                                isBestPrice &&
                                <Badge className='ml-1' style={{color:'#fff', fontSize:12}} variant={'info'}>Best Price</Badge>
                            }
                            {
                                isBestTat &&
                                <Badge className='ml-1' style={{color:'#fff', fontSize:12}} variant={'warning'}>Best TAT</Badge>
                            }
                        </div>
                    </div>
                </div>
                <div className="col-md-2">
                    <p className="mb-1 font-weight-bold font-size-17">
                        ₹ {parseFloat(price + cod_charges).toFixed(2)}/-
                    </p>

                </div>
                <div className="col-md-2">
                    <div className="d-flex">
                        <span className="pr-2 font-size-16 theme_icon_color">
                            <i className="bx bx-calendar"></i>
                        </span>
                        <span>{workingDays} working days</span>
                    </div>
                </div>

                {
                    onClick &&
                    <div className="col-md-1">
                        <span className={`check_icon ${isSelected && "active"}`}>
                            <i className="fa fa-long-arrow-alt-right" aria-hidden="true"></i>
                        </span>
                    </div>
                }
            </div>
        </div>
    );
};

export default CourierPartnerItem;
