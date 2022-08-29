/*
    Created by Nitish on 25/2/21.
 */
import React, {Component} from 'react';
import TableLayout from "./tableLayout";
import axios from "axios";
import appUrl from '../Constants/AppUrl'

const imgSet        = new Set(['jpg', 'jpeg', 'png','gif']);
const docSet        = new Set(['doc', 'docx','xls','xlsx','ppt','pptx','csv']);
const textSet       = new Set(['txt']);
const pdfSet        = new Set(['pdf']);
const compressedSet = new Set(['zip','rar']);
const audioSet      = new Set(['aac', 'mp3', 'm4a', 'ogg', 'wav', 'wma']);
const videosSet     = new Set(['webm','flv', 'avi', 'mov', 'mp4', 'm4v', 'mpg', 'mpeg']);
// ['dwg','dwf','dwl', 'ppt', 'pptx', 'xls', 'xlsx', 'csv', 'txt'];

class FilePreviewWrapper extends Component {

    constructor(props){
        super(props);
        this.state={
            blobContent : [],
        }
    }

    componentDidMount() {
        // 1. Check if the file has blob url
        // 2. If yes, do nothing
        // 3. Else download the file, create blob url and save it.
        let extension
        let size            = this.props.data;
        let blobContent     = this.props.data.map((d, i) => {
            extension       = d.filename.split('.')
            extension       = extension[extension.length-1]
            return {
                id              : d._id,
                filename        : d.filename,
                extension       : extension,
                isThisFirstItem : i === 0,
                isThisLastItem  : i === size - 1,
                active          : this.props.showPreviewOfFileId === d._id,
                blobURL         : null,
                element         : null,
                loading         : true
            }
        })
        this.setState({blobContent});
        this.checkIfBlobURLExists(this.props.showPreviewOfFileId, blobContent)
    }

    checkIfBlobURLExists = (fileId, blobContent) => {
        let content = [...blobContent];
        let file = content.find(file=>file.id === fileId);
        if(file.blobURL) {
            file.active = true;
            this.setState({blobContent:content});
        }else{
            // this will work when
            // 1. The file preview is opened for first time, to initialize all files and set BLOB URL for current file
            // 2. The file preview is already opened and you try to open a file which does not have BLOB URL. The BLOB URL of other files will not be touched

            file.loading = true;
            this.setState({blobContent:content});
            this.downloadFile(fileId,content, file.extension).then(blobContent=>{
                this.setState({blobContent});
            });
        }
    }


    downloadFile = (showPreviewOfFileId, blobContent, extension) => {
        let responseType = 'blob';

        let path = appUrl.ATTACHMENTS_DOWNLOAD;

        if(docSet.has(extension)){
            path = appUrl.ATTACHMENTS_DOWNLOAD;
        }

        let size = blobContent.length;

        return new Promise((resolve,reject)=> {

            axios({
                method  : 'GET',
                url     : `${path}/${showPreviewOfFileId}`,
                responseType,
                // contentType: 'application/doc; charset=utf-8',
            }).then((response) => {
                blobContent.forEach((d, i) => {
                    if (d.id === showPreviewOfFileId) {
                        let {element, blobURL}  = this.getElement(response.data, d);
                        d.isThisFirstItem       = i === 0;
                        d.isThisLastItem        = i === size - 1;
                        d.element               = element;
                        d.blobURL               = blobURL;
                        d.loading               = false;
                    }
                })

                resolve(blobContent);
            })
        })
    }

    // readFile = (reader,blob) => {
    //     return new Promise((resolve)=>{
    //         reader.addEventListener('loadend',(e)=>{
    //             let textFileData = e.srcElement.result;
    //             console.log('textFileData', textFileData);
    //             resolve(textFileData)
    //         })
    //         reader.readAsText(blob);
    //     })
    // }

    changeFileData = (file) => {
        let files = this.state.blobContent.map(f =>{
            if(file.id === f.id){
                f.element   = file.element;
                f.blobURL   = file.blobURL;
                f.error     = file.error;
                // this.currentFileName = file.attributes.filename;
            }
            return f;
        });
        this.setState({blobContent: files});
    }

    getElement = (response, file) => {
        let element, blobURL, extension = file.extension.toLowerCase();
        let url = window.URL || window.webkitURL;

        switch(true){
            case imgSet.has(extension):
                blobURL = url.createObjectURL(new Blob([response]));
                element = <img src={blobURL} style={{maxHeight:'calc(100vh - 50px)'}} alt='Preview' />;
                break;

           
            case textSet.has(extension):
                let blob    = new Blob([response], {type:'text/plain'});
                let reader  = new FileReader();
                reader.addEventListener('loadend',(e)=>{
                        blobURL     = url.createObjectURL(blob);
                        let element = <div>
                                        <div><pre>{e.target.result}</pre></div>
                                    </div>
                        file.element = element;
                        file.blobURL = blobURL;
                        this.changeFileData(file);
                    });
                // reader.readAsText(blob, 'UTF-8');
                reader.readAsBinaryString(blob);
                break;
            // case docSet.has(extension):
            //     blobURL = url.createObjectURL(new Blob([response], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,"}));
            //     element =   <iframe 
            //                     title       = 'Preview' 
            //                     src         = {blobURL + '#toolbar=0&navpanes=0&scrollbar=0'} 
            //                     frameBorder = "0" 
            //                     style       = {{width:'inherit',height:'inherit'}} 
            //                     scrolling   = "no" >
            //                 </iframe>
            //     break;
            case pdfSet.has(extension):
                blobURL = url.createObjectURL(new Blob([response], {type:'application/pdf'}));
                element =   <iframe 
                                title       = 'Preview' 
                                src         = {blobURL + '#toolbar=0&navpanes=0&scrollbar=0'} 
                                frameBorder = "0" 
                                style       = {{width:'inherit',height:'inherit'}} 
                                scrolling   = "no" >
                            </iframe>
                break;
            case compressedSet.has(extension): 
                blobURL = url.createObjectURL(new Blob([response], {type:'application/zip'}));
                break;
            case audioSet.has(extension): 
                blobURL = url.createObjectURL(new Blob([response], {type:`audio/${extension}`}));
                element =   <audio controls autoplay controlsList="nodownload">
                                <source src={blobURL} type={`audio/${extension}`} />
                                Your browser doesn't support HTML5 video in WebM with VP8/VP9 or MP4 with H.264.
                            </audio>    
                break;
            case videosSet.has(extension): 
                blobURL = url.createObjectURL(new Blob([response], {type:`video/${extension}`}));
                element =   <video controls autoplay autobuffer="true">
                                <source src={blobURL} type="video/mp4" />
                                Your browser doesn't support HTML5 video in WebM with VP8/VP9 or MP4 with H.264.
                            </video>
                break;

            default:
                element = <div>
                    <div>No preview available</div>
                </div>
        }

        return {element, blobURL};
    }


    render() {
        let {togglePreview} = this.props;
        let {blobContent} = this.state;

        return  <TableLayout 
                    checkIfBlobURLExists= {this.checkIfBlobURLExists} 
                    content             = {blobContent} 
                    togglePreview       = {togglePreview}
                />
    }
}

export default FilePreviewWrapper;
