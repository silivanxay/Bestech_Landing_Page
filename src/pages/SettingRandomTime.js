import React, { useState, useEffect } from "react";
import CreateRandomTime from '../components/CreateRandomTime'
import EditRandomTime from "./EditRandomTime";
import axios from "axios";
import url from '../components/API-links/apiurl'
import Swal from "sweetalert2";
import Spinner from '../components/uitilities/Spinner';
import CountdownTimer from "../components/CountdownTimer";
import ReactPaginate from 'react-paginate'

const SettingRandomTime = () => {
    const token = sessionStorage.getItem('myToken')
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(1)
    const [status, setStatus] = useState("")
    useEffect(() => {
        axios.get(url.Mainurl + url.getDrawDateList, { headers: { "Authorization": `Bearer ${token}` } }).then((res) => {
            setLoading(0)
            setData(res.data.data)
        }).catch((err) => {alert('ໄອດີໝົດອາຍຸແລ້ວ ກະລຸນາລ໋ອກອີນເຂົ້າສູລະບົບໃໝ່ອີກຄັ້ງ')})
    }, [])

    const DeleteTime = (id) => {
        setLoading(1)
        Swal.fire({
            title: 'ທ່ານຈະລົບຂໍ້ມູນແທ້ຫລືບໍ່?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ລົບຂໍ້ມູນ',
            cancelButtonText: 'ຍົກເລີກ'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(url.Mainurl + url.deleteDrawDate + id).then(() => {
                    setLoading(0)
                    setData(data.filter((val) => {
                        Swal.fire(
                            'ລົບສຳເລັດ!',
                        )
                        return val.id !== id

                    }))
                }).catch(() => {
                    setLoading(0)
                    alert('ເກີດຂໍ້ຜິດພາດ')
                })
            } else {
                setLoading(0)
            }
        })
    }

    const filterStatus = (e) => {
        setStatus(e.target.value)
    }

    const reset = () => {
        setStatus("")
    }

    const [pageNumber, setPageNumber] = useState(0)
    const itemsPerPage = 12
    const pageVisited = pageNumber * itemsPerPage
    const displaySettimes = data.map((item, index) => {
        return (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.date}</td>
                <td>{item.time}</td>
                <td>
                    {item.status === "active" ? <label className="btn-sm btn-primary text-center user-select-none">Active</label> : ""}
                    {item.status === "pending" ? <label className="btn-sm btn-warning text-center user-select-none">Pending</label> : ""}
                    {item.status === "disabled" ? <label className="btn-sm btn-danger text-center user-select-none">Disable</label> : ""}
                </td>

                <td>
                    <EditRandomTime id={item.id}/>
                    <button className="btn btn-sm btn-danger" onClick={() => DeleteTime(item.id)}><i class="fa fa-trash"></i></button>
                </td>
            </tr>
        )
    })

    let filterSettime = data.filter((e) => e.status === status).slice(0, 12).map((item, index) => {
        return (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.date}</td>
                <td>{item.time}</td>
                <td>
                    {item.status === "active" ? <label className="btn-sm btn-primary text-center user-select-none">Active</label> : ""}
                    {item.status === "pending" ? <label className="btn-sm btn-warning text-center user-select-none">Pending</label> : ""}
                    {item.status === "disabled" ? <label className="btn-sm btn-danger text-center user-select-none">Disable</label> : ""}
                </td>

                <td>
                    <EditRandomTime id={item.id}/>
                    <button className="btn btn-sm btn-danger" onClick={() => DeleteTime(item.id)}><i class="fa fa-trash"></i></button>
                </td>
            </tr>
        )
    }) 

    const pageCount = Math.ceil(data.length / itemsPerPage)

    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }

    return (
        <>
            {loading === 0 ? <div className="content-wrapper">
            <div className='d-none'>
                  <CountdownTimer/>
                  </div>
                <div className="content-header">
                    <div className="container-fluid"></div>
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <CreateRandomTime />
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header display-respone">
                                    <h3 className="card-title w-100">ຂໍ້ມູນທັງຫມົດ ( <strong className='text-danger'>{data.length}</strong> )</h3>
                                    <div className="card-tools w-100">
                                        <div className="input-group input-group-sm">
                                            <select className="form-control form-select" onChange={(e) => filterStatus(e)} value={status}>
                                                <option value="">ຄົ້ນຫາດ້ວຍການ --ເລືອກສະຖານະ--</option>
                                                <option value="active">Active</option>
                                                <option value="pending">Pending</option>
                                                <option value="disabled">Disabled</option>
                                            </select>
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
                                    <table className="table table-hover text-nowrap">
                                        <thead>
                                            <tr>
                                                <th className="col-2">#</th>
                                                <th className="col-3">ວັນທີ່</th>
                                                <th className="col-3">ເວລາ</th>
                                                <th className="col-2">ສະຖານະ</th>
                                                <th className="col-2">ຈັດການ</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {status == "" ? 
                                         displaySettimes : filterSettime} 
                                        </tbody>
                                    </table>
                                    {data.length === 0 ? <h1 className='text-center my-3'>ບໍ່ມີຂໍ້ມູນ</h1> : ""}
                                    <div className='mt-4 mb-5 p-1'>
                                            {data.length >= 12 ? <ReactPaginate
                                                previousLabel={"<"}
                                                nextLabel={">"}
                                                pageCount={pageCount}
                                                onPageChange={changePage}
                                                containerClassName={"paginationBtn"}
                                                previousLinkClassName={"nextAndpreviousBtn user-select-none px-3 rounded rounded-5 text-white"}
                                                nextLinkClassName={"nextAndpreviousBtn user-select-none px-3 rounded rounded-5 text-white"}
                                                disabledClassName={"paginationDisabled"}
                                                activeClassName={"paginationActive"}
                                                className="winnerPagination mt-4 mb-5 p-1 user-select-none"
                                            >
                                            </ReactPaginate> : ""
                                            }
                                        </div>
                                </div>
                                {/* /.card-body */}
                            </div>
                            {/* /.card */}
                        </div>
                    </div>
                </div>
            </div> : <Spinner/>}
        </>
    )
}

export default SettingRandomTime