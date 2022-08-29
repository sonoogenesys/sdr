import React, { Component } from "react";
import { connect } from "react-redux";
import BaseModal from "../../Utils/BaseModal";
import { isValidPassword, validateEmail } from "../../Utils/CommonFunctions";
import TextInput from "../../Utils/TextInput";
import { createUserRequest, updateUserRequest } from "../Duck/UsersActions";
import Select from "react-select";

class UserModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      password: "",
      vendor: "",
      role: "",
      department: "",
      plan: "",
      visible_plans: [],
      selectedPartners: [],
      active: false,
      amount: "",
      firstNameErr: "",
      lastNameErr: "",
      emailErr: "",
      mobileErr: "",
      passwordErr: "",
      vendorErr: "",
      roleErr: "",
      departmentErr: "",
      planErr: "",
      isLoading: false,
      amountErr: "",
    };
  }

  componentDidMount() {
    let { user } = this.props;
    if (!!user) {
      this.setUserDetails();
    }
  }

  componentDidUpdate(preProps) {
    let { user, userId } = this.props;

    if (!!user && preProps?.userId !== userId) {
      this.setUserDetails();
    }

    if (!this.props.loading && preProps.loading && this.state.isLoading) {
      if (!this.props.error) {
        this.onClickClose();
      } else {
        this.handelResponseError();
      }
    }
  }

  setUserDetails = () => {
    const { user, logistics, planOptions } = this.props;
    const mSelectedPartners = user?.selected_partners;
    const mVisiblePlans = user?.visible_plans;

    let selectedPartners = [];
    if (mSelectedPartners) {
      selectedPartners = logistics?.map(
        (logistic) => mSelectedPartners?.includes(logistic?.value) && logistic
      );
      selectedPartners = selectedPartners.filter((p) => p && p);
    }

    let visiblePlans = [];
    if (mVisiblePlans) {
      visiblePlans =
        planOptions?.map?.(
          (plan) => mVisiblePlans?.includes(plan?.value) && plan
        ) || [];
      visiblePlans = visiblePlans?.filter?.((p) => p && p) || [];
    }

    this.setState({
      firstName: user?.first_name || "",
      lastName: user?.last_name || "",
      email: user?.email || "",
      mobile: user?.mobile_number || "",
      password: "",
      vendor: user?.user_type?._id || user?.user_type || "",
      role: user?.role?._id?._id || "",
      department: user?.department || "",
      plan: user?.plan || "",
      visible_plans: visiblePlans,
      selectedPartners: selectedPartners,
      active: false,
      amount: "",
    });
  };

  handelResponseError = () => {
    let { error } = this.props;
    let emailErr;

    if (error?.meta?.status == 409) {
      emailErr = error?.meta?.message;
    }

    this.setState({
      emailErr: emailErr,
      isLoading: false,
    });
  };

  onClickClose = () => {
    let { handelModal } = this.props;
    this.setState({
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      password: "",
      vendor: "",
      role: "",
      department: "",
      plan: "",
      visible_plans: [],
      selectedPartners: "",
      amount: "",
      firstNameErr: "",
      lastNameErr: "",
      emailErr: "",
      mobileErr: "",
      passwordErr: "",
      vendorErr: "",
      roleErr: "",
      departmentErr: "",
      planErr: "",
      active: false,
      isLoading: false,
      amountErr: "",
    });

    typeof handelModal === "function" && handelModal();
  };

  hasError = () => {
    let { userId, roleObjMap } = this.props;
    let { firstName, email, password, mobile, role, vendor, amount, plan } =
      this.state;

    let firstNameErr = "";
    let emailErr = "";
    let passwordErr = "";
    let mobileErr = "";
    let roleErr = "";
    let planErr = "";
    let vendorErr = "";
    let amountErr = "";

    if (firstName.length <= 0) {
      firstNameErr = "Please enter name";
    }

    if (!userId) {
      if (email.length <= 0) {
        emailErr = "Please enter email id";
      } else if (!validateEmail(email)) {
        emailErr = "Please enter valid email id";
      }

      if (password.length <= 0) {
        passwordErr = "Please enter password";
      } else if (!isValidPassword(password)) {
        passwordErr = "Password at least 4 characters";
      }
    }

    if (mobile) {
      mobileErr = mobile.length !== 10 && "Please enter valid mobile number";
    }

    if (!role) {
      roleErr = "Please select role";
    }

    if (!vendor && !plan) {
      planErr = "Please select plan";
    }

    if (!vendor) {
      let roleName =
        roleObjMap &&
        role &&
        role !== "" &&
        roleObjMap[role]?.role_id?.trim()?.toLowerCase();
      if (roleName === "vendor") {
        vendorErr = "Please select vendor";
      }
    }

    this.setState({
      firstNameErr,
      emailErr,
      passwordErr,
      mobileErr,
      roleErr,
      planErr,
      vendorErr,
    });

    return (
      !!firstNameErr ||
      !!emailErr ||
      passwordErr ||
      mobileErr ||
      roleErr ||
      planErr ||
      vendorErr
    );
  };

  onClickSave = () => {
    let { userId, createUser, updateUser } = this.props;

    let {
      firstName,
      lastName,
      email,
      mobile,
      password,
      vendor,
      role,
      department,
      plan,
      visible_plans,
      selectedPartners,
      active = true,
      amount,
    } = this.state;
    if (!this.hasError()) {
      this.setState({
        isLoading: true,
      });

      firstName = firstName?.trim();
      lastName = lastName?.trim();
      email = email?.trim();
      mobile = mobile?.trim();
      password = password?.trim();
      vendor = vendor?.trim();
      role = role?.trim();
      department = department?.trim();
      plan = plan?.trim();
      amount = amount?.trim();

      let params = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        mobile_number: mobile,
        password: password,
        user_type: vendor,
        role: role,
        department: department,
        plan: plan,
        visible_plans: visible_plans?.map?.((plan) => plan?.value) || [],
        selected_partners: selectedPartners?.map((p) => p?.value),
        amount: amount,
      };

      if (!userId) {
        createUser(params);
      } else {
        params._id = userId;
        updateUser(params);
      }
    }
  };

  renderFooter = () => {
    let { userId } = this.props;
    let { isLoading } = this.state;

    return (
      <>
        <button
          type="button"
          className="btn btn-secondary"
          data-dismiss="modal"
          onClick={this.onClickClose}
        >
          Close
        </button>

        <button
          type="button"
          className="btn btn-primary"
          onClick={this.onClickSave}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="spinner-border spinner-border-sm"></span>
              <span className="visually-hidden"> Saving...</span>
            </>
          ) : !userId ? (
            "Add User"
          ) : (
            "Save changes"
          )}
        </button>
      </>
    );
  };

  handelChange =
    (name, isCheckBox = false) =>
    (event) => {
      let value =
        typeof event?.target?.value === "string" ? event.target.value : event;
      let checked = event?.target?.checked;

      if (name === "mobile" || name === "amount") {
        value = value.replace(/[^0-9]/g, "");
      }
      if (name === "role") {
        this.setState({
          [name]: isCheckBox ? checked : value,
          vendor: "",
        });
      } else {
        this.setState({
          [name]: isCheckBox ? checked : value,
        });
      }
    };

  render() {
    let {
      show,
      userId,
      roleObjMap,
      roleOrder,
      departmentObjMap,
      departmentOrder,
      planObjMap,
      planOrder,
      planOptions,
      logistics,
    } = this.props;

    let {
      firstName,
      lastName,
      email,
      mobile,
      password,
      vendor,
      role,
      department,
      plan,
      visible_plans,
      selectedPartners,
      amount,
      firstNameErr,
      emailErr,
      passwordErr,
      mobileErr,
      roleErr,
      vendorErr,
      planErr,
      amountErr,
    } = this.state;
    let title = !userId ? "Add New User" : "Edit User";

    const mRole = roleObjMap?.[role];
    const roleName = mRole?.role_id;

    return (
      <BaseModal
        show={show}
        handleClose={this.onClickClose}
        title={title}
        footerComponent={this.renderFooter}
      >
        <form>
          <div className="row">
            <div className="col-xl-6 col-6 col-md-6">
              <TextInput
                labelClassName={"text-capitalize"}
                labelText={"first name"}
                value={firstName}
                onChange={this.handelChange("firstName")}
                errorText={firstNameErr}
                isRequired={true}
              />
            </div>
            <div className="col-xl-6 col-6 col-md-6">
              <TextInput
                labelClassName={"text-capitalize"}
                labelText={"last name"}
                value={lastName}
                onChange={this.handelChange("lastName")}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-xl-6 col-6 col-md-6">
              <TextInput
                labelClassName={"text-capitalize"}
                labelText={"email Id"}
                value={email}
                onChange={this.handelChange("email")}
                errorText={emailErr}
                disabled={userId}
                isRequired={true}
              />
            </div>

            <div className="col-xl-6 col-6 col-md-6">
              <TextInput
                labelClassName={"text-capitalize"}
                labelText={"phone number"}
                value={mobile}
                onChange={this.handelChange("mobile")}
                errorText={mobileErr}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-xl-6 col-6 col-md-6">
              <TextInput
                labelClassName={"text-capitalize"}
                labelText={"password"}
                value={password}
                onChange={this.handelChange("password")}
                errorText={passwordErr}
                isPasswordText={true}
                disabled={userId}
                isRequired={true}
              />
            </div>
            <div className="col-xl-6 col-6 col-md-6">
              <div className="form-group">
                <label className="text-capitalize">
                  Role <span style={{ color: "red" }}>*</span>
                </label>
                <div>
                  <select
                    className={`form-control ${!!roleErr && "is-invalid"}`}
                    value={role}
                    onChange={this.handelChange("role")}
                  >
                    <option value={""}>Select role</option>
                    {typeof roleObjMap === "object" &&
                      Object.keys(roleObjMap).map((id, index) => {
                        let role = id && roleObjMap[id];

                        return (
                          role &&
                          role?.active && (
                            <option key={index} value={id}>
                              {role?.name}
                            </option>
                          )
                        );
                      })}
                  </select>
                </div>

                {!!roleErr && <div className="invalid-feedback">{roleErr}</div>}
              </div>
            </div>

            <div className="col-xl-6 col-6 col-md-6">
              <label className="text-capitalize">Department</label>
              <div>
                <select
                  className="form-control mb-3"
                  value={department}
                  onChange={this.handelChange("department")}
                >
                  <option value={""}>Select department</option>
                  {Array.isArray(departmentOrder) &&
                    departmentOrder.map((id, index) => {
                      let department = id && departmentObjMap[id];
                      let name = department?.name;
                      let isActive = department?.attributes?.active;

                      return (
                        isActive && (
                          <option key={index} value={id}>
                            {name}
                          </option>
                        )
                      );
                    })}
                </select>
              </div>
            </div>

            {mRole && roleName !== "vendor" && (
              <div className="col-xl-6 col-6 col-md-6">
                <label className="text-capitalize">
                  Plan <span style={{ color: "red" }}>*</span>
                </label>
                <div>
                  <select
                    className={`form-control ${!!planErr && "is-invalid"}`}
                    value={plan}
                    onChange={this.handelChange("plan")}
                  >
                    <option value={""}>Select plan</option>
                    {Array.isArray(planOrder) &&
                      planOrder.map((id, index) => {
                        let plan = id && planObjMap[id];
                        let name = plan?.planName;
                        let isActive = plan?.attributes?.active;
                        return (
                          isActive && (
                            <option key={index} value={id}>
                              {name}
                            </option>
                          )
                        );
                      })}
                  </select>
                  {!!planErr && (
                    <div className="invalid-feedback">{planErr}</div>
                  )}
                </div>
              </div>
            )}

            {roleName === "vendor" && (
              <div className="col-xl-6 col-6 col-md-6">
                <label className="text-capitalize">
                  Vendor <span style={{ color: "red" }}>*</span>
                </label>
                <div>
                  <select
                    className={`form-control ${!!vendorErr && "is-invalid"}`}
                    value={vendor}
                    onChange={this.handelChange("vendor")}
                  >
                    <option value={""}>Select vendor</option>
                    {logistics &&
                      logistics.map((cp, index) => (
                        <option key={index} value={cp?.value}>
                          {cp?.label}
                        </option>
                      ))}
                  </select>
                  {!!vendorErr && (
                    <div className="invalid-feedback">{vendorErr}</div>
                  )}
                </div>
              </div>
            )}

            <div className="col-xl-6 col-6 col-md-6">
              <TextInput
                labelClassName={"text-capitalize"}
                labelText={"Add Amount"}
                value={amount}
                onChange={this.handelChange("amount")}
                errorText={amountErr}
              />
            </div>

            {roleName !== "vendor" && (
              <div className="col-xl-6 col-6 col-md-6">
                <label className="text-capitalize">Delivery partners</label>
                <div>
                  <Select
                    options={logistics}
                    value={selectedPartners}
                    onChange={this.handelChange("selectedPartners")}
                    isMulti
                  />
                </div>
              </div>
            )}

            {mRole?.permissions?.showAllOrders && (
              <div className="col-xl-6 col-6 col-md-6">
                <label className="text-capitalize">Visible Plans</label>

                <div>
                  <Select
                    options={planOptions}
                    value={visible_plans}
                    placeholder="All Plans"
                    onChange={this.handelChange("visible_plans")}
                    isMulti
                  />
                </div>
              </div>
            )}
          </div>
        </form>
      </BaseModal>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let { userId } = ownProps;
  let usersObjMap = state?.users?.users;
  let logistics = state.logistics?.data || [];
  logistics = logistics.map((logistic) => ({
    value: logistic?._id,
    label: logistic?.name,
  }));

  const planOrder = state?.plan?.planOrder;
  const planMap = state?.plan?.plans;
  const planOptions = planOrder?.map((planId) => ({
    value: planId,
    label: planMap?.[planId]?.planName,
  }));

  return {
    user: userId && usersObjMap && usersObjMap[userId],
    departmentObjMap: state?.department?.departments,
    departmentOrder: state?.department?.departmentOrder,
    planObjMap: state?.plan?.plans,
    planOrder: state?.plan?.planOrder,
    planOptions: planOptions,
    roleObjMap: state?.role?.roles,
    // roleOrder: state?.role?.roleOrder,
    loading: state?.users?.loading,
    error: state?.users?.error,
    logistics: logistics,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    createUser: (params) => dispatch(createUserRequest(params)),
    updateUser: (params) => dispatch(updateUserRequest(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserModal);
