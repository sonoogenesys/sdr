import React, {useCallback, useState} from 'react';
import WebBase from "./WebLayout/WebBase";
import {Card} from "react-bootstrap";
import ImageViewer from 'react-simple-image-viewer';
import {connect} from "react-redux";
let images = []

const Pic = ({src, onClick, index}) => {
    return (
        <Card style={{margin: 10, cursor: 'pointer'}}>
            <img onClick={()=>onClick(index)} style={{border: '1px solid blue', borderRadius:10, width: 200, height: 200}} src={src} />
        </Card>
    )
}

const Gallery = ({gallery}) => {
    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);

    const openImageViewer = useCallback((index) => {
        setCurrentImage(index);
        setIsViewerOpen(true);
    }, []);

    const closeImageViewer = () => {
        setCurrentImage(0);
        setIsViewerOpen(false);
    };

    if(Object.keys(gallery).length > 0){
        images = Object.values(gallery).filter(o=>o.active);
        images = images.map(o=>o.logo)
    }

    return (
        <>
            <WebBase>
                {isViewerOpen && (
                    <ImageViewer
                        src={ images }
                        currentIndex={ currentImage }
                        disableScroll={ true }
                        closeOnClickOutside={ true }
                        onClose={ closeImageViewer }
                    />
                )}
                <div className={'row relative p-5 mb-5'}>
                    {
                        images.map((pic, i)=>{
                            return <Pic key={i} src={pic} onClick={openImageViewer} index={i}/>
                        })
                    }
                </div>
            </WebBase>
        </>
            )
}

const mapStateToProps = (state) => {
    return {
        // about: state?.about?.about,
        gallery: state?.gallery?.gallery,
        // client: state?.client?.clients,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Gallery)
