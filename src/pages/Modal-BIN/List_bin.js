import axios from 'axios'
import React, { useEffect, useReducer, useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import Swal from 'sweetalert2'
import url from '../../components/API-links/apiurl'
import EditeBill from '../EditeBill'
import Update_bin from './Update_bin'

export default function List_bin(props) {

    const [ GETAPIBIN, setAPIBIN ] = useState([])
    const [loading, setLoading] = useState(1)
    const [ reducer, setRedeuce ] = useReducer(x => x + 1, 0)

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    function handleShow  ()  {
        setShow(true)
        setRedeuce()
    }
    useEffect(() => {
        axios.get(url.Mainurl + url.getBil + `?phone=${props.phone}`).then((res) => {
            setAPIBIN(res.data.rows.reverse())
            setLoading(0)
        })
    }, [reducer])

    function deletebin (e) {
        Swal.fire({
            title: 'ທ່ານຕ້ອງການລົບບີນນີ້ ຫຼື ບໍ່?',
            text: `ເລກບີນ: ${e.bil_number}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ລົບຂໍ້ມູນ!'
          }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(url.Mainurl + url.deletebils + e.id).then((res) => {
                    Swal.fire(
                        'ລົບຂໍ້ມູນສຳເລັດ!',
                        `ເລກບີນ: ${e.bil_number}`,
                        'success'
                    )
                    setRedeuce()
                }).catch((err) => {
                    alert('ເກີດຂໍ້ຜິດພາດກະລຸນາລອງໃໝ່ອີກຄັ້ງ!')
                    setRedeuce()
                })
            }
        })
    }

  return (
    <>
        <Button variant='primary' className='btn btn-sm' onClick={handleShow}><i class="bi bi-eye-fill"></i> View</Button>&nbsp;
        <Modal show={show} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title>ບີນທັ້ງໝົດຂອງຜູ້ມີສິດສຸ່ມ</Modal.Title>
            </Modal.Header>
            {loading === 1 ?
                <div className='position-lodding'>
                <div class="spinner-border text-light" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div> : "" }
            <Modal.Body>
            <nav>
                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                    <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">ຈຳນວນບີນມີສິດສຸ່ມ</button>
                    <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">ຈຳນວນບີນທີ່ໂຊກດີ</button>
                </div>
            </nav>
            <div class="tab-content" id="nav-tabContent">
                <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                    <div className='row'>
                        <div className='col-md-12 card-body p-3'>
                            <div className='row'>
                                <div className='col-md-5'>
                                    <label className='w-100'><strong>ຈຳນວນບີນລວມ: </strong> <label className='text-danger'>( {GETAPIBIN.filter((e) => e.is_win == false).length} )</label></label>
                                    <label className='w-100'><strong>ຊື່ ຜູ້ມີສິດສຸ່ມ: </strong> {props.fullname}</label>
                                    <label className='w-100'><strong>ເບີຕິດຕໍ່: </strong> {props.phone}</label>
                                </div>
                                <div className='col-md-7'>
                                    <label className='w-100'><strong>ບ້ານ: </strong> {props.village}</label>
                                    <label className='w-100'><strong>ເມືອງ: </strong> {props.district}</label>
                                    <label className='w-100'><strong>ແຂວງ: </strong> {props.province}</label>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-12 overflow-auto'>
                            <table className='table table-light table-striped scrollspy'>
                                <thead>
                                    <tr>
                                        <th>ເລກບິນ</th>
                                        <th>ງວດທີ່</th>
                                        <th>ລະຫັດຜູ້ຂາຍ</th>
                                        <th>ຈຳນວນເງີນ</th>
                                        <th>ຈັດການ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {GETAPIBIN.filter((e) => e.is_win == false).map((item, index) => (
                                        <tr>
                                            <td>{item.bil_number} (bin: {item.bil_number.length})</td>
                                            <td>{item.week_id}</td>
                                            <td>{item.bil_seller}</td>
                                            <td>{parseInt(item.bil_price).toLocaleString()} KIP</td>
                                            <td className='col-1'>
                                                <div class="btn-group" role="group" aria-label="Basic example">
                                                    <EditeBill id={item.id} Gweek={item.week_id} fullname={item.candidate.fullName} bill={item.bil_number} seller={item.bil_seller} pricebil={item.bil_price}/>
                                                    <label className='btn btn-sm btn-danger' onClick={() => deletebin(item)}><i class="bi bi-trash3-fill"></i></label>&nbsp;
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                    <div className='row'>
                        <div className='col-md-12 card-body p-3'>
                            <div className='row'>
                                <div className='col-md-5'>
                                    <label className='w-100'><strong>ຈຳນວນບີນລວມ: </strong> <label className='text-danger'>( {GETAPIBIN.filter((e) => e.is_win == true).length} )</label></label>
                                    <label className='w-100'><strong>ຊື່ ຜູ້ມີສິດສຸ່ມ: </strong> {props.fullname}</label>
                                    <label className='w-100'><strong>ເບີຕິດຕໍ່: </strong> {props.phone}</label>
                                </div>
                                <div className='col-md-7'>
                                    <label className='w-100'><strong>ບ້ານ: </strong> {props.village}</label>
                                    <label className='w-100'><strong>ເມືອງ: </strong> {props.district}</label>
                                    <label className='w-100'><strong>ແຂວງ: </strong> {props.province}</label>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-12 overflow-auto'>
                            <table className='table table-light table-striped scrollspy'>
                                <thead>
                                    <tr>
                                        <th>ເລກບິນ</th>
                                        <th>ງວດທີ່</th>
                                        <th>ລະຫັດຜູ້ຂາຍ</th>
                                        <th>ຈຳນວນເງີນ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {GETAPIBIN.filter((e) => e.is_win == true).map((item, index) => (
                                        <tr>
                                            <td>{item.bil_number} (bin: {item.bil_number.length})</td>
                                            <td>{item.week_id}</td>
                                            <td>{item.bil_seller}</td>
                                            <td>{parseInt(item.bil_price).toLocaleString()} KIP</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
                
            </Modal.Body>
        </Modal>
    </>
  )
}
