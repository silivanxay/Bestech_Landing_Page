import React, { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import useFunctions from './useFunctions';

export default function Update_slide(props) {
    let item = props.items

    let {
        editSubmit,
    } = useFunctions()

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true)
        setPreview('')
    };

    const [preview, setPreview] = useState('')

    return (
        <>
            <button variant='primary' className='btn btn-sm btn-primary' onClick={handleShow}>
                <i class="bi bi-pencil-square"></i> | ແກ້ໄຂ
            </button>
            <Modal show={show} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header>
                    <Modal.Title>
                        <h5>ຈັດການຂໍ້ມູນ About</h5>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form method='POST' onSubmit={editSubmit}>
                        <input type='hidden' value={item.id} />
                        <div className='card-body'>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <div className='form-group Nato_sanlaos'>
                                        <label className='Nato_sanlaos'>ຮູບພາບສະໄລສ໌</label>
                                        <div className='input-group Nato_sanlaos'>
                                            <input type='file' className='form-control' onChange={(e) => setPreview(e.target.files[0])} />
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className='form-group Nato_sanlaos'>
                                        <label className='Nato_sanlaos'>ຫົວຂໍ້</label>
                                        <div className='input-group Nato_sanlaos'>
                                            <input className='form-control' defaultValue={item.title} placeholder='.......' />
                                        </div>
                                    </div>

                                </div>
                                <div className='col-md-12'>
                                    <img className='float-left' style={{ width: 100 + '%' }} src={preview === '' ? (item.image) : URL.createObjectURL(preview)} alt='ກະລຸນາເລືອກຮູບພາບ' />
                                </div>
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
