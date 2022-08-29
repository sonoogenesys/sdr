import React, { Component } from "react";
import BaseModal from "../../Utils/BaseModal";
import { connect } from "react-redux";
import {
    createPlanRequest,
    updatePlanRequest,
} from "../Duck/PlanActions";
import TextInput from "../../Utils/TextInput";

class PlanModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            planName: "",
            active: false,
            nameErr: "",
            isLoading: false,
        };
    }
 
    componentDidMount() {
        let { plan } = this.props;

        if (!!plan) {
            this.setState({
                planName: plan?.planName,
                active: plan?.attributes?.active,
            });
        }
    }

    componentDidUpdate(preProps) {
        let { plan } = this.props;

        if (!!plan && preProps?.plan?.id !== plan?.id) {
            
            this.setState({
                planName: plan?.planName,
                active: plan?.attributes?.active,
            });
        }

        if (!this.props.loading && preProps.loading && this.state.isLoading) {
            this.onClickClose();
        }

    }


    onClickClose = () => {
        let { handelModal } = this.props;
        this.setState({
            planName: "",
            nameErr: "",
            active: false,
            isLoading: false,
        });

        typeof handelModal === "function" && handelModal();
    };

    hasError = () => {

        let { planName } = this.state;

        if (planName?.trim()?.length <= 0) {
            this.setState({
                nameErr: "Please enter plan name",
            });

            return true;
        }

        return false;
    };

    onClickSave = () => {
        let { planId, createPlan, updatePlan } = this.props;
        let { planName, active } = this.state;

        planName = planName.trim();
        active = !!active;

        let planOjb = {
            planName :planName,
            active : active,
        };
       
        if (!this.hasError()) {
            this.setState({
                isLoading: true,
            });

            if (!planId) {
                typeof createPlan === "function" &&
                    createPlan(planOjb);
            } else {
                planOjb.id = planId;
                typeof updatePlan === "function" &&
                    updatePlan(planOjb);
            }
        }
    };

    handelChange = (name, isCheckBox = false) => (event) => {
        this.setState({
            [name]: isCheckBox ? event.target.checked : event.target.value,
            nameErr: "",
        });
        console.log(this.state.planName,"8888")
    };

    renderFooter = () => {
        let { planId } = this.props;
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
                    ) : !planId ? (
                        "Add Plan"
                    ) : (
                        "Save changes"
                    )}
                    
                    </button>
            </>
        );
    };

    render() {
        let { show, planId } = this.props;
        let { planName, active, nameErr } = this.state;
        let title = !!planId ? "Edit Plan" : "Add Plan";
       
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
                            labelText={"Plan Name"}
                            placeholder={"Plan Name"}
                            value={planName}
                            onChange={this.handelChange("planName")}
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
    let { planId } = ownProps;
    return {
        plan: planId && state?.plan?.plans && state?.plan?.plans[planId],
        loading: state?.plan?.loading,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        createPlan: (params) => dispatch(createPlanRequest(params)),
        updatePlan: (params) => dispatch(updatePlanRequest(params)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlanModal);
