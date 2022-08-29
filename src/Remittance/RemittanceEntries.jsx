

import React, { Component } from 'react'
import BreadCrumb from '../Utils/BreadCrumb';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import moment from 'moment'
import RemittanceRemarks from './Components/RemittanceRemarks'
import TableContainer from '../Utils/TableContainer';
import {updateStatus} from './Duck/RemittanceActions'
import { showNotification } from '../Utils/CommonFunctions';
import { Badge } from 'react-bootstrap';
import appUrl from '../Constants/AppUrl';
import fileDownload from 'js-file-download';
import axios from 'axios';

class RemittanceEntries extends Component {

    state = {
        showModal : false,
        activeRemittance: null,
        activeOrder: null,
        remarks:'',
        remarksErr: null,
        onLoad: false,
        searchText: "",
    };

    handleRemittanceRemarks = (order) => {
        let val = !this.state.showModal
        if(val) this.setState({showModal: val, activeOrder: order})
        else this.setState({showModal: val, activeOrder: null})
    }

    componentDidMount(){
        const {remittance, match} = this.props
        const id = match?.params?.id
        if(id && remittance && remittance[id]){
            this.setState({activeRemittance: remittance[id]})
        }
    }

    componentDidUpdate(prevProps){
        const {remittance, match, error} = this.props
        const id = match?.params?.id
        if(prevProps?.remittance !== remittance){
            // if(id && remittance && remittance[id] && !this.state.activeRemittance){
            if(id && remittance && remittance[id]){
                this.setState({activeRemittance: remittance[id]})
            }
        }
        if(this.state.onLoad && (prevProps?.isLoading !== this.props.isLoading)){
            this.setState({
                onLoad: false,
                showModal: false,
                remarks: '',
            });

            if (!error) {
                showNotification('success', 'Order updated successfully')
            } else {
                showNotification('error', error?.message)
            }
        }
    }

    renderRow = (order, index) => {
        return (
            order && (
                <tr key={`${index}`} onClick={()=>this.handleRemittanceRemarks(order)} className='pointer'>
                    <td style={{textAlign:'center'}}>{index + 1}</td>
                    <td>{order?.awb_number}</td>
                    <td>{parseFloat(order?.remittance_amount).toFixed(2)}</td>
                    <td>{parseFloat(order?.cod_amount).toFixed(2)}</td>
                    <td>{moment(order?.delivery_date)?.format('DD MMM YYYY')}</td>
                    <td className='font-weight-bold'>
                        {(order?.status === 'completed') ? <div className='greenColor'>Match {order?.reason && <Badge data-title='Remark added' className='ml-1' style={{color:'#fff', fontSize:12}} variant='primary'>R</Badge>}</div> : <div className='redColor'>Mismatch</div>}
                    </td>
                    <td className='font-weight-bold' style={{textAlign:'center'}}>
                        {(order?.status === 'completed') ? <div className='greenColor'>Close</div> : <div className='redColor'>Open</div>}
                    </td>
                </tr>
            )
        );
    };

    handleRemarks = (e) => {
        this.setState({remarks: e?.target?.value, remarksErr: null})
    }

    handleSubmit = () => {
        if(!this.state.remarks){
            this.setState({remarksErr: 'Please enter remarks'})
            return false
        }
        this.props.updateStatusRequest({
            _id: this.state.activeOrder?._id,
            reason: this.state.remarks,
            status: 'completed'
        })
        this.setState({onLoad: true})
    }

    onDownloadAttachment = () => {
        let { activeRemittance } = this.state;
        let attachment = activeRemittance?.attachments_id;

        let id = attachment?._id;
        let filename = attachment?.filename;

        axios({
            method: 'GET',
            url: `${appUrl.ATTACHMENTS_DOWNLOAD}/${id}`,
            contentType: 'application/doc; charset=utf-8',
            responseType: 'arraybuffer',
        })
        .then(res => fileDownload(res.data, filename))
        .catch(err => {
            showNotification("error", "Error in downloading attachment");
            console.log("Download Attachment ", err);
        });
    }

    onSearch = (text = "") => {
        this.setState({
            searchText: text.trim(),
        });
    }

    render() {
        let { loggedInUser } = this.props;
        let { searchText } = this.state;
        const remittance = this.state.activeRemittance;
        let tasks = remittance?.tasks;

        if (searchText && remittance?.tasks?.length > 0) {
            tasks = remittance?.tasks?.filter(task => task?.awb_number?.includes(searchText));
        }

        let permissions = loggedInUser?.role?._id?.permissions || {};

        return (
            <>
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box d-flex align-items-center justify-content-between">
                            <div className="page-header">
                                <div>
                                    <h2 className="main-content-title tx-24 mg-b-5">
                                        Remittance Entries
                                    </h2>
                                    <BreadCrumb
                                        title = {['Remittance', 'Remittance Entries']}
                                    />
                                </div>
                            </div>
                            <div className="page-title-right">
                                <Link to="/app/RemittanceProfile" className="btn btn-primary my-2 btn-icon-text">
                                    <i className="fa fa-arrow-circle-left mr-2"></i>Back
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xl-12">
                        <div className="card">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="uploaded_doc d-flex align-items-center pl-2 pt-1">
                                        <i className="mdi mdi-file-excel" style={{'fontSize': '40px', 'color': '#1d7044',}} aria-hidden="true"></i>
                                        <h5 className="mt-2">{remittance?.attachments_id?.filename}</h5>

                                        {
                                            permissions?.remittance?.confirmation_csv?.download &&
                                            remittance?.attachments_id?._id &&
                                            <span className={"btn-link ml-2 pointer"} style={{fontSize:14}} data-title="download" onClick={this.onDownloadAttachment}>
                                                <i
                                                    className="fa fa-download ml-2"
                                                    aria-hidden="true"
                                                />
                                            </span>
                                        }
                                    </div>
                                </div>
                                {/* <div className="col-md-4 text-right offset-md-2">
                                    <div className="app-search d-lg-block pr-3">
                                        <div className="position-relative">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Search..."
                                            />
                                            <span
                                                className="fe fe-search"
                                            ></span>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>

                <TableContainer
                    headings = {['No.','AWB Number', 'Amount remitted(₹)', 'Selling Price(₹)', 'Delivery date', 'Case', 'Task status']}
                    // showSearch={false}
                    totalEntries={tasks?.length}
                    rowData={tasks}
                    renderRow={this.renderRow}
                    onSearch={this.onSearch}
                />

                <RemittanceRemarks
                    show={this.state.showModal}
                    handleClose={this.handleRemittanceRemarks}
                    activeOrder={this.state.activeOrder}
                    remarks={this.state.remarks}
                    remarksErr={this.state.remarksErr}
                    handleRemarks={this.handleRemarks}
                    handleSubmit={this.handleSubmit}
                />

            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        remittance: state?.remittance?.remittance,
        isLoading: state?.remittance?.loading,
        error: state?.remittance?.error,
        loggedInUser: state.loggedInUser?.data?.data,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateStatusRequest: (params) => dispatch(updateStatus(params)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RemittanceEntries)
