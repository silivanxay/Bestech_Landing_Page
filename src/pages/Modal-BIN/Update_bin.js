import axios from 'axios'
import React, { useEffect, useReducer, useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import Swal from 'sweetalert2'
import url from '../../components/API-links/apiurl'
import { NumberFormatBase } from 'react-number-format';

export default function Update_bin(props) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow  = () =>  {setShow(true)}

    const [bil_number, setBil_number] = useState('')
    const [bill_price, setBill_price] = useState('')
    const [bill_seller, setBill_seller] = useState('')
    const [ LengthNumber, setLeng ] = useState(0)
    const setNumberLength = (e) => {
        setLeng(e.target.value.length)
        setBil_number(e.target.value)
    }

    function Update () {
        axios.put(url.Mainurl + url.putbils + props.id, {
            bil_number: bil_number == '' ? props.number : bil_number,
            bil_price: bill_price == '' ? props.price : bill_price,
            bil_seller: bill_seller == '' ? props.seller : bill_seller,
            candidate_id: props.lists_id
        }).then((res) => {
            Swal.fire(
                'ປ່ຽນແປງຂໍ້ມູນສຳເລັດ!',
                'You clicked the button!',
                'success'
              )
        }).catch((err) => {console.log(err)})
    }

  return (
    <>
        <label className='btn btn-sm btn-info' onClick={handleShow}><i class="bi bi-pencil-square"></i></label>&nbsp;
        <Modal show={show} onHide={handleClose} size="lg" className='user-select-none' aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title>ຈັດການ ແກ້ໄຂບີນ</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className='form-group'>
                            <label>ເລກບີນ: ຈຳນວນເລກບີນທີ່ຕ້ອມີ 16 - 19 ໂຕ / {LengthNumber == '' ? props.number.length : LengthNumber}</label>
                            <NumberFormatBase type='search' minLength={16} maxLength={19} defaultValue={props.number} onChange={setNumberLength} className='form-control' placeholder='ປ້ອນເລກບີນ:..........'/>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className='form-group'>
                            <label>ມູນຄ່າບີນ</label>
                            <NumberFormatBase type='search' minLength={16} maxLength={19} defaultValue={props.price} onChange={(e) => setBill_price(e.target.value)} className='form-control' placeholder='ມູນຄ່າບີນ:..........'/>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className='form-group'>
                            <label>ລະຫັດຜູ້ຂາຍ</label>
                            <NumberFormatBase type='search' minLength={16} maxLength={19} defaultValue={props.seller} onChange={(e) => setBill_seller(e.target.value)} className='form-control' placeholder='ລະຫັດຜູ້ຂາຍ:..........'/>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className='form-group'>
                            <label>ຜູ້ມີສິດສຸ່ມ</label>
                            <input type='text' className='form-control' value={props.fullname} disabled/>
                        </div>
                    </div>
                </div>
                <Modal.Footer>
                    <Button variant="primary" type='button' onClick={Update} className={`${(LengthNumber == 0 ? props.number.length : LengthNumber) > 15 ? '' : 'btn-light'}`} disabled={(LengthNumber == 0 ? props.number.length : LengthNumber) > 15 ? false : true}>ບັນທືກ</Button>
                    <Button variant="danger" onClick={handleClose}> ຍົກເລີກ </Button>
                </Modal.Footer>
            </Modal.Body>
        </Modal>
    </>
  )
}
