import React from "react";
import styles from './newproject.module.css'
import ProjectForm from "../project/projectform";


function NewProject () {

    function createPost(project) {

        project.cost = 0;
        project.services = [];

        if(project.category === undefined){
            project.category = {
                name: 'Infra',
                id: 0
            }
        }

        fetch('http://localhost:80/projects', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(project)
        })
        .then((res)=> {
            res.json()
        })
        .catch((error)=> {
            console.log(error)
        })

    }

    return (<div className={styles.newproject}>
                <h1>Create project</h1>
                <p>Please Fill out the inputs to create your new project</p>

                <ProjectForm handleSubmit={createPost} btnText="Create Project"/>
            </div>)
}

export default NewProject