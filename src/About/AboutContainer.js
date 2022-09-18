import React, { Component } from "react";
import { Accordion, Card } from "react-bootstrap";
import TextInput from "../Utils/TextInput";
import axios from "axios";
import appUrl from "../Constants/AppUrl";

export default class RoleDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            aboutUs: "KCS Electrical is a complete Electrical Engineering firm. We are a brand which ensures inimitable services to our clients. KCS Electrical strives for nothing but the best.\n" +
                "KCS Electrical came into existence in the year 2006. KCS Electrical is a brainchild of qualified engineers sharing common goals and professional acumen in their respective domains. We work with our clients as partners to cater all their requirements in a simple and cost effective manner.\n" +
                "Our forte was in Electrical Engineering projects. We now provide a complete gamut of services for Electrical Turnkey projects, Electrical Engineering consultancy. Our personnel management strategies focus on building human resource and creating an environment where talent can be procreated. Client satisfaction is our motto and we are a perfect blend of employee talent, technical expertise and modern technology.",
            ourVision: "To be the impeccable Electrical Engineering company in India.\n" +
                "Our Vision is to deeply recognize the needs of our Clients who are constantly searching for the latest technologies and new ways of thinking to make the best project decisions. We continuously develop our knowledge and expertise and apply them in helping our Clients in their business activities. With wide experience, we also develop new, efficient software tools that enable our Clients to strengthen their business opportunities. And, above all, we work together with our Clients and transfer our knowledge and experience through comprehensive training courses.",
            clientSatisfaction: "Your complete satisfaction is our mission. Our success will be measured in client satisfaction and in our ability to exceed our client's expectations. We strive to be a renowned name in the industry, through a continuous improvement program.\n" +
                    "Being a customer centric organization, we at KCS Electrical know that the client satisfaction is directly proportional to the quality of the products. Client satisfaction and quality, both are our specialty. We have stuck to the stringent quality policy and have never compromised with it. We have a separate quality team which performs the quality test during the procurement of electrical goods from renowned suppliers and manufacturers, just to ensure the reliability of our products and client satisfaction"
        };
    }

    componentDidMount() {
        axios.get(appUrl.ABOUT_URL).then(response=>{
            if(response?.data?.about){
                this.setState({
                    aboutUs: response?.data?.about.aboutUs,
                    ourVision: response?.data?.about.ourVision,
                    clientSatisfaction: response?.data?.about.clientSatisfaction,
                })
            }
        }).catch(err=>console.log(err))
    }

    updateData = () => {
        this.setState({loading: true})
        let data = {
            aboutUs: this.state.aboutUs,
            ourVision: this.state.ourVision,
            clientSatisfaction: this.state.clientSatisfaction,
        }
        axios.put(appUrl.ABOUT_URL, data).then(response=>{
            if(response?.data?.about){
                this.setState({
                    aboutUs: response?.data?.about.aboutUs,
                    ourVision: response?.data?.about.ourVision,
                    clientSatisfaction: response?.data?.about.clientSatisfaction,
                    loading: false
                })
            }
        }).catch(err=>{
            this.setState({loading: false})
        })
    }

    handleAboutUs = (e) => {
        this.setState({aboutUs: e.target.value})
    }
    handleOurVision = (e) => {
        this.setState({ourVision: e.target.value})
    }
    handleClientSatisfaction = (e) => {
        this.setState({clientSatisfaction: e.target.value})
    }


    render() {
        let {aboutUs, ourVision, clientSatisfaction, loading} = this.state
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box d-flex align-items-center justify-content-between">
                            <div className="page-header">
                                <div>
                                    <h2 className="main-content-title tx-24 mg-b-5">
                                        About Page
                                    </h2>
                                </div>
                            </div>
                            <button
                                type="button"
                                className="btn btn-primary my-2 btn-icon-text role_bck_btn"
                                disabled={loading}
                                onClick={this.updateData}
                            >
                                {
                                    loading ?
                                        <>
                                            <span className="spinner-border spinner-border-sm"></span>
                                            <span className="visually-hidden">  Updating...</span>
                                        </>
                                        : "Update"
                                }
                            </button>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">

                                <div className="row">
                                    <div className="col-md-12 role_detail">
                                        <Accordion defaultActiveKey="0">
                                            <Accordion.Toggle
                                                as={Card.Header}
                                                eventKey="0"
                                                className="d-flex align-items-center justify-content-between mb-2"
                                            >
                                                <h4 className="mb-0">
                                                    <i className="fa fa-chevron-down accordion_arrow"></i>
                                                    About US
                                                </h4>
                                                <div className="d-flex">
                                                </div>
                                            </Accordion.Toggle>
                                            <Accordion.Collapse eventKey="0">
                                                <div className="card-body">
                                                    <TextInput onChange={this.handleAboutUs} rows="8" cols="50" value={aboutUs}/>
                                                </div>
                                            </Accordion.Collapse>
                                            <Accordion.Toggle
                                                as={Card.Header}
                                                eventKey="1"
                                                className="d-flex align-items-center justify-content-between mb-2"
                                            >
                                                <h4 className="mb-0">
                                                    <i className="fa fa-chevron-up accordion_arrow"></i>
                                                    Our Vision
                                                </h4>
                                                <div className="d-flex">
                                                </div>
                                            </Accordion.Toggle>
                                            <Accordion.Collapse eventKey="1">
                                                <div className="card-body">
                                                    <TextInput onChange={this.handleOurVision} rows="8" cols="50" value={ourVision}/>
                                                </div>
                                            </Accordion.Collapse>

                                            <Accordion.Toggle
                                                as={Card.Header}
                                                eventKey="2"
                                                className="d-flex align-items-center justify-content-between mb-2"
                                            >
                                                <h4 className="mb-0">
                                                    <i className="fa fa-chevron-up accordion_arrow"></i>
                                                    Client Satisfaction
                                                </h4>
                                                <div className="d-flex">
                                                </div>
                                            </Accordion.Toggle>
                                            <Accordion.Collapse eventKey="2">
                                                <div className="card-body">
                                                    <TextInput onChange={this.handleClientSatisfaction} rows="8" cols="50" value={clientSatisfaction}/>
                                                </div>
                                            </Accordion.Collapse>
                                        </Accordion>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
