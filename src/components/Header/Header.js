import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../images/logo1.jpg'
import './header.css'


function Header() {
  const navigate = useNavigate()
  

  let token = localStorage.getItem('myapptoken')
  let userData = JSON.parse(localStorage.getItem('userData'))

  const onLogout = () => {
    localStorage.removeItem('myapptoken')
    localStorage.removeItem('userData')

    navigate('/')
  }

  
  return (
    <nav class="navbar navbar-expand-lg  bg-gradient-primary">
  <div class="container-fluid">
  <img src={logo} width={"70px"} height={"50px"}/>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active mx-5" aria-current="page" href='/home'>Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link mx-5 " href="/employe">EmployeList</a>
        </li>
      
      </ul>
     <div className='d-flex  justify-content-between '>
      {token && (<p className='text-white text-uppercase '>{userData && userData.username ? userData.username : ""} </p>)}
        {/* <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/> */}
        <a class=" text-danger mx-5" type="submit" onClick={()=> onLogout()}>LogOut</a>
        </div>
    </div>
  </div>
</nav>
  )
}
export default Header