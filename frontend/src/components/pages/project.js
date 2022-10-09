import React, {useEffect, useState} from "react"
import { useLocation, useParams} from 'react-router-dom'
import Loading from '../layout/loading'
import  Container  from "../layout/container"
import styles from './project.module.css'
import ProjectForm from '../project/projectform'
import ServiceForm from "../service/serviceform"
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import Service from "../service/service"
import Message from "../layout/message"

function Project () {

    const {id} = useParams()
    const [project, setProject] = useState('');
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [showServiceForm, setShowServiceForm] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setMessageType] = useState('');
    const location = useLocation();
    if(location.state){
        setMessage(location.state.message)
        setMessageType(location.state.type)
    }

    useEffect(()=> {
        fetch(`http://localhost:80/projects/${id}`)
        .then(response => 
            response.json())
        .then( (data)=> {
            console.log(data[0])
            setProject(data[0])
        })
        .catch((error)=> {
            console.log(error)
        });
        
    }, [id])

    function editPost (project) {
        
        if (project.budget < project.cost){
            setMessage('Project budget cannot be less than the project cost!')
            setMessageType('error');
            return false
        } else{
            axios.put(`http://localhost:80/projects/${project.id}`, project)
            .then((response) => 
                response.json()
            ).then( (data)=> {
                setProject(data)
                setShowProjectForm(false)
            }).catch((error)=> {
                console.log(error)
            });
        }
    }
    
    function createService() {
        const lastService = project.services.at(-1)

        lastService.id = uuidv4();

        const lastServiceCost = lastService.Cost;

        const newcost = parseFloat(project.cost) + parseFloat(lastServiceCost);

        if(newcost > parseFloat(project.budget)){
            setMessage('Budget overpassed! Verify your spendings 💸');
            setMessageType('error');
            project.services.pop()
            return false
        }

        project.cost = newcost;

        axios.put(`http://localhost:80/projects/${project.id}`, project)
        .then(response => 
            response.json()
        ).then( (data)=> {
            setProject(data)
            setShowProjectForm(false)
        }).catch((error)=> {
            console.log(error)
        });
        setMessage('Service added with Sucess!');
        setMessageType('success');
            
    }

    function toggleProjectForm () {
        setShowProjectForm(!showProjectForm)
    }

    function toggleServiceForm () {
        setShowServiceForm(!showServiceForm)
    }

    function removeService (id, cost) {

        const servicesUpdated = project.services.filter((service)=> service.id !== id);
        const projectUpdated = project

        projectUpdated.services = servicesUpdated
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

        axios.put(`http://localhost:80/projects/${project.id}`, projectUpdated)
        .then(response => {
            response.json()
            setProject(projectUpdated);
        })
        .catch((error)=> {
            console.log(error)
        });

        setMessage('Service removed with sucess!');
        setMessageType('success');

    }
    

    return (<>
        {project.name ? (
            <div className={styles.project_detais}>
                <Container customClass="column">
                    <div className={styles.detais_container}>
                        <h1>Project: {project.name}</h1>
                        <button className={styles.btn} onClick={toggleProjectForm}>{!showProjectForm ? "Edit project ": "Close"}</button>
                        {!showProjectForm ? (
                            <div className={styles.project_info}>
                                <p>
                                    <span>Category: </span> {project.category.name}
                                </p>
                                <p>
                                    <span>Total Budget: </span> R${project.budget}
                                </p>
                                <p>
                                    <span>Total Money Used: </span> R${project.cost}
                                </p>
                            </div>
                        ): (
                            <div className={styles.project_info}>
                                <ProjectForm 
                                    handleSubmit={editPost} 
                                    projectData={project} 
                                    btnText="Save Edit"
                                />
                            </div>
                        )}
                        {message !== '' && <Message msg={message} type={type}/>}
                    </div>
                    
                    <h2>Add a Service:</h2>
                    <button className={styles.btn} onClick={toggleServiceForm}>{!showServiceForm ? 
                    "New Service ": "Close"}</button>
                    <div className={styles.service_form_container}>
                        {showServiceForm && (
                            <ServiceForm 
                                handleSubmit={createService}
                                btnText="Create Service"
                                projectData={project}
                            />
                        )}
                    </div>
                    
                    <Container customClass="start">
                        <div className={styles.services_container}>
                            <h2>Services</h2>
                            <div className={styles.services}>
                            {project.services.length > 0 ? project.services.map((service)=> (
                                
                                < Service 
                                    name={service.Name} 
                                    key={service.id} 
                                    cost={service.Cost} 
                                    description={service.Description}
                                    id={service.id}
                                    handleRemove={removeService}/>
                                    
                            )) : (
                            <p>Still no one service on this Project <span>🤔</span></p>
                            )}
                            </div>
                        </div>
                    </Container>
                </Container>
            </div>
        ) : (
            <Loading/>
        )}
        
        
        </>
    )
}

export default Project