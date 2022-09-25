import React from "react";
import TableContainer from "../Utils/TableContainer";
import axios from "axios";
import {showNotification} from "../Utils/CommonFunctions";
import moment from "moment";


class QueryContainer extends React.Component {
    state = {
        headingData:[
            "S.No.",
            "Date",
            "Name",
            "Mobile",
            "Email",
            "Query"
        ],
        isLoading: true,
        query: []
    }

    componentDidMount() {
        axios({
            url: "https://www.kcs-electrical.com/api/v1/mail",
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                showNotification("success", res?.data?.message);
                this.setState({
                    isLoading: false,
                    query: res?.data?.query
                });
            })
            .catch(err => {
                showNotification("error", "There is some error while sending data!");
                console.log("GET IN TOUCH ", err);
                this.setState({
                    isLoading: false
                });
            });
    }

    renderRowItem = (item, index) => {
        console.log(item)
        return <tr key={item?._id} className={'text-center'}>
            <td className={'text-center'} width={60}>{index + 1}</td>
            <td className={'text-left'}>{moment(item?.created_at).format('lll')}</td>
            <td className={'text-left'}>{item?.name}</td>
            <td className={'text-left'}>{item?.mobile}</td>
            <td className={'text-left'}>{item?.email}</td>
            <td className={'text-left'}>{item?.query}</td>
        </tr>;
    }

    render() {
        let {query, isLoading, headingData} = this.state;
        return(
            <TableContainer
                title={"Query"}
                loading={isLoading}
                rowData={query}
                renderRow={this.renderRowItem}
                // filter={{ searchText: this.state.searchText }}
                // onSearch={this.onSearch}
                // searchPlaceholder={'Search by clients'}
                // totalEntries={totalCount}
                // showFilter={true}
                // filterOption={["All", "Pending", "Completed", "Rejected"]}
                headings={headingData}/>
        );
    }
}

export default QueryContainer;