import React from 'react';

const FilePreviewBody = (props) => {
    return  <td style={{width:'90%'}}>
                <div className='flex-center' id='contentPreview' style={{height:'100%', width:'100%'}}>
                    {props.contentToDisplay}
                </div>
            </td>
}

export default FilePreviewBody;
