/*
    Created by Nitish on 25/02/21.
 */
import React from 'react';

const Actions = (props) => {
    let {togglePreview, downloadFile, contentToDisplay} = props;

    let {id,filename} = contentToDisplay;

    const print = () =>{
        let prtContent = document.getElementById("contentPreview");
        let WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
        WinPrint.document.write(prtContent.innerHTML);
        WinPrint.document.close();
        WinPrint.focus();
        WinPrint.print();
        WinPrint.close();
    }

    return (
        <div className='flex-center' style={{padding:10,fontSize:20}}>
            <i className="fa mr-5 pointer fa-download" title='Download' onClick={()=>downloadFile(id, filename)} aria-hidden="true"></i>
            <i className="fa mr-5 pointer fa-print" title='Print' onClick={print} aria-hidden="true"></i>
            <i className="fa mr-5 pointer fa-times" title='Close' onClick={()=>togglePreview(null, [])} aria-hidden="true"></i>
        </div>
    )
}

export default Actions;
