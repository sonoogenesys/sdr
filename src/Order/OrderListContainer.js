import React, { Component } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import TableContainer from "../Utils/TableContainer";
import {
  searchAllOrderRequest,
  selectOrdersRequest,
} from "./Duck/OrderActions";
import BreadCrumb from "../Utils/BreadCrumb";
import { Modal } from "react-bootstrap";
import FilePreviewModal from "../FilePreview/filePreviewModal";
import FilePreviewWrapper from "../FilePreview/filePreviewWrapper";
import OrderItem from "./Components/OrderItem";
import CancelOrderModal from "./Components/CancelOrderModal";
import CreateRtoOrderModal from "./Components/CreateRtoOrderModal";
import Select from "react-select";
import { fetchAllCustomersRequest } from "../Users/Duck/UsersActions";

class OrderListContainer extends Component {
  constructor(props) {
    super(props);

    let filter = props?.filter;

    this.state = {
      fromDate:
        (filter?.created_from && moment(filter?.created_from).toDate()) || null,
      toDate:
        (filter?.created_to && moment(filter?.created_to).toDate()) || null,
      orderType: filter?.order_type || "all",
      awbNumber: filter?.awb || "",
      payment_method: filter?.payment_method || "",
      payment_status: filter?.payment_status || "complete",
      logistic_id: filter?.logistic_id || "",
      plan: filter?.plan || "",
      created_by: filter?.created_by || "",
      orderId: null,
      error: null,
      showPreviewOfFileId: null,
      allAttachments: [],
      filter: JSON.stringify({ pathname: props?.location?.pathname }),
      showCancelOrderModal: false,
      showCreateRtoOrderModal: false,
      order: null,
    };
    this.selectDateFrom = this.selectDateFrom.bind(this);
    this.selectDateTo = this.selectDateTo.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    let { printSelection, selectOrders, fetchAllCustomers, role, permissions } =
      this.props;

    this.loadMoreOrders();
    selectOrders && selectOrders(printSelection, false);
    if (
      (permissions?.showAllOrders || role?.role_id === "vendor") &&
      fetchAllCustomers
    ) {
      fetchAllCustomers();
    }
  }

  togglePreview = (fileId, attachments) => {
    this.setState({ showPreviewOfFileId: fileId, allAttachments: attachments });
  };

  loadMoreOrders = (offset = 0, limit = 100) => {
    let {
      fromDate,
      toDate,
      orderType,
      payment_method,
      payment_status,
      logistic_id,
      plan,
      created_by,
      awbNumber,
    } = this.state;
    let { fetchAllOrders, orderList, orderMeta, location } = this.props;

    if (offset === 0 || orderMeta?.total_count > orderList?.length) {
      let params = {
        pathname: location?.pathname,
        offset: offset,
        limit: limit,
      };

      if (fromDate)
        params.created_from = moment(fromDate).startOf("day").utc().format();
      if (toDate)
        params.created_to = moment(toDate).endOf("day").utc().format();
      if (orderType && orderType !== "all") params.order_type = orderType;
      if (payment_method && payment_method !== "all")
        params.payment_method = payment_method;
      // if (payment_status && payment_status !== "all")
      params.payment_status = payment_status;
      if (logistic_id && logistic_id !== "all")
        params.logistic_id = logistic_id;
      if (plan) params.plan = plan;
      if (created_by && created_by !== "all") params.created_by = created_by;
      if (awbNumber) params.awb = awbNumber.trim();

      fetchAllOrders && fetchAllOrders(params);
    }
  };

  selectDateFrom = (date) => {
    if (
      this.state.toDate !== null &&
      moment(date).isAfter(moment(this.state.toDate))
    ) {
      // alert('From date should not be greater than to date')
      this.setState({ error: "From date should not be greater than to date" });
      return false;
    }
    this.setState({
      fromDate: date,
      error: null,
    });
  };
  selectDateTo = (date) => {
    if (
      this.state.fromDate !== null &&
      moment(date).isBefore(moment(this.state.fromDate))
    ) {
      // alert('To date should not be less than from date')
      this.setState({ error: "To date should not be less than from date" });
      return false;
    }
    this.setState({
      toDate: date,
      error: null,
    });
  };

