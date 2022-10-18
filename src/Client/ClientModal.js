import React, { Component } from "react";
import { connect } from "react-redux";
import BaseModal from "../Utils/BaseModal";
import TextInput from "../Utils/TextInput";
import {
    createClientRequest,
    updateClientRequest
} from "./Duck/ClientsActions";
import axios from 'axios';
import {showNotification} from "../Utils/CommonFunctions";
import Spinner from 'react-bootstrap/Spinner';

// 4a83aadb1d2e4f58bc6da050c35779fe

class UserModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            mobile: "",
            address: "",
            gstin: "",
            file: "",
            logo: "",
            // nameErr: "",
            // mobileErr: "",
            // addressErr: "",
            isLoading: false,
            loading: false
        };
    }

    componentDidMount() {
        let { client } = this.props;
        if (!!client) {
            this.setClientDetails();
        }
    }

    componentDidUpdate(preProps) {
        let { client, userId } = this.props;

        if (!!client && preProps?.userId !== userId) {
            this.setClientDetails();
        }

        if (!this.props.loading && preProps.loading && this.state.isLoading) {
            if (!this.props.error) {
                this.onClickClose();
            }
        }
    }

    setClientDetails = () => {
        const { client, userId } = this.props;
        let user = client[userId]
        this.setState({
            name: user?.name || "",
            email: user?.email || "",
            mobile: user?.phone || "",
            address: user?.address || "",
            gstin: user?.gstin || "",
            logo: user?.logo || "",
        });
    };


    onClickClose = () => {
        let { handelModal } = this.props;
        this.setState({
            name: "",
            email: "",
            mobile: "",
            address: "",
            gstin: "",
            file: "",
            logo: "",
            isLoading: false
        });

        typeof handelModal === "function" && handelModal();
    };

    onClickSave = () => {
        let { userId, createClient, updateClient } = this.props;

        let {
            name,
            email,
            mobile,
            address,
            gstin,
            file,
            isLoading
        } = this.state;

            this.setState({
                isLoading: true,
            });

            name = name?.trim();
            email = email?.trim();
            mobile = mobile?.trim();
            address = address?.trim();
            gstin = gstin?.trim();
            let params;
            if(file){
                params = new FormData();
                params.set("files", file);
                params.set("name", name);
                params.set("email", email);
                params.set("phone", mobile);
                params.set("address", address);
                params.set("gstin", gstin);
                if(userId){
                    params._id =  userId
                }

            } else {
                params =
                    {
                    _id: userId,
                    name,
                    email,
                    phone: mobile,address, gstin
                };
            }


            if (!userId) {
                createClient(params);
                this.onClickClose();
                // fetchClient();
            } else {
                updateClient(params);
                this.onClickClose();
                // fetchClient()
            }
        this.setState({
            isLoading: false,
        });
    };

    renderFooter = () => {
        let { userId } = this.props;
        let { isLoading } = this.state;

        return (
            <>
                <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                    onClick={this.onClickClose}
                >
                    Close
                </button>

                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.onClickSave}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <span className="spinner-border spinner-border-sm"></span>
                            <span className="visually-hidden"> Saving...</span>
                        </>
                    ) : !userId ? (
                        "Add Client"
                    ) : (
                        "Save changes"
                    )}
                </button>
            </>
        );
    };

    handelChange = (name) => (event) => {
         let value = event.target.value
        if (name === "mobile") {
            value = value.replace(/[^0-9]/g, "");
        }
        if(name === "gstin" && value.length === 15) {
            this.getDataFromGST(value);
        }
        console.log([name], value)
        this.setState({
            [name]: value,
        });
    };

    onChange = (event) => {
        let file = this.refs.file.files[0];
        let reader = new FileReader();
        let url = reader.readAsDataURL(file);

        reader.onloadend = function (e) {
            this.setState({
                logo: [reader.result],
                file: event?.target?.files?.[0]
            })
        }.bind(this);
        console.log(url) // Would see a path?
    }

    getDataFromGST = (gst) => {
        // let {gst} = this.state;
        this.setState({loading: true})
        const api_key = '4a83aadb1d2e4f58bc6da050c35779fe'
        axios.get(`https://sheet.gstincheck.co.in/check/${api_key}/${gst}`).then(response=>{
            if(response?.data?.flag){
                showNotification('success', 'GST Verified')
                let data = response.data.data;
                data && this.setState({address: data.pradr?.adr, name: (data.tradeNam || data.lgnm)})
            } else {
                showNotification('error', response?.data?.message)
            }
            this.setState({loading: false})

        }).catch(err=>{
            showNotification('error', 'Something went wrong')
            this.setState({loading: false})
        })
    }

    render() {
        let {
            show,
            userId
        } = this.props;

        let {
            name,
            email,
            mobile,
            address,
            gstin,
            logo,
            nameErr,
            addressErr,
            mobileErr,
            loading
        } = this.state;
        let title = !userId ? "Add New Client" : "Edit Client";

        return (


            <BaseModal
                show={show}
                handleClose={this.onClickClose}
                title={title}
                footerComponent={this.renderFooter}
            >

                <form>
                    {loading && <div style={{position:'absolute', zIndex: 10, opacity: 0.5, width: 470, height: 370, backgroundColor:'white'}}>
                        <Spinner size={'lg'} animation={'border'} role={'status'} style={{position:'absolute',top: '35%', left: '40%', width: 70, height:70}} />
                    </div>}

                    <div className="row">
                        <div className="col-xl-6 col-6 col-md-6">
                            <TextInput
                                labelClassName={"text-capitalize"}
                                labelText={"name"}
                                value={name}
                                onChange={this.handelChange("name")}
                            />
                        </div>
                        <div className="col-xl-6 col-6 col-md-6">
                            <TextInput
                                labelClassName={"text-capitalize"}
                                labelText={"email Id"}
                                value={email}
                                onChange={this.handelChange("email")}

                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-6 col-6 col-md-6">
                            <TextInput
                                labelClassName={"text-capitalize"}
                                labelText={"phone number"}
                                value={mobile}
                                onChange={this.handelChange("mobile")}
                            />
                        </div>
                        <div className="col-xl-6 col-6 col-md-6">
                            <TextInput
                                labelClassName={"text-capitalize"}
                                labelText={"GST No"}
                                value={gstin}
                                maxLength={15}
                                onChange={this.handelChange("gstin")}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-12 col-12 col-md-12">
                            <TextInput
                                labelClassName={"text-capitalize"}
                                labelText={"address"}
                                value={address}
                                cols={"4"}
                                onChange={this.handelChange("address")}
                            />
                        </div>
                    </div>
                    {/*<div className="row">*/}
                    {/*    <div className="col-xl-12 col-12 col-md-12">*/}
                    {/*        <input ref="file" type="file" onChange={this.onChange}/>*/}
                    {/*        {logo && <img src={logo} style={{width:'100%', height: 150}}/>}*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </form>
            </BaseModal>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        client: state?.client?.clients,
        loading: state?.client?.loading,
        error: state?.client?.error
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        createClient: (params) => dispatch(createClientRequest(params)),
        updateClient: (params) => dispatch(updateClientRequest(params)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserModal);
