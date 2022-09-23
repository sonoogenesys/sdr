import React, { Component } from "react";
import { connect } from "react-redux";
import TableContainer from "../Utils/TableContainer";
import { fetchAllClientsRequest } from "./Duck/ClientsActions";
import Tippy from '@tippyjs/react';
import moment from "moment";
import ClientModal from "./ClientModal";
import StatusToggleModal from "./StatusToggle";

class ClientsContainer extends Component {
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
        let {fetchClient} = this.props;
        fetchClient()
    }

    renderTableRow = (client, index) => {
        const tableCSS = {textAlign: 'center',verticalAlign: 'middle', width: 150, overflow: 'hidden', textOverflow: 'ellipsis',}
        const styleImage = {width: 100, height: 100}
        return (
            client && (
                <tr key={`${client._id}_${index}`}>
                    <td style={tableCSS}>{client?.created_at ? moment(client.created_at).format("D MMM YYYY") : "-"}</td>
                    <td style={{...tableCSS, width: 200}}>{client?.name}</td>
                    <td style={tableCSS}>{client?.email}</td>
                    <td style={{...tableCSS, width: 400}}>{client?.address}</td>
                   <td style={tableCSS}>{client?.phone}</td>
                   <td style={tableCSS}>{client?.gstin}</td>
                   <td style={tableCSS}>{client?.logo && <img src={client?.logo} style={styleImage}/>}</td>
                    <td className={client?.active ? "greenColor" : "redColor"} style={tableCSS}>
                        {client?.active ? "Active" : "Inactive"}
                    </td>
                    <td style={{...tableCSS}}>
                        <span
                            onClick={() =>
                                this.handelUserModal(
                                    true,
                                    client?._id || client?.id
                                )
                            }
                        >
                           <Tippy content="Edit">
                                <i className="bx bxs-pencil"></i>
                            </Tippy>
                        </span>
                        <span
                            className='ml-2'
                            onClick={() => this.handleToggleStatusModal(true, client?._id || client?.id)}
                        ><Tippy content={(client?.active) ? 'Click to deactivate' : 'Click to activate'}>
                            {
                                client?.active
                                    ? <i className="fas fa-user greenColor"></i>
                                    : <i className="fas fa-user-slash"></i>
                            }
                            </Tippy>
                        </span>
                    </td>
                </tr>
            )
        );
    };


    onSearch = (text = "") => {
        this.setState({
            searchText: text.trim(),
        });
    };

    handelUserModal = (show = false, userId) => {
        this.setState({
            showUserModal: show,
            userId: userId,
        });
    };
    handleToggleStatusModal = (show = false, userId) => {
        this.setState({
            showToggleUserStatusModal: show,
            userId: userId,
        });
    }

    getFilterUserOrder = () => {
        let { searchText } = this.state;
        let { client } = this.props;

        let data = client && Object.values(client)

        if (searchText) {
            data = data.filter(o=>o.name.includes(searchText) || o.email.includes(searchText))
        }

        return data || [];
    }

    render() {
        let { searchText, showUserModal, userId, showToggleUserStatusModal } = this.state;

        let clients = this.getFilterUserOrder();
        let totalCount = clients?.length
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box d-flex align-items-center justify-content-between">
                            <div className="page-header">
                                <div>
                                    <h2 className="main-content-title tx-24 mg-b-5">
                                        Client Management
                                    </h2>
                                </div>
                            </div>
                            <div className="page-title-right">
                                <button
                                    type="button"
                                    className="btn btn-primary my-2 btn-icon-text"
                                    onClick={() => this.handelUserModal(true)}
                                >
                                    <i className="fe fe-plus mr-2"></i> Add Client
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <TableContainer
                    title={"Client Management"}
                    headings={[
                        "Created At",
                        "Name",
                        "Email",
                        "Address",
                        "Phone No",
                        "GST No",
                        "Logo",
                        "Status",
                        "Actions"
                    ]}
                    rowData={clients ? clients : []}
                    renderRow={this.renderTableRow}
                    filter={{ searchText: searchText }}
                    totalEntries={totalCount}
                    onSearch={this.onSearch}
                    searchPlaceholder={'Search by name or email'}
                />

                <ClientModal
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
        client: state?.client?.clients,
        loading: state?.client?.loading,
        error: state?.client?.error,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchClient: (params) => dispatch(fetchAllClientsRequest(params))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClientsContainer);