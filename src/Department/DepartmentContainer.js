import React, { Component } from "react";
import { connect } from "react-redux";
import TableContainer from "../Utils/TableContainer";
import DepartmentModal from "./Components/DepartmentModal";
import {
    fetchDepartmentRequest,
    deleteDepartmentRequest,
} from "./Duck/DepartmentActions";
import BaseModal from '../Utils/BaseModal'
import { showNotification } from "../Utils/CommonFunctions";
import Tippy from '@tippyjs/react';
class DepartmentContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            departmentId: undefined,
            showDepartmentModal: false,
            searchText: "",
            showConfirmModal: false,
            activeDepId: null
        };
    }

    componentDidMount() {
        this.fetchDepartments();
    }

    componentDidUpdate(preProps) {
        let { departmentOrder } = this.props;

        if (preProps.departmentOrder?.length !== departmentOrder?.length) {
            this.loadMoreDepartments();
        }
    }

    fetchDepartments = (offset = 0, limit = 30) => {
        const { fetchDepartments } = this.props;
        if (typeof fetchDepartments === "function") {
            fetchDepartments({ offset, limit });
        }
    };

    loadMoreDepartments = () => {
        let { departmentOrder = [], departmentMeta } = this.props;
        let totalDepartments = departmentMeta?.totalCount;

        if (departmentOrder?.length < totalDepartments) {
            this.fetchDepartments(departmentOrder?.length, totalDepartments);
        }
    };

    handelDepartmentModal = (show = false, departmentId) => {
        this.setState({
            showDepartmentModal: show,
            departmentId: departmentId,
        });
    };

    onDeleteDepartment = (id) => {
        let { deleteDepartment, departments } = this.props;
        // let department = id && departments && departments[id];
        if(typeof deleteDepartment === "function") {
            deleteDepartment(id);
            this.handleConfirmModal()
            // showNotification('success', `${department?.name} department deleted successfully`)
        }
    }

    renderTableRows = (departmentId, index) => {
        let { departments } = this.props;
        let department =
            departmentId && departments && departments[departmentId];

        return (
            department && (
                <tr key={`${departmentId}_${index}`}>
                    <td style={{textAlign:'center',width:'70px'}}>{index+1}</td>
                    <td>{department?.name}</td>

                    <td
                        className={
                            department?.attributes?.active
                                ? "greenColor"
                                : "redColor"
                        }
                    >
                        {department?.attributes?.active ? "Active" : "Deactive"}
                    </td>

                    <td style={{textAlign:'center', width:'120px'}}>
                        <span
                            onClick={() =>
                                this.handelDepartmentModal(
                                    true,
                                    department?._id || department?.id
                                )
                            }
                        >
                            <Tippy content="Edit">
                                <i className="bx bxs-pencil"></i>
                            </Tippy>
                        </span>


                        <span
                            className='ml-2'
                            onClick={() => this.setActiveDepId(department?._id || department?.id)}
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

    setActiveDepId = (id) => {
        this.setState({activeDepId: id})
        this.handleConfirmModal()
    }

    handleConfirmModal = () => {
        let val = !this.state.showConfirmModal
        if(val){
            this.setState({showConfirmModal: val})
        }else{
            this.setState({showConfirmModal: val, activeDepId: null})
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
                        this.onDeleteDepartment(
                            this.state.activeDepId
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
        let { departments, departmentOrder, departmentMeta } = this.props;
        let { showDepartmentModal, departmentId, searchText, activeDepId } = this.state;
        let totalDepartments = departmentMeta?.totalCount;

        if (!!searchText) {
            departmentOrder = departmentOrder?.filter((id) => {
                let departmentName = departments[id]?.name?.toLowerCase();
                return id && departmentName?.includes(searchText.toLowerCase());
            });

            totalDepartments = departmentOrder?.length;
        }

        let department = null
        if(activeDepId){
            department = activeDepId && departments && departments[activeDepId];
        }

        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box d-flex align-items-center justify-content-between">
                            <div className="page-header">
                                <div>
                                    <h2 className="main-content-title tx-24 mg-b-5">
                                        Manage Department
                                    </h2>
                                    <ol className="breadcrumb">
                                        <li
                                            className="breadcrumb-item active"
                                            aria-current="page"
                                        >
                                            Department
                                        </li>
                                        <li className="breadcrumb-item">
                                            <a href="#">Manage Department</a>
                                        </li>
                                    </ol>
                                </div>
                            </div>
                            <div className="page-title-right">
                                <button
                                    type="button"
                                    className="btn btn-primary my-2 btn-icon-text"
                                    onClick={() =>
                                        this.handelDepartmentModal(true)
                                    }
                                >
                                    <i className="fe fe-plus mr-2"></i> Add
                                    Department
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <TableContainer
                    title={"Manage Department"}
                    headings={["No.", "Department", "Status", "Action"]}
                    totalEntries={totalDepartments}
                    rowData={departmentOrder || []}
                    renderRow={this.renderTableRows}
                    onSearch={this.onSearch}
                    filter={{ searchText: searchText }}
                />

                <DepartmentModal
                    show={showDepartmentModal}
                    handelModal={this.handelDepartmentModal}
                    departmentId={departmentId}
                />

                <BaseModal
                    show={this.state.showConfirmModal}
                    handleClose={this.handleConfirmModal}
                    title={'Confirm'}
                    footerComponent={this.renderFooter}
                >
                    Do you want to delete <b>{department?.name}</b> department ?
                </BaseModal>

            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        departments: state?.department?.departments,
        departmentOrder: state?.department?.departmentOrder,
        departmentMeta: state?.department?.meta,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchDepartments: (params) => dispatch(fetchDepartmentRequest(params)),
        deleteDepartment: (id) => dispatch(deleteDepartmentRequest(id)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DepartmentContainer);
