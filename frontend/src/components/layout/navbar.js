import React from "react";
import { Link } from "react-router-dom";
import styles from "./navbar.module.css"

function Navbar () {
    return <div className={styles.navbar}>
      <div className={styles.navtitle}>
        <h1>Costs</h1>
      </div>
      <div >
      <ul className={styles.navlinks}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/Projects">Projects</Link>
        </li>
        <li>
          <Link to="/Contact">Contact</Link>
        </li>
        <li>
          <Link to="/Company">Company</Link>
          </li>
      </ul>
      </div>
        
      </div>
}

export default Navbar