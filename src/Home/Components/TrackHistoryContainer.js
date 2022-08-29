import React from "react";
import TrackItem from "./TrackItem";
import moment from "moment";

const TrackHistoryContainer = ({ logistic, history, default_status }) => {
    let scan_detail = [];

    if (Array.isArray(history[0]?.scan_detail) && history[0]?.scan_detail.length > 0) {
        scan_detail = [...history[0]?.scan_detail];

        if (
            scan_detail.length > 1 &&
            scan_detail[0]?.updated_date &&
            scan_detail[scan_detail.length - 1]?.updated_date &&
            moment(scan_detail[0]?.updated_date).isBefore(scan_detail[scan_detail.length - 1]?.updated_date)
        ) {
            scan_detail.reverse();
        }
    } else {
        scan_detail = default_status ? [default_status] : [];
    }

    return (
        <div className="row">
            <div className="col-lg-12 mb-5 pb-5">
                <h1 className="pb-4 font-size-22">Tracking Details</h1>
                <div className="tracking_track">
                    {
                        scan_detail.map(sd => (
                            <TrackItem
                                logistic_id={logistic?._id}
                                {...sd}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default TrackHistoryContainer;
