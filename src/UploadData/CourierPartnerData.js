import React, { Component } from "react";
import axios from "axios";
import BaseModel from "../Utils/BaseModal";
import appUrl from "../Constants/AppUrl";
import BreadCrumb from "../Utils/BreadCrumb";
import { Alert } from "react-bootstrap";
import fileDownload from "js-file-download";
import moment from "moment";
import { showNotification } from "../Utils/CommonFunctions";
import { connect } from "react-redux";
import { fetchLogistics, fetchLogisticsPlan } from "./Duck/UploadDataActions";
import { getLoggedInUser } from "../Profile/Duck/ProfileActions";

class CourierPartnerData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courierPartner: [],
      file: null,
      isUploading: false,
      isShowModel: true,
      resMeta: null,
      selectedCourierPartner: "",
      plan: "",
    };

    // this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    let { getAllLogisticPlan } = this.props;

    getAllLogisticPlan && getAllLogisticPlan();
  }

  fileUplaodEvent = (e) => {
    let file = e?.target?.files[0];
    if (file) {
      let extension = file.name?.split(".")?.[file.name.split(".").length - 1];
      if (extension === "xls" || extension === "xlsx") {
        this.setState({ file: e?.target?.files[0] });
      } else {
        showNotification("error", "Upload xls or xlsx format file only!");
      }
    }
  };

  uploadFile = (e) => {
    const { getAllLogistic, getAllLogisticPlan, loggedInUser, getUser } =
      this.props;
    const { file, selectedCourierPartner, plan } = this.state;

    const showAllOrders = loggedInUser?.role?._id?.permissions?.showAllOrders;
    const user_type = loggedInUser?.user_type;
    const logistic_id = user_type?._id || selectedCourierPartner;
    const plan_id = plan;

    if (file && logistic_id && plan_id) {
      this.setState({
        isUploading: true,
      });

      let formData = new FormData();
      formData.set("logistic_id", logistic_id);
      formData.set("model_id", logistic_id);
      formData.set("onModel", "Code");
      formData.set("files", file);
      formData.set("plan", plan_id);

      axios
        .post(`${appUrl.LOGISTICS_URL}/upload_logistic_file`, formData)
        .then((res) => {
          const response = res?.data;
          const resMeta = response?.meta || response;

          this.setState({
            resMeta: resMeta,
            isShowModel: true,
            isUploading: false,
            file: null,
          });

          if (typeof resMeta?.message === "string") {
            showNotification(
              resMeta?.success ? "success" : "error",
              resMeta?.message
            );
          }

          if (showAllOrders) {
            getAllLogistic && getAllLogistic();
            getAllLogisticPlan && getAllLogisticPlan();
          } else {
            getUser && getUser(loggedInUser?._id);
          }
        })
        .catch((err) => {
          this.setState({
            isUploading: false,
          });

          console.log("upload file ", err);
        });
    } else {
      if (showAllOrders) {
        showNotification(
          "warning",
          "Please choose a file, courier partner and plan !"
        );
      } else {
        if (!file) {
          showNotification("error", "Please choose a file");
        } else if (!logistic_id) {
          showNotification("error", "Please Select Courier Partner");
        } else if (!plan_id) {
          showNotification("error", "Please Select Plan");
        }
      }
    }
  };

  onDownloadAttachment = (attachment) => {
    let id = attachment?._id;
    let filename = attachment?.filename;

    axios({
      method: "GET",
      url: `${appUrl.ATTACHMENTS_DOWNLOAD}/${id}`,
      contentType: "application/doc; charset=utf-8",
      responseType: "arraybuffer",
    })
      .then((res) => {
        fileDownload(res.data, filename);
      })
      .catch((err) => {
        console.error("There is some error while uploading a file!", err);
        showNotification(
          "error",
          "There is some error while downloading a file!"
        );
      });
  };

  handleClose = () => {
    this.setState({
      resMeta: null,
      isShowModel: false,
    });
  };

  handleChange = (name) => (e) => {
    this.setState({
      [name]: e?.target?.value,
    });
  };

  render() {
    const {
      file,
      isShowModel,
      resMeta,
      courierPartner,
      isUploading,
      selectedCourierPartner,
      plan,
    } = this.state;
    const { logistics, loggedInUser, planObjMap, planOrder, attachment } =
      this.props;

    // const role = loggedInUser?.role?._id?.name?.toLowerCase();
    const user_type = loggedInUser?.user_type;
    const plansAttachment = attachment[selectedCourierPartner];

    const permissions = loggedInUser?.role?._id?.permissions || {};
    const { upload_data = {} } = permissions;

    let planFile;

    if (plansAttachment !== undefined) {
      planFile = plansAttachment[plan];
    }

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-12">
            <div className="page-title-box d-flex align-items-center justify-content-between">
              <div className="page-header">
                <div>
                  <h2 className="main-content-title tx-24 mg-b-5">
                    Courier Partner Data
                  </h2>
                  <BreadCrumb title={["Upload Data", "Courier Partner Data"]} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <h4 className="card-title mb-0 d-flex justify-content-between">
                Upload Here
                <a href={"/CourierPartnerSample.xlsx"}>
                  <span className={"btn-link"} style={{ fontSize: 14 }}>
                    Sample File
                    <i className="fa fa-download ml-2" aria-hidden="true" />
                  </span>
                </a>
              </h4>
              <div className="card-body">
                <form className="needs-validation" noValidate>
                  {
                    <div className="row">
                      {!user_type && (
                        <div className="col-md-4 col-sm-4 col-12 mb-2">
                          <select
                            className="form-control"
                            onChange={this.handleChange(
                              "selectedCourierPartner"
                            )}
                            value={this.state.selectedCourierPartner}
                          >
                            <option value={""}>Select Courier Partner</option>
                            {logistics &&
                              logistics.map((cp, index) => (
                                <option key={index} value={cp?._id}>
                                  {cp?.name}
                                </option>
                              ))}
                          </select>
                        </div>
                      )}

                      <div className="col-md-3 col-sm-3 col-12">
                        <select
                          className="form-control"
                          value={this.state.plan}
                          onChange={this.handleChange("plan")}
                        >
                          <option value={""}>Select Plan</option>
                          {planOrder.map((id, index) => {
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
                      </div>
                    </div>
                  }
                  <div className="row">
                    <div className="col-md-4">
                      <div className="upload_img position-relative">
                        <div className="file_upload">
                          <input
                            type="file"
                            className="fileupload"
                            name="fileupload"
                            accept=".xls, .xlsx"
                            // multiple
                            onChange={this.fileUplaodEvent}
                          />
                        </div>
                        <div className="upload_banner">
                          <span>
                            <i className="fa fa-upload" aria-hidden="true"></i>
                          </span>
                          <p>Choose file</p>
                        </div>
                        {file && (
                          <div className="mt-3">
                            <span>
                              <i
                                className="fa fa-file-excel"
                                style={{ fontSize: 18 }}
                                aria-hidden="true"
                              ></i>
                              <span style={{ fontSize: 16, marginLeft: 8 }}>
                                {file.name}
                              </span>
                            </span>
                          </div>
                        )}
                      </div>
                      <div></div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-xl-12 text-right my-55">
            <div className="button-items">
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.uploadFile}
                disabled={isUploading}
              >
                {isUploading ? (
                  <>
                    <span className="spinner-border spinner-border-sm"></span>
                    <span className="visually-hidden"> Uploading...</span>
                  </>
                ) : (
                  "Upload"
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            {plan && selectedCourierPartner && planFile && (
              <Alert
                variant={"info"}
                className={`d-flex justify-content-between flex-wrap`}
                onClick={() => this.onDownloadAttachment(planFile)}
                style={{ cursor: "pointer" }}
              >
                <span data-title="name" className="mr-2">
                  {" "}
                  {planFile?.filename}
                </span>
                <span
                  data-title={
                    upload_data?.courier_partner?.download
                      ? "Click to download the file"
                      : undefined
                  }
                  style={{ textDecoration: "underline" }}
                >
                  Last upload {moment(planFile?.timestamp).format("lll")}
                </span>
              </Alert>
            )}

            {user_type?.attachments && (
              <Alert
                variant={"info"}
                className={`d-flex justify-content-between ${
                  upload_data?.courier_partner?.download && "pointer"
                }`}
                onClick={
                  upload_data?.courier_partner?.download
                    ? () => this.onDownloadAttachment(user_type?.attachments)
                    : undefined
                }
              >
                <span
                  data-title={
                    upload_data?.courier_partner?.download
                      ? "Click to download the file"
                      : undefined
                  }
                >
                  {user_type?.attachments?.filename}
                </span>
                <span
                  data-title={
                    upload_data?.courier_partner?.download
                      ? "Click to download the file"
                      : undefined
                  }
                  style={{ textDecoration: "underline" }}
                >
                  Last upload{" "}
                  {moment(user_type?.attachments?.timestamp).format("lll")}
                </span>
              </Alert>
            )}
          </div>
        </div>
        <BaseModel
          show={isShowModel && !!resMeta}
          title={resMeta?.success ? "Upload Successfully" : "Upload Failed"}
          handleClose={this.handleClose}
        >
          <p>
            {resMeta?.success
              ? "File has been successfully added to the database."
              : "Failed to upload the file"}
          </p>
        </BaseModel>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const loggedInUser = state.loggedInUser?.data?.data;
  const mVisiblePlans = loggedInUser?.visible_plans;

  let planOrder = state?.plan?.planOrder;
  if (Array.isArray(planOrder) && mVisiblePlans?.length > 0) {
    planOrder = mVisiblePlans;
  }

  return {
    loggedInUser: loggedInUser,
    logistics: state?.logistics?.data,
    planObjMap: state?.plan?.plans,
    planOrder: planOrder,
    attachment: state?.logistics?.attachments,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (id) => dispatch(getLoggedInUser(id)),
    getAllLogistic: (params) => dispatch(fetchLogistics(params)),
    getAllLogisticPlan: (params) => dispatch(fetchLogisticsPlan(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CourierPartnerData);
