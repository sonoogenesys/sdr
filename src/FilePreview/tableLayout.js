/**
 * Created by Nitish on 25/02/21.
 */
import React, {Component} from 'react';
// import {Spin, Icon, Row} from 'antd'
import axios from 'axios';
import appUrl from '../Constants/AppUrl';
import FilePreviewHeader from "./filePreviewHeader";
import FilePreviewBody from "./filePreviewBody";
import fileDownload from 'js-file-download';
import {showNotification} from '../Utils/CommonFunctions'

const style={
    table:{
        tableLayout     : 'fixed',
        position        : 'fixed',
        top             : 0,
        left            : 0,
        bottom          : 0,
        right           : 0,
        width           : '100%',
        height          : '100%',
        maxHeight       : '100%',
        minHeight       : '100%',
        border          : 'none',
        margin          : 0,
        padding         : 0,
        overflow        : 'hidden',
        zIndex          : '999999',
        background      : 'rgba(16, 16, 16, 0.75)',
        backgroundImage : 'linear-gradient(180deg, #000000e0, transparent)',
        // boxShadow:'5px 5px #0000005e'
        // opacity: '!0.95'
    }
}

const loader = <div style={{fontSize:'20px'}}>Loading....</div>;

class TableLayout extends Component {
    constructor(props){
        super(props);
        // this.state={
        //     content:this.props.content
        // }
        this.leftRightKeysPressed = this.leftRightKeysPressed.bind(this);
    }

    componentDidMount() {
        document.addEventListener('keydown', this.leftRightKeysPressed)
    }

    leftRightKeysPressed = (e)=>{
        if(e.keyCode === 39){
            this.toggle(null,'next')
        }

        if(e.keyCode === 37){
            this.toggle(null,'prev')
        }
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.leftRightKeysPressed)
    }

    toggle = (e, navigate) => {
        let content             = [...this.props.content];
        let success             = false;
        let activeContentIndex  = content.findIndex(_content=>_content.active);
        let itemToShow          = null;
        if(activeContentIndex > -1) {
            let currentItem = content[activeContentIndex];
            if((e && e.target.getAttribute('data-id') === 'next') || navigate==='next'){
                let nextItem = content[activeContentIndex + 1];
                if(nextItem) {
                    nextItem.active = true;
                    success=true;
                    currentItem.active=false;
                    itemToShow = nextItem;
                }
            }else {
                let prevItem = content[activeContentIndex - 1];
                if(prevItem) {
                    prevItem.active = true;
                    success=true;
                    currentItem.active=false;
                    itemToShow = prevItem;
                }
            }

            success && this.props.checkIfBlobURLExists(itemToShow.id, content);
        }
    }

    downloadFile(id , filename){    
        showNotification('success', 'Your download has started')
        axios({
            method      : 'GET',
            url         : appUrl.ATTACHMENTS_DOWNLOAD + '/' + id,
            contentType : 'application/doc; charset=utf-8',
            responseType: 'arraybuffer',
        }).then(response => {
            console.log('response', response, filename);
            fileDownload(response.data, filename);
        })
    }

    render() {
        let {togglePreview, content}    = this.props;
        let filePreview                 = null;
        let contentToDisplay            = content.find(content=>content.active)
        let filename                    = contentToDisplay ? contentToDisplay.filename : '';

        // console.log('contentToDisplay',contentToDisplay)

        if(contentToDisplay) {
            if (contentToDisplay.loading) {
                filePreview = loader;
            } else {
                filePreview = contentToDisplay.element;
            }
        }

        return <table style={style.table}>

            <FilePreviewHeader 
                contentToDisplay    = {contentToDisplay} 
                togglePreview       = {togglePreview} 
                filename            = {filename}
                downloadFile        = {this.downloadFile}
            />
            <tbody>
                <tr style={{fontSize:30,color:'#fff'}}>
                    <td style={{width:'5%'}}>
                        {
                            contentToDisplay && !contentToDisplay.isThisFirstItem &&
                                <div className='pointer' data-id="previous" onClick={e=>this.toggle(e, 'previous')}>
                                    <i className="fa fa-chevron-left" aria-hidden="true" title='Previous' style={{padding:10}}></i>
                                </div>
                        }
                    </td>
                    <FilePreviewBody contentToDisplay={filePreview} toggle={this.toggle}/>
                    <td style={{width:'5%'}}>
                        {
                            contentToDisplay && !contentToDisplay.isThisLastItem &&
                                <div className='pointer' data-id="next" onClick={e=>this.toggle(e, 'next')}>
                                    <i className="fa fa-chevron-right" aria-hidden="true" title='Next' style={{float:'right',padding:10}}></i>
                                </div>
                        }
                    </td>
                </tr>
            </tbody>
        </table>;
    }
}

export default TableLayout;
