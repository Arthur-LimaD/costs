import React from "react";
import savings from '../images/savings.svg'
import styles from './home.module.css'
import LinkButton from '../layout/linkbutton';

function Home () {
    return (
    <section className={styles.home}>
        <h1>Welcome to the <span>Costs</span></h1>
        <p>Start gerenciating your projects right now!</p>
        <LinkButton to="/NewProject" text="Create New Project" />
        <img src={savings} alt="savings"/>
    </section>)
}

export default Home