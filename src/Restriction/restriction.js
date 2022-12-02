import React from "react";
import {Result} from 'antd'

class Restriction extends React.Component {
    render() {
        return(
            <Result
                status="500"
                title=""
                style={{position: 'absolute', left: "50%", top: '25%', fontSize: 25}}
                subTitle="Sorry, something went wrong."
                // extra={<Button type="primary">Back Home</Button>}
            />
        );
    }
}

export default Restriction;