import React, { useState } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import axios from 'axios';
import fileDownload from 'js-file-download';
import Tippy from '@tippyjs/react';

import { showNotification } from '../../Utils/CommonFunctions';

import appUrl from '../../Constants/AppUrl';

const WeightDisputeCSVItem = (props = {}) => {
    const { id, index } = props;

    const [state, setState] = useState({
        loading: false,
    });
    const file = useSelector(state => state.weightDispute?.files?.[id]);

    const loggedInUser = useSelector(state => state.loggedInUser?.data?.data);
    const permissions = loggedInUser?.role?._id?.permissions || {};

    if (!file) {
        return <></>;
    }

    const onDownloadAttachment = () => {
        if (state.loading) return;

        const attachment = file?.attachment_id;
        const id = attachment?._id;
        const filename = attachment?.filename;

        setState(preState => ({ ...preState, loading: true }));

        axios({
            method: 'GET',
            url: `${appUrl.ATTACHMENTS_DOWNLOAD}/${id}`,
            contentType: 'application/doc; charset=utf-8',
            responseType: 'arraybuffer',
        })
        .then(res => {
            fileDownload(res.data, filename);
            setState(preState => ({ ...preState, loading: false }));
        })
        .catch(err => {
            console.error('There is some error while uploading a file!', err);
            showNotification('error', 'There is some error while downloading a file!');
            setState(preState => ({ ...preState, loading: false }));
        });
    }

    let logistic_ids = file?.logistic_ids?.filter(logistic => logistic?.name);
    logistic_ids = logistic_ids?.map?.(logistic => logistic?.name);
    const logistic_names = logistic_ids?.join?.();

    return (
        <tr key={`${id}_${index}`}>
            <td style={{textAlign:'center'}}>{index + 1}</td>
            <td>{file?.attachment_id?.filename}</td>
            <td>{logistic_names || "-"}</td>
            <td>{file?.created_by?.first_name || file?.created_by?.email}</td>
            <td style={{ letterSpacing:'0.8px' }}>{file?.created_at ? moment(file?.created_at).format("D MMM YYYY, h:mm a") : "-"}</td>

            <td style={{ textAlign:'center', letterSpacing:'0.8px' }}>
                {
                    permissions?.weight_discrepancy?.weight_dispute_upload?.download &&
                    file?.attachment_id && file?.attachment_id?._id
                    ? (
                        <>
                            {
                                state.loading
                                ? (
                                    <span className="mr-2">
                                        <i className="bx bx-loader bx-spin"></i>
                                    </span>
                                ) : (
                                    <span onClick={onDownloadAttachment}>
                                        <Tippy content="Download file"><i className="bx bxs-download"></i></Tippy>
                                    </span>
                                )
                            }
                        </>
                    ) : "-"
                }
            </td>
        </tr>
    );
}

export default WeightDisputeCSVItem;
