import React, { Component } from "react";
import TableContainer from "../Utils/TableContainer";
import BreadCrumb from "../Utils/BreadCrumb";
import { connect } from "react-redux";
import { fetchAllRoleRequest } from "./Duck/RoleActions";
import RoleItem from "./Components/RoleItem";
import ToggleRoleModal from "./Components/ToggleRoleModal";
class RoleContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            searchText: "",
            showRoleToggleModal: false,
            roleId: null,
        }
    }

    componentDidMount() {
        this.loadMore();
    }

    loadMore = (offset = 0, limit = 100) => {
        let { searchText } = this.state;
        let { fetchAllRole, list, meta, location } = this.props;
        searchText = searchText.trim();

        if (offset === 0 || meta?.total_count > list?.length) {
            let params = {
                pathname: location?.pathname,
                offset: offset,
                limit: limit,
            };

            if (searchText) params.text = searchText;

            fetchAllRole && fetchAllRole(params);
        }
    }

    onAddRole = () => {
        let { history } = this.props;
        history.push("/app/create-role/");
    }

    handleToggleRoleModal = (show = false, roleId) => {
        show = typeof show === "boolean" && roleId && show ;
        this.setState({
            showRoleToggleModal: show,
            roleId: roleId,
        });
    }

    render() {
        let { list, meta, loading } = this.props;
        let { showRoleToggleModal, roleId } = this.state;

        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box d-flex align-items-center justify-content-between">
                            <div className="page-header">
                                <div>
                                    <h2 className="main-content-title tx-24 mg-b-5">
                                        Role Management
                                    </h2>

                                    <BreadCrumb
                                        title={[
                                            "Role",
                                            "Role Management",
                                        ]}
                                    />
                                </div>
                            </div>
                            <div className="page-title-right">
                                <button
                                    type="button"
                                    className="btn btn-primary my-2 btn-icon-text"
                                    data-toggle="modal"
                                    data-target="#addUserModal"
                                    onClick={this.onAddRole}
                                >
                                    <i className="fe fe-plus mr-2" /> Add Role
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <TableContainer
                    headings={[
                        "No.",
                        { text: "Name", style: {} },
                        "State",
                        "Action",
                    ]}
                    showSearch={false}
                    rowData={list}
                    totalEntries={meta?.totalCount || meta?.total_count}
                    renderRow={(item, index) => (
                        <RoleItem
                            id={item}
                            index={index}
                            history={this.props.history}
                            toggleRole={this.handleToggleRoleModal}
                        />
                    )}
                    loadMore={this.loadMore}
                    loading={loading}
                />

                <ToggleRoleModal
                    show={showRoleToggleModal}
                    handleModal={this.handleToggleRoleModal}
                    id={roleId}
                />

            </React.Fragment>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    let { location } = ownProps;
    let pathname = location?.pathname;

    let filter = state.users?.filters[pathname];

    let boards = state.role?.boards;

    let mBoard = boards[JSON.stringify(filter || {})];
    let list = mBoard?.list;
    let meta = mBoard?.meta;
    let loading = mBoard?.loading;

    return {
        filter: filter,
        list: list,
        meta: meta,
        loading: loading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllRole: (params) => dispatch(fetchAllRoleRequest(params)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoleContainer);