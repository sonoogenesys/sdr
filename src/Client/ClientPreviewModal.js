import React from "react";
import CounterContainer from "../Dashboard/Components/CounterContainer";
import TableContainer from "../Utils/TableContainer";
import moment from "moment";
import Tippy from "@tippyjs/react";


const ClientPreviewModal = React.forwardRef((props) => {
    let {invoice, userId} = props;
    let currentUserInvoice = invoice && Object.keys(invoice).length > 0 ? (Object.values(invoice).filter(o=> o.billing_address.gst ===userId && o.status !== "rejected")) : [];
    let length = currentUserInvoice?.length;
    let totalAmount = currentUserInvoice?.reduce((accumulator, currentValue)=>accumulator + Number(currentValue.total_amount) , 0);
    let paidAmount = currentUserInvoice?.reduce((accumulator, currentValue)=>accumulator + Number(currentValue.paid_amount) , 0);
    let pendingAmount = (totalAmount || 0) - (paidAmount || 0);

    const headingData = [
        "Invoice No",
        "Client Name",
        "Date",
        "Invoice Amount",
        "Advance Amount",
        "Pending Amount",
        "Status"
    ]
    const renderRowItem = (item, index) => {

        let color;
        switch (item?.status) {
            case 'pending':
                color = 'orange'
                break;
            case 'completed':
                color = 'green'
                break;
            case 'rejected':
                color = 'red'
                break;
        }
        let pending_amount = (item && item.total_amount) ? Number(item.total_amount- (item.paid_amount ? item.paid_amount : 0)) : 0
        const textDecoration = color === 'red' ? {textDecoration: "line-through"} : {}
        return (
            <tr key={item?._id} style={{...textDecoration, color}}>
                <td className={'text-center'}>{item?.invoice_number}</td>
                <td>{item?.shipping_address.name}</td>
                <td className={'text-center'}>{moment(item?.invoiceDate).format('DD-MMM-YYYY')}</td>
                <td className={'text-center'} style={{ width: "10%" }}>₹ {item?.total_amount}</td>
                <td className={'text-center'} style={{ width: "10%"}}>₹ {item?.paid_amount}</td>
                <td className={'text-center'} style={{ width: "10%"}}>₹ {pending_amount}</td>
                <td className={'text-center'} style={{color}}>{item?.status}</td>
                {/*<td className={'text-center'}>*/}
                {/*    <span onClick={()=>this.handleModal(false, true, item?._id)}>*/}
                {/*       <Tippy content="Preview">*/}
                {/*            <i className="bx bxs-printer"></i>*/}
                {/*        </Tippy>*/}
                {/*    </span>*/}
                {/*    <span className={'ml-2'} onClick={()=>this.handleModal(false, false, item?._id, true)}>*/}
                {/*       <Tippy content="Edit">*/}
                {/*            <i className="bx bxs-edit"/>*/}
                {/*        </Tippy>*/}
                {/*    </span>*/}
                {/*    <span className={'ml-2'} onClick={() => this.handleModal(false, false, item?._id, false, true)}>*/}
                {/*       <Tippy content="Delete">*/}
                {/*            <i className="fe fe-delete"/>*/}
                {/*        </Tippy>*/}
                {/*    </span>*/}

                {/*</td>*/}
            </tr>
        );
    };
    return (
        <div className="col-md-12">
                <div className="row align-items-start dashboard-grid">
                    <CounterContainer
                        counter_key={"total_invoice"}
                        containerClassName={"dashboard_one common_grid_css bg-white p-3 br-5 mb-3"}
                        name={"Total Invoice"}
                        counter={length || 0}
                    />
                    <CounterContainer
                        counter_key={"total_amount"}
                        containerClassName={"dashboard_one common_grid_css bg-white p-3 br-5 mb-3"}
                        name={"Billing Amount"}
                        counter={totalAmount || 0}

                    />
                    <CounterContainer
                        counter_key={"pending_amount"}
                        containerClassName={"dashboard_one common_grid_css bg-white p-3 br-5 mb-3"}
                        name={"Pending Amount"}
                        counter={pendingAmount || 0}
                    />
                    <CounterContainer
                        counter_key={"completed_amount"}
                        containerClassName={"dashboard_one common_grid_css bg-white p-3 br-5 mb-3"}
                        name={"Raised Amount"}
                        counter={paidAmount || 0}
                    />
                </div>

            <TableContainer
                // title={"Invoice"}
                rowData={currentUserInvoice || []}
                renderRow={renderRowItem}
                showSearch={false}
                // filter={{ searchText: this.state.searchText }}
                // onSearch={this.onSearch}
                // searchPlaceholder={'Search by clients'}
                totalEntries={length}
                showFilter={false}
                // filterOption={["All", "Pending", "Completed", "Rejected"]}
                headings={headingData}/>

        </div>
    )
})
export default ClientPreviewModal