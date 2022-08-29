import React, { Component } from "react";
import { connect } from "react-redux";
import TableContainer from "../Utils/TableContainer";
import { fetchReachUsUsers } from "./Duck/ReachUsActions";
import moment from "moment";

class ReachUsContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchText: "",
        };
    }

    componentDidMount() {
        this.loadMoreReachUsUsers();
    }

    loadMoreReachUsUsers = (offset = 0, limit = 100) => {
        let { list, meta, fetchReachUsUsers } = this.props;
        let { searchText } = this.state;
        searchText = searchText.trim();

        if (offset === 0 || meta?.totalCount > list?.length) {

            let params = {
                offset: offset,
                limit: limit,
            }

            if (searchText) params.text = searchText;
            fetchReachUsUsers && fetchReachUsUsers(params);
        }

    }

    renderTableRow = (userId, index) => {
        let { users } = this.props;
        let user = userId && users && users[userId];

        if (!user) return <></>;

        return (
            <tr key={`${userId}_${index}`}>
                <td style={{textAlign:'center'}}>{index+1}</td>
                <td>{user?.name}</td>
                <td>{user?.email}</td>
                <td>{user?.number}</td>
                <td>{user?.company_name}</td>
                <td style={{ textAlign: "center" }}>{user?.location}</td>
                <td style={{ textAlign: "center" }}>{user?.createdAt ? moment(user?.createdAt).format("DD MMM YYYY") : "-"}</td>
            </tr>
        );
    };

    onSearch = (text = "") => {
        this.setState({
            searchText: text.trim(),
        }, this.loadMoreReachUsUsers);
    };

    render() {
        let { list, meta, loading } = this.props;

        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box d-flex align-items-center justify-content-between">
                            <div className="page-header">
                                <div>
                                    <h2 className="main-content-title tx-24 mg-b-5">
                                        Reach Us
                                    </h2>
                                    <ol className="breadcrumb">
                                        <li
                                            className="breadcrumb-item active"
                                            aria-current="page"
                                        >
                                             Reach Us
                                        </li>
                                        <li className="breadcrumb-item">
                                            <a href="#"> Reach Us</a>
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <TableContainer
                    headings={[
                        "No.",
                        "Name",
                        "Email",
                        "Phone number",
                        "Company Name",
                        "Location",
                        "Creation date",
                    ]}
                    rowData={list}
                    renderRow={this.renderTableRow}
                    totalEntries={meta?.totalCount}
                    onSearch={this.onSearch}
                    loading={loading}
                    loadMore={this.loadMoreReachUsUsers}
                />

            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    let filter = state.reachUs?.filter;
    let users = state.reachUs?.users;

    let mBoardKey = JSON.stringify(filter || {});
    let mBoard = state.reachUs[mBoardKey];
    let list = mBoard?.list;
    let meta = mBoard?.meta;
    let loading = mBoard?.loading;

    return {
        users: users,
        list: list,
        meta: meta,
        loading: loading,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchReachUsUsers: (params) => dispatch(fetchReachUsUsers(params)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReachUsContainer);
