import React, { Component } from "react";
import { connect } from "react-redux";
import TableContainer from "../Utils/TableContainer";
import UserModal from "./Components/UserModal";
import { fetchAllUsersRequest, deleteUserRequest } from "./Duck/UsersActions";
import { fetchAllRoleRequest, fetchRoleRequest } from "../Role/Duck/RoleActions";
import { fetchDepartmentRequest } from "../Department/Duck/DepartmentActions";
import { fetchPlanRequest } from "../plan/Duck/PlanActions";
import StatusToggleModal from "./Components/StatusToggleModal";
import Tippy from '@tippyjs/react';
import moment from "moment";
class UsersContainer extends Component {
    constructor(props) {
        super(props);

        this.userModalId = "userModalId";
        this.state = {
            userId: undefined,
            showUserModal: false,
            showToggleUserStatusModal: false,
            searchText: "",
        };
    }

    componentDidMount() {
        let { fetchAllRole, fetchDepartments,fetchPlans, fetchAllUsers } = this.props;
        typeof fetchAllRole === "function" && fetchAllRole();
        typeof fetchDepartments === "function" && fetchDepartments();
        typeof fetchPlans === "function" && fetchPlans();
        // typeof fetchAllUsers === "function" && fetchAllUsers();
        this.loadMoreUser(0);
    }

    componentDidUpdate(preProps) {
        let { userOrder } = this.props;

        if (preProps.userOrder?.length !== userOrder?.length) {
            this.loadMoreUser(userOrder?.length);
        }
    }

    loadMoreUser = (offset = 0, limit = 100) => {
        let { userOrder, userMeta, fetchAllUsers  } = this.props;

        if (offset === 0 || userMeta?.totalCount > userOrder?.length) {
            let params = {
                offset: offset,
                limit: limit,
            }

            typeof fetchAllUsers === "function" && fetchAllUsers(params);
        }
    }

    handelUserModal = (show = false, userId) => {
        this.setState({
            showUserModal: show,
            userId: userId,
        });

    };

    onDeleteUser = (id) => {
        let { deleteUser } = this.props;
        typeof deleteUser === "function" && deleteUser(id);
    };

    handleToggleStatusModal = (show = false, userId) => {
        this.setState({
            showToggleUserStatusModal: show,
            userId: userId,
        });
    }

    onShowUserWallet = (userId) => {
        let { history } = this.props;
        history?.push(`/app/walletdetails/${userId}`);
    }

    renderTableRow = (userId, index) => {
        let { usersObjMap, roleObjMap, departments } = this.props;

        let user = userId && usersObjMap && usersObjMap[userId];

        return (
            user && (
                <tr key={`${userId}_${index}`}>
                    <td style={{textAlign:'center'}}>{index+1}</td>
                    <td>{user?.first_name} {user?.last_name}</td>
                    <td>{user?.email}</td>
                    <td>{user?.role?._id?.name || (roleObjMap && roleObjMap[user?.role?._id]?.name)}</td>
                    <td>{user?.department?.name ? user.department.name : (user?.department && departments[user?.department]) ? departments[user?.department]?.name : ''}</td>
                    <td>{user?.mobile_number}</td>
                    <td>{user?.created_at ? moment(user.created_at).format("D MMM YYYY, h:mm a") : "-"}</td>
                    <td className={user?.active ? "greenColor" : "redColor"}>
                        {user?.active ? "Active" : "Inactive"}
                    </td>
                    <td style={{textAlign:'center'}}>
                        <span
                            onClick={() =>
                                this.handelUserModal(
                                    true,
                                    user?._id || user?.id
                                )
                            }
                        >
                           <Tippy content="Edit">
                                <i className="bx bxs-pencil"></i>
                            </Tippy>
                        </span>
                        <span
                            className='ml-2'
                            onClick={() => this.handleToggleStatusModal(true, user?._id || user?.id)}
                        ><Tippy content={(user?.active) ? 'Click to deactivate' : 'Click to activate'}>
                            {
                                user?.active
                                ? <i className="fas fa-user greenColor"></i>
                                : <i className="fas fa-user-slash"></i>
                            }
                            </Tippy>
                        </span>
                        <span
                            className='ml-2'
                            onClick={() => this.onShowUserWallet(user?._id || user?.id)}
                        >
                           <Tippy content="Wallet">
                                <i className="fas fa-wallet"></i>
                            </Tippy>
                        </span>
                    </td>
                </tr>
            )
        );
    };

