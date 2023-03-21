import axios from 'axios';
import React, { useEffect, useReducer, useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { NumberFormatBase } from 'react-number-format';
import Swal from 'sweetalert2';
import url from '../components/API-links/apiurl'

export default function EditeBill(props) {
    const [loading, setLoading] = useState(0)

    const [ bill, setbill ] = useState(props.bill)
    const [ pricebil, setpricebil ] = useState(props.pricebil)
    const [ seller, setseller ] = useState(props.seller)
    
    const editeBill = (e) => {
        e.preventDefault()
        setLoading(1)
        Swal.fire({
            title: "ທ່ານຕ້ອງການແກ້ໄຂບີນນີ້ ຫຼື ບໍ່?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "ແກ້ໄຂຂໍ້ມູນ",
            cancelButtonText: "ຍົກເລີກ",
        }).then((result) => {
        if (result.isConfirmed) {
            axios.patch(url.Mainurl + url.patchbils + props.id, {
                bil_number: bill,
                bil_price: pricebil,
                bil_seller: seller
              }).then((res) => {
                setLoading(0)
                Swal.fire({
                    icon: "success",
                    title: "ແກ້ໄຂຂໍ້ມູນສຳເລັດ!",
                })
            }).catch((err) => {
                setLoading(0)
                console.log(err)
                if(err.response.status !== 400){
                   alert('ເກີດຂໍ້ຜິດຜາດ ກະລຸນາລອງໃໝ່ອີກຄັ້ງ')
                }else{
                    Swal.fire({
                        icon: "info",
                        title: "ບີນນີ້ໄດ້ມີການບັນທືກແລ້ວ!",
                    })
                }
            })
        }
        });
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true)
        setLoading(0)
    };
  return (
    <>
        <label className='btn btn-sm btn-info' onClick={handleShow}><i class="bi bi-pencil-square"></i></label>&nbsp;
        <Modal show={show} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            {loading === 1 ?
                <div className='position-lodding'>
                <div class="spinner-border text-light" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div> : "" }
            <Modal.Header closeButton>
                <Modal.Title><strong>ແກ້ໄຂເລກບີນ</strong></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form method='patch' onSubmit={editeBill}>
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className='form-group'>
                                <label>ເລກບິນ ( ຈຳນວນບີນຕ້ອງມີ 16 - 19 ໂຕ ) / {bill.length}</label>
                                <div className='input-group'>
                                    <NumberFormatBase className='form-control' maxLength={19} minLength={16} defaultValue={props.bill} onChange={(e) => setbill(e.target.value)} required/>
                                    <span className='input-group-text'>ບີນໃນງວດທີ່ ( <strong className='text-green'>{props.Gweek}</strong> )</span>
                                </div>
                            </div>

                            <div className='form-group'>
                                <label>ລະຫັດຜູ້ຂາຍ</label>
                                <NumberFormatBase className='form-control' defaultValue={props.seller} onChange={(e) => setseller(e.target.value)} required/>
                            </div>
                        </div>
                        <div className='col-md-6'>
                             <div className='form-group'>
                                <label>ມູນຄ່າບິນ</label>
                                <NumberFormatBase className='form-control' defaultValue={props.pricebil} onChange={(e) => setpricebil(e.target.value)} required/>
                            </div>

                            <div className='form-group'>
                                <label>ຊື່ຜູ້ມີສິດສຸ່ມ</label>
                                <input className='form-control' value={props.fullname} disabled/>
                            </div>
                        </div>
                    </div>
                    <Modal.Footer>
                        <Button variant={bill.length < 16 ? 'light' : 'primary'} type='submit' disabled={bill.length < 16 ? true : false}>
                            <i class="bi bi-cloud-download"></i> ແກ້ໄຂ
                        </Button>
                        <Button variant="danger" onClick={handleClose}>
                            <i class="bi bi-x-diamond-fill"></i> ຍົກເລີກ
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal.Body>
        </Modal>
    </>
  )
}
