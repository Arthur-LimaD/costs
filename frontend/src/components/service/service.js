import React from "react";
import styles from '../project/projectcard.module.css'
import {BsFillTrashFill} from 'react-icons/bs'

function Service ({id, name, cost, description, handleRemove}) {

    const remove = (e)=> {
        e.preventDefault()
        handleRemove(id, cost)
    }

    return (
    <div className={styles.project_card}>
        <div>

        </div>
        <h4>{name}</h4>
        <p>
            <span>Total Cost: </span> R${cost}
        </p>
        <p>{description}</p>
        <div className={styles.project_card_actions}>
        <button onClick={remove}>
            <BsFillTrashFill />
            Delete
        </button>
        </div>
        
    </div>
    )
}

export default Service