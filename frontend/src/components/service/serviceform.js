import styles from '../project/projectform.module.css'
import React, {useState} from 'react'
import Submit from '../form/submit'
import Input from '../form/input'

function ServiceForm ({handleSubmit, btnText, projectData}) {

    const [service, setService] = useState();

    function submit (e) {
        e.preventDefault()
        projectData.services.push(service)
        handleSubmit(projectData)
    }
    
    function handleChange (e) {
        e.preventDefault()

        setService({...service, [e.target.name]: e.target.value})
    }

    return (
        <>
            <form onSubmit={submit} className={styles.form}>
                <Input 
                type="text"
                name="Name"
                placeholder="Insert the Service Name"
                handleOnChange={handleChange}
                />
                <Input 
                type="number"
                name="Cost"
                placeholder="Insert the Service' Cost"
                handleOnChange={handleChange}
                />
                <Input 
                type="text"
                name="Description"
                placeholder="Write a description to this Service"
                handleOnChange={handleChange}
                />
                <Submit text={btnText} />
            </form>

        </>
    )
}

export default ServiceForm