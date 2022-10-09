import React , {useEffect, useState} from "react"
import styles from './projectform.module.css'
import Input from "../form/input";
import Select from "../form/select";
import Submit from "../form/submit";
import { useNavigate } from "react-router-dom";



function ProjectForm ({btnText, handleSubmit, projectData}) {

        const [categories, setCategories] = useState([]);
        const [project, setProject] = useState(projectData || [])

        const navigate = useNavigate();
        
        
        useEffect(() => {
            fetch('http://localhost:80/categories')
                .then(response => response.json())
                .then(data => {
                    setCategories(data)
                });
        }, []);

        const submit = (e)=> {
            e.preventDefault()
            //console.log(project)
            handleSubmit(project)
            navigate("/Projects", { state: {message: 'Sucess!', type: 'sucess'}})
            
        }

        function handleChange (e) {
            setProject({ ...project, [e.target.name] : e.target.value});
        }
    
        function handleCategory (e) {
                setProject({ ...project, 
                    category : {
                    id: e.target.value,
                    name: e.target.options[e.target.selectedIndex].text,
                }});
        }

    return (<form onSubmit={submit} className={styles.form}>
        
        <Input  
        type="text" 
        text="Project Name:" 
        placeholder="Your New Project's Name!" 
        name="name"
        handleOnChange={handleChange}
        value={project.name}
        />
        <Input 
        type="number" 
        text="Project Total Budget:" 
        placeholder="Your New Project's Budget!" 
        name="budget"
        handleOnChange={handleChange}
        value={project.budget}
        />
        <Select 
        name="category" 
        text="Select a Category" 
        options={categories}
        handleOnChange={handleCategory}
        value={project.category ? project.category.id  : ''}
        />

        <Submit type="submit" text={btnText}/>
        
    </form>
        )
}

export default ProjectForm