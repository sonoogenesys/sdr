import React, { Component } from "react";
import { connect } from "react-redux";
import TableContainer from "../Utils/TableContainer";
import { fetchAllProductsRequest } from "./Duck/ProductsActions";
import Tippy from '@tippyjs/react';
import moment from "moment";
import ProductModal from "./ProductModal";
import StatusToggleModal from "./StatusToggle";

class ProductsContainer extends Component {
    constructor(props) {
        super(props);

        this.productModalId = "productModalId";
        this.state = {
            productId: undefined,
            showProductModal: false,
            showToggleProductStatusModal: false,
            searchText: "",
        };
    }

    componentDidMount() {
        let {fetchProduct} = this.props;
        fetchProduct()
    }

    renderTableRow = (product, index) => {
        const tableCSS = {textAlign: 'center',verticalAlign: 'middle', width: 150, overflow: 'hidden', textOverflow: 'ellipsis',}
        return (
            product && (
                <tr key={`${product._id}_${index}`}>
                    <td style={{...tableCSS, width: 50}}>{index + 1}</td>
                    <td style={{...tableCSS, width: 400}}>{product?.name}</td>
                    <td style={{...tableCSS, width: 300}}>{product?.description}</td>
                    <td style={tableCSS}>{product?.hsn}</td>
                   <td style={tableCSS}>{product?.uom}</td>
                   <td style={tableCSS}>{product?.rate}</td>
                    <td style={tableCSS}>{product?.created_at ? moment(product.created_at).format("D MMM YYYY") : "-"}</td>
                    <td style={tableCSS}>{product?.image && <img src={product?.image} style={{width: 100, height: 100}}/>}</td>
                    <td className={product?.active ? "greenColor" : "redColor"} style={tableCSS}>
                        {product?.active ? "Active" : "Inactive"}
                    </td>
                    <td style={{...tableCSS}}>
                        <span
                            onClick={() =>
                                this.handelproductModal(
                                    true,
                                    product?._id || product?.id
                                )
                            }
                        >
                           <Tippy content="Edit">
                                <i className="bx bxs-pencil"></i>
                            </Tippy>
                        </span>
                        <span
                            className='ml-2'
                            onClick={() => this.handleToggleStatusModal(true, product?._id || product?.id)}
                        ><Tippy content={(product?.active) ? 'Click to deactivate' : 'Click to activate'}>
                            {
                                product?.active
                                    ? <i className="fas fa-product greenColor"></i>
                                    : <i className="fas fa-product-slash"></i>
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

    handelproductModal = (show = false, productId) => {
        this.setState({
            showProductModal: show,
            productId: productId,
        });

    };
    handleToggleStatusModal = (show = false, productId) => {
        this.setState({
            showToggleProductStatusModal: show,
            productId: productId,
        });
    }

    getFilterproductOrder = () => {
        let { searchText } = this.state;
        let { product } = this.props;

        let data = product && Object.values(product)

        if (searchText) {
            data = data.filter(o=>o.name.includes(searchText))
        }

        return data || [];
    }

    render() {
        let { searchText, showProductModal, productId, showToggleProductStatusModal } = this.state;

        let products = this.getFilterproductOrder();
        let totalCount = products?.length
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box d-flex align-items-center justify-content-between">
                            <div className="page-header">
                                <div>
                                    <h2 className="main-content-title tx-24 mg-b-5">
                                        product Management
                                    </h2>
                                </div>
                            </div>
                            <div className="page-title-right">
                                <button
                                    type="button"
                                    className="btn btn-primary my-2 btn-icon-text"
                                    onClick={() => this.handelproductModal(true)}
                                >
                                    <i className="fe fe-plus mr-2"></i> Add product
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <TableContainer
                    title={"product Management"}
                    headings={[
                        "S. No.",
                        "Name",
                        "Description",
                        "HSN/SAC",
                        "UOM",
                        "Rate",
                        "Created at",
                        "Image",
                        "Status",
                        "Actions"
                    ]}
                    rowData={products ? products : []}
                    renderRow={this.renderTableRow}
                    filter={{ searchText: searchText }}
                    totalEntries={totalCount}
                    onSearch={this.onSearch}
                    searchPlaceholder={'Search by product name'}
                />

                <ProductModal
                    show={showProductModal}
                    handelModal={this.handelproductModal}
                    productId={productId}
                />

                <StatusToggleModal
                    show={showToggleProductStatusModal}
                    handleModal={this.handleToggleStatusModal}
                    productId={productId}
                />

            </React.Fragment>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        product: state?.product?.products,
        loading: state?.product?.loading,
        error: state?.product?.error,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchProduct: (params) => dispatch(fetchAllProductsRequest(params))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsContainer);