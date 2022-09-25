import React from "react";
import TableContainer from "../Utils/TableContainer";


class QueryContainer extends React.Component {
    state = {
        headingData:[
            "S.No.",
            "Name",
            "Mobile",
            "Email",
            "Query"
        ]
    }
    renderRowItem = (item, index) => {
        return <tr key={item?._id} className={'text-center'}>
            <td className={'text-center'} width={60}>{index + 1}</td>
            <td className={'text-left'}>{item?.name}</td>
            <td className={'text-left'}>{item?.number}</td>
            <td className={'text-left'}>{item?.email}</td>
            <td className={'text-left'}>{item?.query}</td>
        </tr>;
    }

    render() {
        return(
            <TableContainer
                title={"Query"}
                rowData={[{name: "KCS Testing", email:"development@kcs-electrical.com", number: "9555218158", query:"Testing purpose"}]}
                renderRow={this.renderRowItem}
                // filter={{ searchText: this.state.searchText }}
                // onSearch={this.onSearch}
                // searchPlaceholder={'Search by clients'}
                // totalEntries={totalCount}
                // showFilter={true}
                // filterOption={["All", "Pending", "Completed", "Rejected"]}
                headings={this.state.headingData}/>
        );
    }
}

export default QueryContainer;