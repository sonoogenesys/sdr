import React, { Component } from 'react';
import ReactToPrint from 'react-to-print';
import { connect } from 'react-redux';
import OrderLabel from './Components/OrderLabel';
import moment from 'moment';

class ShipmentPrintModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleClass: false,
            incomingProp: props.history.location.state && props.history.location.state.clickCheckProp
        }
        this.shipmentPrintRef = React.createRef();
        this.shipmentSinglePrintRef = React.createRef();
    }


    componentDidMount() {
        let { printSelection, history } = this.props;
        let {incomingProp} = this.state

        if (!printSelection || printSelection?.length === 0 || !incomingProp) {
            history.replace("/app/shipmentList");
        }
    }

    onGoBack = () => {
        this.props.history.goBack();
    }
    //  onDocumentLoadSuccess({ numPages }) {
    //     setNumPages(numPages);
    //   }


    render() {
        let { printSelection } = this.props;
        let pages = Math.ceil((printSelection?.length ?? 0) / 4);
        let {incomingProp} = this.state
        return (
            <>
                <section>
                    <div className="container">
                        <div className="d-flex justify-content-end">
                            {
                                incomingProp === "regularPrint" ?
                                <ReactToPrint
                                    pageStyle={pageStyle}
                                    trigger={() => (
                                        <button
                                            className="btn btn-primary my-2 btn-icon-text"
                                            type="button"
                                        >
                                            <i className="dripicons dripicons-print mr-2" />
                                            Print Label
                                        </button>
                                    )}
                                    documentTitle={`Order Label - ${moment().format('DD-MMM-YY')}`}
                                    content={() => this.shipmentPrintRef.current}
                                />
                             :
                              <>
                                <ReactToPrint
                                    pageStyle={ThermalPageStyle}
                                    trigger={() => (
                                    <button
                                        className="btn btn-primary my-2 btn-icon-text mr-2"
                                        type="button"
                                    >
                                        <i className="dripicons dripicons-print mr-2" />
                                        Print Thermal Label
                                    </button>
                                    )}
                                    documentTitle={`Order Label - ${moment().format('DD-MMM-YY')}`}
                                    content={() => this.shipmentPrintRef.current}
                                />


                              </>
                            }


                            <button
                                type="button"
                                className="btn btn-primary my-2 btn-icon-text ml-3"
                                onClick={this.onGoBack}
                            >
                                <i className="fa fa-arrow-circle-left mr-1"></i>
                                Back
                            </button>
                        </div>

                        <div className="justify-content-center" ref={this.shipmentPrintRef} style={{ margin: "0", padding: "0" }}>
                            {
                                incomingProp === 'regularPrint' ?
                                ([...new Array(pages)].map((_, pageIndex) => (
                                    <div className="page-break-before col-lg-12">
                                        <div className="row print-page justify-content-center">
                                        {
                                                printSelection.map((id, labelIndex) => {
                                                    let addBreak = labelIndex % 4 === 3 ? "page-break-after" : "";
                                                    return labelIndex >= (pageIndex * 4) && labelIndex < ((pageIndex * 4) + 4) && (
                                                        <div
                                                            className={"col-6 print-label mb-3 " + addBreak}
                                                            style={{
                                                                backgroundColor: "#fff",
                                                                borderRadius: 3,
                                                                overflow: "hidden",
                                                                border: "1px dashed",
                                                            }}
                                                        >
                                                            <OrderLabel id={id} />
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                )))
                                :
                                (
                                    <>
                               <div className="col-lg-6">
                                 {
                                     printSelection.map((id) => (
                                     <div className="row justify-content-center thermal-print-page" >
                                         <div
                                             className="col-lg-12 col-xl-12 col-md-12 col-12 mb-3 thermal-print-label m-0"
                                             style={{
                                                 backgroundColor: "#fff",
                                                 overflow: "hidden",
                                                 border: "1px dashed",
                                             }}
                                         >
                                             <OrderLabel id={id} />
                                         </div>
                                     </div>

                                     ))
                                 }

                             </div>
                                </>
                                )

                            }

                        </div>
                    </div>
                </section>


            </>
        )
    }
}

const pageStyle = `
    @media print {
        html, body,div, ...etc {
            height: auto !important;
            overflow: hidden !important;
            -webkit-print-color-adjust: exact !important;
            float: none;
        }
        .page-break-before {
            display: block;
            page-break-before: always;
        }
        .page-break-after {
            display: block;
            page-break-after: always;
        }
        .print-page {
            height: auto !important;
        }
        .print-label {
            height:auto !important;
        }
        .print-label .font-p-12{
            font-size: 11px !important;
        }
        .print-label .font-p-10{
            font-size: 10px !important;
        }

    }
`;

const ThermalPageStyle = `
    @media print {
        @page {
            size: 4.1in 5.45in !important;
            margin: 5px !important;
            }
            body {
            height: 9in !important;
            overflow: hidden !important;
            -webkit-print-color-adjust: exact !important;
            width: 4.1in  !important
        }
        .thermal-print-page {
            width: 6in !important;
            height: 8.02in !important;
        }
        .thermal-print-label {
            width: 6in !important;
            height: 8.02in !important;
        }
        .thermal-print-label .font-p-12{
            font-size: 14px !important;
        }
        .thermal-print-label .font-p-10{
            font-size: 12.3px !important;
        }
        .thermal-print-label .print-font-bold{
            font-weight: 700
        }
    }
`;

const mapStateToProps = (state) => {
    let printSelection = state.order?.printSelection;

    return {
        printSelection: printSelection,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ShipmentPrintModal);
