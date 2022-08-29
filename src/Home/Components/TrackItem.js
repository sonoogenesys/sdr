import React from 'react';
import moment from 'moment';

const TrackItem = (props) => {
    return (
        <div className="d-flex">
            <div className="pb-5 position-relative">
                <span className="theme_text_color">
                    <i className="fa fa-circle" aria-hidden="true"></i>
                </span>
            </div>

            <div className="pb-2 ml-3 mb-2">
                {/* track status description start */}
                <p style={{ marginBottom: 0 }}>{props?.status_description}</p>
                {/* track status description end */}

                {/* track updated date & time start */}
                <p style={{ fontSize: 13 }}>{
                    // props?.logistic_id === "602e5c471414ff151431dec2"
                    // ? props?.updated_date && moment(props?.updated_date).format("D MMM YYYY, hh:mm a")
                    // : props?.updated_date
                    props?.updated_date && moment(props?.updated_date).format("D MMM YYYY")
                }</p>
                {/* track updated date & time end */}
            </div>
        </div>
    );
}

export default TrackItem;