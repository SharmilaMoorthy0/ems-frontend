import axios from 'axios'
import { Button } from 'bootstrap'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'
import './form.css'
import Layout from './layout/Layout'

export const Genderoption = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "TransGender", label: "Transgender" },

]


function Form() {
    const navigate = useNavigate()
    let user = JSON.parse(localStorage.getItem('userData'))
    const [Image, setImage] = useState("")
    const [ID, setID] = useState("")
    const [Name, setName] = useState("")
    const [Email, setEmail] = useState("")
    const [Course, setcourse] = useState("")
    const [Mobile, setMobile] = useState("")


    const [Gender, setGender] = useState("")
    const [Designation, setDesignation] = useState("")
    const [categoryList, setcategoryList] = useState([])




    const [Employelist, setEmployelist] = useState([])
    const [SelectedCourses, setSelectedCourses] = useState([]);

    const handleCourseChange = (e) => {
        const { id, checked } = e.target;
        if (checked) {
            // Add the selected course to the array
            setSelectedCourses((prev) => [...prev, id]);
        } else {
            // Remove the unselected course from the array
            setSelectedCourses((prev) => prev.filter((course) => course !== id));
        }
    };



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
    const validateEmail = (Email) => {
        let result = /^([A-Za-z0-9\.])+\@([A-Za-z0-9])+\.([A-Za-z]{2,4})$/;
        return result.test(Email)
    }





    const handlesubmit = () => {


        if (ID === "") {
            return toast.error("ID is required")
        }
        if (Name.length < 4) {
            return toast.error("minium length 8 ")
        }

        if (Email === "") {
            return toast.error("Email is required")
        }
        if (!validateEmail(Email)) {

            return toast.error("invalid email")
        }

        if (Mobile === "") {
            return toast.error("Mobile is required")
        }
        if (Mobile.length < 10) {
            return toast.error("Must contain 10 Digits")

        }


        if (Designation === "") {
            return toast.error("Any one Designation is required")
        }
        if (Gender === "") {
            return toast.error("Any one Gender is required")
        }
        if (SelectedCourses === "") {
            return toast.error("Any one course is required")
        }

        axios.post("http://localhost:4000/new/employe", { Image, ID, Name, Email, Mobile, Course, Designation, Gender }

        )
            .then((res) => {
                if (res.data.status === 1) {
                    toast.success(res.data.message)
                    navigate('/employe')
                    setEmployelist([...Employelist, Image, ID, Name, Email, Mobile, Course, Designation, Gender])
                    setImage("")
                    setID("")
                    setName("")
                    setEmail("")

                    setMobile("")


                    setDesignation("")
                    setGender("")


                }
                if (res.data.status === 0) {
                    toast.success(res.data.message)
                }
            }).catch((error) => { console.log(error) })



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






    return (




        <div className='container-fluid w-100  '>
            <div className='container bg w-75'>
                <div className='card shadow w-100 '>

                    <div className='card-body '>
                        <h1 className='text-center text-primary'>Registration</h1>


                        <div className='row '>


                            <div className='col-sm-12 col-md-6 col-lg-6'>
                                <div class="mb-3">
                                    <label class="form-label  text-primary">ID

                                    </label>
                                    <input type="text" class="form-control"
                                        value={ID}
                                        onChange={(e) => setID(e.target.value)} />
                                </div>
                            </div>
                            <div className='col-sm-12 col-md-6 col-lg-6'>
                                <div class="mb-3">
                                    <label class="form-label  text-primary">Name

                                    </label>
                                    <input type="text" class="form-control" value={Name}
                                        onChange={(e) => setName(e.target.value)} />
                                </div>

                            </div>
                            <div className='col-sm-12 col-md-6 col-lg-6'>
                                <div class="mb-3">
                                    <label class="form-label  text-primary">Email

                                    </label>
                                    <input type="email" class="form-control" value={Email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                            </div>



                            <div className='col-sm-12 col-md-6 col-lg-6'>
                                <div class="mb-3">
                                    <label class="form-label  text-primary">Mobile

                                    </label>
                                    <input type="number" class="form-control" value={Mobile}
                                        onChange={(e) => setMobile(e.target.value)}
                                    />
                                </div>

                            </div>
                            <div className='col-sm-12 col-md-6 col-lg-6'>
                                <div class="mb-3">
                                    <label class="form-label  text-primary">Category </label>


                                    <select className='form-select form-control' name='Category'
                                        onChange={(e) => setDesignation(e.target.value)}>

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
                                                checked={Gender === "Male"}
                                                onChange={(e) => setGender(e.target.value)}
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
                                                checked={Gender === "Female"}
                                                onChange={(e) => setGender(e.target.value)}
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
                                                // checked={selectedCourses.includes('mca')} // Check if course is selected
                                                onChange={() => setcourse("MCA")} // Handle change
                                                className="form-check-input"
                                            />
                                            <label htmlFor="mca" className="form-check-label mx-2">MCA</label>
                                        </div>
                                        <div className="form-check mb-2">
                                            <input
                                                type="checkbox"
                                                id="bca"
                                                // checked={selectedCourses.includes('bca')} // Check if course is selected
                                                onChange={() => setcourse("BCA")} // Handle change
                                                className="form-check-input"
                                            />
                                            <label htmlFor="bca" className="form-check-label mx-2">BCA</label>
                                        </div>
                                        <div className="form-check mb-2">
                                            <input
                                                type="checkbox"
                                                id="bsc"
                                                // checked={selectedCourses.includes('bsc')} // Check if course is selected
                                                onChange={() => setcourse("BSC")} // Handle change
                                                className="form-check-input"
                                            />
                                            <label htmlFor="bsc" className="form-check-label mx-2">BSC</label>
                                        </div>
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
                        <div className='text-start'>
                            <button className='btn btn-sm btn btn-success' onClick={() => handlesubmit()}>submit</button>
                        </div>


                    </div>
                </div>
            </div>

        </div>






    )
}


export default Form

