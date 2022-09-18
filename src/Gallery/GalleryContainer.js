import React from 'react'
import Card from "react-bootstrap/Card";
import {
    createGalleryRequest,
    fetchAllGallerysRequest,
    updateGalleryRequest
} from "./Duck/GalleryActions";
import {connect} from "react-redux";
import StatusToggleModal from "./StatusToggle";

class galleryContainer extends React.Component {
    state = {
        images: [],
        showToggleStatusModal: false,
        imageId: null
    }
    componentDidMount() {
        let {fetchGallery} = this.props;
        fetchGallery();
    }

    onChange = (event) => {
        let {createGallery} = this.props
        let file = this.refs.file.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function (e) {
            let images = this.state.images;
            images.push([reader.result])
            this.setState({
                images: images
            })
            let params = new FormData();
            params.set("files", event?.target?.files?.[0]);
            createGallery(params)
        }.bind(this);
        // Would see a path?
    }

    getFilterGallery = () => {
        let { gallery } = this.props;

        let data = gallery && Object.values(gallery)

        return data || [];
    }

    handleToggleStatusModal = (show = false, imageId) => {
        this.setState({
            showToggleStatusModal: show,
            imageId: imageId,
        });
    }

    render(){
        let {imageId, showToggleStatusModal} = this.state;
        let data = this.getFilterGallery();
        
        return (
            <React.Fragment>
                <input ref="file" multiple={false} type="file" onChange={this.onChange}/>
            {/*<FilePicker ref="file" onChooseFile={this.onChange} label={'Upload gallery images'} style={{height: 100, width: 100}}/>*/}
                <div className={'mb-5'}>
                    <div className={'m-5 row'} style={{position: 'relative'}}>
                        {data.map(o=> <Card style={{height: 270, width: 200,margin: 10, padding: 10}} key={o._id} onClick={() => this.handleToggleStatusModal(true, o._id)}>
                                <img style={{height: '80%', width: '100%'}} src={o.logo} />
                                <p style={{marginTop: 5}}><b>Name: </b>{o.name}</p>
                                <p><b>Status: </b>{o.active ? "Show" : "Hide"}</p>
                            </Card>)}
                    </div>
                </div>

                <StatusToggleModal
                    show={showToggleStatusModal}
                    handleModal={this.handleToggleStatusModal}
                    imageId={imageId}
                />

        </React.Fragment>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        gallery: state?.gallery?.gallery,
        loading: state?.client?.loading,
        error: state?.client?.error
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchGallery: (params) => dispatch(fetchAllGallerysRequest(params)),
        createGallery: (params) => dispatch(createGalleryRequest(params)),
        updateGallery: (params) => dispatch(updateGalleryRequest(params)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(galleryContainer);