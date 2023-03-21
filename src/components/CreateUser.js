/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import url from './API-links/apiurl'
import Spinner from './uitilities/Spinner';
import { NumberFormatBase } from 'react-number-format';
import { useNavigate } from 'react-router-dom';

const CreateUser = () => {
    const token = sessionStorage.getItem('myToken');

    useEffect(() => {

        const showuseList = async () => {
            const response = await axios.get(url.Mainurl + url.getUser, { headers: { "Authorization": `Bearer ${token}` } }).then((res) => {

            }).catch((err) => {
                if (err.response.status === 403) {
                    Swal.fire({
                        title: "ທ່ານບໍ່ມີສິດເຂົ້າເຖິງຫນ້ານີ້",
                        icon: "error",
                        confirmButtonColor: "#3085d6",
                        confirmButtonText: "ອອກ",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            return navigate("/");
                        }
                    })
                }
            })
        }

        if (Object.keys(formErrors).length === 0 && isSubmit) {
        }

        showuseList()
    }, [])

    const [formvalues, setformValues] = useState({});
    const [formErrors, setformErrors] = useState({});
    const [isSubmit, setisSubmit] = useState(false);
    const [loading, setLoading] = useState(true)
    const [msg, setMsg] = useState("")
    let navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setformValues({ ...formvalues, [name]: value })
    }

    const createUser = (e) => {
        e.preventDefault()

        if (formvalues.password != formvalues.confirmpassword) {
            setMsg("Password ແລະ Confirm Password ບໍ່ຕົງກັນ")
        } else if (formvalues.password === formvalues.confirmpassword) {
            // setLoading(false)
            setformValues(
                axios.post(url.Mainurl + url.createUser, {
                    fullname: formvalues.fullname,
                    phone: formvalues.phone,
                    username: formvalues.username,
                    email: formvalues.email,
                    password: formvalues.password,
                    roles: [
                        'admin'
                    ]
                  }).then((res) => {
                    setLoading(true)
                    Swal.fire({
                        icon: 'success',
                        title: 'ສ້າງຜູ້ໃຊ້ສຳເລັດ',
                        confirmButtonText: 'Ok',
                    }).then((res) => {
                        if (res.isConfirmed) {
                            return navigate("/user")
                        }
                    })
                }).catch(() => {
                    Swal.fire({
                        icon: 'error',
                        title: 'ກະລຸນາລອງໃຫມ່ອີກຄັ້ງ',
                        cancelButtonText: 'close'
                    })
                })
            )
        }
    }

    return (
        <div>
            {loading === true ? <div className="content-wrapper">
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row">
                            {/* left column */}
                            <div className="col-md-12">
                                {/* general form elements */}
                                <div className="card card-primary">
                                    <div className="card-header">
                                        <h3 className="card-title">ເພິ່ມຜູ້ໃຊ້</h3>
                                    </div>
                                    {/* /.card-header */}
                                    {/* form start */}
                                    <form onSubmit={createUser}>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputFullName">ຊື່ ແລະ ນາມສະກຸນ</label>
                                                        <input type="text" className="form-control" name='fullname' placeholder="Enter name"
                                                            value={formvalues.fullname} onChange={handleChange} required />
                                                    </div>
                                                    <small className='text-danger'>{formErrors.fullname}</small>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputPhone1">ເບີໂທ</label>
                                                        <NumberFormatBase min={0} className="form-control" name='phone' placeholder="Enter phone number"
                                                            value={formvalues.phone} onChange={handleChange} required />
                                                    </div>
                                                    <small className='text-danger'>{formErrors.phonenumber}</small>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputUsername1">username</label>
                                                        <input type="text" className="form-control" name='username' placeholder="Enter username"
                                                            value={formvalues.username} onChange={handleChange} required />
                                                        <small className='text-danger'>{formErrors.username}</small>
                                                    </div>

                                                </div>

                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputPassword1">Password</label>
                                                        <input type="password" className="form-control" id="exampleInputPassword1" name='password' placeholder="Password"
                                                            value={formvalues.password} onChange={handleChange} required />
                                                    </div>
                                                    <small className='text-danger'>{msg}</small>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Email</label>
                                                        <input type="email" className="form-control" name='email' placeholder="Enter email"
                                                            value={formvalues.email} onChange={handleChange} required />
                                                        <small className='text-danger'>{formErrors.email}</small>
                                                    </div>

                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputPassword2">Confirm Password</label>
                                                        <input type="password" className="form-control" id="exampleInputPassword2" name='confirmpassword' placeholder="Confirm Password"
                                                            value={formvalues.confirmpassword} onChange={handleChange} required />
                                                    </div>
                                                    <small className='text-danger'>{msg}</small>
                                                </div>
                                                {/* <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <label>Select Role</label>
                                                        <select className="form-control form-select" name='roles' onChange={handleChange} required>
                                                            <option>--Select Role--</option>
                                                            <option value={'user'}>User</option>
                                                            <option value={'admin'}>Admin</option>

                                                        </select>
                                                    </div>
                                                </div> */}
                                            </div>
                                        </div>
                                        {/* /.card-body */}
                                        <div className="card-footer">
                                            <button type="submit" className="btn btn-success float-right">ເພິ່ມຂໍ້ມູນ</button>
                                            <Link to="/user" className="btn btn-danger">ອອກ</Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div> : <Spinner />}
        </div>
    )
}

export default CreateUser