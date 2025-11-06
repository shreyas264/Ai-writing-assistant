import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Components/Home'
import About from './Components/About'
import Editor from './Components/Editor'
import Navbar from './Components/Navbar'
import Login from './Components/Login'


const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/write' element={<Editor/>}/>


      </Routes>
    </BrowserRouter>
  )
}

export default App