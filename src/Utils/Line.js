const Line = (props) => {
    return(<div className={'border-top border-dark'} style={{marginLeft: props?.left ? props.left : '25px'}}/>)
}

export default Line;