const express = require("express");
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const path = require('path');
const cors = require('cors');
const axios = require('axios');

const port=80;
const app = express()

app.listen(port, () => {
    console.log('App running on port: ' + port)
})

app.engine('html', require('ejs').renderFile);
app.use(express.json())
app.set('view engine', 'html');
app.use('/views', express.static(path.join(__dirname, 'views')));
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(__dirname+'/views'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors())

const sequelize = new Sequelize('arthur', 'root', 'tl1wlndw', {
    host: "localhost",
    dialect: 'mysql'
});

sequelize.authenticate().then(function(){
    console.log("MySql connected!")
}).catch(function(error){
    console.log(error)
})

const projectsDB = sequelize.define('projects', {
    username: {
        type: Sequelize.STRING
    },
    projects: {
        type: Sequelize.JSON
    }
})

//projectsDB.sync({force: true});

const req = require('express/lib/request');

app.get('/categories', (req, res)=> {
    const categories = [
        {
          "id": 1,
          "name": "Infra"
        },
        {
          "id": 2,
          "name": "Marketing"
        },
        {
          "id": 3,
          "name": "Development"
        },
        {
          "id": 4,
          "name": "Design"
        },
        {
          "id": 5,
          "name": "Planing"
        }
    ]

    res.json(categories)
})

let projects = [];


app.get('/projects', (req, res)=> {
    res.json(projects)
})

app.post('/projects', (req, res)=> {
    let body = req.body;
    if(!body){
        return res.status(400).end()
    }else{
        body = {... body, id: projects.length + 1}
        projects.push(body)
        res.json(projects)
    }
    
})

app.delete('/projects/:id', (req,res)=> {
    const id = Number(req.params.id.substring(1, 2))
    let newProjects = projects.filter(project=> 
        project.id != id
    )
    projects = newProjects
    res.json(projects)
})

app.get('/projects/:id', (req, res)=> {
    const id = req.params.id;
    res.json(projects.filter(project=> 
        project.id == id
    ));
})

app.put('/projects/:id', (req, res)=> {
    const id = req.params.id;
    var newProject = req.body;
    let restProjects = projects.filter(project=> 
        project.id != id
    )
    projects = [... restProjects, newProject]
    res.json(projects)
})
