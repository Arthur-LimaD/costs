import styles from './container.module.css'
import React from 'react';

function Container (props) {
    return (
        <div className={`${styles.container} ${styles[props.customClass]}`}>{props.children}</div>
    )
}

export default Container