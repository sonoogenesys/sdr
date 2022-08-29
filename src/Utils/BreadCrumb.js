import {Breadcrumb} from 'react-bootstrap'

const BreadCrumb = (props) => {
    const {title = []} = props

    return (
        <Breadcrumb>
            {/* {
                title.map((value, index) =><Breadcrumb.Item key={index} active={index === title?.length - 1}>{value}</Breadcrumb.Item>)
            } */}

            {
                title.map((value, index) =><li key={index} className={ index === title?.length - 1 ? "breadcrumb-item active" : "breadcrumb-item"}>{value}</li>)
            }
        </Breadcrumb>
    )
}

export default BreadCrumb