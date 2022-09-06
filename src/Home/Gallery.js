import React, {useCallback, useState} from 'react';
import WebBase from "./WebLayout/WebBase";
import {Card} from "react-bootstrap";
import ImageViewer from 'react-simple-image-viewer';
const images = [
    'img/51.jpeg',
    'img/52.jpeg',
    'img/53.jpeg',
    'img/54.jpeg',
    'img/55.jpeg',
    'img/56.jpeg',
    'img/57.jpeg',
    'img/58.jpeg',
    'img/59.jpeg',
    'img/60.jpeg',
    'img/61.jpeg',
    'img/62.jpeg',
    'img/63.jpeg',
    'img/64.jpeg',
    'img/65.jpeg',
    'img/66.jpeg',
    'img/67.jpeg',
    'img/68.jpeg',
    'img/69.jpeg',
    'img/70.jpeg',
    'img/71.jpeg',
    'img/72.jpeg',
    'img/73.jpeg',
    'img/74.jpeg',
    'img/3.jpeg',
    'img/2.jpeg',
    'img/4.jpeg',
    'img/5.jpeg',
    'img/6.jpeg',
    'img/7.jpeg',
    'img/8.jpeg',
    'img/9.jpeg',
    'img/10.jpeg',
    'img/12.jpeg',
    'img/13.jpeg',
    'img/14.jpeg',
    'img/16.jpeg',
    // 'img/17.png',
    'img/18.jpeg',
    'img/19.jpeg',
    'img/20.jpeg',
    // 'img/20.png',
    'img/21.jpeg',
    'img/22.jpeg',
    'img/23.jpeg',
    'img/24.jpeg',
    'img/25.jpeg',
    'img/26.jpeg',
    'img/27.jpeg',
    'img/28.jpeg',
    'img/29.jpeg',
    'img/30.jpeg',
    'img/31.jpeg',
    'img/32.jpeg',
    'img/33.jpeg',
    'img/34.jpeg',
    'img/35.jpeg',
    'img/36.jpeg',
    'img/37.jpeg',
    'img/38.jpeg',
    'img/39.jpeg',
    'img/40.jpeg',
    'img/41.jpeg',
    'img/42.jpeg',
    'img/43.jpeg',
    'img/44.jpeg',
    'img/45.jpeg',
    'img/46.jpeg',
    'img/47.jpeg',
    'img/48.jpeg',
]

const Pic = ({src, onClick, index}) => {
    return (
        <Card style={{margin: 10, cursor: 'pointer'}}>
            <img onClick={()=>onClick(index)} style={{border: '1px solid blue', borderRadius:10, width: 200, height: 200}} src={src} />
        </Card>
    )
}

const Gallery = () => {
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



export default Gallery