import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import useFunctions from './useFunctions';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { Button, Modal, Form } from 'react-bootstrap'

export default function Form_edit_footer(props) {

    const item = props.item

    let {
        editSubmit,
    } = useFunctions()

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <button variant='primary' className='btn btn-sm btn-outline-primary' onClick={handleShow}>
                <i class="bi bi-pencil-square"></i> | edit
            </button>
            <Modal show={show} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header>
                    <Modal.Title>
                        <h5>ຈັດການຂໍ້ມູນ Footer</h5>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form method='POST' onSubmit={editSubmit}>
                        <div className='card-body'>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <div className='form-group Nato_sanlaos'>
                                        <label className='Nato_sanlaos'>Facebook</label>
                                        <div className='input-group Nato_sanlaos'>
                                            <span className='input-group-text'><i class="bi bi-facebook"></i></span>
                                            <input className='form-control' defaultValue={item.facebook_url} placeholder='URL:// Facebook:....' />
                                        </div>
                                    </div>

                                    <div className='form-group Nato_sanlaos'>
                                        <label className='Nato_sanlaos'>Instagram</label>
                                        <div className='input-group Nato_sanlaos'>
                                            <span className='input-group-text'><i class="bi bi-instagram"></i></span>
                                            <input className='form-control' defaultValue={item.instagram_url} placeholder='URL:// Instagram:....' />
                                        </div>
                                    </div>

                                    <div className='form-group Nato_sanlaos'>
                                        <label className='Nato_sanlaos'>Email</label>
                                        <div className='input-group Nato_sanlaos'>
                                            <span className='input-group-text'><i class="bi bi-envelope-at-fill"></i></span>
                                            <input type='email' className='form-control' defaultValue={item.email} placeholder='Email:....' />
                                        </div>
                                    </div>


                                </div>
                                <div className='col-md-6'>
                                    <div className='form-group Nato_sanlaos'>
                                        <label className='Nato_sanlaos'>WhatApp</label>
                                        <div className='input-group Nato_sanlaos'>
                                            {/* <span className='input-group-text'><i class="bi bi-whatsapp"></i>&nbsp;| +856</span> */}
                                            {/* <NumberFormatBase className='form-control' placeholder='number 020:....' /> */}

                                            <PhoneInput
                                                specialLabel={''}
                                                country={'la'}
                                                value={item.whatsapp}
                                                inputStyle={{
                                                    width: "100%",
                                                    height: "37px",
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className='form-group Nato_sanlaos'>
                                        <label className='Nato_sanlaos'>ຫົວຂໍ້ ສະຖານທີ່ຕັ້ງ</label>
                                        <textarea className='form-control' placeholder='ເນື້ອໃນສະຖານທີ່ຕັ້ງ ບໍລິສັດ:.....' rows='5' defaultValue={item.address}></textarea>
                                    </div>
                                </div>
                                <input type='hidden' value={item.id}/>
                            </div>
                        </div>
                        <Modal.Footer className='Nato_sanlaos'>
                                <button type='submit' className='btn btn-sm btn-outline-success mr-2'><i class="bi bi-gear-wide-connected"></i> | ບັນທືກຂໍ້ມູນ</button>
                                <button type='button' className='btn btn-sm btn-outline-danger' onClick={handleClose}><i class="bi bi-chevron-bar-left"></i> | ຍົກເລີກ</button>
                        </Modal.Footer>
                    </form>
                </Modal.Body>
            </Modal>

        </>
    )
}
