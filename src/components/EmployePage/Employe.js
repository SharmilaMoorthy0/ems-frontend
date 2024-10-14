import axios from 'axios'

import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import swal from 'sweetalert'


import './employe.css'


import Layout from '../layout/Layout'


function Employe() {
  const [loading, setLoading] = useState(false)
  const [Image, setImage] = useState("")
 
  let user = JSON.parse(localStorage.getItem('userData'))
  const navigate = useNavigate()
  
  const [categoryList, setcategoryList] = useState([])
  const [Employelist, setEmployelist] = useState([])
  const [isEdit, setisEdit] = useState(false)
 
  const [editEmployeDetail, seteditEmployeDetail] = useState({})
  


  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    setLoading(true);
    axios.post("https://ems-backend-2-zn20.onrender.com/employe/search", { query: searchQuery },

    )
      .then((res) => {
        setLoading(false);
        setSearchResults(res.data.response);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        toast.error('Error searching employes');
      });
  };

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



  const getEmployelist = () => {
    let url = ""
    if (user?.role === "admin") {
      url = "https://ems-backend-2-zn20.onrender.com/all/employe/admin"
    }
    else {
      url = "https://ems-backend-2-zn20.onrender.com/all/employe"
    }
    axios.get(url,
      {
        headers: {
          Autdorization: localStorage.getItem("myapptoken")
        }
      }
    ).then((res) => {
      if (res.data.status === 1) {
        setEmployelist(res.data.response)
      }

    }).catch((err) => { console.log(err) })
  }
  useEffect(() => {
    getEmployelist()
  }, [])




  const removeEmploye = (list) => {
    swal({
      title: "Are you sure?",
      text: `Are you sure that you want to delete this Employe ${list.Name}?`,
      icon: "warning",
      dangerMode: true,
      buttons: true


    }).then((willDelete) => {
      if (willDelete) {
        axios.delete(`https://ems-backend-2-zn20.onrender.com/Delete/employe/${list._id}`,
          {
            headers: {
              Autdorization: localStorage.getItem("myapptoken")
            }
          }
        ).then((res) => {
          if (res.data.status === 1) {
            toast.success(res.data.message)
            getEmployelist()
          }
          if (res.data.status === 0) {
            toast.success(res.data.message)
          }

        }).catch((err) => { console.log(err) })
      }
      else {
        swal("your file is safe")
      }

    })

  }






  const editToggle = (data) => {
    seteditEmployeDetail(data)
    setisEdit(!isEdit)
  }

  const handleCheckboxChange = (e) => {
    const value = e.target.value;

    // Set Course to the selected value
    seteditEmployeDetail(prev => ({
      ...prev,
      Course: value
    }));
  };

  const handlechange = (event, name) => {
    seteditEmployeDetail({ ...editEmployeDetail, [name]: event.target.value })
  }


  const uploadImage = (e) => {
    console.log(e)

    var reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onload = () => {
        console.log(reader.result)
        setImage(reader.result)
    }
    reader.onerror = error => {
        console.log("error:", error)
    }
}
  const handleUpdateEmploye = () => {
    toast.loading("Updating...")
    console.log(editEmployeDetail)
    axios.put(`https://ems-backend-2-zn20.onrender.com/update/employe/${editEmployeDetail._id}`, editEmployeDetail, {
      headers: {
        Autdorization: localStorage.getItem("myapptoken")
      }
    }
    )
      .then((res) => {
        if (res.data.status === 1) {
          toast.remove()
          toast.success(res.data.message)

          setisEdit(false)
          getEmployelist()

        }
        if (res.data.status === 0) {
          toast.success(res.data.message)
        }

      }).catch((err) => { console.log(err) })
  }

  return (
    <Layout>
      <div className='container-fluid  mt-3 bg1'>
        <div class="card shadow mb-4">
          <div className=' d-sm-flex justify-content-between align-items-center mb-4'>
            <h2 className='h3 mb-0 text-gray-800'></h2>
            <div className='d-flex'
            >
              <div className='d-flex'>
                <p className='my-2'>Total Count :</p>
                <div>
                  <p className='my-2'>{Employelist?.length}</p>
                </div>
              </div>

              <div>
                {user?.role === "admin" && <button className='btn btn-sm btn btn-primary mx-5  my-2' onClick={() => navigate('/form')}>Create Employe +</button>
                }
              </div>

            </div>
          </div>
          <div class="card-header d-flex justify-content-between text-center py-3">
            <h6 class="m-0 font-weight-bold text-primary">Employe Details</h6>
            <div className='text-end d-flex justify-content-center'>
              <label className='mx-2'>Search:</label>
              <div className='d-flex justify-content-between'>
                <input type="text"
                  className="form-control"


                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}

                />
                <a className="btn btn-sm login" onClick={handleSearch}>
                  <i className="fa fa-search" aria-hidden="true"></i>
                </a>

              </div>
            </div>
          </div>



          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-bordered align-items-center" id="dataTable" width="100%" cellspacing="0">

                <thead className='text-uppercase '>


                  <tr className='text-center'>
                    <th>ID</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Designation</th>
                    <th>Gender</th>
                    <th>Course</th>
                    <th>Created On</th>
                    <th>Actions</th>
                  </tr>



                </thead>
               <tbody>
                {loading ? (
                  <tr className="text-center">
                    <td colSpan="10">Loading...</td>
                  </tr>
                ) : searchQuery && searchResults.length === 0 ? (
                  <tr className="text-center">
                    <td colSpan="10">No results found.</td>
                  </tr>
                ) : (
                  (searchQuery ? searchResults : Employelist).map((list) => (
                    <tr className='text-center' key={list._id}>
                      <td>{list?.ID}</td>
                      <td><img className='' height="62px" src={list?.Image} alt={list?.Name} /></td>
                      <td>{list?.Name}</td>
                      <td>{list.Email}</td>
                      <td>{list?.Mobile}</td>
                      <td>{list?.Designation}</td>
                      <td>{list?.Gender}</td>
                      <td>{list.Course}</td>
                      <td>{new Date(list.createdAt).toLocaleDateString()}</td>
                      <td>
                        <a className='mx-2 text-success' onClick={() => editToggle(list)}>
                          <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                        </a>
                        <a className='mx-2 text-danger' onClick={() => removeEmploye(list)}>
                          <i className="fa fa-trash-o" aria-hidden="true"></i>
                        </a>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
             



            </table>
          </div>
        </div>
      </div>

      <Modal isOpen={isEdit} size='lg' centered>
        <ModalHeader toggle={() => setisEdit(!isEdit)}>Edit Employe</ModalHeader>
        <ModalBody>
          <div className='container'>
            <div className='row '>


              <div className='col-sm-12 col-md-6 col-lg-6'>
                <div class="mb-3">
                  <label class="form-label text-primary">ID</label>
                  <input type="text" class="form-control"
                    value={editEmployeDetail.ID}
                    onChange={(event) => handlechange(event, "ID")}
                  />
                </div>
              </div>
              <div className='col-sm-12 col-md-6 col-lg-6'>
                <div class="mb-3">
                  <label class="form-label text-primary">Name</label>
                  <input type="text" class="form-control"
                    value={editEmployeDetail.Name}
                    onChange={(event) => handlechange(event, "Name")}
                  />
                </div>
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6'>
                <div class="mb-3">
                  <label class="form-label text-primary">Email</label>
                  <input type="email" class="form-control"
                    value={editEmployeDetail.Email}
                    onChange={(event) => handlechange(event, "Email")}
                  />
                </div>
              </div>


              <div className='col-sm-12 col-md-6 col-lg-6'>
                <div class="mb-3">
                  <label class="form-label text-primary">Mobile</label>
                  <input type="number" class="form-control"
                    value={editEmployeDetail.Mobile}
                    onChange={(event) => handlechange(event, "Mobile")}
                  />
                </div>
              </div>


              <div className='col-sm-12 col-md-6 col-lg-6'>
                <div class="mb-3">
                  <label class="form-label text-primary">Designation</label>
                  <select className='form-select' name=''
                    value={editEmployeDetail.Designation}
                    onChange={(e) => handlechange(e, "Designation")}>
                    {categoryList.map((list) => {
                      return <option value={list.category}

                      > {list.category}</option>
                    })}



                  </select>
                </div>
              </div>
              <div className='col-sm-12 col-md-6 col-lg-6'>
                <div className="mb-3">
                  <label className="form-label text-primary">Gender</label>

                  <div className="d-flex flex-column">
                    <div className="form-check">
                      <input
                        type="radio"
                        id="male"
                        name="gender"
                        value="Male"// Ensure both radio buttons share the same name
                        checked={editEmployeDetail.Gender === "Male"}
                        onChange={(e) => handlechange(e, "Gender")}
                        className="form-check-input"
                      />
                      <label htmlFor="male" className="form-check-label mx-2">Male</label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        id="female"
                        value="Female"
                        name="gender" // Ensure both radio buttons share the same name
                        checked={editEmployeDetail.Gender === "Female"}
                        onChange={(e) => handlechange(e, "Gender")}
                        className="form-check-input"
                      />
                      <label htmlFor="female" className="form-check-label mx-2">Female</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-md-6 col-lg-6">
                <div className="mb-4 p-3 border rounded bg-light">
                  <label className="form-label text-primary">Course</label>
                  <div className="d-flex flex-column">
                    <div className="form-check mb-2">
                      <input
                        type="checkbox"
                        id="mca"
                        value="MCA"
                        checked={editEmployeDetail.Course === "MCA"} // Check if course is selected
                        onChange={(e) => handleCheckboxChange(e, "MCA")} // Handle change
                        className="form-check-input"
                      />
                      <label htmlFor="mca" className="form-check-label mx-2">MCA</label>
                    </div>
                    <div className="form-check mb-2">
                      <input
                        type="checkbox"
                        id="bca"
                        value="BCA"
                        checked={editEmployeDetail.Course === "BCA"} // Check if course is selected
                        onChange={(e) => handleCheckboxChange(e, "BCA")} // Handle change
                        className="form-check-input"
                      />
                      <label htmlFor="bca" className="form-check-label mx-2">BCA</label>
                    </div>
                    <div className="form-check mb-2">
                      <input
                        type="checkbox"
                        id="bsc"
                        value="BSC"
                        checked={editEmployeDetail.Course === "BSC"} // Check if course is selected
                        onChange={(e) => handleCheckboxChange(e, "BSC")} // Handle change
                        className="form-check-input"
                      />
                      <label htmlFor="bsc" className="form-check-label mx-2">BSC</label>
                    </div>
                  </div>
                </div>

              </div>


                <div className='col-sm-12 col-md-6 col-lg-6'>
                  <div class="mb-3">
                    <label class="form-label text-primary">Image

                    </label>
                    <input type="file" class="form-control"

                      onChange={(e) => uploadImage(e)} />
                                {Image == "" || Image == null ? "" : <img width={"100"} height={"100"} src={Image} />}
                            </div>
                        </div>



            </div>
          </div>
          <button className='btn btn-sm btn btn-success text-start' onClick={() => handleUpdateEmploye()}>update</button>
        </ModalBody>

      </Modal>



    </div >

    </Layout >


  )
}
export default Employe



















