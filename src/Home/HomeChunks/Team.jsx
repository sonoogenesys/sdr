

import React from 'react'

const Team = () => {
        return (
            <>
                <section className="pt-4">
                    {/*<div className="container-fluid p-0 d-lg-block d-none">*/}
                    {/*    <h4 className="heading_fs text-center pb-3"><strong>Location</strong></h4>*/}
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112239.27765807435!2d76.89750291640625!3d28.465165299999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19129a8774a9%3A0xa89ae8c88974106f!2sKCS%20Electrical%20Traders%20%26%20Engineering!5e0!3m2!1sen!2sin!4v1661666764704!5m2!1sen!2sin"
                            className="teamImg"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            style={{ border: "0px" }}
                        />
                        {/*<div class="teamImg"></div>*/}
                    {/*</div>*/}
                </section> 
            </>
        )
    }

export default Team
