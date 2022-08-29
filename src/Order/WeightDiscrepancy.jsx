import React, { Component } from "react";
import BreadCrumb from "../Utils/BreadCrumb";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { Tabs, Tab } from "react-bootstrap/";
import { connect } from "react-redux";
import Select from "react-select";

import TableContainer from "../Utils/TableContainer";

import { searchAllOrderRequest } from "./Duck/OrderActions";
import WeightDisputeItem from "./Components/WeightDisputeItem";
import { fetchAllCustomersRequest } from "../Users/Duck/UsersActions";

class WeightDiscrepancy extends Component {
  tabs = [
    {
      eventKey: "Mismatches",
      title: "Mismatches",
    },
    {
      eventKey: "DisputeRaise",
      title: "DisputeRaise",
    },
    {
      eventKey: "DisputeSettled",
      title: "DisputeSettled",
    },
    {
      eventKey: "OldMismatches",
      title: "Archived Data",
    },
  ];

  constructor(props) {
    super(props);

    this.state = {
      orderIdKey: "awb",
      orderId: null,
      filterByDate: null,
      currentTab: "Mismatches",
      fromDate: null,
      toDate: null,
    };
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

  loadMoreOrders = (offset = 0, limit = 100) => {
    let {
      currentTab,
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
        payment_status: "complete",
        weight_dispute: true,
      };

      if (currentTab === "Mismatches") {
        params.weight_dispute_created_from = moment()
          .subtract(7, "days")
          .startOf("days")
          .utc()
          .format();
      }
      if (currentTab === "OldMismatches") {
        params.weight_dispute_created_to = moment()
          .subtract(7, "days")
          .startOf("days")
          .utc()
          .format();
      }
      if (currentTab === "DisputeRaise") params.weight_dispute_raised = true;
      if (currentTab === "DisputeSettled") params.weight_dispute_settled = true;
      if (fromDate)
        params.created_from = moment(fromDate).startOf("day").utc().format();
      if (toDate)
        params.created_to = moment(toDate).endOf("day").utc().format();
      if (orderType && orderType !== "all") params.order_type = orderType;
      if (payment_method && payment_method !== "all")
        params.payment_method = payment_method;
      if (logistic_id && logistic_id !== "all")
        params.logistic_id = logistic_id;
      if (plan) params.plan = plan;
      if (created_by && created_by !== "all") params.created_by = created_by;
      if (awbNumber) params.awb = awbNumber.trim().toUpperCase();

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
    let { currentTab } = this.state;
    let value = e?.target?.value ?? e?.value ?? e;

    this.setState(
      {
        [name]: value,
      },
      () => {
        if (name === "currentTab" && currentTab !== value) {
          this.loadMoreOrders();
        }
      }
    );
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
      this.onFilterOrder
    );
  };

  render() {
    let {
      orderList,
      orderMeta,
      loading,
      filter,
      plans,
      planOrder,
      logistics,
      customers,
      permissions,
    } = this.props;
    let { currentTab } = this.state;

    return (
      <>
        <div className="row">
          <div className="col-12">
            <div className="page-title-box d-flex align-items-center justify-content-between">
              <div className="page-header">
                <div>
                  <h2 className="main-content-title tx-24 mg-b-5">
                    Weight Dispute
                  </h2>
                  <BreadCrumb
                    title={["Weight Discrepancy", "Weight Dispute"]}
                  />
                </div>
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
                      <label className="position-relative">
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
                      <label className="position-relative">
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

                    {
                      logistics?.length &&
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
                              let plan = id && plans[id];
                              let name = plan?.planName;

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

        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body weight-discrepancy">
                <Tabs
                  id="noanim-tab-example"
                  activeKey={currentTab}
                  onSelect={this.handleChange("currentTab")}
                  transition={false}
                >
                  {this.tabs.map((tab) => (
                    <Tab eventKey={tab.eventKey} title={tab.title}>
                      <TableContainer
                        showSearch={false}
                        headings={[
                          { text: "No.", style: { textAlign: "center" } },
                          "Manifested Date",
                          "AWB Number",
                          "Client Name",
                          "Client Manifested Weight (KG)",
                          "Measured Weight (KG)",
                          "Charged Date & Time",
                          "Additional Charge Deducted from Wallet",
                          "Delivery Partner",
                          {
                            text: "References",
                            style: { textAlign: "center" },
                          },
                          "Status",
                          "Action",
                        ]}
                        totalEntries={
                          orderMeta?.totalCount || orderMeta?.total_count
                        }
                        rowData={orderList}
                        renderRow={(item, index) => (
                          <WeightDisputeItem id={item} index={index} />
                        )}
                        loading={loading}
                        filter={filter}
                        loadMore={this.loadMoreOrders}
                      />
                    </Tab>
                  ))}
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </>
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
    planOrder: state?.plan?.planOrder,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllOrders: (prams) => dispatch(searchAllOrderRequest(prams)),
    fetchAllCustomers: (prams) => dispatch(fetchAllCustomersRequest(prams)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WeightDiscrepancy);
