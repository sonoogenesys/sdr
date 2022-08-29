import React, { Component } from "react";
import BaseModal from "../../Utils/BaseModal";
import { connect } from "react-redux";
import {
    createDepartmentRequest,
    updateDepartmentRequest,
} from "../Duck/DepartmentActions";
import TextInput from "../../Utils/TextInput";

class DepartmentModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            active: false,
            nameErr: "",
            isLoading: false,
        };
    }

    componentDidMount() {
        let { department } = this.props;
        if (!!department) {
            this.setState({
                name: department?.name,
                active: department?.attributes?.active,
            });
        }
    }

    componentDidUpdate(preProps) {
        let { department } = this.props;

        if (!!department && preProps?.department?.id !== department?.id) {
            this.setState({
                name: department?.name,
                active: department?.attributes?.active,
            });
        }
        if (!this.props.loading && preProps.loading && this.state.isLoading) {
            this.onClickClose();
        }
    }

    onClickClose = () => {
        let { handelModal } = this.props;
        this.setState({
            name: "",
            nameErr: "",
            active: false,
            isLoading: false,
        });

        typeof handelModal === "function" && handelModal();
    };

    hasError = () => {
        let { name } = this.state;
        if (name?.trim()?.length <= 0) {
            this.setState({
                nameErr: "Please enter department name",
            });

            return true;
        }

        return false;
    };

    onClickSave = () => {
        let { departmentId, createDepartment, updateDepartment } = this.props;
        let { name, active } = this.state;

        name = name.trim();
        active = !!active;

        let departmentObj = {
            name: name,
            active: active,
        };

        if (!this.hasError()) {
            this.setState({
                isLoading: true,
            });

            if (!departmentId) {
                typeof createDepartment === "function" &&
                    createDepartment(departmentObj);
            } else {
                departmentObj.id = departmentId;
                typeof updateDepartment === "function" &&
                    updateDepartment(departmentObj);

            }
        }
    };

    handelChange = (name, isCheckBox = false) => (event) => {
        this.setState({
            [name]: isCheckBox ? event.target.checked : event.target.value,
            nameErr: "",
        });
    };

    renderFooter = () => {
        let { departmentId } = this.props;
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
                    ) : !departmentId ? (
                        "Add Department"
                    ) : (
                        "Save changes"
                    )}
                </button>
            </>
        );
    };

    render() {
        let { show, departmentId } = this.props;
        let { name, active, nameErr } = this.state;
        let title = !!departmentId ? "Edit Department" : "Add Department";

        return (
            <BaseModal
                show={show}
                handleClose={this.onClickClose}
                title={title}
                footerComponent={this.renderFooter}
            >
                <div className="row">
                    <div className="col-xl-12">
                        <TextInput
                            containerClassName={"form-group text-left"}
                            labelClassName={"text-capitalize"}
                            labelText={"Department"}
                            placeholder={"Department"}
                            value={name}
                            onChange={this.handelChange("name")}
                            errorText={nameErr}
                            isRequired={true}
                        />
                    </div>
                    <div className="col-xl-12">
                        <div className="form-check">
                            <label className="form-check-label">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    value=""
                                    checked={active}
                                    onChange={this.handelChange(
                                        "active",
                                        true
                                    )}
                                />
                                Status
                            </label>
                        </div>
                    </div>
                </div>
            </BaseModal>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    let { departmentId } = ownProps;


    return {
        department: departmentId && state?.department?.departments && state?.department?.departments[departmentId],
        loading: state?.department?.loading,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        createDepartment: (params) => dispatch(createDepartmentRequest(params)),
        updateDepartment: (params) => dispatch(updateDepartmentRequest(params)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentModal);
