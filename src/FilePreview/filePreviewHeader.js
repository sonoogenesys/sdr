import React from 'react';
import Actions from './actions';

const FilePreviewHeader = (props) => {
    return (
        <thead>
            <tr style={{height:"50px", whiteSpace: 'pre',color:'#fff'}}>
                <th style={{padding:10,fontWeight:'normal', fontSize:'15px'}}>
                    <span>{props.filename}</span>
                </th>
                <th style={{width:'80%'}}></th>
                <th>
                    {
                        props.contentToDisplay &&
                            <Actions 
                                togglePreview   = {props.togglePreview} 
                                contentToDisplay= {props.contentToDisplay}
                                downloadFile    = {props.downloadFile}
                            />
                    }
                </th>
            </tr>
        </thead>
    );
};

export default FilePreviewHeader;
