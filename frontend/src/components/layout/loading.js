import React from "react";
import styles from './loading.module.css'
import Rocket from './images/Rocket.gif'

function Loading() {
    return (<div className={styles.loader}>
        <img className={styles.loading} src={Rocket} alt="loading" /><br/>
        Loading Projects...
    </div>)
    
}

export default Loading