import {Component} from 'react';
import ReactDOM from 'react-dom';

class FilePreviewModal extends Component {

    constructor(props){
        super(props);
        this.el = document.createElement('div');
    }

    componentDidMount() {
        this.filePreview = document.getElementById('filePreview');
        this.filePreview.appendChild(this.el);
        document.onkeydown = (evt) => {
            evt = evt || window.event;
            if (evt.keyCode === 27) {
                this.props.toggleModal(null);
            }
        };
    }

    componentWillUnmount() {
        this.filePreview.removeChild(this.el);
    }

    render() {
        return ReactDOM.createPortal(this.props.children,this.el);
    }
}

export default FilePreviewModal;
