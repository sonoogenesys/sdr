
import React, { Component } from 'react';
import Switch from "react-switch";
import BreadCrumb from "../Utils/BreadCrumb";
import { rolePermissions } from '../Config/RoleModulePermissions';
import SectionItem from './Components/SectionItem';
import { connect } from 'react-redux';
import { createRoleRequest, fetchRoleRequest, updateRoleRequest } from './Duck/RoleActions';
import TextInput from '../Utils/TextInput';

class EditRoleContainer extends Component {

    constructor(props) {
        super(props);
        let { role } = props;

        this.state = {
            name: role?.name || "",
            show: false,
            permissions: Object.assign({}, rolePermissions, role?.permissions),
            nameErr: "",
        };
    }

    componentDidMount() {
        let { roleId, role, fetchRole } = this.props;
        if (roleId && !role && fetchRole) {
            fetchRole(roleId);
        }

        this.setDefault();
    }

    componentDidUpdate(prevProps) {
        let { role, creating, history } = this.props;
        if (!prevProps.role?._id && role?._id) {
            this.setDefault();
        }

        if (prevProps.creating && !creating) {
            history.replace("/app/role");
        }
    }

    setDefault = () => {
        let { role } = this.props;
        let show = true;
        let permissions = Object.assign({}, rolePermissions, role?.permissions);

        Object.keys(permissions)
        .map(sKey => {
            let section = permissions[sKey];
            if (
                typeof section === "boolean" &&
                section === "show" ||
                section === "download"
            ) {
                show = show && section;
            } else if (typeof section === "object") {
                Object.keys(section)
                .map(ssKey => {
                    if (
                        typeof section[ssKey] === "boolean" &&
                        ssKey === "show" ||
                        ssKey === "download"
                    ) {
                        show = show && section[ssKey];
                    } else if (typeof section[ssKey] === "object") {
                        Object.keys(section[ssKey])
                        .map(k => {
                            if (
                                typeof (section[ssKey])[k] === "boolean" &&
                                k === "show" ||
                                k === "download"
                            ) {
                                show = show && (section[ssKey])[k];
                            }
                        });
                    }
                });
            }
        });

        this.setState({
            name: role?.name || "",
            show: show,
            permissions: permissions,
        });
    }

    handleChange = (name) => (event) => {
        let value = event.target.value;

        this.setState({
            [name]: value,
        });
    }

    handleSectionChange = (name) => (value) => {
        let { role, creating } = this.props;
        let { permissions } = this.state;
        let show = true;

        if (!role?.updating && !creating) {
            permissions = {...permissions, [name]: value};

            Object.keys(permissions)
            .map(sKey => {
                let section = permissions[sKey];
                if (
                    typeof section === "boolean" &&
                    section === "show" ||
                    section === "download"
                ) {
                    show = show && section;
                } else if (typeof section === "object") {
                    Object.keys(section)
                    .map(ssKey => {
                        if (
                            typeof section[ssKey] === "boolean" &&
                            ssKey === "show" ||
                            ssKey === "download"
                        ) {
                            show = show && section[ssKey];
                        } else if (typeof section[ssKey] === "object") {
                            Object.keys(section[ssKey])
                            .map(k => {
                                if (
                                    typeof (section[ssKey])[k] === "boolean" &&
                                    k === "show" ||
                                    k === "download"
                                ) {
                                    show = show && (section[ssKey])[k];
                                }
                            });
                        }
                    });
                }
            });

            this.setState({
                show: show,
                permissions: permissions,
            });
        }
    }

    handleAllSectionChange = (value) => {
        let { role, creating } = this.props;
        let { permissions } = this.state;

        if (!role?.updating && !creating) {
            Object.keys(permissions)
            .map(sKey => {
                let section = permissions[sKey];

                if (typeof section === "boolean") {
                    // permissions[sKey] = value;
                } else if (typeof section === "object") {
                    Object.keys(section)
                    .map(ssKey => {
                        if (typeof section[ssKey] === "boolean") {
                            section[ssKey] = value;
                        } else if (typeof section[ssKey] === "object") {
                            Object.keys(section[ssKey])
                            .map(k => {
                                if (typeof (section[ssKey])[k] === "boolean") {
                                    (section[ssKey])[k] = value;
                                }
                            });
                        }
                    });
                }
            });

            this.setState({
                show: value,
                permissions: permissions,
            });
        }
    }

    hasError = () => {
        let {
            name,
            permissions,
        } = this.state;
        let nameErr = "";
        let isErrorHit = false;


        if (!name) {
            nameErr = "Please enter role name";
            isErrorHit = true;
        }

        this.setState({
            nameErr,
        });

        return isErrorHit;
    }

