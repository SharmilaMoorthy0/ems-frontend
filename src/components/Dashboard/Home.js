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
    axios.get("https://ems-backend-2-zn20.onrender.com/all/employe/admin"
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
    axios.get("https://ems-backend-2-zn20.onrender.com/all/category"

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
    <Layout>   <div className="container w-100 mt-5">
      <h1 className="h3 mb-4 text-center text-secondary">Welcome to the Admin Panel</h1>

      <div className="row w-50">
        {cardData.map((item, index) => (
          <div key={index} className="col-lg-6 col-md-12 mb-4">
            <div className={`card border-left-${item.color} shadow h-100`}>
              <div className="card-body">
                <h5 className={`text-${item.color} font-weight-bold`}>{item.name}</h5>
                <p className="h2 mb-0">Total:{item.count}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>













    </Layout>

  )
}

export default Home