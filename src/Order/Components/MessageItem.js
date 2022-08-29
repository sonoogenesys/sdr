import React from "react";
import moment from "moment";

const MessageContainer = ({ remark = "open",  title = "", message = "", createdAt, author = {} }) => {

    remark = remark.toLowerCase();
    let remarkColor = "#0000CD";

    if (remark === "closed") {
        remarkColor = "#e74c3c";
    } else if (remark === "resolved") {
        remarkColor = "#228B22";
    }

    return (
        <div className="d-flex">
            <div className="date_box">
                <h6>{createdAt && moment(createdAt).format("D MMM")}</h6>
            </div>
            <div className="comment_content">
                <h5>
                    {title} <span className="ml-2" style={{ color: remarkColor }}>{remark.toUpperCase()}</span>
                </h5>
                <p>
                    {author?.first_name ? `${author?.first_name} ${author?.last_name || ""} ` : `${author?.email} `}
                    added comment on {createdAt && moment(createdAt).format("D MMM, YYYY hh:mm a")}</p>
                <p className="card pl-2 pr-2 pt-2 pb-2">{message}</p>
            </div>
        </div>
    );
};

export default MessageContainer;
