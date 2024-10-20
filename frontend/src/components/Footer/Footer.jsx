import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faXTwitter, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import styleFooter from './Footer.module.css'

export default function Footer() {
    return (
        <div className={styleFooter.contentFooter}>
            <div className={styleFooter.leftFooter}>
                <div className={styleFooter.desc}>
                    <h1>SHAGARA</h1>
                    <p>we will so happy if you contact with us on our websites</p>
                </div>
                <div className={styleFooter.icons}>
                    <FontAwesomeIcon icon={faLinkedin} className={styleFooter.icon} />

                    <FontAwesomeIcon icon={faXTwitter} className={styleFooter.icon} />

                    <FontAwesomeIcon icon={faFacebook} className={styleFooter.icon} />

                    <FontAwesomeIcon icon={faInstagram} className={styleFooter.icon} />


                </div>

            </div>
            <div className={styleFooter.rightFooter}>
                <div className={styleFooter.boxContact}>
               
                <a href="mailto:someone@example.com" className={styleFooter.email}> <FontAwesomeIcon icon={faEnvelope} className={styleFooter.icon2} /></a>
                    <a href="mailto:someone@example.com" className={styleFooter.email}><h4>info@gmail.com</h4></a> 

                </div>
                <div className={styleFooter.boxContact}>
                    <FontAwesomeIcon icon={faPhone} className={styleFooter.icon2} />
                    <h4>+201245874521</h4>
                </div>
            </div>
        </div>
    )
}