  handleAWB = (e) => {
    this.setState({ awbNumber: e?.target?.value });
  };

  handleClose() {
    this.setState({
      showDispatch: false,
    });
  }

  handleOrderType = (e) => {
    this.setState({ orderType: e?.target?.value });
  };

  onFilterOrder = () => {
    this.setState({
      error: null,
    });

    this.loadMoreOrders();
  };

  handleChange = (name) => (e) => {
    let value = e?.target?.value || e?.value;

    this.setState({
      [name]: value,
    });
  };

  reset = () => {
    this.setState(
      {
        fromDate: null,
        toDate: null,
        orderType: "",
        payment_method: "",
        payment_status: "complete",
        logistic_id: "",
        plan: "",
        created_by: "",
        awbNumber: "",
        error: null,
      },
      () => {
        this.onFilterOrder();
      }
    );
  };

  onShowPrintPreview = (clickCheck) => {
    let { history } = this.props;
    //window.print();
    history.push({
      pathname: "/app/ShipmentPrintModal/",
      state: { clickCheckProp: clickCheck },
    });
  };

  onDeselectAll = () => {
    let { printSelection, selectOrders } = this.props;
    selectOrders && selectOrders(printSelection, false);
  };

  handleCancelOrderModal = (show = false, order) => {
    show = typeof show === "boolean" && show;
    this.setState({
      showCancelOrderModal: show,
      order,
    });
  };

  handleCreateRtoOrderModal = (show = false, order) => {
    show = typeof show === "boolean" && show;
    this.setState({
      showCreateRtoOrderModal: show,
      order,
    });
  };

