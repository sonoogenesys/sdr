import React, { Component } from "react";
import { connect } from "react-redux";
import TableContainer from "../Utils/TableContainer";
import PlanModal from "./Components/PlanModal";
import {
    fetchPlanRequest,
    deletePlanRequest,
} from "./Duck/PlanActions";
import BaseModal from '../Utils/BaseModal'
import { showNotification } from "../Utils/CommonFunctions";
import Tippy from '@tippyjs/react';
class PlanContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            planId: undefined,
            showPlanModal: false,
            searchText: "",
            showConfirmModal: false,
            activePlanId: null
        };
    }

    componentDidMount() {
        this.fetchPlans();
    }

    componentDidUpdate(preProps) {
        let { planOrder } = this.props;

        if (preProps.planOrder?.length !== planOrder?.length) {
            this.loadMorePlans();
        }
    }

    fetchPlans = (offset = 0, limit = 30) => {
        const { fetchPlans } = this.props;
        if (typeof fetchPlans === "function") {
            fetchPlans({ offset, limit });
        }
    };

    loadMorePlans = () => {
        let { planOrder = [], planMeta } = this.props;
        let totalPlans = planMeta?.totalCount;

        if (planOrder?.length < totalPlans) {
            this.fetchPlans(planOrder?.length, totalPlans);
        }
    };

    handelPlanModal = (show = false, planId) => {
        this.setState({
            showPlanModal: show,
            planId: planId,
        });
     
    };

    onDeletePlan = (id) => {
        let { deletePlan, plan} = this.props;
        // let department = id && departments && departments[id];


        if(typeof deletePlan === "function") {
            deletePlan(id);
            this.handleConfirmModal()
            // showNotification('success', `${department?.name} department deleted successfully`)
        }
    }

    
    renderTableRows = (planId, index) => {
        
        let { plans } = this.props;

        let plan =  plans[planId];


        return (
            
            plan && (
                <tr key={`${planId}_${index}`}>
                    <td style={{textAlign:'center',width:'70px'}}>{index+1}</td>
                    <td>{plan?.planName}</td>

                    <td
                        className={
                            plan?.attributes?.active
                                ? "greenColor"
                                : "redColor"
                        }
                    >
                        {plan?.attributes?.active ? "Active" : "Deactive"}
                    </td>

                    <td style={{textAlign:'center', width:'120px'}}>
                        <span
                            onClick={() =>
                                this.handelPlanModal(
                                    true,
                                    plan?._id || plan?.id
                                )
                            }
                        >
                             <Tippy content="Edit">
                                 <i className="bx bxs-pencil"></i>
                             </Tippy>
                        </span>

                        <span
                            className='ml-2'
                            onClick={() => this.setActivePlanId(plan?._id || plan?.id)}
                        >
                           <Tippy content="Delete">
                                <i className="dripicons dripicons-cross"></i>
                          </Tippy>
                        </span>
                    </td>
                </tr>
            )
        );
    };

    onSearch = (text) => {
        this.setState({
            searchText: text,
        });
    };

    setActivePlanId = (id) => {
        this.setState({activePlanId: id})
        this.handleConfirmModal()
    }

    handleConfirmModal = () => {
        let val = !this.state.showConfirmModal

        if(val){
            this.setState({showConfirmModal: val})
        }else{
            this.setState({showConfirmModal: val, activePlanId: null})
        }
    }

    renderFooter = () => {
        return (
            <>
                <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                    onClick={this.handleConfirmModal}
                >
                    Close
                </button>

                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() =>
                        this.onDeletePlan(
                            this.state.activePlanId
                        )
                    }
                    // disabled={state.isLoading}
                >
                    {
                        // // state.isLoading
                        // // ? (
                        // //     <>
                        // //         <span className="spinner-border spinner-border-sm"></span>
                        // //         <span className="visually-hidden"> Updating...</span>
                        // //     </>
                        // // )
                        // : "Yes"
                    }
                    Yes
                </button>
            </>
        );
    }

    render() {
        let { plans, planOrder, planMeta } = this.props;
        let { showPlanModal, planId, searchText, activePlanId } = this.state;
        let totalPlans = planMeta?.totalCount;
        if (!!searchText) {
            planOrder = planOrder?.filter((id) => {
                let planName = plans[id]?.planName?.toLowerCase();
                return id && planName?.includes(searchText.toLowerCase());
            });

            totalPlans = planOrder?.length;
        }

        let plan = null
        if(activePlanId){
            plan = activePlanId && plans && plans[activePlanId];
        }

        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box d-flex align-items-center justify-content-between">
                            <div className="page-header">
                                <div>
                                    <h2 className="main-content-title tx-24 mg-b-5">
                                        Manage Plan
                                    </h2>
                                    <ol className="breadcrumb">
                                        <li
                                            className="breadcrumb-item active"
                                            aria-current="page"
                                        >
                                            Plan
                                        </li>
                                        <li className="breadcrumb-item">
                                            <a href="#">Manage Plan</a>
                                        </li>
                                    </ol>
                                </div>
                            </div>
                            <div className="page-title-right">
                                <button
                                    type="button"
                                    className="btn btn-primary my-2 btn-icon-text"
                                    onClick={() =>
                                        this.handelPlanModal(true)
                                    }
                                >
                                    <i className="fe fe-plus mr-2"></i> Add
                                    Plan
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <TableContainer
                    title={"Manage Plan"}
                    headings={["No.", "Plan Name", "Status", "Action"]}
                    totalEntries={totalPlans}
                    rowData={planOrder || []}
                    renderRow={this.renderTableRows}
                    onSearch={this.onSearch}
                    filter={{ searchText: searchText }}
                   searchPlaceholder = "Search by plan name"
                />

                <PlanModal
                    show={showPlanModal}
                    handelModal={this.handelPlanModal}
                    planId={planId}
                />

                <BaseModal
                    show={this.state.showConfirmModal}
                    handleClose={this.handleConfirmModal}
                    title={'Confirm'}
                    footerComponent={this.renderFooter}
                >
                    Do you want to delete <b>{plan?.planName}</b> plan ?
                </BaseModal>

            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        plans: state?.plan?.plans,
        planOrder: state?.plan?.planOrder,
        planMeta: state?.plan?.meta,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchPlans: (params) => dispatch(fetchPlanRequest(params)),
        deletePlan: (id) => dispatch(deletePlanRequest(id)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlanContainer);
