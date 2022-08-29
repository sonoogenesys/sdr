


import React, {useState} from 'react';
import ShowContactUs from './ShowContactUs'

const FindOut = () => {

    const [showContact, setshowContact] = useState(false)


    const showContactUs = () =>{
        setshowContact(!showContact)
    }

    return (
        <>
            <section style={{backgroundColor: '#f4f4f4'}}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-12">
                            <div className="work-together">
                                <p className="mb-0">
                                For partnership and product demo
                                </p>
                                <a href="#" onClick={showContactUs} rel="noopener noreferrer" className="theme_bg_color text-white text-center text-uppercase pt-2 pb-2 text-decoration-none d-inline-block">contact us</a>
                            </div>
                        </div>
                    </div>
                </div>        
            </section>  
            <ShowContactUs 
          show={showContact}
          handleClose={showContactUs}
          />
        </>
    )
}

export default FindOut