    onSaveRole = (e) => {
        e.preventDefault();

        if (!this.hasError()) {
            let { roleId, createRole, updateRole, history } = this.props;
            let { name, permissions } = this.state;

            let params = {
                name: name,
                permissions: permissions,
            }

            if (roleId) {
                params._id = roleId;
                updateRole(params);
            } else {
                createRole(params);
            }
        }
    }

    onGoBack = () => {
        let { history } = this.props;
        history.replace("/app/role");
    }

    render() {
        let { roleId, role, creating } = this.props
        let { name, permissions, nameErr } = this.state;

        return (
            <>
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box d-flex align-items-center justify-content-between pb-1">
                            <div className="page-header">
                                <div>
                                <h2 className="main-content-title tx-24 mg-b-5">
                                    {roleId ? "Edit" : "Create"} Role
                                </h2>

                                <BreadCrumb
                                    title={[
                                        "Role Management",
                                        `${roleId ? "Edit" : "Create"} Role`,
                                    ]}
                                />
                                </div>
                            </div>

                            <div className="page-title-right">
                                <button
                                    type="button"
                                    className="btn btn-primary mr-2 btn-icon-text"
                                    disabled={role?.updating || creating}
                                    onClick={this.onSaveRole}
                                >
                                    {
                                        role?.updating || creating
                                        ? (
                                            <>
                                                <samp className="spinner-border spinner-border-sm mr-2" role="status"></samp>
                                                <span className="visually-hidden">{roleId ? "Saving" : "Creating"}...</span>
                                            </>
                                        ) :
                                        `${roleId ? "Save" : "Create"} Role`
                                    }

                                </button>

                                <button
                                    type="button"
                                    className="btn btn-primary btn-icon-text"
                                    onClick={this.onGoBack}
                                >
                                    <i className="fa fa-arrow-circle-left mr-2"></i>
                                    Back
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="col-md-12">
                                <form action="#">
                                    <div className="row">
                                        <div className="col-md-6 pt-3">
                                            <div className="row align-items-center">
                                                <div className="col-md-3 pr-0">
                                                    <label htmlFor="">Role Name <span style={{color:"red"}}>*</span></label>
                                                </div>
                                                <div className="col-md-6 pl-0">
                                                    {/* <input type="text" className="form-control"/> */}
                                                    <TextInput
                                                        value={name}
                                                        onChange={this.handleChange("name")}
                                                        errorText={nameErr}
                                                    />
                                                </div>
                                            </div>

                                            <div className="row align-items-center pt-3">
                                                <div className="col-md-3 pr-0">
                                                    <label htmlFor="">Permission</label>
                                                </div>
                                                <div className="col-md-6 pl-0 d-flex">
                                                    <Switch
                                                        onChange={this.handleAllSectionChange}
                                                        checked={this.state.show}
                                                        uncheckedIcon={false}
                                                        checkedIcon={false}
                                                        onColor="#86d3ff"
                                                        onHandleColor="#2693e6"
                                                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                                        height={20}
                                                        width={48}
                                                    />

                                                    <span className="pl-2">Allow all (show / download)</span>
                                                </div>
                                            </div>

                                            <div className="row align-items-center pt-3">
                                                <div className="col-md-3 pr-0">
                                                    <label htmlFor="">Show all orders</label>
                                                </div>
                                                <div className="col-md-6 pl-0 d-flex">
                                                    <Switch
                                                        onChange={this.handleSectionChange("showAllOrders")}
                                                        checked={this.state.permissions?.showAllOrders}
                                                        uncheckedIcon={false}
                                                        checkedIcon={false}
                                                        onColor="#86d3ff"
                                                        onHandleColor="#2693e6"
                                                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                                        height={20}
                                                        width={48}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="col-md-12 mb-4">
                                <div className="card">
                                    <h4 className="card-title">
                                        Permission to roles
                                    </h4>
                                    <div className="card-body">
                                        <table className="table table-striped table-bordered dt-responsive nowrap editrole_tbl">
                                            {
                                                Object.keys(permissions).map((sName) => (
                                                    typeof permissions[sName] === "object" &&
                                                    <SectionItem
                                                        key={sName}
                                                        section={permissions[sName]}
                                                        handleChange={this.handleSectionChange(sName)}
                                                        // active={permissions?.show}
                                                    />
                                                ))
                                            }
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    let { match } = ownProps;
    let roleId = match?.params?.id;
    let role = state.role.roles[roleId];

    let boards = state.role?.boards;
    let mBoard = boards[JSON.stringify({})];
    let creating = mBoard?.creating;

    return {
        roleId: roleId,
        role: role,
        creating: creating,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchRole: (id) => dispatch(fetchRoleRequest(id)),
        createRole: (params) => dispatch(createRoleRequest(params)),
        updateRole: (params) => dispatch(updateRoleRequest(params)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditRoleContainer);
