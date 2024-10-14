import React, { useEffect } from 'react'
import { useState } from 'react'



import axios from 'axios'

import './home.css'

import Layout from '../layout/Layout'
function Home() {
  let user = JSON.parse(localStorage.getItem('userData'))
  const [Employelist, setEmployelist] = useState([])
  const [categoryList, setcategoryList] = useState([])
  

 

 
  const getEmployelist = () => {
    axios.get("http://localhost:4000/all/employe/admin"
    ).then((res) => {
      if (res.data.status === 1) {
        setEmployelist(res.data.response)
      }

    }).catch((err) => { console.log(err) })
  }
  useEffect(() => {
    getEmployelist()
  }, [])
  const getlist = () => {
    axios.get("http://localhost:4000/all/category"

    ).then((res) => {
      if (res.data.status === 1) {
        setcategoryList(res.data.response)
      }

    }).catch((err) => { console.log(err) })
  }
  useEffect(() => {
    getlist()
  }, [])

  


  const cardData = [

    {
      name: "Employee",
      color: "primary",
      text: "Total:",
      count: Employelist?.length
    },
    {
      name: "Category",
      color: "success",
      text: "Total:",
      count: categoryList?.length

    }
    

    
  ]

  return (
    <Layout>  <div className='container w-100 bg mt-5'>
        <div class="mb-4 d-sm-flex align-items-center justify-content-between">
          <h1 class="h3 mb-0 text-gray-800 text-center">Welcome to Admin Panel</h1>
         
        </div>

        <div class="row">

          {cardData.map((item) => {
            return <div class="col-lg-3 col-md-6 col-sm-12 mb-4">
              <div class={`card border-left-${item.color} shadow  mx-1  py-2`}>
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-1">
                      <div class={`text-xs font-weight text-${item.color}  text-capitalize mb-1`}>
                        {item.name}</div>
                      <div class={`h5 mb-0 font-weight text-${item.color}-800`}>{item.text}{item.count}</div>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          })}


        </div>
      </div>
      
    







      












</Layout>
  
  )
}

export default Home