    onSearch = (text = "") => {
        // let { fetchAllUsers } = this.props;
        // typeof fetchAllUsers === "function" && fetchAllUsers({ text });
        this.setState({
            searchText: text.trim(),
        });
    };

    getFilterUserOrder = () => {
        let { searchText } = this.state;
        let { userOrder, usersObjMap, departments } = this.props;

        if (searchText) {
            userOrder = userOrder?.filter((id) => {
                let user = usersObjMap[id]

                let name = `${user?.first_name} ${user?.last_name || ""}`.toLowerCase();
                let email = user?.email?.toLowerCase();
                let mobile_number = user?.mobile_number?.toLowerCase();

                let department = user?.department && departments && departments[user?.department];
                let departmentName = department?.name?.toLowerCase();

                return (
                    name?.includes(searchText.toLowerCase()) ||
                    email?.includes(searchText.toLowerCase()) ||
                    mobile_number?.includes(searchText.toLowerCase()) ||
                    departmentName?.includes(searchText.toLowerCase())
                );
            });
        }

        return userOrder || [];
    }

    render() {
        let { userMeta } = this.props;
        let { showUserModal, showToggleUserStatusModal, userId, searchText } = this.state;

        let userOrder = this.getFilterUserOrder();
        let totalCount = searchText ? userOrder?.length : userMeta?.totalCount

        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box d-flex align-items-center justify-content-between">
                            <div className="page-header">
                                <div>
                                    <h2 className="main-content-title tx-24 mg-b-5">
                                        User Management
                                    </h2>
                                    <ol className="breadcrumb">
                                        <li
                                            className="breadcrumb-item active"
                                            aria-current="page"
                                        >
                                            User Management
                                        </li>
                                        <li className="breadcrumb-item">
                                            <a href="#">User Management</a>
                                        </li>
                                    </ol>
                                </div>
                            </div>
                            <div className="page-title-right">
                                <button
                                    type="button"
                                    className="btn btn-primary my-2 btn-icon-text"
                                    onClick={() => this.handelUserModal(true)}
                                >
                                    <i className="fe fe-plus mr-2"></i> Add User
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <TableContainer
                    title={"User Management"}
                    headings={[
                        "No.",
                        "Name",
                        "Email",
                        "Role",
                        "Department",
                        "Phone number",
                        "Created at",
                        "Status",
                        "Action",
                    ]}
                    rowData={userOrder || []}
                    renderRow={this.renderTableRow}
                    filter={{ searchText: searchText }}
                    totalEntries={totalCount}
                    onSearch={this.onSearch}
                    searchPlaceholder={'Search by name or email'}
                    // loadMore={() => this.loadMoreUser(userOrder?.length)}
                />

                <UserModal
                    show={showUserModal}
                    handelModal={this.handelUserModal}
                    userId={userId}
                />

                <StatusToggleModal
                    show={showToggleUserStatusModal}
                    handleModal={this.handleToggleStatusModal}
                    userId={userId}
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {

    return {
        usersObjMap: state?.users?.users,
        userOrder: state?.users?.userOrder,
        userMeta: state?.users?.meta,
        roleObjMap: state?.role?.roles,
        departments: state?.department?.departments,
        plans: state?.plan?.plans
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllUsers: (params) => dispatch(fetchAllUsersRequest(params)),
        deleteUser: (id) => dispatch(deleteUserRequest(id)),
        fetchDepartments: (params) => dispatch(fetchDepartmentRequest(params)),
        fetchPlans: (params) => dispatch(fetchPlanRequest(params)),
        fetchAllRole: (params) => dispatch(fetchAllRoleRequest(params)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
