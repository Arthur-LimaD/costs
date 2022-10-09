import React from "react";
import styles from './footer.module.css'
import {FaFacebook, FaInstagram, FaLinkedin, FaGithub} from 'react-icons/fa'

function Footer () {
    return <div className={styles.footer}>

                    <ul>
                        <li><a href="facebook.com"><FaFacebook/></a></li>
                        <li><a href="instagram.com"><FaInstagram/></a></li>
                        <li><a href="linkedin.com"><FaLinkedin/></a></li>
                        <li><a href="github.com"><FaGithub/></a></li>

                    </ul>
                    <h5><span>Costs </span> &copy; 2022</h5>
                
            </div>  
}

export default Footer