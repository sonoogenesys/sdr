import React from "react";
import moment from "moment";
import { connect } from "react-redux";

const UserUsageItem = (props = {}) => {
    let { index = 0, userId, mUser, history, } = props;
    let {
        usage_detail = {}
    } = mUser;

    if (!mUser) {
        return <></>;
    }

    const onShowDetails = (e) => {
        history?.push(`/app/usagedetails/${userId}`);
    }

    return (
        <tr key={index}>
            <td style={{ textAlign: "center" }}>
                {index + 1}
            </td>
            <td>
                {mUser?.role?._id?.name || "Client"}
            </td>
            <td>
                {mUser?.first_name} {mUser?.last_name}
            </td>
            <td>
                {usage_detail?.total_order_count || 0}
            </td>
            <td>
                {parseFloat(usage_detail?.total_amount || 0).toFixed(2)}
            </td>
            <td>
                {usage_detail?.last_order_date ? moment(usage_detail?.last_order_date).format("DD MMM YYYY") : "-"}
            </td>
            <td>
                {mUser?.created_at ? moment(mUser.created_at).format("D MMM YYYY, h:mm a") : "-"}
            </td>
            {/* <td style={{ textAlign: "center" }}>
                <button
                    className="btn btn-primary view_btn"
                    onClick={onShowDetails}
                    disabled={!usage_detail?.total_order_count}
                >
                    View Details
                </button>
            </td> */}
        </tr>
    );
};

const mapStateToProps = (state, ownProps) => {
    let { id } = ownProps;

    let usages = state.users?.usages;
    let mUser = id && usages&& usages[id];

    return {
        userId: id,
        mUser: mUser,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserUsageItem);