  render() {
    let {
      orderList,
      orderMeta,
      loading,
      logistics,
      plans,
      planOrder,
      filter,
      printSelection,
      selectOrders,
      customers,
      permissions,
    } = this.props;

    let pendingCount = orderMeta?.total_pending_count || 0;
    let totalAmount = orderMeta?.total_amount || 0;
    let individualCount = orderMeta?.total_individual_count || 0;
    let bulkUploadCount = orderMeta?.total_bulk_upload_count || 0;
    let bulkOrderCount = orderMeta?.total_bulk_order_count || 0;

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-12">
            <div className="page-title-box d-flex align-items-center justify-content-between">
              <div className="page-header">
                <div>
                  <h2 className="main-content-title tx-24 mg-b-5">
                    Shipment List
                  </h2>
                  <BreadCrumb title={["Shipment", "Shipment List"]} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-3">
            <div className="card flex-row align-items-center common_card ttl_amt">
              <div>
                <img src="/images/rupee.png"></img>
              </div>
              <div>
                <h5 className="mb-0">{parseFloat(totalAmount).toFixed(2)}</h5>
                <p className="mb-0">Total Amount</p>
              </div>
            </div>
          </div>
          <div className="col-xl-3">
            <div className="card flex-row align-items-center common_card indivisual_orders">
              <div>
                <img src="/images/indivisual.png"></img>
              </div>
              <div>
                <h5 className="mb-0">{individualCount}</h5>
                <p className="mb-0">Individual Shipments</p>
              </div>
            </div>
          </div>
          <div className="col-xl-3">
            <div className="card flex-row align-items-center common_card bulk_orders">
              <div>
                <img src="/images/bulk.png"></img>
              </div>
              <div>
                <h5 className="mb-0">
                  {bulkUploadCount}({bulkOrderCount})
                </h5>
                <p className="mb-0">Bulk Upload</p>
              </div>
            </div>
          </div>
          <div className="col-xl-3">
            <div className="card flex-row align-items-center common_card pending_orders">
              <div>
                <img src="/images/pending.png"></img>
              </div>
              <div>
                <h5 className="mb-0">{pendingCount}</h5>
                <p className="mb-0">Pending Shipments</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <h4 className="card-title">Filter</h4>
              <div className="card-body">
                <form>
                  <div className="row order_filter">
                    <div className="col-md-2 col-sm-3 col-6 datePicker">
                      <label>
                        <DatePicker
                          selected={this.state.fromDate}
                          onChange={this.selectDateFrom}
                          dateFormat="dd/MM/yyyy"
                          className="form-control"
                          placeholderText="From"
                          maxDate={new Date()}
                          isClearable
                        />
                        {!this.state.fromDate && (
                          <span>
                            <i className="bx bx-calendar-alt"></i>
                          </span>
                        )}
                      </label>
                    </div>
                    <div className="col-md-2 col-sm-3 col-6 datePicker">
                      <label>
                        <DatePicker
                          selected={this.state.toDate}
                          onChange={this.selectDateTo}
                          dateFormat="dd/MM/yyyy"
                          className="form-control"
                          placeholderText="To"
                          maxDate={new Date()}
                          isClearable
                        />
                        {!this.state.toDate && (
                          <span>
                            <i className="bx bx-calendar-alt"></i>
                          </span>
                        )}
                      </label>
                    </div>
                    <div className="col-md-3 col-sm-3 col-12">
                      <select
                        className="form-control"
                        placeholder="Order Type"
                        value={this.state.orderType}
                        onChange={this.handleOrderType}
                      >
                        <option value="all">All Shipments</option>
                        <option value="individual">Individual</option>
                        <option value="bulk">Bulk</option>
                      </select>
                    </div>

                    <div className="col-md-3 col-sm-3 col-12">
                      <select
                        className="form-control"
                        value={this.state.payment_method}
                        onChange={this.handleChange("payment_method")}
                      >
                        <option value="all">All Payment Modes</option>
                        <option value="cod">COD</option>
                        <option value="prepaid">Prepaid</option>
                      </select>
                    </div>

                    <div className="col-md-3 col-sm-3 col-12">
                      <select
                        className="form-control"
                        value={this.state.payment_status}
                        onChange={this.handleChange("payment_status")}
                      >
                        <option value="all">All Payment Status</option>
                        <option value="complete">Payment Done</option>
                        <option value="pending">Payment Pending</option>
                      </select>
                    </div>

                    {
                      logistics?.length > 0 &&
                      <div className="col-md-3 col-sm-3 col-12">
                        <select
                          className="form-control"
                          value={this.state.logistic_id}
                          onChange={this.handleChange("logistic_id")}
                        >
                          <option value="all">All Partners</option>
                          {logistics &&
                            logistics.map((cp, index) => (
                              <option key={index} value={cp?._id}>
                                {cp?.name}
                              </option>
                            ))}
                        </select>
                      </div>
                    }

                    {permissions?.showAllOrders && (
                      <div className="col-md-3 col-sm-3 col-12">
                        <select
                          className="form-control"
                          value={this.state.plan}
                          onChange={this.handleChange("plan")}
                        >
                          <option value={""}>All Plan</option>
                          {Array.isArray(planOrder) &&
                            planOrder.map((id, index) => {
                              const plan = id && plans[id];
                              const name = plan?.planName;

                              return (
                                <option key={index} value={id}>
                                  {name}
                                </option>
                              );
                            })}
                        </select>
                      </div>
                    )}

                    {Array.isArray(customers) && customers.length > 0 && (
                      <div className="col-md-3 col-sm-3 col-12">
                        <Select
                          placeholder="All Users"
                          defaultValue={
                            this.state.created_by &&
                            customers.find(
                              (user) => user.value === this.state.created_by
                            )
                          }
                          value={
                            this.state.created_by &&
                            customers.find(
                              (user) => user.value === this.state.created_by
                            )
                          }
                          options={customers}
                          isClearable
                          onChange={this.handleChange("created_by")}
                        />
                      </div>
                    )}

                    <div className="col-md-3 col-sm-5">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter AWB number"
                        onChange={this.handleAWB}
                        value={this.state.awbNumber}
                        autoComplete="on"
                      />
                    </div>

                    <div className="col-md-2 col-sm-4">
                      <div className="filter_btns d-flex align-items-start">
                        <button
                          type="button"
                          className="btn btn-primary mr-2 btn-icon-text"
                          onClick={this.onFilterOrder}
                          style={{ width: 80 }}
                        >
                          Search
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-secondary btn-icon-text"
                          onClick={this.reset}
                          style={{ width: 80 }}
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
                {this.state.error && (
                  <div className="mt-1" style={{ color: "red" }}>
                    {this.state.error}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {this.state.showPreviewOfFileId && (
          <FilePreviewModal toggleModal={this.togglePreview}>
            <FilePreviewWrapper
              data={this.state.allAttachments}
              showPreviewOfFileId={this.state.showPreviewOfFileId}
              togglePreview={this.togglePreview}
            />
          </FilePreviewModal>
        )}

        <TableContainer
          headings={[
            { text: "No.", style: { textAlign: "center" } },
            "AWB Number",
            "Created by",
            "Shipment Date",
            "Payment Mode",
            "Delivery partner",
            "Estimated TAT",
            "Status",
            "Action",
          ]}
          showSelectAll={true}
          totalEntries={orderMeta?.totalCount || orderMeta?.total_count}
          rowData={orderList}
          renderRow={(item, index) => (
            <OrderItem
              id={item}
              index={index}
              showSelect
              showCancelOrder
              handleCancelOrderModal={this.handleCancelOrderModal}
              handleCreateRtoOrderModal={this.handleCreateRtoOrderModal}
              {...this.props}
            />
          )}
          showSearch={false}
          loading={loading}
          filter={filter}
          loadMore={this.loadMoreOrders}
          actionBtnText={"Label Preview"}
          ThermalactionBtnText={"Thermal Label Preview"}
          showActionBtn={printSelection?.length > 0}
          onClickAction={this.onShowPrintPreview}
          onClickDeselectAction={this.onDeselectAll}
          onSelectAll={selectOrders}
          selectedList={printSelection}
        />

        <CancelOrderModal
          show={this.state.showCancelOrderModal}
          onHide={this.handleCancelOrderModal}
          order={this.state.order}
        />

        <CreateRtoOrderModal
          show={this.state.showCreateRtoOrderModal}
          onHide={this.handleCreateRtoOrderModal}
          order={this.state.order}
        />

        <Modal
          show={this.state.showDispatch}
          onHide={this.handleClose}
          backdrop="static"
          keyboard={true}
          animation={true}
        >
          <Modal.Header closeButton>
            <Modal.Title>Dispatch Label Preview</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-md-12 text-center">
                <img src="/images/dispatch-lable.jpg" />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              variant="secondary"
              className="btn btn-secondary"
              onClick={this.handleClose}
            >
              Close
            </button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let { location } = ownProps;
  let pathname = location?.pathname;

  let users = state.users?.users;
  let customers = state.users?.customerList?.map((userId) => ({
    value: userId,
    label: users[userId]?.email,
  }));

  let logistics = state.logistics?.data;

  // let orderState = state.order;

  let filter = state.order?.filters[pathname];

  let boards = state.order?.boards;

  let mBoard = boards[JSON.stringify(filter || {})];
  let orderList = mBoard?.list;
  let orderMeta = mBoard?.meta;
  let loading = mBoard?.loading;
  let error = mBoard?.error;

  let printSelection = state.order?.printSelection;

  let loggedInUser = state?.loggedInUser?.data?.data;
  const mVisiblePlans = loggedInUser?.visible_plans || [];
  let role = loggedInUser?.role?._id;
  let permissions = (role?.active && role?.permissions) || {};

  let selected_partners = loggedInUser?.selected_partners || [];
  if (!permissions?.showAllOrders && selected_partners?.length > 0) {
    logistics = logistics?.filter((logistic) =>
      selected_partners.includes(logistic?._id)
    );
  }

  let planOrder = state?.plan?.planOrder;
  if (Array.isArray(planOrder) && mVisiblePlans?.length > 0) {
    planOrder = mVisiblePlans;
  }

  return {
    filter: filter,
    orderList: orderList,
    orderMeta: orderMeta,
    loading: loading,
    error: error,
    logistics: logistics,
    customers: customers,
    printSelection: printSelection,
    role: role,
    permissions: permissions,
    plans: state?.plan?.plans,
    planOrder: planOrder,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllOrders: (prams) => dispatch(searchAllOrderRequest(prams)),
    fetchAllCustomers: (prams) => dispatch(fetchAllCustomersRequest(prams)),
    selectOrders: (ids, isSelected) =>
      dispatch(selectOrdersRequest(ids, isSelected)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderListContainer);
