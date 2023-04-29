
import {
    PhoneOutlined,
    MailOutlined
} from '@ant-design/icons';
import React, {useState} from "react";
import {NavLink} from 'react-router-dom';
import {Row, Col } from 'antd'

const WebHeader = (props) => {
    return (
        <>
            <header style={{zIndex: 10, height:70, width:'100%',position:'fixed',backgroundColor:'white'}}>
                    <Col style={{display: 'flex', justifyContent:'space-around', alignItems:'center'}}>
                    <Row style={{width: '70%'}}>
                        <div className="col-lg-2">
                            <div className={'logo'}>
                               <NavLink to="/">
                               <img
                                    src="/img/logo.png"
                                    alt="LOGO"
                                    style={{width: '200px'}}
                                    className="mt-2 ml-5"
                                />
                               </NavLink>
                            </div>
                        </div>

                    </Row>
                    <Row style={{width: '30%', justifyContent:'space-around'}}>
                        <span><MailOutlined /> sales@sdrcoolingsystems.com</span>
                        <br/>
                        <span><PhoneOutlined /> +91 9910367993, 9582647999</span>
                    </Row>
                    </Col>
            </header>
        </>
    );
}

export default WebHeader;
