import React from 'react'


import './layout.css'
import Admin from '../Admin'
import Header from '../Header/Header'




function Layout({children}) {
  return (
    <div className=''>
       
       <Header/>
        <div className='main-box'>
       {
        children
       }
      </div>
    </div>
  )
}

export default Layout