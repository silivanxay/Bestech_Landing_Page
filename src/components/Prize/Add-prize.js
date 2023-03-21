import axios from 'axios'
import React, { useState, useEffect, useReducer } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import Swal from 'sweetalert2'
import url from './data'

export default function Add_prize() {

    const [API_TYPE, settype] = useState([])
    const [reducer, setreducer] = useReducer(x => x + 1, 0)
    useEffect(() => {
        axios.get(url.Mainurl + url.get_prize_type).then((res) => {
            settype(res.data.results)
        })
    }, [reducer])

    const [inplus, stinplus] = useState('')
    const [active, setactive] = useState(false)
    const [ Type, setprizeType ] = useState('')
    function PlusType() {

        if (active == true && inplus.length > 0) {
            axios.post(url.Mainurl + url.post_type, {
                prize_type: inplus,
                is_active: true
            }).then((res) => {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })
                setreducer()
                setactive(false)
                Toast.fire({
                    icon: 'success',
                    title: 'ເພີມປະເທດລາງວັນສຳເລັດ'
                })
            })
        } else if (active === false) {
            setactive(true)
        } else {
            setactive(false)
        }
    }
    function Cancel() {
        setactive(false)
        setreducer()
    }

    function onSubmit(e) {
        e.preventDefault()
        axios.post(url.Mainurl + url.createPrize, {
            prize: e.target[0].value,
            detail: e.target[1].value,
            quantity: e.target[2].value,
            is_active: true,
            prize_type: Type == '' ? null : Type
        }).then((res) => {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
            setreducer()
            Toast.fire({
                icon: 'success',
                title: 'ບັນທືກຂໍ້ມູນສຳເລັດ'
            })
        })
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant='primary' onClick={handleShow}>
                <i class="bi bi-cloud-download"></i> ເພິ່ມລາງວັນ
            </Button>
            <Modal show={show} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>

                <Modal.Header closeButton>
                    <Modal.Title>
                        <strong>ເພິ່ມລາງວັນ</strong>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='form-group'>
                        <div className='input-group'>
                            <span className='input-group-text'><i class="bi bi-list-ol"></i></span>
                            <label className={`input-group-text bg-white ${active == false ? 'd-none' : ''}`}>ລາງວັນທີ່:</label>
                            <select className={`form-control form-select ${active == true ? 'd-none' : ''}`} onChange={(e) => setprizeType(e.target.value)} required>
                                <option value=''>~~ເລືອກປະເພດລາງວັນ~~</option>
                                {API_TYPE.filter((e) => e.is_active === true).map((item, index) => (
                                    <option value={item.id}>ລາງວັນທີ: {item.prize_type}</option>
                                ))}
                            </select>
                            <input className={`form-control ${active == true ? '' : 'd-none'}`} id='plus' onChange={(e) => stinplus(e.target.value)} placeholder='.....'/>
                            <label for='plus' className='input-group-text btn bg-green' onClick={PlusType}>+ {active == false ? 'New ປະເພດ' : 'ບັນທືກຂໍ້ມູນ'}</label>
                            <span className={`input-group-text btn bg-danger ${active == false ? 'd-none' : ''}`} onClick={Cancel}>Cancel</span>
                        </div>
                    </div>
                    <form method='POST' encType='multipart/form-data' onSubmit={onSubmit}>
                        <div className='row'>
                            <div className='col-md-6'>
                                <div className='form-group'>
                                    <label>ຊື່ລາງວັນ</label>
                                    <div className='input-group'>
                                        <span className='input-group-text'><i class="bi bi-award-fill"></i></span>
                                        <input type='text' className='form-control' name='Name1' placeholder='.....' required />
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className='form-group'>
                                    <label>ຈຳນວນລາງວັນ</label>
                                    <div className='input-group'>
                                        <span className='input-group-text'><i class="bi bi-check2-circle"></i></span>
                                        <input type='number' className='form-control' placeholder='.....' required />
                                    </div>
                                </div>
                            </div>
                            <div className='form-group'>
                                <label>ລາຍລະອຽດລາງວັນ</label>
                                <div className='input-group'>
                                    <span className='input-group-text'><i class="bi bi-award"></i></span>
                                    <textarea type='number' className='form-control' placeholder='.....' required />
                                </div>
                            </div>
                        </div>
                        <Modal.Footer>
                            <Button variant="primary" type='submit'>
                                <i class="bi bi-cloud-download"></i> ເພິມລາງວັນ
                            </Button>
                            <Button variant="danger" onClick={handleClose} >
                                Closs
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}
