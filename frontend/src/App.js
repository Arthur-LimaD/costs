import React from 'react';
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//layout components
import Navbar from './components/layout/navbar'
import Footer from './components/layout/footer'
import Container from './components/layout/container';

//pages
import Home from './components/pages/home';
import Company from './components/pages/company';
import NewProject from './components/pages/newproject';
import Contact from './components/pages/contact';
import Projects from './components/pages/projects';
import Project from './components/pages/project';


const App = ()=> {
  return (<>
  <Router>
      <Navbar/>
      
      <Container customClass="min-height">
        <Routes>
        
            <Route exact path='/' element={<Home/>} />
            <Route path="/Company" element={<Company/>}/>
            <Route path="/NewProject" element={<NewProject/>}/>
            <Route path="/Contact" element={<Contact/>}/>
            <Route path="/Projects" element={<Projects/>}/>
            <Route path="/Project/:id" element={<Project/>}/>
        </Routes>
      </Container>
      <Footer/>
    
  </Router>
  </>)
}

export default App