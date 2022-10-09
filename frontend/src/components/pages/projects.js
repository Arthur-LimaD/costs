import React, {useEffect, useState} from "react"
import Message from "../layout/message"
import { useNavigate, useLocation } from 'react-router-dom'
import styles from './projects.module.css'
import Container  from "../layout/container"
import LinkButton from "../layout/linkbutton"
import ProjectCard from'../project/projectcard'
import Loading from "../layout/loading"

function Projects () {

    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const navigate = useNavigate();

    useEffect(()=> {
        //setTimeout(()=> {
            fetch('http://localhost:80/projects')
            .then(response => response.json())
            .then(data => {
                setProjects(data)
                setRemoveLoading(true)
            });
        //}, 1000)
        
        
    }, [])

    function removeProject (id) {

        fetch(`http://localhost:80/projects/:${id}`, {
            method: 'delete',
            headers: {
                'Content-type' : 'aplication/json'
            },
        })
        .then(response => response.json())
        .then( ()=> {
            setProjects(projects.filter((project)=> project.id !== id))
            navigate('/Projects' , {state: {message: 'Project deleted with sucess!'}})
        })
        .catch((error)=> {
            console.log(error)
        });

    }

    const location = useLocation();
    let msg = '';

    if(location.state){
        msg = location.state.message;
    }

    return (<>
        <div className={styles.container}>
            <div className={styles.title}>
                <h1>My Projects</h1>
                <LinkButton to="/newproject" text="New"/>
            </div>
            {msg && <Message msg={msg} type="success"/>}
            <Container customClass="start">
                {projects.length > 0 && 
                projects.map((project)=> (
                    <ProjectCard 
                    name={project.name}
                    id={project.id}
                    budget={project.budget}
                    key={project.id}
                    category={project.category.name}
                    handleRemove={removeProject}
                    />
                )) /*: (
                <div className={styles.no_project}>
                    <h4>No project created, create a new one:</h4><br/>
                    <LinkButton to="/newproject" text="Create a new Project"/>
                </div>
                )*/}
                {!removeLoading && <Loading />}
            </Container>
        </div>
    </>)
}

export default Projects