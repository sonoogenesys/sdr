import React, { Component } from "react";
import { connect } from "react-redux";
import BreadCrumb from "../Utils/BreadCrumb";
import MessageItem from "./Components/MessageItem";
import { fetchOrderRequest } from "./Duck/OrderActions";
import { fetchComments } from "../Comments/Duck/CommentActions";
import moment from "moment";
import { Redirect } from "react-router-dom";
import MessageModal from "./Components/MessageModal";

export class OrderActivity extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isGoBack: false,
            showMessageModal: false,
            isLoading: false,
            isLatestBottom: false,
            goToTicket: false
        };
    }

    componentDidMount() {
        let { orderId, order, getOrder, location } = this.props;
        if (orderId && !order) {
            getOrder && getOrder(orderId);
        }
        if(location?.state?.from === 'ticket'){
            this.setState({goToTicket: true})
        }
        this.fetchOrderComments();
    }

    componentDidUpdate(preProps) {
        let { commentList } = this.props;
        let { isLoading } = this.state;

        if (isLoading && Array.isArray(commentList) && commentList.length !== preProps.commentList?.length) {
            this.setState({
                isLoading: false,
            });
        }
    }

    fetchOrderComments = (offset = 0, limit = 100) => {
        let { orderId, fetchComments } = this.props;
        orderId && fetchComments && fetchComments({
            model_id: orderId,
            onModel: "Order",
            offset: offset,
            limit: limit,
        });
    }

    loadMoreOrderComments = () => {
        let { commentList, commentMeta } = this.props;
        let totalCount = commentMeta?.totalCount || 0;

        if (Array.isArray(commentList) && commentList.length  < totalCount) {
            this.fetchOrderComments(commentList.length);
        }
    }

    onGoBack = () => {
        this.props.history.goBack();
        // this.setState({
        //     isGoBack: true,
        // });
    };

    onLoadMoreMessage = () => {
        this.setState({
            isLoading: true,
        }, () => this.loadMoreOrderComments());
    };

    toggleSendMessage = (show = false) => {
        show = typeof show === "boolean" && show;
        this.setState({
            showMessageModal: show,
        });
    };

    toggleOrder = () => {
        this.setState({
            isLatestBottom: !this.state.isLatestBottom,
        });
    }

    render() {
        let { orderId, order, comments, commentList, commentMeta } = this.props;
        let { isGoBack, showMessageModal, isLoading, isLatestBottom, goToTicket } = this.state;

        if (isGoBack) {
            if(goToTicket) return <Redirect to={`/app/ticketDashboard`} />;
            else return <Redirect to={`/app/shipmentList`} />;
        }


        if (isLatestBottom) {
            commentList = [...(commentList || [])].reverse();
        }

        let productDetails = order?.product_details;
        // let orderStatus =
        //     Array.isArray(order?.orderStatus) &&
        //     order.orderStatus.length > 0 &&
        //     order.orderStatus[0];
        // let scanDetail =
        //     Array.isArray(orderStatus?.scan_detail) &&
        //     orderStatus?.scan_detail?.length > 0 &&
        //     orderStatus?.scan_detail[0];

        return (
            <>
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box d-flex align-items-center justify-content-between">
                            <div className="page-header">
                                <div>
                                    <h2 className="main-content-title tx-24 mg-b-5">
                                        Shipment Activity
                                    </h2>

                                    <BreadCrumb
                                        title={["Shipment", "Shipment Activity"]}
                                    />
                                </div>
                            </div>

                            <div className="page-title-right">
                                <button
                                    type="button"
                                    className="btn btn-primary my-2 btn-icon-text"
                                    onClick={this.onGoBack}
                                >
                                    <i className="fa fa-arrow-circle-left mr-2"></i>
                                    Back
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <h2 className="card-title mb-0 d-flex justify-content-between">
                                Shipment Id #{order?.order_id}
                                <div>
                                    <span
                                        className={"btn btn-outline-primary"}
                                        style={{ fontSize: 14 }}
                                        onClick={() =>
                                            this.toggleSendMessage(true)
                                        }
                                    >Add Comment</span>
                                </div>
                            </h2>
                            <div className="order_active pl-4 pr-4">
                                <p className="pt-3">
                                    {productDetails?.product_name}
                                </p>
                                <p style={{ textTransform: "uppercase" }}>{order?.latest_order_status}</p>
                                {order?.created_at && (
                                    <p className="d-flex">
                                        <span>Shipment Date :</span>
                                        <strong className="ml-2">
                                            {moment(order.created_at).format(
                                                "D MMM YYYY"
                                            )}
                                        </strong>
                                    </p>
                                )}
                            </div>
                            <div className="col-md-12">
                                {
                                    Array.isArray(commentList) && commentList.length > 0
                                    ? (
                                        <div className="bg-f9f9f9 pl-3 pr-3 pt-5 pb-3">
                                            <span
                                                className={"pointer"}
                                                style={{ fontSize: 16, position: "absolute", right: 50 }}
                                                onClick={() => this.toggleOrder()}
                                                data-title={isLatestBottom ? "Sort by latest" : "Sort by oldest"}
                                            >{
                                                isLatestBottom
                                                ? <i className="fas fa-sort-amount-down"></i>
                                                : <i className="fas fa-sort-amount-up"></i>
                                            }</span>

                                            {
                                                commentList.map((commentId) => {
                                                    let comment = commentId && comments && comments[commentId];

                                                    return(
                                                        comment &&
                                                        <MessageItem
                                                            remark={comment.remark}
                                                            title={comment.title}
                                                            message={comment.body}
                                                            createdAt={comment.timestamp}
                                                            author={comment.author}
                                                        />
                                                    );
                                                })
                                            }

                                            {
                                                commentMeta && commentMeta?.totalCount > commentList.length &&
                                                <div className="text-right">
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary"
                                                        onClick={this.onLoadMoreMessage}
                                                        disabled={isLoading}
                                                    >
                                                        {
                                                            isLoading ? (
                                                            <>
                                                                <span className="spinner-border spinner-border-sm"></span>
                                                                <span className="visually-hidden"> Loading...</span>
                                                            </>
                                                            ) : "Load More"
                                                        }
                                                    </button>
                                                </div>
                                            }
                                        </div>
                                    ) : (
                                        <div className="d-flex flex-column justify-content-center align-items-center pb-4" style={{ textAlign: "center" }}>
                                            <img
                                                src={"/images/no_comment.svg"}
                                                style={{
                                                    height: 250,
                                                    display: "block",
                                                    // alignContent: "center"
                                                }}
                                            />
                                        </div>
                                    )
                                }

                            </div>
                        </div>
                    </div>
                </div>

                <MessageModal
                    show={showMessageModal}
                    handleModal={this.toggleSendMessage}
                    orderId={orderId}
                />
            </>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    let { match } = ownProps;
    let orderId = match?.params?.orderId;
    let order = orderId && state.order?.orders[orderId];

    let comments = state.comment?.comments;
    let mBoard = state.comment?.board[orderId];

    let commentList = mBoard?.list;
    let commentMeta = mBoard?.meta;
    let loading = mBoard?.loading;

    return {
        orderId: orderId,
        order: order,
        comments: comments,
        commentList: commentList,
        commentMeta: commentMeta,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getOrder: (id) => dispatch(fetchOrderRequest(id)),
        fetchComments: (params) => dispatch(fetchComments(params)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderActivity);
