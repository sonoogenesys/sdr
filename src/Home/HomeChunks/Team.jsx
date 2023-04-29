

import React from 'react'

const Team = () => {
        return (
            <>
                <section className="pt-5">
                        <h4 className="heading_fs text-center pb-3">Reach Us</h4>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.182856079937!2d77.02163144236839!3d28.474039328950983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d193d206429f9%3A0x7a8ec8907f1bba4f!2sSDR%20COOLING%20SYSTEMS!5e0!3m2!1sen!2sus!4v1682792561761!5m2!1sen!2sus"
                        className="teamImg"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        style={{ border: "0px" }}/>
                </section> 
            </>
        )
    }

export default Team
