import React, {Component} from 'react';
import moment from "moment";
import QuotationModal from "./QuotationModal";
import {fetchAllClientsRequest} from "../Client/Duck/ClientsActions";
import {fetchAllProductsRequest} from "../Product/Duck/ProductsActions";
import {fetchAllQuotationRequest, deleteQuotationRequest} from "./Duck/QuotationActions";
import {connect} from "react-redux";

class QuotationContainer extends Component {
    state = {
        previewQuotationModal: false,
        showQuotationModal: false
    }

    componentDidMount() {
        let { fetchClient, fetchProduct, fetchQuotation } = this.props;
        fetchClient();
        fetchProduct();
        fetchQuotation();
    }

    handleModal = (show = false, show2 = false, invoiceId = null, edit = false, remove = false) => {
        this.setState({
            showQuotationModal: show,
            previewQuotationModal: show2,
            QuotationId: invoiceId,
            editQuotationModal: edit,
            removeModal: remove
        });
    };

    cardTemplate = (rowItem) =>{
        return(
            <div key={rowItem?._id} className="card m-3" style={{width: '18rem'}}>
                <div className="card-body">
                    <h5 className="card-title text-center" style={{height: '5rem'}}>{rowItem?.billing_address?.name}</h5>
                    <p className="card-text pt-3"><b>Invoice: </b> {rowItem?.invoice_number}</p>
                    <p className="card-text"><b>Date: </b> {moment(rowItem?.invoiceDate).format('DD-MMM-YYYY')}</p>
                    <p className="card-text"><b>Amount: </b> {rowItem?.total_amount.toFixed(2)}</p>
                </div>
            </div>
        )
    }

    getFilterUserOrder = () => {
        let { searchText } = this.state;
        let { quotation } = this.props;

        let data = quotation && Object.values(quotation)
        if (searchText) {
            data = data.filter(o=> o && o.billing_address.name.includes(searchText))
        }

        return data || [];
    }

    render(){
        let { previewQuotationModal, showQuotationModal } = this.state;
        let invoice = this.getFilterUserOrder();
        let list = !previewQuotationModal && invoice && Array.isArray(invoice) && invoice.length > 0 && invoice;
        return(
            <div className={'row'}>
                <div className="col-md-12">
                    {previewQuotationModal ? <div className="page-title-box d-flex align-items-center justify-content-between">
                            <div className="page-title-left">
                                <button
                                    type="button"
                                    className="btn btn-primary my-2 btn-icon-text"
                                    // onClick={() => this.handleModal(false, false, null)}
                                >
                                    <i className="fe fe-arrow-left mr-2"></i> Back
                                </button>
                            </div>
                            {/*<TextInput value={} onChange={this.handleHeight}/>*/}
                            <div className="page-title-right">
                                <button
                                    type="button"
                                    className="btn btn-primary my-2 btn-icon-text"
                                    onClick={window.print}
                                >
                                    <i className="fe fe-printer mr-2"></i> Print
                                </button>
                            </div>
                        </div> :
                        <div className="page-title-box d-flex align-items-center justify-content-between">
                            <div className="page-header">
                                <div>
                                    <h2 className="main-content-title tx-24 mg-b-5">
                                        Quotation List
                                    </h2>
                                </div>
                            </div>
                            <div className="page-title-right">
                                <button
                                    type="button"
                                    className="btn btn-primary my-2 btn-icon-text"
                                    onClick={() => this.handleModal(true)}
                                >
                                    <i className="fe fe-plus mr-2"></i> Generate Quotation
                                </button>
                            </div>
                        </div>}
                </div>

                {
                    list && list.map(o=>this.cardTemplate(o))
                }

                <QuotationModal
                    // invoiceId={invoiceId}
                    show={showQuotationModal}
                    handelModal={this.handleModal}
                />

            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        client: state?.client?.clients,
        product: state?.product?.products,
        quotation: state?.quotation?.quotation,
        loading: state?.client?.loading,
        error: state?.client?.error
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchClient: (params) => dispatch(fetchAllClientsRequest(params)),
        fetchProduct: (params) => dispatch(fetchAllProductsRequest(params)),
        fetchQuotation: (params) => dispatch(fetchAllQuotationRequest(params)),
        deleteQuotation: (params) => dispatch(deleteQuotationRequest(params)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuotationContainer);