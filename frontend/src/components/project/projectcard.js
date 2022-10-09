import React from "react"
import styles from './projectcard.module.css'
import {BsPencil, BsFillTrashFill } from 'react-icons/bs'
import { Link } from "react-router-dom"

function ProjectCard ({ id, name, budget, category, handleRemove }) {
    const remove = (e) => {
        e.preventDefault()
        handleRemove(id)
    }

    return (
        <div className={`${styles.project_card} ${styles.category_text}`}>
            <h4>{name}</h4>
                <h5>Budget: R${budget}</h5> 
            <p className={styles.category_text}>
                <span className={`${styles[category.toLowerCase()]}`}></span> {category}
            </p>
            <div className={styles.project_card_actions}>
                <button>
                    <Link to={`/project/${id}`}>Edit<BsPencil></BsPencil></Link>
                </button>
                <button>
                    <Link to="/" onClick={remove} >Remove<BsFillTrashFill /></Link>
                </button>
            </div>
        </div>
    )
}

export default ProjectCard