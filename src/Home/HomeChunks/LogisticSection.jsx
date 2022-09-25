import React, {useEffect, useState} from 'react';

const LogisticSection = ({aboutItem}) => {

    console.log(aboutItem)

    return (
        <section className="featuresbg">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12 mt-5">
                        <h4 className="heading_fs text-center mb-5">KCS Introduction</h4>
                        <p className={'text-justify mt-2'}>{aboutItem.aboutUs}</p>
                        {/*<p>KCS Electrical Engineers is a complete Electrical Engineering firm. We are a brand which ensures inimitable services to our clients. KCS Electrical strives for nothing but the best.*/}
                        {/* </p><p>   KCS Electrical came into existence in the year 2006. KCS Electrical is a brainchild of qualified engineers sharing common goals and professional acumen in their respective domains. We work with our clients as partners to cater all their requirements in a simple and cost effective manner.*/}
                        {/*</p>*/}
                        {/*<p>*/}
                        {/*    Our forte was in Electrical Engineering projects. We now provide a complete gamut of services for Electrical Turnkey projects, Electrical Engineering consultancy.*/}
                        {/*</p>*/}
                        {/*<p>*/}
                        {/*    Our personnel management strategies focus on building human resource and creating an environment where talent can be procreated. Client satisfaction is our motto and we are a perfect blend of employee talent, technical expertise and modern technology.*/}
                        {/*</p>*/}
                    </div>
                </div>
            </div>
        </section>

    )
}

export default LogisticSection
