import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import url from '../components/API-links/apiurl'
import Spinner from '../components/uitilities/Spinner'
import LoadingSpin from 'react-loading-spin'
import { useNavigate } from 'react-router-dom'
import EditUsers from './EditUsers'

const Users = () => {
    const token = sessionStorage.getItem('myToken')
    if (!token) {
        window.location = "/login"
    }
    const [userList, setuserList] = useState([])
    const [ShowModal, setShowModal] = useState(false)
    const [countPage, setCountPage] = useState([])
    const [filterText, setFilterText] = useState("")
    const [currentPage, setCurrentPage] = useState(0)
    const [loading, setLoading] = useState(false)
    const [loadingSpin, setLoadingSpin] = useState(0)
    const inputRef = useRef(null)
    let totalPage = countPage - 1
    let navigate = useNavigate()

    useEffect(() => {
        axios.get(url.Mainurl + url.getUser, { headers: { "Authorization": `Bearer ${token}` }}).then((res) => {
            // console.log(res.data.lists)
            setuserList(res.data.lists)
            setCountPage(res.data.totalPages - 1)
            setLoading(true)
        }).catch((err) => {alert('ໄອດີໝົດອາຍຸແລ້ວ ກະລຸນາລ໋ອກອີນເຂົ້າສູລະບົບໃໝ່ອີກຄັ້ງ')})
    }, [])

    const deleteUser = (id) => {
        Swal.fire({
            title: 'ທ່ານຈະລົບຂໍ້ມູນແທ້ຫລືບໍ່?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ລົບ',
            cancelButtonText: 'ຍົກເລີກ'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(url.Mainurl + url.deleteUser + id).then(() => {
                    setuserList(userList.filter((val) => {
                        Swal.fire({
                            icon: 'success',
                            title: 'ລົບຂໍ້ມູນແລ້ວ!',
                        })
                        return val.id !== id
                    }))
                }).catch(() => {
                    alert('ເກີດຂໍ້ຜິດພາດ')
                })
            }
        })
    }

    function search(event) {
        setLoadingSpin(1)
        setFilterText(event.target.value)
        axios.get(url.Mainurl + url.getUser + `?username=${event.target.value}`, { headers: { "Authorization": `Bearer ${token}` } }).then((res) => {
            setLoadingSpin(0)
            setuserList(res.data.lists)
        })
    }

    function Next() {
        setLoadingSpin(1)
        setCurrentPage(currentPage + 1)
        axios.get(url.Mainurl + url.getUser + `?page=${currentPage + 1}`, { headers: { "Authorization": `Bearer ${token}` } }).then((res) => {
            setLoadingSpin(0)
            setuserList(res.data.lists)
        })
    }

    function Back() {
        setLoadingSpin(1)
        setCurrentPage(currentPage - 1)
        axios.get(url.Mainurl + url.getUser + `?page=${currentPage - 1}`, { headers: { "Authorization": `Bearer ${token}` } }).then((res) => {
            setLoadingSpin(0)
            setuserList(res.data.lists)
        })
    }

    function reset() {
        setLoadingSpin(1)
        inputRef.current.value = "";
        axios.get(url.Mainurl + url.getUser, { headers: { "Authorization": `Bearer ${token}` } }).then((res) => {
            setLoadingSpin(0)
            setuserList(res.data.lists)
            setCountPage(res.data.totalPages)
            setCurrentPage(0)

        })
    }

    function FirstPage() {
        setLoadingSpin(1)
        setCurrentPage(0)
        axios.get(url.Mainurl + url.getUser + `?page=${0}`, { headers: { "Authorization": `Bearer ${token}` } }).then((res) => {
            setLoadingSpin(0)
            setuserList(res.data.lists)
        })
    }

    function LastPage() {
        setLoadingSpin(1)
        setCurrentPage(countPage)
        axios.get(url.Mainurl + url.getUser + `?page=${countPage}`, { headers: { "Authorization": `Bearer ${token}` } }).then((res) => {
            setLoadingSpin(0)
            setuserList(res.data.lists)
        })
    }

    return (
        <div>
            {loading === true ? <div className="content-wrapper">
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-header">
                                        <Link to="/add-user" className="card-title btn btn-success float-right">ເພິ່ມຜູ້ໃຊ້</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-header display-respone">
                                        <h3 className="card-title w-100">ຜູ້ໃຊ້ລະບົບທັງຫມົດ ( <strong className='text-danger'>{userList.length}</strong> )</h3>
                                        <div className="card-tools w-100">
                                            <div className="input-group input-group-sm">
                                                <input ref={inputRef} onChange={search} type="text" name="table_search" className="form-control" placeholder="ຄົ້ນຫາດ້ວຍ Username..." />
                                                <div className="input-group-append">
                                                    <button onClick={reset} type="submit" className="btn btn-default">
                                                        Reset
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* /.card-header */}
                                    <div className="card-body table-responsive p-0">
                                        {loadingSpin === 0 ?
                                            <table className="table table-hover text-nowrap">
                                                <thead>
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>ຊື່ ແລະ ນາມສະກຸນ</th>
                                                        <th>ເບີໂທ</th>
                                                        <th>Username</th>
                                                        <th>Email</th>
                                                        <th className='text-center'>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {userList.map((item, index) => (
                                                        <tr key={index}>
                                                            <td>{index+1}</td>
                                                            <td>{item.fullname}</td>
                                                            <td>{item.phone}</td>
                                                            <td>{item.username}</td>
                                                            <td>{item.email}</td>
                                                            <td class="text-center py-0 align-middle">
                                                                <div class="btn-group btn-group-sm">
                                                                    <EditUsers id={item.id} fullname={item.fullname} phone={item.phone} username={item.username} email={item.email}/>
                                                                    <button class="btn btn-danger ms-1" onClick={() => deleteUser(item.id)} ><i class="fas fa-trash"></i></button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}

                                                </tbody>
                                            </table>
                                            : <div className='text-center my-5'><LoadingSpin primaryColor={"black"} size={50} /></div>}
                                        <div className='customPagination d-flex py-2'>
                                            <button onClick={Back} className={`mx-2 px-2 btn btn-primary`} disabled={currentPage === 0 ? true : false}>Back</button>
                                            <span onClick={FirstPage} className={`mt-2 btn btn-sm btn-outline-light text-dark text-decoration-underline ${currentPage === 0 ? "disabled" : ""}`}> <i class="bi bi-chevron-double-left"></i> 1</span>
                                            <span className='mt-2 btn btn-sm'>ຫນ້າທີ {currentPage + 1}</span>
                                            <span onClick={LastPage} className={`mt-2 btn btn-sm btn-outline-light text-dark text-decoration-underline ${currentPage === countPage ? "disabled" : ""}`}> {countPage + 1} <i class="bi bi-chevron-double-right"></i></span>
                                            <button onClick={Next} className={`mx-2 px-2 btn btn-sm btn-primary`} disabled={currentPage === countPage ? true : false}>Next</button>
                                        </div>
                                    </div>
                                    {/* /.card-body */}
                                </div>
                                {/* /.card */}
                            </div>
                        </div>

                    </div>
                </div>
            </div> : <Spinner />}
        </div>
    )
}

export default Users